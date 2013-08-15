define([
	'vendor',
	'views',
	'text!videopreview/templates/upload.html'
],
	function (
		vendor,
		views,
		utils
		) {

		var UploadVideoTemplate = require("text!videopreview/templates/upload.html")
			, VideoUploadView
			, $ = vendor.$
			, SectionView = views.SectionView
			, Mustache = vendor.Mustache;


		VideoUploadView = SectionView.extend({

			name: "Video Preview Form View",

			id: "videoPreviewForm",

			template: UploadVideoTemplate,
			data: UploadVideoTemplate,

			events: {
				'change input': 'play',
				"click #videoup": "videoUploadClick"
			},

			initialize: function (options) {
				SectionView.prototype.initialize.call(this, options);
		//		this.setModel(options);

				$('#imgUploadModal').modal('show') ;

				console.log("pv template: ",UploadVideoTemplate);
			},

			play: function(event)
			{
				this.file = event.target.files[0];
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