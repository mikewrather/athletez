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
        'vendor',
    	"imageup/models/basic",
    	"imageup/views/errors"
        ], 
function(require, imageBasicTemplate) {

    var ImageBasicView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        SectionView = views.SectionView,
		ImageBasicModel = require("imageup/models/basic"),
		ErrorDispView = require("imageup/views/errors"),
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;
	debug.log("SectionView: ",SectionView);


    ImageBasicView = SectionView.extend({
	
        id: 'imageuploadForm',

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
			var data = new FormData();
			var msg="";
			if(!$('#image_file').val())
			{
				msg={"msg":"Image Field Empty","color":"red"};
				Channel("imageup-error").publish(msg);	
			}
			else
			{
				jQuery.each($('#image_file')[0].files, function(i, file) {
					data = new FormData();
					data.append('name',file.name);
					data.append('sports_id','46');
					data.append('image_file',file);
					var dataum={"dataum":data,"id":i}
					Channel("imageup-add-image").publish(dataum);
				});
			}

        }	
                
    });


    return ImageBasicView;
});