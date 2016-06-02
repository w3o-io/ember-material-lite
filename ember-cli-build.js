/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sassOptions: {
      includePaths: ['bower_components/material-design-lite/src']
    }
  });

  app.import('bower_components/material-design-lite/src/images/tick-mask.svg', {destDir: '/images'});
  app.import('bower_components/material-design-lite/src/images/tick.svg', {destDir: '/images'});
  app.import('bower_components/material-design-lite/material.min.js');
  
  app.options.snippetPaths = ['tests/dummy/app/templates/snippets'];
  app.options.snippetSearchPaths = ['tests/dummy', 'app', 'addon'];
  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('vendor/highlight.pack.js');

  return app.toTree();
};
