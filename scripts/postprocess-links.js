#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'docs', '_site');

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else if (st.isFile() && full.endsWith('.html')) files.push(full);
  }
  return files;
}

function fixContent(content) {
  // 1) Home README on GitHub -> site index
  content = content.replace(/href="https:\/\/github\.com\/Keglev\/restaurant-speisekarte\/blob\/master\/README\.md"/g, 'href="index.html"');

  // 2) remap parent-relative architecture/deployment paths produced by some md links
  content = content.replace(/href="\.\.\/architecture\//g, 'href="architecture-site/');
  content = content.replace(/href="\.\.\/deployment\//g, 'href="deployment-site/');

  // 3) Convert remaining .md links to .html (handles anchors too)
  content = content.replace(/href="([^"]+?)\.md(#.*?)?"/g, (m, p1, p2) => {
    return `href="${p1}.html${p2 || ''}"`;
  });

  return content;
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error('docs/_site not found; run docs build first');
    process.exitCode = 2;
    return;
  }

  const files = walk(SITE);
  let changed = 0;
  for (const f of files) {
    let c = fs.readFileSync(f, 'utf8');
    const out = fixContent(c);
    if (out !== c) {
      fs.writeFileSync(f, out, 'utf8');
      changed++;
      console.log('Patched', path.relative(process.cwd(), f));
    }
  }
  console.log('Patched files:', changed);
}

main();

// Ensure every directory in the generated site that contains HTML files has an index.html
// This helps handle links that point to directory roots (e.g., /deployment-site/workflows/).
function ensureDirectoryIndexes() {
  const dirs = new Set();
  function walkDirs(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        walkDirs(full);
      } else if (st.isFile() && full.endsWith('.html')) {
        dirs.add(path.dirname(full));
      }
    }
  }
  walkDirs(SITE);
  let created = 0;
  for (const d of dirs) {
    const indexPath = path.join(d, 'index.html');
    if (!fs.existsSync(indexPath)) {
      // create a simple index that links to HTML files in this directory
      const files = fs.readdirSync(d).filter(n => n.endsWith('.html') && n.toLowerCase() !== 'index.html');
      if (files.length === 0) continue;
      const rel = path.relative(SITE, d).replace(/\\/g, '/');
      const title = rel ? rel : 'Documentation';
      const listItems = files.map(f => `<li><a href="${f}">${f}</a></li>`).join('\n');
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body><h1>${title}</h1><ul>${listItems}</ul></body></html>`;
      fs.writeFileSync(indexPath, html, 'utf8');
      created++;
      console.log('Created directory index:', path.relative(process.cwd(), indexPath));
    }
  }
  if (created) console.log('Created directory indexes:', created);
}

ensureDirectoryIndexes();
