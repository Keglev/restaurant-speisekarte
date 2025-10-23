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

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');
ensureDir(path.dirname(cssDest));
fs.copyFileSync(cssSrc, cssDest);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function wrapFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  // naive extract body content
  const bodyMatch = html.match(/<body[^>]*>((.|\n|\r)*)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : html;
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : path.basename(filePath);
  // inject SIDENAV if available (the template will contain {{SIDENAV}})
  let replaced = template.replace('{{TITLE}}', title).replace('{{CONTENT}}', content);

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
  const root = path.join(siteRoot, subdir);
  if (!fs.existsSync(root)) return '';

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
        html += `<li><a href="${link}">${it.name.replace(/\.html$/i,'')}</a></li>`;
      }
    }
    html += '</ul>';
    return html;
  }

  return `<nav class="side-nav" data-site="${subdir}">` + walkDir(root, root) + '</nav>';
}

  // Insert generated SIDENAV into template
const archNav = buildSideNavFor('architecture-site');
const deployNav = buildSideNavFor('deployment-site');
// combined nav: architecture first, then deployment
const sideNavHtml = `<div class="side-navs">${archNav}${deployNav}</div>`;
template = template.replace('{{SIDENAV}}', sideNavHtml);

walk(siteRoot);
console.log('Template applied to site root:', siteRoot);
