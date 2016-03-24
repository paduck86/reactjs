/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */

var tpmVersions = require('../../package.json');

module.exports = function(grunt) {

	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?_='+(tpmVersions.version)+'"></script>',
				appRoot: '.tmp/public'
			},
			files: {
        // '.tmp/public/index.html': ['.tmp/public/bundle.js'],
        'views/*.ejs': ['.tmp/public/bundle.js']
			}
		},

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?_='+(tpmVersions.version)+'"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
        // '.tmp/public/index.html': ['.tmp/public/bundle.js'],
        'views/*.ejs': ['.tmp/public/bundle.js']
			}
		},

		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?_='+(tpmVersions.version)+'"></script>',
				appRoot: '.tmp/public'
			},
			files: {
        // '.tmp/public/index.html': ['.tmp/public/bundle.js'],
        'views/*.ejs': ['.tmp/public/bundle.js']
			}
		},

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s?_='+(tpmVersions.version)+'"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
        // '.tmp/public/index.html': ['.tmp/public/styles.css'],
        'views/*.ejs': ['.tmp/public/bundle.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s?_='+(tpmVersions.version)+'">',
				appRoot: '.tmp/public'
			},

			files: {
        // '.tmp/public/index.html': ['.tmp/public/styles.css'],
        'views/*.ejs': ['.tmp/public/styles.css']
			}
		},

		devStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s?_='+(tpmVersions.version)+'">',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
        // '.tmp/public/index.html': ['.tmp/public/styles.css'],
        'views/*.ejs': ['.tmp/public/styles.css']
			}
		},

		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s?_='+(tpmVersions.version)+'">',
				appRoot: '.tmp/public'
			},
			files: {
        // '.tmp/public/index.html': ['.tmp/public/styles.css'],
        'views/*.ejs': ['.tmp/public/styles.css']
			}
		},

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s?_='+(tpmVersions.version)+'">',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				// '.tmp/public/index.html': ['.tmp/public/styles.css'],
        'views/*.ejs': ['.tmp/public/styles.css']
			}
		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: '<script type="text/javascript" src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				// '.tmp/public/index.html': ['.tmp/public/jst.js'],
        'views/*.ejs': ['.tmp/public/styles.css']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/jst.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
