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
			base_url + "pages/imageup/imageup.css"
		];


	VideoPreviewController = Controller.extend({

		defaults:{
		uploader:{}
		},
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
			alert("show video preview22");
			//this.uploadVideo();
			//Channel("mediaup-add-video").subscribe(this.uploadVideo());
			var vpm = new VideoUploaderModel();
			//this.uploader = vpm.doUpload();
			//alert("check it out man");
			
			//var vpm = new VideoPreviewModel();
			/*********/
			/*var VideoPreviewViewInstance = new VideoPreviewView({
				name:"Video Preview View",
				model:vpm,
				destination : ".modal-body #preview"
			},this.attr);
			this.scheme.push(VideoPreviewViewInstance);*/
			
			/**********/
			
			
			var VideoPreviewUploadViewInstance = new VideoPreviewUploadView({
				name:"Video Upload View",
				model:vpm,
				destination : "#main-content-img",
				},this.attr);
			alert("before Channel33 ");
			//this.uploadVideo;
			//Channel("mediaup-add-video").subscribe(this.uploadVideo());
			alert("after Channel33 ");
			this.scheme.push(VideoPreviewUploadViewInstance);
			
			alert("after Channel34443 ");
			this.layout.render();
			
			//this.afterRender(vpm);
			//this.testupload(vpm);
		},
		testupload:function(vpm){
		
		},
		afterRender: function(vpm){
		
				alert("before afterrender controller");
				
				//alert("before afterrender2");
				var uploader = vpm.doUpload();
				//alert("showing uploader, watc out");
				//console.log(uploader, "prasobh uploader");
				alert("after afterender controller");
				
				uploader.bind('Init', function (up, params) {
					$('#filelist').html("<div></div>");
				});
				//alert("uploader bind init");
				try{
				uploader.init();
				alert("uploader inited");
				}
				catch(e){
				alert(e +"psb error");
				}
				
				uploader.bind('FilesAdded', function (up, files) {
					maxCountError = false;
					$.each(files, function (i, file) {
						if(uploader.settings.max_file_count && i >= uploader.settings.max_file_count){
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
				
				/************/
				uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + " b").html(file.percent + "%");
				});

				uploader.bind('Error', function (up, err) {
					$('#filelist').append("<div>Error: " + err.code +
						", Message: " + err.message +
						(err.file ? ", File: " + err.file.name : "") +
						"</div>"
					);

					up.refresh(); // Reposition Flash/Silverlight
				}); 
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