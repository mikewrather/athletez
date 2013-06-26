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
	            "click #imageup": "imageUploadClick",
				"change #image_file" : "imagePreview"
	    },
	
        template: imageBasicTemplate,
		data :imageBasicTemplate,

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);   
			debug.log("Image upload basic view");   
			debug.log(imageBasicTemplate);                  
        },
		imagePreview: function(event) {
			debug.log("Image preview view");
			Channel("imageup-preview").publish(event);
		},
        imageUploadClick: function(event) {
            event.preventDefault();
			var msg="";
			if(!$('#image_file').val())
			{
				msg={"msg":"Image Field Empty","color":"red"};
				Channel("imageup-error").publish(msg);	
			}
			else
			{
				var data = new FormData();
				jQuery.each($('#image_file')[0].files, function(i, file) {
					data.append('image_file',file);
				});
				data.append('name',"testimg");
				data.append('sports_id','46');
				var dataum={"dataum":data,"id":"0"}
				Channel("imageup-add-image").publish(dataum);
			}

        }	
                
    });


    return ImageBasicView;
});