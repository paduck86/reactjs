/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

var libPath = 'modules/dependencies',
    appPath = 'modules/app';

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)

var jsFilesBaseToInject = [

  // Load sails.io before everything else
  // libPath+'/sails.io/sails.io.js',
  libPath+'/modernizr/modernizr.min.js',
  libPath+'/jquery.1.11.3/jquery.min.js',
  libPath+'/jquery.cookie/jquery.cookie.js',
  libPath+'/jquery.transit/jquery.transit.min.js',
  libPath+'/jquery.boxloader/jquery.boxloader.min.js',
  libPath+'/jquery.validation1.14.1/jquery.validate.min.js',
  libPath+'/jquery.validation1.14.1/additional-methods.min.js',
  libPath+'/placeholder.4.0.1/placeholder.4.0.1.js',
  // libPath+'/bootstrap.3.3.6/bootstrap.min.js'
  libPath+'/underscore.1.8.3/underscore-min.js',


  // Dependencies like jQuery, or Angular are brought in here

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
];

var jsFilesAppToInject = [
  appPath+'/common/**/*.js',
  appPath+'/main/**/*.js',
  appPath+'/feature/**/*.js',
  appPath+'/contact/**/*.js',
  appPath+'/about/**/*.js',
  appPath+'/now/**/*.js',
  appPath+'/fitnshop/**/*.js',
  appPath+'/contact/**/*.js',
];


var jsFilesToInject = jsFilesBaseToInject.concat(jsFilesAppToInject);


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
