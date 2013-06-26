// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/preview_template.html', 
        'facade', 
        'views',
        'utils',
        'vendor'
        ], 
function(require, previewBasicTemplate) {

    var PreviewBasicView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        SectionView = views.SectionView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;


    PreviewBasicView = SectionView.extend({
	
        id: 'imgpreview',

        template: previewBasicTemplate,

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);   
			debug.log("preview view");                
        }	
                
    });


    return PreviewBasicView;
});