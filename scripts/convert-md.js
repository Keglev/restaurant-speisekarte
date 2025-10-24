const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked options explicitly to avoid deprecation warnings and control behavior
marked.setOptions({
  gfm: true,
  headerIds: true,    // generate id attributes for headings
  mangle: false,      // do not mangle autolinked email addresses
  langPrefix: 'language-',
  smartLists: true,
  smartypants: false,
});

if (process.argv.length < 4) {
  console.error('Usage: node scripts/convert-md.js <srcDir> <outDir>');
  process.exit(1);
}

const srcDir = process.argv[2];
const outDir = process.argv[3];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function convertFile(srcPath, outPath) {
  const md = fs.readFileSync(srcPath, 'utf8');
  const html = marked.parse(md);
  // Prefer the first markdown H1 (# Title) as the HTML title; fall back to filename sans extension
  let title = path.basename(srcPath).replace(/\.md$/i, '');
  const h1 = md.match(/^#\s+(.+)$/m);
  if (h1 && h1[1]) {
    title = h1[1].trim();
  }
  const outHtml = `<!doctype html>\n<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body>${html}</body></html>`;
  fs.writeFileSync(outPath, outHtml, 'utf8');
}

function walkAndConvert(srcRoot, outRoot) {
  ensureDir(outRoot);
  const entries = fs.readdirSync(srcRoot, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcRoot, entry.name);
    const outPath = path.join(outRoot, entry.name.replace(/\.md$/i, '.html'));
    if (entry.isDirectory()) {
      walkAndConvert(srcPath, path.join(outRoot, entry.name));
    } else if (/\.md$/i.test(entry.name)) {
      ensureDir(path.dirname(outPath));
      convertFile(srcPath, outPath);
      console.log('Converted', srcPath, '->', outPath);
    }
  }
}

walkAndConvert(srcDir, outDir);
