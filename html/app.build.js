//var a =
	({
	appDir: '.',
	baseUrl: '.',
	dir: '../html_build',
	optimize: 'uglify',
	paths: {
		'json2': 'vendor/json2',
		'modernizr': 'vendor/modernizr-2.6.2.min',
		'html5': 'vendor/html5',
		'zepto': 'vendor/zepto',
		'mustache': 'vendor/mustache',
		'backbone': 'vendor/backbone',
		'underscore': 'vendor/underscore',
		'jquery': 'vendor/jquery-2.0.0.min',
		// Plugins
		'bootstrap': 'vendor/plugins/bootstrap',
		'jquery.pstrength': 'vendor/plugins/jquery.pstrength-min.1.2',
		'jqueryui': 'vendor/plugins/jquery-ui-1.10.2.custom.min',
		'jquerytimepicker': 'vendor/plugins/jquery-date-time-picker-1.4',
		'jquery.jrac': 'vendor/plugins/jquery.jrac',
		'iframe-transport': 'vendor/plugins/jquery.iframe-transport',
		'fileupload': 'vendor/plugins/jquery.fileupload',
		'jquery.ui.widget': 'vendor/plugins/jquery.ui.widget',
		'jquery.slimscroll': 'vendor/plugins/jquery.slimscroll.min',
		//	    'plupload-full'          : '/vendor/plugins/plupload.full.min',
		'plupload': 'plupload/js/plupload.full',
		//	    'jq.plupload'       : "/plupload/js/jquery.ui.plupload/jquery.ui.plupload",

		'custom': 'vendor/custom',

		// RequireJS
		'domready': 'vendor/plugins/domReady',
		'text': 'vendor/plugins/text',

		// Touch events
		'touch': 'vendor/plugins/touch',

		// Create a rotate effect events
		'rotate': 'vendor/plugins/jQueryRotate',


		// Vendor libs, packaged group of common dependencies
		'vendor': 'vendor',

		// Facade references to vendor / library methods
		'facade': 'facade',

		// Utilities and libraries
		'utils': 'utils',

		// Backbone syncs depend on both vendor and utils
		'syncs': 'syncs',

		// Should be used as required dependencies with use of `define`,
		'models': 'models',
		'views': 'views',

		'collections': 'collections',
		'controller': 'controller',

		// Packages
		'packages': 'packages',
		'user': 'packages/user',
		'media': 'packages/media',
		'site': 'packages/site',
		'sportorg': 'packages/sportorg',
		'location': 'packages/location',
		'sport': 'packages/sport',
		'votes': 'packages/vote',
		'roster': 'packages/roster',

		// Pages

		'pages': 'pages',
		'chrome': 'pages/chrome',
		'imageup': 'pages/imageup',
		'videopreview': 'pages/videopreview',
		'profile': 'pages/profile',
		'game': 'pages/game',
		'team': 'pages/team',
		'registration': 'pages/registration',
		'signup': 'pages/signup',
		'home': 'pages/home',
		'profilesetting': 'pages/profilesetting',
		'userresume': 'pages/userresume',
		'usercontrol': 'usercontrols/',

		// Application - bootstrap for frontend app
		'application': 'application'

	},
	modules: [
		// Common libraries, Utilities, Syncs, Models, Views, Collections
		{
			name: 'utils',
			exclude: ['jquery', 'vendor', 'facade']
		},
		{
			name: 'syncs',
			exclude: ['vendor', 'facade', 'utils']
		},
		{
			name: 'models',
			exclude: ['vendor', 'facade', 'utils', 'syncs']
		},
		{
			name: 'views',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models']
		},
		{
			name: 'collections',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views']
		},
		{
			name: 'chrome',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'imageup',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'videopreview',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'profile',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'game',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'team',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'registration',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'signup',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'home',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'profilesetting',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'userresume',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		}
	]
})