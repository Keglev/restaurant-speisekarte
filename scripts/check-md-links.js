const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const siteDir = path.join(__dirname, '..', 'docs', '_site');

function walk(dir){
  const res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) res.push(...walk(p));
    else if(/\.md$/i.test(e.name)) res.push(p);
  }
  return res;
}

function extractLinks(md){
  // markdown links: [text](href)
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  const out = [];
  let m;
  while((m = re.exec(md))){
    out.push({text: m[1], href: m[2]});
  }
  return out;
}

function normalizeLinkHref(srcMdPath, href){
  // Skip URLs (http://, https://, mailto:)
  if (/^(https?:|mailto:|#)/i.test(href)) return null;
  // Remove any fragment
  const nofrag = href.split('#')[0];
  const resolved = path.join(path.dirname(srcMdPath), nofrag);
  return path.normalize(resolved);
}

const mdFiles = walk(docsDir);
const report = [];
for(const md of mdFiles){
  const content = fs.readFileSync(md, 'utf8');
  const links = extractLinks(content);
  for(const l of links){
    const norm = normalizeLinkHref(md, l.href);
    if(!norm) continue; // external or anchor link
    // if link points to a markdown file or a directory, the generated HTML may live under docs/_site
    const relToDocs = path.relative(docsDir, norm).replace(/\\/g,'/');

    // If the resolved path is outside the docs directory (e.g., ../README.md), skip it —
    // those links point to repository-level files and are intentionally left as-is.
    if (relToDocs.startsWith('..') || path.isAbsolute(relToDocs)) {
      continue;
    }

    // Build a list of candidate target paths to check.
    const candidates = [];

    // If the link pointed explicitly to a .md file, prefer .html replacement
    if (/\.md$/i.test(relToDocs)){
      candidates.push(path.join(siteDir, relToDocs).replace(/\.md$/i, '.html'));
      // README.md often becomes index.html in some converters
      if (/README\.md$/i.test(relToDocs)){
        candidates.push(path.join(siteDir, relToDocs.replace(/README\.md$/i, 'index.html')));
      }
    } else {
      // directory link (or no extension). check index.html or README.html under that directory
      candidates.push(path.join(siteDir, relToDocs, 'index.html'));
      candidates.push(path.join(siteDir, relToDocs, 'README.html'));
    }

    // Try an alternate layout where top-level folders are suffixed with '-site' (e.g., architecture -> architecture-site)
    const altRel = relToDocs.replace(/^([^\/]+)([\/]?)(.*)$/,'$1-site$2$3');
    if (/\.md$/i.test(relToDocs)){
      candidates.push(path.join(siteDir, altRel).replace(/\.md$/i, '.html'));
      if (/README\.md$/i.test(relToDocs)){
        candidates.push(path.join(siteDir, altRel.replace(/README\.md$/i, 'index.html')));
      }
    } else {
      candidates.push(path.join(siteDir, altRel, 'index.html'));
      candidates.push(path.join(siteDir, altRel, 'README.html'));
    }

    // Normalize and dedupe candidates
    const uniq = Array.from(new Set(candidates.map(p=>path.normalize(p))));
    let found = null;
    for(const c of uniq){
      if(fs.existsSync(c)){
        found = c;
        break;
      }
    }
    const targetHtml = path.join(siteDir, relToDocs).replace(/\.md$/i, '.html');
    const exists = !!found;
    const reportedTarget = exists ? path.relative(siteDir, found).replace(/\\/g,'/') : path.relative(siteDir, targetHtml).replace(/\\/g,'/');
    report.push({
      source: path.relative(docsDir, md).replace(/\\/g,'/'),
      href: l.href,
      resolvedMd: path.relative(docsDir, norm).replace(/\\/g,'/'),
      targetHtml: reportedTarget,
      exists
    });
  }
}

// Print CSV-like output
console.log('source,href,resolved_md,target_html,exists');
for(const r of report){
  console.log(`${r.source},"${r.href}",${r.resolvedMd},${r.targetHtml},${r.exists}`);
}

// summary
const missing = report.filter(r=>!r.exists);
console.error(`\nChecked ${report.length} links; missing targets: ${missing.length}`);
if(missing.length){
  console.error('Missing samples (up to 20):');
  missing.slice(0,20).forEach(m=>console.error(JSON.stringify(m)));
}

// Exit with non-zero status if missing links were detected so CI fails fast.
if (missing.length) {
  process.exit(2);
} else {
  process.exit(0);
}
