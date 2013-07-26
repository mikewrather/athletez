// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
    "require",
    "text!imageup/templates/basic.html",
	"text!imageup/templates/uploader.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    "imageup/models/basic",
	"imageup/models/imageupload",
	"imageup/models/errorshow",
    "imageup/collections/basics",
	"imageup/models/preview",
    "imageup/views/basic",
	"imageup/views/errors",
	"imageup/views/preview"
    ], function (require, pageLayoutTemplate) {

    var ImageController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        ImageBasicModel = require("imageup/models/basic"),
		ImageUploadModel = require("imageup/models/imageupload"),
		ErrorShowModel = require("imageup/models/errorshow"),
        ImageBasicList = require("imageup/collections/basics"),
		PreviewShowList = require("imageup/models/preview"),
        ImageBasicView = require("imageup/views/basic"),
		ErrorShowView = require("imageup/views/errors"),
		PreviewShowView = require("imageup/views/preview"),
        
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
            this.init(options);
            
            return this;
        },
        
        init: function(option) {
			this.url=option.url;
			this.attr=option.attr;
			this.count=0;
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
			function msgShow(dataum) {
				controller.msgShowup(dataum);
			}
			function previewShow(dataum) {
				controller.previewShowup(dataum);
			}
			function rerenderShow() {
				controller.rerender();
			}
			
			Channel('imageup-add-image').subscribe(imageuploader);
			Channel('imageup-msg').subscribe(msgShow);
			Channel('imageup-preview').subscribe(previewShow);
			Channel('imageup-rerender').subscribe(rerenderShow);
		},
        showuploader: function () {
            //this.basics = new ImageBasicModel();
			imgModel= new ImageBasicModel();
            addBasicView = new ImageBasicView({
                name: "Add Media",
				model :imgModel,
				destination : "#main-content-img"
            },this.attr);
            debug.log("Imagecontroller Show");
            this.scheme.push(addBasicView);
			console.log(this.scheme);
            this.layout.render();
        },
		setupLayout: function () {
            var pageLayout;
			debug.log("Imagecontroller Layout");
			this.scheme=[];
            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
				template : pageLayoutTemplate,
				displayWhen : "ready"
            });
            this.layout=pageLayout;
            return this.layout;
        },
		previewShowup: function (dataum) {
			var previewShowList = new PreviewShowList(dataum);
			for( var x in this.scheme) {
			    if( this.scheme[x].id=="imgpreview") delete this.scheme[x];
			}
		    previewShowView = new PreviewShowView({
		                name: "Preview Show View",
						model :previewShowList,
						destination : "#preview",
						displayWhen : "ready"
		            });
		    debug.log("Preview View Show");
			this.scheme.push(previewShowView);
			$("#preview").show();
		    Channel("imageup-rerender").publish();		  
		},
		rerender: function(){
			    this.showuploader();	
		},
		imageUpload: function (data) {
			debug.log(data);
			debug.log("image uploading starts");
			var id=data.id,
				length=data.len,
				dataum= [],
				msg="",thiss=this,
				dataum=data.dataum;

			//url gets set
			this.url="/api/"+$("#url_tag").val()+"/addimage/"+$("#id_tag").val();

			$("#preview_"+id).html("<progress></progress>")
			$.ajax({
			    url: this.url,
			    data: dataum,
			    cache: false,
			    processData: false,
				contentType:false,
			    type: 'POST',
			    success: function(data){
					$("#preview_"+id).fadeOut("slow");
					$("#preview_"+id+"rot").fadeOut("slow");
					debug.log(data);
					$("imageup").attr("disabled", "disabled");
					thiss.count=thiss.count+1;
					if(thiss.count == length)
					{
						msg={"msg":" File Uploaded Succesfully","color":"alert-success"};
						Channel("imageup-msg").publish(msg);
						$("#imageup").removeAttr("disabled");
						$("#image_file").removeAttr("disabled");
						$(".closepreview").removeAttr("disabled");	
					}
			    },
				error:function(data){
					$("#preview_"+id).fadeOut("slow");
					$("#preview_"+id).fadeIn("slow").html("<b>Upload Error!</b>");
					debug.log(data);
						msg={"msg":data.statusText,"color":"alert-error"};
						Channel("imageup-msg").publish(msg);
						$("#imageup").removeAttr("disabled");
						$("#image_file").removeAttr("disabled");
						$(".closepreview").removeAttr("disabled");
						return;
				}
			});
		},
		msgShowup: function (dataum) {
			for( var x in this.scheme) {
			    if( this.scheme[x].destination=="#errormsg") delete this.scheme[x];
			}
			errorShowModel= new ErrorShowModel(dataum);
            addErrorView = new ErrorShowView({
                name: "File Upload Msg",
				model :errorShowModel,
				destination : "#errormsg",
				displayWhen: "ready"
            });
            debug.log("Error View Show");
            this.scheme.push(addErrorView);
			$("#errormsg").show();
			Channel("imageup-rerender").publish();	
		}

    });

    return ImageController;
});
