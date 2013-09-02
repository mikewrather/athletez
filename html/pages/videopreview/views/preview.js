define([
	'vendor',
	'views',
	'utils',
	'text!videopreview/templates/preview.html'
],
	function (
		vendor,
		views,
		utils
		) {

		var PreviewVideoTemplate = require("text!videopreview/templates/preview.html")
			, VideoPreviewView
			, $ = vendor.$
			, SectionView = views.SectionView;


		console.log(SectionView);
		VideoPreviewView = SectionView.extend({

			name: "Video Preview View",

			id: "videoPreviewWindow",

			template: PreviewVideoTemplate,
			data: PreviewVideoTemplate,

			initialize: function (options) {
				SectionView.prototype.initialize.call(this, options);

				Channel('select-video-preview-change').subscribe(this.changeVideo);
			},

			changeVideo: function(file)
			{
				
				URL = window.URL;
				alert("this is url"+ URL);
				console.log(URL,"url");
				console.log(file, "test file in change video");
				//var fileURL = URL.createObjectURL(file);
				//alert(fileURL+ "test");
				//document.querySelector(this.$el.selector + ' video').src = fileURL;
			},

			displayMessage: function (message,isError)
			{
				var node = this.$el.find('.message');
				node.html(message);
				node.className = isError ? 'error' : 'info';
			}
		});
		return VideoPreviewView;

	});