define([
	'vendor',
	'views',
	"facade",
	'videopreview/models/videoup',
	'text!videopreview/templates/upload.html',
	'plupload'
	
],
	function (
		vendor,
		views,
	    facade,
	    videoupmodel
		) {

		var UploadVideoTemplate = require("text!videopreview/templates/upload.html")
			, VideoUploadView
			, $ = vendor.$
			, _ = facade._
			, SectionView = views.SectionView
			, Mustache = vendor.Mustache;


		VideoUploadView = SectionView.extend({

			name: "Video Preview Form View",

			id: "videoPreviewForm",

			template: UploadVideoTemplate,
			data: UploadVideoTemplate,

			events: {
				'change input': 'play',
				//"click #videoup": "videoUploadClick"
				"click #uploadfiles" :"uploadFiles"
			},

			//uploader: {},

			initialize: function (options) {
				SectionView.prototype.initialize.call(this, options);
		//		this.setModel(options);

				_.bindAll(this, 'beforeRender', 'render', 'afterRender');
				var _this = this;
				this.render = _.wrap(this.render, function(render) {
					_this.beforeRender();
					render();
				//	_this.afterRender();
					return _this;
				});

				$('#imgUploadModal').modal('show') ;
//				this.plupInit();
				
			
			},
			
			beforeRender: function() {
				console.log('beforeRender');
			},

			afterRender: function()
			{
				
			},
			uploadFiles : function(e){
						

						// taking referrace of he uploader from model
						
						//this.uploader = this.model.uploader;
						
						console.log(this.uploader,"up");
						
					if($('input#title').val() == '') {
						alert("Please enter a title for this video.");
						return;
					}
					else{
						this.uploader.settings.multipart_params.name = $('input#title').val();
						this.uploader.settings.multipart_params.mm = $('input#mm').is(':checked');
						this.uploader.settings.multipart_params.sports_id = $('select#sports_id').val();
						$('#uploadfiles').addClass('isUploading');
						this.uploader.start();
					}
					e.preventDefault();
			},
			plupInit: function()
			{


			},

			play: function(event)
			{
				this.uploader = this.model.uploader;
				console.log(event,"testevent");
				console.log(this.uploader, "uploader tester");
				//var id = event.target.id;
				console.log($('#'+id),"event id tester");
				this.file = this.uploader.files[0];
				Channel('select-video-preview-change').publish(this.file);
				
			},

			videoUploadClick: function(event)
			{
				console.log("called",this.file);
				event.preventDefault();

				$("#errormsg").hide();
				$("#imageup").attr("disabled", "disabled");

				Channel("mediaup-add-video").publish(this.file);

			}

		});
		return VideoUploadView;
});