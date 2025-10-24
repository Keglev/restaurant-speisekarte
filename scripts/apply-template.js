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
// Determine base href dynamically: prefer DOCS_BASE_URL, then GitHub repo, else relative './'
const envBase = process.env.DOCS_BASE_URL;
let baseHref = './';
if (envBase && envBase.trim()) {
  baseHref = envBase.trim();
} else if (process.env.GITHUB_REPOSITORY) {
  // GITHUB_REPOSITORY is in the form 'owner/repo'
  const repo = process.env.GITHUB_REPOSITORY.split('/');
  if (repo.length === 2) {
    const owner = repo[0];
    const name = repo[1];
    baseHref = `https://${owner}.github.io/${name}/`;
  }
}
// Replace placeholder in template
template = template.replace('{{BASE_HREF}}', baseHref);
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
  // inject SIDENAV if available (the template will contain {{SIDENAV}})
  let replaced = template.replace('{{TITLE}}', title).replace('{{CONTENT}}', content);

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
        // make links site-relative (the template adds a base href for gh-pages)
        const link = `${subdir}/${rel}`;
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
// Build grouped navs: top-level "Architecture" and "Deployment" labels that contain
// the component/patterns/workflows lists underneath. Clicking the top label goes
// to the system overview (Architecture) or deployment README (Deployment).
const sideNavHtml = `
  <div class="side-navs">
    <nav class="side-nav" data-site="architecture-site">
      <ul>
        <li class="top"><a href="architecture-site/system-overview.html">Architecture</a>
          ${archInner}
        </li>
      </ul>
    </nav>
    <nav class="side-nav" data-site="deployment-site">
      <ul>
        <li class="top"><a href="deployment-site/README.html">Deployment</a>
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
  fs.writeFileSync(outIndex, landingHtml, 'utf8');
  console.log('Landing page written to', outIndex);
} catch (err) {
  console.error('Failed to write landing page:', err);
}

console.log('Template applied to site root:', siteRoot);
