//var a =
	({
	appDir: './',
	baseUrl: './',
//	mainConfigFile: './main.js',
	dir: '../html_build',
	optimize: 'uglify',
	paths: {

		jquery: 'vendor/jquery.1.10.2.min',
		'json2': 'vendor/json2',
		'modernizr': 'vendor/modernizr-2.6.2.min',
		'mustache': 'vendor/mustache',
		'backbone': 'vendor/backbone',
		'underscore': 'vendor/underscore',
		'html5' :'vendor/html5',
		'zepto'  : 'vendor/zepto',

		// Plugins
		'bootstrap': 'vendor/plugins/bootstrap',
		'jquery.pstrength': 'vendor/plugins/jquery.pstrength-min.1.2',
		'jqueryui': 'vendor/plugins/jquery-ui-1.10.2.custom.min',
		'jquerytimepicker': 'vendor/plugins/jquery-date-time-picker-1.4',
		'jquery.jrac': 'vendor/plugins/jquery.jrac',
		'iframe-transport': 'vendor/plugins/jquery.iframe-transport',
		'fileupload': 'vendor/plugins/jquery.fileupload',
		'browser': 'vendor/jquery.browser',
		'jquery.ui.widget': 'vendor/plugins/jquery.ui.widget',
		'jquery.slimscroll': 'vendor/plugins/jquery.slimscroll.min',
		'jquery.slimscroll.hor' : 'vendor/plugins/jquery.slimscroll.hor',
		'plupload': 'plupload/js/plupload.full',
		'jwplayer': "vendor/plugins/jwplayer",
//		'qtip': "vendor/plugiuns/qtip/qtip",
		'facebook': 'vendor/all',

		'custom': 'vendor/custom',

		// RequireJS
		'domready': 'vendor/plugins/domReady',
		'text': 'vendor/plugins/text',

		// Touch events
		'touch': 'vendor/plugins/touch',

		// Create a rotate effect events
		'rotate': 'vendor/plugins/jQueryRotate',

		// load async files
		'async' :  'vendor/plugins/async',

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
		'common'    :'packages/common',
		'user': 'packages/user',
		'media': 'packages/media',
		'site': 'packages/site',
		'sportorg': 'packages/sportorg',
		'location': 'packages/location',
		'sport': 'packages/sport',
		'votes': 'packages/vote',
		'roster': 'packages/roster',
		'schedules'         : 'packages/game-schedules',

		// Pages

		'pages': 'pages',
		'chrome': 'pages/chrome',
		'imageup': 'pages/imageup',
		'videopreview': 'pages/videopreview',
		'profile': 'pages/profile',
		'fbAccept' :'/pages/fbaccept',
		'game': 'pages/game',
		'fbinvite' :'pages/fbinvite',
		'team': 'pages/team',
		'registration': 'pages/registration',
		'signup': 'pages/signup',
		'login'       :  'pages/login',
		'home': 'pages/home',
		'profilesetting': 'pages/profilesetting',
		'userresume': 'pages/userresume',

		'usercontrol'       : 'usercontrols/',
	//	'add-club'          : 'usercontrols/add-club/add-club',
	//	'addgame'           : 'usercontrols/addgame/addgame',
	//	'photo-player'      : 'usercontrols/photo-player/photo-player',
	//	'tag'               : 'usercontrols/tag/tag',
	//	'imagecropper'      : 'usercontrols/imagecropper/imagecropper',
		'browserpop' : 'usercontrols/detection',

		// Application - bootstrap for frontend app
		'application': 'application'

	},
/*	onBuildWrite   : function( name, path, contents ) {
		// output the original source contents

		var pathReg = new RegExp("/vendor/");
		if(pathReg.test(path)) return contents;

		var pattern =new RegExp("console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)( ?| +)(?!\=)\([^;]*\)(;)?","gm");
		// perform transformations on the original source
	//	contents = contents.replace(new RegExp("console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?","gm"),"foo");

		if(pattern.test(contents)){
			console.log("Match: ",contents.match(pattern));
			try{
				var contents2 = contents.replace(pattern,"");
				contents = contents2;
			}
			catch(ex){
				console.log(ex);
			}

		}

		return contents;
	},
	*/
	shim: {
		'facade' : {
			deps: ['jquery']
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'browser': {
			deps: ['jquery']
		},
		'underscore': {
			exports: '_',
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'json2', 'html5', 'jqueryui', 'custom', 'jquerytimepicker','browser'],
			exports: 'Backbone'
		},
		'browserpop': {
			deps:['jqueryui']
		},
		'jquery.slimscroll':{
			deps: ['jquery', 'jqueryui']
		},
		'bootstrap': {
			deps: ['jquery', 'jqueryui']
		},
		'plupload': {
			deps: ['jquery']
		},
		'jwplayer': {
			deps: ['jquery']
		},
		'jquerytimepicker': {
			deps: ['jquery', 'jqueryui']
		}
	},
	priority: ['jquery','text', 'modernizr', 'json2', 'vendor', 'utils', 'facade', 'syncs', 'models', 'views', 'collections', 'controller'],
	jquery: '1.10.2',
	modules: [
		// Common libraries, Utilities, Syncs, Models, Views, Collections
		{
			name: 'utils',
			exclude: ['jquery', 'vendor', 'facade']
		},
		{
			name: 'syncs',
			exclude: ['jquery','vendor', 'facade', 'utils']
		},
		{
			name: 'models',
			exclude: ['jquery','vendor', 'facade', 'utils', 'syncs']
		},
		{
			name: 'views',
			exclude: ['jquery','vendor', 'facade', 'utils', 'syncs', 'models']
		},
		{
			name: 'collections',
			exclude: ['jquery','vendor', 'facade', 'utils', 'syncs', 'models', 'views']
		}, /*

		PAGES START

	*/  {
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
		},
		{
			name: 'login',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		}/*

		END PAGES

	  {
			name: 'add-club',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'addgame',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'photo-player',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		},
		{
			name: 'tag',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		}
	/*	{
			name: 'imagecropper',
			exclude: ['vendor', 'facade', 'utils', 'syncs', 'models', 'views', 'collections']
		}
*/	]
})