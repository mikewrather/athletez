// main.js
// ------- 
// See requirejs.org/
// Requires `require`, `define`

require.config({
    baseUrl: './',
    locale: 'en-us',
    paths: {

        // Libraries

        'json2'        : '/vendor/json2',
        'modernizr'    : '/vendor/modernizr-2.6.2.min',
        'html5'        : '/vendor/html5',
        'zepto'        : '/vendor/zepto',
        'mustache'     : '/vendor/mustache',
        'backbone'     : '/vendor/backbone',
		'underscore'   : '/vendor/underscore',
		'jquery'       : '/vendor/jquery-2.0.0.min',	
        // Plugins
        'bootstrap'    : '/vendor/plugins/bootstrap',
        'jquery.pstrength' : '/vendor/plugins/jquery.pstrength-min.1.2',
        'jqueryui'     : '/vendor/plugins/jquery-ui-1.10.2.custom.min',
        'jquery.jrac'  : '/vendor/plugins/jquery.jrac',
		'iframe-transport' : '/vendor/plugins/jquery.iframe-transport',
		'fileupload'   :'/vendor/plugins/jquery.fileupload',
		'jquery.ui.widget'	:'/vendor/plugins/jquery.ui.widget',
        'jquery.slimscroll' : '/vendor/plugins/jquery.slimscroll.min',
//	    'plupload-full'          : '/vendor/plugins/plupload.full.min',
	    'plupload'          : '/plupload/js/plupload.full',
//	    'jq.plupload'       : "/plupload/js/jquery.ui.plupload/jquery.ui.plupload",
        
        'custom'       : '/vendor/custom',

        // RequireJS
        'domready'     : '/vendor/plugins/domReady',
        'text'         : '/vendor/plugins/text',

        // Touch events
        'touch'        : '/vendor/plugins/touch',

		// Create a rotate effect events
        'rotate'        : '/vendor/plugins/jQueryRotate',
		

        // Vendor libs, packaged group of common dependencies
        'vendor'       : '/vendor',

        // Facade references to vendor / library methods
        'facade'       : '/facade',

        // Utilities and libraries
        'utils'        : '/utils',

        // Backbone syncs depend on both vendor and utils
        'syncs'        : '/syncs',

        // Should be used as required dependencies with use of `define`, 
        'models'       : '/models',
        'views'        : '/views',
        
        'collections'  : '/collections',
        'controller'   : '/controller',

        // Packages
        'packages'     : '/packages',
        'user'         : '/packages/user',
        'media'        : '/packages/media',
        'site'         : '/packages/site',
        'sportorg'     : '/packages/sportorg',
        'location'     : '/packages/location',
        'sport'        : '/packages/sport',
	
        
        // Pages

        'pages'        : '/pages',
        'chrome'       : '/pages/chrome',
		'imageup'      : '/pages/imageup',
	    'videopreview' : '/pages/videopreview',
        'profile'      : '/pages/profile',
        'game'         : '/pages/game',
        'team'         : '/pages/team',
        'registration' : '/pages/registration',
        'home'         : '/pages/home',
        'profilesetting' : '/pages/profilesetting',
        'userresume' : '/pages/userresume',

        // Application - bootstrap for frontend app 
        'application'  : '/application'

    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'json2', 'html5', 'jqueryui', 'custom'],
            exports: 'Backbone'
        },
	    'bootstrap': {
		    deps: ['jquery']
	    },
	    'plupload': {
		    deps: ['jquery']
	    }

    },
    priority: ['text', 'modernizr', 'json2', 'vendor', 'utils', 'facade', 'syncs', 'models', 'views', 'collections', 'controller'],
    jquery: '1.9.0',
    waitSeconds: 30
});

// initializing the router "application" on startup
define([
	'backbone',
	'underscore',
	'jquery',
	'application'
	], function(Backbone, _, $,app){
		 	//Backbone.noConflict();
			//apping = new app();
			//Backbone.history.start();
			$(function () { // doc ready
				Backbone.noConflict();
				routing = new app();
				Backbone.history.start({});
            });
		}
);

