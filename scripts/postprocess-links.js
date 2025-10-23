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
