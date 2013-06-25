// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/error_template.html', 
        'facade', 
        'views',
        'utils',
        'vendor'
        ], 
function(require, errorBasicTemplate) {

    var ImageBasicView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        SectionView = views.SectionView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;


    ImageBasicView = SectionView.extend({
	
        id: 'main-content',

	
        template: errorBasicTemplate,

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);   
			debug.log("error view");                
        }	
                
    });


    return ImageBasicView;
});