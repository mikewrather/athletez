// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
    "require",
    "text!imageup/templates/basic.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
	"jquery.ui.widget",
	"iframe-transport",
	"fileupload",
    "imageup/models/basic",
	"imageup/models/imageupload",
	"imageup/models/errorshow",
    "imageup/collections/basics",
    "imageup/views/basic",
	"imageup/views/errors"
    ], function (require, pageLayoutTemplate) {

    var ImageController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        iframetransport= require("iframe-transport"),
		fileupload= require("fileupload"),
		widget= require("jquery.ui.widget"),
        ImageBasicModel = require("imageup/models/basic"),
		ImageUploadModel = require("imageup/models/imageupload"),
		ErrorShowModel = require("imageup/models/errorshow"),
        ImageBasicList = require("imageup/collections/basics"),
        ImageBasicView = require("imageup/views/basic"),
		ErrorShowView = require("imageup/views/errors"),
        
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/pages/imageup/imageup.css"
        ];

    ImageController = Controller.extend({

        initialize: function (options) {
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

            this.handleOptions(options);
            
            this.init();
            
            return this;
        },
        
        init: function() {
			debug.log("Imagecontroller Init");
            this.setupLayout();
			this.handleDeferreds();
            this.showuploader();            
        }, 
		handleDeferreds : function() {
			var controller = this;
			function imageuploader(dataum) {
				controller.imageUpload(dataum);
			}
			function errorShow(dataum) {
				controller.errorShowup(dataum);
			}
			function previewShow(dataum) {
				controller.previewShowup(dataum);
			}
			Channel('imageup-add-image').subscribe(imageuploader);
			Channel('imageup-error').subscribe(errorShow);
			Channel('imageup-preview').subscribe(previewShow);
		},
        showuploader: function () {
            //this.basics = new ImageBasicModel();
	        debug.log(ImageBasicView);
	        debug.log(ImageBasicModel);
			imgModel= new ImageBasicModel();
            addBasicView = new ImageBasicView({
                name: "Add Media",
				model :imgModel,
				destination : "#main-content"
            });
            debug.log("Imagecontroller Show");
            this.scheme.push(addBasicView);
            this.layout.render();
        },
		setupLayout: function () {
            var pageLayout;
			debug.log("Imagecontroller Layout");
            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "body",
				template : pageLayoutTemplate,
				displayWhen : "ready"
            });
            this.layout = pageLayout;
            return this.layout;
        },
		previewShowup: function (evt) {
			    var files = $('#image_file')[0].files; // FileList object

			    // Loop through the FileList and render image files as thumbnails.
			    for (var i = 0, f; f = files[i]; i++) {

			      // Only process image files.
			      if (!f.type.match('image.*')) {
			        continue;
			      }

			      var reader = new FileReader();

			      // Closure to capture the file information.
			      reader.onload = (function(theFile) {
			        return function(e) {
			          // Render thumbnail.
			          var span = document.createElement('span');
			          span.innerHTML = ['<img class="thumb" src="', e.target.result,
			                            '" title="', escape(theFile.name), '" width="150" height="150"/>'].join('');
			          document.getElementById('preview').insertBefore(span, null);
			        };
			      })(f);

			      // Read in the image file as a data URL.
			      reader.readAsDataURL(f);
			    }
		},
		imageUpload: function (data) {
			debug.log("image uploading starts");
			//imguploadModel= new ImageUploadModel();
			//imguploadModel.save();
			$("#errormsg").hide();
			var id=data.id,
				dataum=data.dataum,
				msg="";
			$.ajax({
			    url: '/api/image/add/',
			    data: dataum,
			    cache: false,
			    processData: false,
				contentType:false,
			    type: 'POST',
			    success: function(data){
					debug.log(data);
					msg={"msg":"File Uploaded Succesfully","color":"green"};
					Channel("imageup-error").publish(msg);
			    },
				error:function(data){
					debug.log(data);
					msg={"msg":data.statusText,"color":"red"};
					Channel("imageup-error").publish(msg);
				}
			});
		},
		errorShowup: function (dataum) {
			debug.log(dataum);
			$("#errormsg").show();
			errorShowModel= new ErrorShowModel(dataum);
            addErrorView = new ErrorShowView({
                name: "File Upload Msg",
				model :errorShowModel,
				destination : "#errormsg"
            });
            debug.log("Error View Show");
            this.scheme.push(addErrorView);
            this.showuploader();
		}

    });

    return ImageController;
});
