// main.js
// ------- 
// See requirejs.org/
// Requires `require`, `define`

require.config({
	baseUrl: './',
	locale: 'en-us',
	paths: {

		// Libraries

		'json2'         : [cdn + 'vendor/json2', s3 + 'vendor/json2', '/vendor/json2'],
		'modernizr'     : [cdn + 'vendor/modernizr-2.6.2.min' , s3 + 'vendor/modernizr-2.6.2.min', '/vendor/modernizr-2.6.2.min'],
		'html5'         : [cdn + 'vendor/html5', s3 + 'vendor/html5', '/vendor/html5'],
		'zepto'         : [cdn + 'vendor/zepto', s3 + 'vendor/zepto', '/vendor/zepto'],
		'mustache'      : [cdn + 'vendor/mustache', s3 + 'vendor/mustache', '/vendor/mustache'],
		'backbone'      : [cdn + 'vendor/backbone', s3 + 'vendor/backbone', '/vendor/backbone'],
		'underscore'    : [cdn + 'vendor/underscore', s3 + 'vendor/underscore', '/vendor/underscore'],
		'jquery'        : [cdn + 'vendor/jquery-2.0.0.min', s3 + 'vendor/jquery-2.0.0.min', '/vendor/jquery-2.0.0.min'],

		// Plugins
		'bootstrap'             : [cdn + 'vendor/plugins/bootstrap', s3 + 'vendor/plugins/bootstrap', '/vendor/plugins/bootstrap'],
		'jquery.pstrength'      : [cdn + 'vendor/plugins/jquery.pstrength-min.1.2', s3 + 'vendor/plugins/jquery.pstrength-min.1.2', '/vendor/plugins/jquery.pstrength-min.1.2'],
		'jqueryui'              : [cdn + 'vendor/plugins/jquery-ui-1.10.2.custom.min', s3 + 'vendor/plugins/jquery-ui-1.10.2.custom.min', '/vendor/plugins/jquery-ui-1.10.2.custom.min'],
		'jquerytimepicker'      : [cdn + 'vendor/plugins/jquery-date-time-picker-1.4', s3 + 'vendor/plugins/jquery-date-time-picker-1.4', '/vendor/plugins/jquery-date-time-picker-1.4'],
		'jquery.jrac'           : [cdn + 'vendor/plugins/jquery.jrac', s3 + 'vendor/plugins/jquery.jrac', '/vendor/plugins/jquery.jrac'],
		'iframe-transport'      : [cdn + 'vendor/plugins/jquery.iframe-transport', s3 + 'vendor/plugins/jquery.iframe-transport', '/vendor/plugins/jquery.iframe-transport'],
		'fileupload'            : [cdn + 'vendor/plugins/jquery.fileupload', s3 + 'vendor/plugins/jquery.fileupload', '/vendor/plugins/jquery.fileupload'],
		'jquery.ui.widget'      : [cdn + 'vendor/plugins/jquery.ui.widget', s3 + 'vendor/plugins/jquery.ui.widget' , '/vendor/plugins/jquery.ui.widget'],
		'jquery.slimscroll'     : [cdn + 'vendor/plugins/jquery.slimscroll.min', s3 + 'vendor/plugins/jquery.slimscroll.min', '/vendor/plugins/jquery.slimscroll.min'],
		'jquery.slimscroll.hor' : [cdn + 'vendor/plugins/jquery.slimscroll.hor', s3 + 'vendor/plugins/jquery.slimscroll.hor' , '/vendor/plugins/jquery.slimscroll.hor'],
//	    'plupload-full'         : [cdn + 'vendor/plugins/plupload.full.min',s3 + 'vendor/plugins/plupload.full.min' ,'/vendor/plugins/plupload.full.min'],
		'plupload'              : [cdn + 'plupload/js/plupload.full', s3 + 'plupload/js/plupload.full' , '/plupload/js/plupload.full'],
//	    'jq.plupload'           : "/plupload/js/jquery.ui.plupload/jquery.ui.plupload",
		'jwplayer'              : "http://s3.amazonaws.com/mikewbucket/jw/jwplayer",

		'custom'                : [cdn + 'vendor/custom', s3 + 'vendor/custom' , '/vendor/custom'],

		// RequireJS
		'domready'              : [cdn + 'vendor/plugins/domReady' , s3 + 'vendor/plugins/domReady', '/vendor/plugins/domReady'],
		'text'                  : [cdn + 'vendor/plugins/text' , s3 + 'vendor/plugins/text' , '/vendor/plugins/text'],

		// Touch events
		'touch'                 : [cdn + 'vendor/plugins/touch', s3 + 'vendor/plugins/touch', '/vendor/plugins/touch'],

		// Create a rotate effect events
		'rotate'                : [cdn + 'vendor/plugins/jQueryRotate', s3 + 'vendor/plugins/jQueryRotate', '/vendor/plugins/jQueryRotate'],

		// load async files
		'async'                 : [cdn + 'vendor/plugins/async', s3 + 'vendor/plugins/async', '/vendor/plugins/async'],


		// Vendor libs, packaged group of common dependencies
		'vendor'                : [cdn + 'vendor', s3 + 'vendor', '/vendor'],

		// Facade references to vendor / library methods
		'facade'                : [cdn + 'facade', s3 + 'facade' , '/facade'],

		// Utilities and libraries
		'utils'                 : [cdn + 'utils' , s3 + 'utils', '/utils'],

		// Backbone syncs depend on both vendor and utils
		'syncs'                 : [cdn + 'syncs', s3 + 'syncs', '/syncs'],

		// Should be used as required dependencies with use of `define`,
		'models'                : [cdn + 'models', s3 + 'models' , '/models'],
		'views'                 : [cdn + 'views', s3 + 'views' , '/views'],

		'collections'           : [cdn + 'collections', s3 + 'collections', '/collections'],
		'controller'            : [cdn + 'controller', s3 + 'controller', '/controller'],

		// Packages
		'packages'          : [cdn + 'packages' , s3 + 'packages' , '/packages'],
		'common'			: [cdn + 'packages/common', s3 + 'packages/common' , '/packages/common'],
		'user'              : [cdn + 'packages/user' , s3 + 'packages/user' , '/packages/user'],
		'media'             : [cdn + 'packages/media', s3 + 'packages/media', '/packages/media'],
		'site'              : [cdn + 'packages/site', s3 + 'packages/site', '/packages/site'],
		'sportorg'          : [cdn + 'packages/sportorg', s3 + 'packages/sportorg', '/packages/sportorg'],
		'location'          : [cdn + 'packages/location', s3 + 'packages/location', '/packages/location'],
		'sport'             : [cdn + 'packages/sport', s3 + 'packages/sport' , '/packages/sport'],
		'votes'             : [cdn + 'packages/vote', s3 + 'packages/vote', '/packages/vote'],
		'roster'            : [cdn + 'packages/roster', s3 + 'packages/roster', '/packages/roster'],
		'schedules'         : [cdn + 'packages/game-schedules', s3 + 'packages/game-schedules', '/packages/game-schedules'],

		// Pages
		'pages'             : [cdn + 'pages', s3 + 'pages', '/pages'],
		'chrome'            : [cdn + 'pages/chrome', s3 + 'pages/chrome', '/pages/chrome'],
		'imageup'           : [cdn + 'pages/imageup', s3 + 'pages/imageup', '/pages/imageup'],
		'videopreview'      : [cdn + 'pages/videopreview', s3 + 'pages/videopreview', '/pages/videopreview'],
		'profile'           : [cdn + 'pages/profile', s3 + 'pages/profile', '/pages/profile'],
		'game'              : [cdn + 'pages/game', s3 + 'pages/game', '/pages/game'],
		'team'              : [cdn + 'pages/team', s3 + 'pages/team', '/pages/team'],
		'registration'      : [cdn + 'pages/registration', s3 + 'pages/registration', '/pages/registration'],
		'signup'            : [cdn + 'pages/signup', s3 + 'pages/signup' , '/pages/signup'],
		'login'             : [cdn + 'pages/login', s3 + 'pages/login', '/pages/login'],
		'home'              : [cdn + 'pages/home', s3 + 'pages/home', '/pages/home'],
		'profilesetting'    : [cdn + 'pages/profilesetting', s3 + 'pages/profilesetting', '/pages/profilesetting'],
		'userresume'        : [cdn + 'pages/userresume', s3 + 'pages/userresume', '/pages/userresume'],

		//user controls
		'usercontrol'       : [cdn + 'usercontrols', s3 + 'usercontrols', '/usercontrols'],
		'add-club'          : [cdn + 'usercontrols/add-club/add-club', s3 + 'usercontrols/add-club/add-club', '/usercontrols/add-club/add-club'],
		'addgame'           : [cdn + 'usercontrols/addgame/addgame', s3 + 'usercontrols/addgame/addgame', '/usercontrols/addgame/addgame'],
		'photo-player'      : [cdn + 'usercontrols/photo-player/photo-player', s3 + 'usercontrols/photo-player/photo-player', '/usercontrols/photo-player/photo-player'],
		'tag'               : [cdn + 'usercontrols/tag/tag', s3 + 'usercontrols/tag/tag', '/usercontrols/tag/tag'],

		// Application - bootstrap for frontend app
		'application'       : [cdn + 'application' , s3 + 'application', '/application']

	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'json2', 'html5', 'jqueryui', 'custom', 'jquerytimepicker'],
			exports: 'Backbone'
		},
		'jquery.slimscroll':{
			deps: ['jquery']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'plupload': {
			deps: ['jquery']
		},
		'jwplayer': {
			deps: ['jquery']
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'jquerytimepicker': {
			deps: ['jquery', 'jqueryui']
		}
	},
	priority: ['text', 'modernizr', 'json2', 'vendor', 'utils', 'facade', 'syncs', 'models', 'views', 'collections', 'controller'],
	jquery: '1.9.0',
	waitSeconds: 60
});

// initializing the router "application" on startup
define([
	'backbone',
	'underscore',
	'jquery',
	//'jqueryui',
	'application'
], function (Backbone, _, $, app) {
		//Backbone.noConflict();
		//apping = new app();
		//Backbone.history.start();
		

		$(function () {


		 // doc ready
			Backbone.noConflict();
			routing = new app();
			App = {};
			routing.ajaxRequests = [];
			routing.intializeImageAndVideo();
			routing.initTriggers();
			// bind common triggers
			Backbone.history.start({});
		});
	}
);

