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

const template = fs.readFileSync(templatePath, 'utf8');
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
  const out = template.replace('{{TITLE}}', title).replace('{{CONTENT}}', content);
  fs.writeFileSync(filePath, out, 'utf8');
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

walk(siteRoot);
console.log('Template applied to site root:', siteRoot);
