const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node scripts/apply-template.js <siteRoot>');
  process.exit(1);
}

const siteRoot = process.argv[2];
const templatePath = path.join(__dirname, '..', 'templates', 'enterprise', 'base.html');
const cssSrc = path.join(__dirname, '..', 'templates', 'enterprise', 'enterprise.css');
const cssDest = path.join(siteRoot, 'assets', 'enterprise.css');
const logoSrc = path.join(__dirname, '..', 'templates', 'enterprise', 'logo.svg');
const logoDest = path.join(siteRoot, 'assets', 'logo.svg');

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');

// Compute a SITE_ROOT URL prefix for asset links (used in template as {{SITE_ROOT}}).
// Prefer explicit SITE_ROOT env (e.g. '/repo-name'), else derive from GITHUB_REPOSITORY -> '/repo'.
let siteRootUrl = '';
if (process.env.SITE_ROOT && process.env.SITE_ROOT.trim()) {
  siteRootUrl = process.env.SITE_ROOT.trim().replace(/\/$/, '');
} else if (process.env.GITHUB_REPOSITORY) {
  const parts = process.env.GITHUB_REPOSITORY.split('/');
  if (parts.length === 2) siteRootUrl = '/' + parts[1];
}
// Replace SITE_ROOT placeholder in the template so asset links become site-root absolute.
template = template.replace(/\{\{SITE_ROOT\}\}/g, siteRootUrl);
// siteRootPrefix will be used to build absolute links for side-nav entries.
// When SITE_ROOT is set (CI), produce '/repo/...' style prefixes. Locally
// leave it empty so links are generated as relative paths (no leading slash)
// which is friendlier for local preview.
const siteRootPrefix = siteRootUrl ? siteRootUrl.replace(/\/$/, '') + '/' : '/';
ensureDir(path.dirname(cssDest));
fs.copyFileSync(cssSrc, cssDest);
// copy logo if present (so templates' logo is available under site assets)
try {
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
  }
} catch (err) {
  console.warn('Could not copy logo:', err && err.message ? err.message : err);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function wrapFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  // If this file was already wrapped by the enterprise template, skip to avoid double-wrapping
  if (html.indexOf('<!-- enterprise-template -->') !== -1) {
    return;
  }
  // naive extract body content
  const bodyMatch = html.match(/<body[^>]*>((.|\n|\r)*)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : html;
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : path.basename(filePath);
  // compute per-file base href so relative links inside the page resolve correctly
  const relPath = path.relative(siteRoot, filePath).replace(/\\/g, '/');
  const dir = path.dirname(relPath).replace(/\\/g, '/');
  let perFileBase = './';
  if (siteRootUrl) {
    // When siteRootUrl is known (CI/github-pages), use an absolute base
    // that includes the repository prefix so links resolve correctly.
    if (dir && dir !== '.') perFileBase = siteRootUrl.replace(/\/$/, '') + '/' + dir + '/';
    else perFileBase = siteRootUrl.replace(/\/$/, '') + '/';
  } else {
    // Local preview: keep a relative base so we don't introduce a leading '/'
    perFileBase = './';
  }

  // inject SIDENAV if available (the template will contain {{SIDENAV}})
  // replace {{BASE_HREF}} per-file so content-relative links work, while assets use {{SITE_ROOT}}
  const templWithBase = template.replace('{{BASE_HREF}}', perFileBase);
  let replaced = templWithBase.replace('{{TITLE}}', title).replace('{{CONTENT}}', content);

  // insert an explicit marker so future runs can detect the file is already wrapped
  replaced = '<!-- enterprise-template -->\n' + replaced;

  // If this file is inside the generated reference area, remove the top-level API/Code reference nav link
  const rel = path.relative(siteRoot, filePath).replace(/\\/g, '/');
  if (rel.startsWith('reference/') || rel.includes('/reference/')) {
    // remove any anchor that links to ./reference/ (API link)
    replaced = replaced.replace(/<a[^>]*href=("|')\.\/reference\/("|')[^>]*>.*?<\/a>/ig, '');
  }

  // Normalize labels globally: make 'API Reference' and 'API' -> 'Code reference'
  replaced = replaced.replace(/API Reference/ig, 'Code reference');
  // standalone 'API' links or text are replaced conservatively
  replaced = replaced.replace(/>\s*API\s*</g, '>Code reference<');

  fs.writeFileSync(filePath, replaced, 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (/\.html$/i.test(e.name)) {
      wrapFile(p);
      console.log('Wrapped', p);
    }
  }
}

// Build side-navs for known sites (architecture-site, deployment-site)
function buildSideNavFor(subdir) {
  // Return the inner <ul> structure for the given subdir so the caller can
  // wrap it under a top-level label (Architecture or Deployment).
  const root = path.join(siteRoot, subdir);
  if (!fs.existsSync(root)) return '<ul></ul>';

  function walkDir(dir, base) {
    const items = fs.readdirSync(dir, { withFileTypes: true }).sort((a,b)=>a.name.localeCompare(b.name));
    let html = '<ul>';
    for (const it of items) {
      const p = path.join(dir, it.name);
      const rel = path.relative(base, p).replace(/\\/g, '/');
      if (it.isDirectory()) {
        html += `<li class="nav-group">${it.name}${walkDir(p, base)}</li>`;
      } else if (/\.html$/i.test(it.name)) {
  // make links site-root absolute so they work from any page regardless of its <base>
  const link = `${siteRootPrefix}${subdir}/${rel}`.replace(/\/+/g, '/');
        // Try to extract a friendly label from the target HTML: prefer <title>, then <h1>, else filename
        let label = it.name.replace(/\.html$/i,'');
        try {
          const content = fs.readFileSync(p, 'utf8');
          const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
          if (titleMatch && titleMatch[1].trim()) label = titleMatch[1].trim();
          else {
            const h1Match = content.match(/<h1[^>]*>([^<]*)<\/h1>/i);
            if (h1Match && h1Match[1].trim()) label = h1Match[1].trim();
          }
        } catch (err) {
          // fall back to filename
        }
        html += `<li><a href="${link}">${label}</a></li>`;
      }
    }
    html += '</ul>';
    return html;
  }

  return walkDir(root, root);
}

  // Insert generated SIDENAV into template
const archInner = buildSideNavFor('architecture-site');
const deployInner = buildSideNavFor('deployment-site');
  // Remove redundant top-level entries that duplicate the grouped links (cleaner left-nav).
  // Match whether or not a siteRoot prefix is present by allowing an optional
  // leading path segment before the expected filename.
  const cleanArchInner = archInner.replace(/<li>\s*<a[^>]*href="(?:[^"]*\/)?architecture-site\/README.html"[\s\S]*?<\/li>/i, '');
  const finalArchInner = cleanArchInner.replace(/<li>\s*<a[^>]*href="(?:[^"]*\/)?architecture-site\/system-overview.html"[\s\S]*?<\/li>/i, '');
// Build grouped navs: top-level "Architecture" and "Deployment" labels that contain
// the component/patterns/workflows lists underneath. Clicking the top label goes
// to the system overview (Architecture) or deployment README (Deployment).
const sideNavHtml = `
  <div class="side-navs">
      <nav class="side-nav" data-site="architecture-site">
      <ul>
        <li class="top"><a href="${siteRootPrefix}architecture-site/system-overview.html">Architecture</a>
          ${finalArchInner}
        </li>
      </ul>
    </nav>
    <nav class="side-nav" data-site="deployment-site">
      <ul>
        <li class="top"><a href="${siteRootPrefix}deployment-site/README.html">Deployment</a>
          ${deployInner}
        </li>
      </ul>
    </nav>
  </div>
`;
template = template.replace('{{SIDENAV}}', sideNavHtml);

walk(siteRoot);

// Generate a polished landing page using the enterprise template + side navigation
try {
  const landingContent = `
    <div class="landing-hero">
      <h1>Documentation for Restaurant Speisekarte</h1>
      <p>This site contains the generated API reference and the markdown-based architecture &amp; deployment documentation.</p>
      <p class="landing-actions">
        <a class="button" href="reference/index.html">Reference</a>
        <a class="button" href="architecture-site/system-overview.html">Architecture</a>
        <a class="button" href="deployment-site/README.html">Deployment</a>
      </p>
    </div>
  `;

  const landingHtml = template.replace('{{TITLE}}', 'Documentation — Restaurant Speisekarte').replace('{{CONTENT}}', landingContent);
  const outIndex = path.join(siteRoot, 'index.html');
  // Ensure the landing page includes the enterprise-template marker so CI can detect templated sites
  const landingWithMarker = '<!-- enterprise-template -->\n' + landingHtml;
  fs.writeFileSync(outIndex, landingWithMarker, 'utf8');
  console.log('Landing page written to', outIndex);
} catch (err) {
  console.error('Failed to write landing page:', err);
}

console.log('Template applied to site root:', siteRoot);
