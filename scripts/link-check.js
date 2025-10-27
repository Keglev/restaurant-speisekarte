#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'docs', '_site');
// Determine possible site-base prefixes to strip from root-relative URLs.
// In CI GITHUB_REPOSITORY is 'owner/repo' — site-root used by the template is '/repo' or '/owner/repo'.
const repoEnv = process.env.GITHUB_REPOSITORY || '';
// Fallback: derive repo name from the repository folder name so local runs behave similarly
const repoNameFallback = path.basename(path.join(__dirname, '..'));
let repoBase = '';
if (repoEnv) {
  const parts = repoEnv.split('/');
  repoBase = '/' + parts[1];
} else if (repoNameFallback) {
  repoBase = '/' + repoNameFallback;
}
const possibleBases = [
  // owner/repo style
  repoEnv ? ('/' + repoEnv + '/') : null,
  // repo only (fallback to local folder name when GITHUB_REPOSITORY isn't set)
  repoBase ? (repoBase + '/') : null,
  // plain root
  '/',
].filter(Boolean);

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
    // root-relative: strip any known base prefix (owner/repo or repo) if present,
    // otherwise strip the leading slash and resolve relative to site root.
    let rel = u;
    // If the URL contains the repo name (with or without owner), strip up to and including it.
    // This handles variants like '/owner/repo/...' and '/repo/...'.
    if (repoBase) {
      const marker = '/' + repoBase.replace(/^\//, '') + '/';
      const idx = rel.indexOf(marker);
      if (idx !== -1) {
        rel = rel.slice(idx + marker.length);
      } else {
        for (const b of possibleBases) {
          if (rel.startsWith(b)) {
            rel = rel.slice(b.length);
            break;
          }
        }
      }
    } else {
      for (const b of possibleBases) {
        if (rel.startsWith(b)) {
          rel = rel.slice(b.length);
          break;
        }
      }
    }
    // remove any remaining leading slash
    if (rel.startsWith('/')) rel = rel.slice(1);
    // If rel still begins with the repo name (with or without owner segment), strip it.
    // This handles cases where the HTML contains '/restaurant-speisekarte/...' or
    // 'Keglev/restaurant-speisekarte/...' that weren't fully removed above.
    try {
      const repoName = repoBase.replace(/^\//, '');
      if (repoName) {
        // remove optional owner/ prefix and the repoName if present at start
        const re = new RegExp('^(?:[^/]+/)?' + repoName + '/?');
        rel = rel.replace(re, '');
      }
    } catch (e) {
      // ignore regex errors
    }
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
  if (!target) return false;
  // normalize the path we check
  const t = path.normalize(target);
  try {
    if (fs.existsSync(t) && fs.statSync(t).isFile()) return true;
    if (fs.existsSync(t) && fs.statSync(t).isDirectory()) {
      // check for common index files inside the directory
      const candidates = ['index.html', 'README.html', 'index.htm', 'default.html'];
      for (const c of candidates) {
        const p = path.join(t, c);
        if (fs.existsSync(p)) return true;
      }
    }
    // try common alternatives: add .html
    if (!t.endsWith('.html') && fs.existsSync(t + '.html')) return true;
    // if path ends with a slash-like separator, try index.html
    if (fs.existsSync(path.join(t, 'index.html'))) return true;
    // Fallback: try case-insensitive match for common index filenames (helps if generator created README.html vs README.HTML)
    try {
      const dir = fs.existsSync(t) && fs.statSync(t).isDirectory() ? t : path.dirname(t);
      if (fs.existsSync(dir)) {
        const names = fs.readdirSync(dir);
        for (const cand of ['index.html','readme.html','Index.html','README.HTML']) {
          if (names.includes(cand)) return true;
        }
      }
    } catch (e) {
      // ignore
    }
  } catch (err) {
    // swallow and return false below
  }
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
      // prefer checking with existsTarget which understands directories and .html alternates
      if (!existsTarget(resolved)) {
        // attempt to normalize common fallbacks for reporting
        let reported = resolved;
        if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
          reported = path.join(resolved, 'index.html');
        } else if (fs.existsSync(resolved + '.html')) {
          reported = resolved + '.html';
        }
        missing.push({file: path.relative(SITE, f), url, resolved: path.relative(SITE, reported)});
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
