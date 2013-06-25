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
    "imageup/collections/basics",
    "imageup/views/basic"
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
        ImageBasicList = require("imageup/collections/basics"),
        ImageBasicView = require("imageup/views/basic"),
        
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
			Channel('imageup-add-image').subscribe(imageuploader);
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
			/*$("#image_file").fileupload({
		        dataType: 'json',
				url:'/api/image/add/123',
				type:'POST',
				autoUpload:'false',
				paramName:'image_file[]',
		        done: function (e, data) {
		            $.each(data.result.files, function (index, file) {
		                $('<p/>').text(file.name).appendTo(document.body);
		            });
		        },
				progressall: function (e, data) {
				        var progress = parseInt(data.loaded / data.total * 100, 10);
				        $('#progress .bar').css(
				            'width',
				            progress + '%'
				        );
				    }
		    });*/
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
		imageUpload: function (dataum) {
			debug.log("image uploading starts");
			//imguploadModel= new ImageUploadModel();
			//imguploadModel.save();
			$.ajax({
			    url: '/api/image/add/'+123,
			    data: dataum,
			    cache: false,
			    contentType: 'multipart/form-data',
			    processData: false,
			    type: 'POST',
			    success: function(data){
			        alert(data);
			    }
			});
		}

    });

    return ImageController;
});
