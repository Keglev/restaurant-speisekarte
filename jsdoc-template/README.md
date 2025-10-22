This folder will contain a custom JSDoc template if you choose to provide one.

Creating a custom template allows full control over generated headings and labels (for example, permanently renaming "API Reference" to "Code reference").

To implement a custom template:
- Copy `node_modules/jsdoc/templates/default` here and modify the nav and index templates.
- Update `jsdoc.reference.json` -> opts.template to point to `./jsdoc-template`.
