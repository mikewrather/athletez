// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/uploader.html', 
        'facade', 
        'views',
        'utils',
        'vendor'
        ], 
function(require, imageBasicTemplate) {

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
	debug.log("SectionView: ",SectionView);


    ImageBasicView = SectionView.extend({
	
        id: 'main-content',

        events: {
	            "click #imageup": "imageUploadClick"
	    },
	
        template: imageBasicTemplate,
		data :imageBasicTemplate,

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);   
			debug.log("Image upload basic view");   
			debug.log(imageBasicTemplate);                  
        },

        imageUploadClick: function(event) {
            event.preventDefault();
            Channel("imageup-add-image").publish();
        }
                
    });


    return ImageBasicView;
});