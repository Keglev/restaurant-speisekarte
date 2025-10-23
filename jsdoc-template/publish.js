const helper = require('jsdoc/util/templateHelper');
const fs = require('jsdoc/fs');
const path = require('jsdoc/path');

// This minimal publish.js delegates to default but ensures nav labels are adjusted.
exports.publish = function(data, opts) {
  // Attempt to locate the default template's publish.js in a robust way
  let defaultPublishPath;
  try {
    // first try resolving via package name
    defaultPublishPath = require.resolve('jsdoc/templates/default/publish.js');
  } catch (e) {
    // fallback to project node_modules layout
    defaultPublishPath = path.join(process.cwd(), 'node_modules', 'jsdoc', 'templates', 'default', 'publish.js');
  }

  let defaultPublish;
  try {
    defaultPublish = require(defaultPublishPath);
  } catch (err) {
    // If we can't load the default publish, fail gracefully with a helpful message
    // but avoid throwing so build logs show the issue clearly
    console.error('Could not locate default JSDoc publish.js at', defaultPublishPath, err.message || err);
    throw err;
  }

  // run the default publish to generate files
  if (defaultPublish && typeof defaultPublish.publish === 'function') {
    defaultPublish.publish.call(this, data, opts);
  } else if (typeof defaultPublish === 'function') {
    // some templates export directly as a function
    defaultPublish.call(this, data, opts);
  }

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
    console.warn('post-process failed', e && e.message ? e.message : e);
  }
};
