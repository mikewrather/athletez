// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define(["require", "text!imageup/templates/basic.html", "text!imageup/templates/uploader.html", "facade", "controller", "models", "views", "utils", "imageup/models/basic", "imageup/models/imageupload", "imageup/models/errorshow", "imageup/collections/basics", "imageup/models/preview", "imageup/views/basic", "imageup/views/errors", "imageup/views/preview"], function(require, pageLayoutTemplate) {

	var ImageController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"), ImageBasicModel = require("imageup/models/basic"), ImageUploadModel = require("imageup/models/imageupload"), ErrorShowModel = require("imageup/models/errorshow"), ImageBasicList = require("imageup/collections/basics"), PreviewShowList = require("imageup/models/preview"), ImageBasicView = require("imageup/views/basic"), ErrorShowView = require("imageup/views/errors"), PreviewShowView = require("imageup/views/preview"), LayoutView = views.LayoutView, $ = facade.$, _ = facade._, debug = utils.debug, Channel = utils.lib.Channel,
		cssArr = [base_url + "pages/imageup/imageup.css"];

	ImageController = Controller.extend({

		initialize : function(options) {
			console.error(options);
			Channel('load:css').publish(cssArr);
			_.bindAll(this);
			this.scheme = [];
			this.handleOptions(options);
			this.init(options);
			return this;
		},

		init : function(option) {
			this.url = option.url;
			this.attr = option.attr;
			this.data = option.data;
			this.count = 0;
			this.setupLayout();
			this.handleDeferreds();
			this.showuploader();
			if (this.data)
				this.showPreviewDropImage();
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


			routing.off('imageup-add-image');
			routing.on('imageup-add-image', function(param) {
				imageuploader(param);
			});

			routing.off('imageup-msg');
			routing.on('imageup-msg', function(param) {
				msgShow(param);
			});

			routing.off('imageup-preview');
			routing.on('imageup-preview', function(param) {
				console.log("this is");
				previewShow(param);
			});

			routing.off('imageup-rerender');
			routing.on('imageup-rerender', function(param) {
				rerenderShow(param);
			});
		},

		showuploader : function() {

			var addBasicView = new ImageBasicView({
				scheme : this.scheme,
				layout : this.layout,
				name : "Add Media",
				dropedImage : this.data,
				model : new ImageBasicModel(),
				destination : "#left_upload"
			}, this.attr);
			this.scheme.push(addBasicView);
			this.layout.render();
		},

		setupLayout : function() {
			var pageLayout;
			this.scheme = [];
			$(".model-popup-h").remove();
			$('body').append('<div id="modalPopup" class="model-popup-h"></div>');
			pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalPopup",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout = pageLayout;
			return this.layout;
		},

		previewShowup : function(dataum) {
			var previewShowList = new PreviewShowList(dataum);
			for (var x in this.scheme) {
				if (this.scheme[x].id == "imgpreview")
					delete this.scheme[x];
			}
			console.error(dataum);
			previewShowView = new PreviewShowView({
				scheme : this.scheme,
				layout : this.layout,
				name : "Preview Show View",
				model : previewShowList,
				ImageIndex: dataum.ImageIndex,
				filesUploader: dataum.filesUploader,
				destination : "#preview",
				displayWhen : "ready"
			});
			this.scheme.push(previewShowView);
			$("#preview").show();
			routing.trigger("imageup-rerender");
		},
		rerender : function() {
			this.showuploader();
		},

		showPreviewDropImage : function() {
			if (this.data)
				routing.trigger('imageup-preview', this.data);
		},

		imageUpload : function(data) {
			var id = data.id,
				length = data.len,
				dataum = [],
				msg = "",
				thiss = this,
				dataum = data.dataum;

			console.log(data);

			$("#preview_" + id).addClass("image_upload_loader_new");
			$(".previewimgsrc").addClass('fade-out');
			$.ajax({
				url : this.url,
				data : dataum,
				cache : false,
				processData : false,
				contentType : false,
				type : 'POST',
				success : function(data) {
					$("#preview_" + id).fadeOut("slow");
					$("#preview_" + id + "rot").fadeOut("slow");
					routing.trigger("image-upload-success", data);
					$("imageup").attr("disabled", "disabled");
					thiss.count++;
					if (thiss.count == length) {
						msg = {
							"msg" : " File Uploaded Succesfully",
							"color" : "alert-success"
						};
						routing.trigger("imageup-msg", msg);
						$("#imageup").removeAttr("disabled");
						$("#image_file").removeAttr("disabled");
						$(".closepreview").removeAttr("disabled");
						$("#imgUploadModal, .modal-backdrop").unbind().remove();							
					}
					$("#preview_" + id).unbind().removeClass("image_upload_loader_new").html("").attr("disabled", "disabled");
				},
				error : function(data) {
					$("#preview_" + id).fadeOut("slow");
					$(".previewimgsrc").removeClass('fade-out');
					$("#preview_" + id).fadeIn("slow").html("<b>Upload Error!</b>");
					debug.log(data);
					msg = {
						"msg" : data.statusText,
						"color" : "alert-error"
					};
					routing.trigger("imageup-msg", msg);
					$("#imageup").removeAttr("disabled");
					$("#image_file").removeAttr("disabled");
					$(".closepreview").removeAttr("disabled");
					return;
				}
			});
		},
		msgShowup : function(dataum) {
			for (var x in this.scheme) {
				if (this.scheme[x].destination == "#errormsg")
					delete this.scheme[x];
			}

			errorShowModel = new ErrorShowModel(dataum);
			addErrorView = new ErrorShowView({
				name : "File Upload Msg",
				model : errorShowModel,
				destination : "#errormsg",
				displayWhen : "ready"
			});

			this.scheme.push(addErrorView);
			$("#errormsg").show();
			routing.trigger("imageup-rerender");
		}
	});

	return ImageController;
});
