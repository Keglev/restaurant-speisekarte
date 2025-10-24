#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'docs', '_site');
const BASE = '/Keglev/restaurant-speisekarte/'; // matches template base href

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

function isExternal(u) {
  return /^([a-z]+:)?\/\//i.test(u) || u.startsWith('mailto:');
}

function resolveUrl(fromFile, url) {
  // strip fragment
  const u = url.split('#')[0];
  if (!u || u === '.') return null;
  if (isExternal(u)) return null;
  if (u.startsWith('/')) {
    // root-relative: strip known base if present
    let rel = u;
    if (rel.startsWith(BASE)) rel = rel.slice(BASE.length);
    else if (rel.startsWith('/')) rel = rel.slice(1);
    return path.join(SITE, rel);
  }
  // Try resolving relative to the file (most links are written relative to their page)
  const fileRelative = path.resolve(path.dirname(fromFile), u.replace(/^\.\//, ''));
  if (fs.existsSync(fileRelative)) return fileRelative;

  // Fallback: resolve as site-root relative (accounts for base href usage)
  const siteRel = path.join(SITE, u.replace(/^\.\//, ''));
  if (fs.existsSync(siteRel)) return siteRel;

  // Not found by either method; return the site-rel path as the expected location
  return siteRel;
}

function existsTarget(target) {
  if (!target) return true;
  if (fs.existsSync(target)) return true;
  // if target is a directory, check for index.html
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return fs.existsSync(path.join(target, 'index.html'));
  }
  // try adding index.html if path ends with '/'
  if (fs.existsSync(target + path.sep + 'index.html')) return true;
  return false;
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error('docs/_site not found; build first');
    process.exit(2);
  }

  const files = walk(SITE);
  const missing = [];
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    const re = /(?:href|src)\s*=\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(text))) {
      const url = m[1];
      if (isExternal(url)) continue;
  let resolved = resolveUrl(f, url);
      if (!resolved) continue;
      // if it points to a directory, resolve index
      if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
        resolved = path.join(resolved, 'index.html');
      }
      if (!fs.existsSync(resolved)) {
        missing.push({file: path.relative(SITE, f), url, resolved: path.relative(SITE, resolved)});
      }
    }
  }

  if (missing.length === 0) {
    console.log('No missing links detected');
    process.exit(0);
  }

  console.log('Missing links:');
  for (const s of missing) {
    console.log(` - ${s.file} -> ${s.url} (resolved ${s.resolved})`);
  }
  process.exit(1);
}

main();
