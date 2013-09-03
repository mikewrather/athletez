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
	 VideoPreviewView
	) {

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

			this.url = option.url
			this.attr = option.attr;
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
		showVideoPreview: function(option)
		{
							
			var vpm = new VideoUploaderModel();
			var that = this;
			
			var VideoPreviewViewInstance = new VideoPreviewView({
				name:"Video Preview View",
				model:vpm,
				destination : ".modal-body #preview"
			},this.attr);
			this.scheme.push(VideoPreviewViewInstance);
			
			
			var VideoPreviewUploadViewInstance = new VideoPreviewUploadView({
				name:"Video Upload View",
				model:vpm,
				destination : "#main-content-img",
				},this.attr);
			
			this.scheme.push(VideoPreviewUploadViewInstance);
			
			this.layout.render();
			
			this.afterRender(vpm);
			
		},
		
		afterRender: function(vpm){
				
				
				// setting up the pluploader property as a model object
				 vpm.uploader = vpm.doUpload(this.url);
				
				
				vpm.uploader.bind('Init', function (up, params) {
					$('#filelist').html("<div></div>");
				});
				
				try{
					vpm.uploader.init();
				
				}
				catch(e){
				alert(e);
				}
				
					vpm.uploader.bind('FilesAdded', function (up, files) {
					maxCountError = false;
					$.each(files, function (i, file) {
						if(vpm.uploader.settings.max_file_count && i >= vpm.uploader.settings.max_file_count){
							maxCountError = true;
							setTimeout(function(){ up.removeFile(file); }, 50);
						}
						else{
							$('#filelist').append(
								'<div id="' + file.id + '">' +
									file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
								'</div>');
						}
						if(maxCountError){
							$('#resultdiv').html("You can only select one video at a time.").show();
						}
					});

					up.refresh(); // Reposition Flash/Silverlight
				});
				
				vpm.uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + " b").html(file.percent + "%");
				});
				vpm.uploader.bind('Error', function (up, err) {
					$('#filelist').append("<div>Error: " + err.code +
						", Message: " + err.message +
						(err.file ? ", File: " + err.file.name : "") +
						"</div>"
					);

					up.refresh(); // Reposition Flash/Silverlight
				});
				
				//vpm.set({uploadermain:"uploader"});
			
					},	
		uploadVideo: function(file)
		{
			alert("inside uploadvideo");
			console.log("Called",file);
			var Uploader = new VideoUploaderModel({
				'file':file
			});
			//Uploader.doUpload();
		}

	});

	return VideoPreviewController;

});