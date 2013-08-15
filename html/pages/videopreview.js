// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
	"require",
	"text!videopreview/templates/basic.html",
	"facade",
	"controller",
	"models",
	"views",
	"utils",
	'videopreview/models/base',
	'videopreview/models/videoup',
	'videopreview/views/uploader',
	'videopreview/views/preview'
], function (
	 require,
	 pageLayoutTemplate,
	 facade,
	 Controller,
	 models,
	 views,
	 utils,
	 VideoPreviewModel,
	 VideoUploaderModel,
	 VideoPreviewUploadView,
	 VideoPreviewView) {

	var VideoPreviewController,
		LayoutView = views.LayoutView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		Channel = utils.lib.Channel,
		cssArr = [
			"/pages/imageup/imageup.css"
		];


	VideoPreviewController = Controller.extend({

		initialize: function (options) {

			Channel('load:css').publish(cssArr);

			//this.scheme
			_.bindAll(this);

			this.handleOptions(options);
			this.init(options);

			return this;
		},

		init: function(option) {

			debug.log("VideoPreview Init");

			this.setupLayout();
			this.showVideoPreview();
	//		this.layout.render();

		},

		setupLayout: function ()
		{
			this.scheme=[];
			$('div#modalPopup').remove();
			$('body').append('<div id="modalPopup"></div>');

			pageLayout = new LayoutView({
				scheme: this.scheme,
				destination: "#modalPopup",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout=pageLayout;
			console.log(this.layout);
			return this.layout;

		},
		showVideoPreview: function()
		{
			var vpm = new VideoPreviewModel();
			var VideoPreviewUploadViewInstance = new VideoPreviewUploadView({
				name:"Video Upload View",
				model:vpm,
				destination : "#main-content-img"
			},this.attr);

			Channel("mediaup-add-video").subscribe(this.uploadVideo);

			this.scheme.push(VideoPreviewUploadViewInstance);

			var VideoPreviewViewInstance = new VideoPreviewView({
				name:"Video Preview View",
				model:vpm,
				destination : ".modal-body #preview"
			},this.attr);
			this.scheme.push(VideoPreviewViewInstance);
			this.layout.render();
		},

		uploadVideo: function(file)
		{

			console.log("Called",file);
			var Uploader = new VideoUploaderModel({
				'file':file
			});
			Uploader.doUpload();
		}

	});

	return VideoPreviewController;

});