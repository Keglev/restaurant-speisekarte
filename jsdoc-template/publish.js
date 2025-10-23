const helper = require('jsdoc/util/templateHelper');
const fs = require('jsdoc/fs');
const path = require('jsdoc/path');

// This minimal publish.js delegates to default but ensures nav labels are adjusted.
exports.publish = function(data, opts) {
  // reuse default publish implementation by requiring it from the installed template
  const defaultPublish = require(path.join(opts.templates || 'node_modules/jsdoc/templates/default', 'publish.js'));
  // run the default publish to generate files
  defaultPublish.publish.call(this, data, opts);

  // post-processing step: adjust generated index and nav files to replace API Reference -> Code reference
  const outdir = path.normalize(opts.destination || path.join('.', 'out'));
  const indexPath = path.join(outdir, 'index.html');
  try {
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf8');
      html = html.replace(/API Reference/ig, 'Code reference');
      fs.writeFileSync(indexPath, html, 'utf8');
    }
  } catch (e) {
    // best-effort
    // console.warn('post-process failed', e);
  }
};
