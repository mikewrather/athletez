define([
	'vendor',
	'views',
	"facade",
	'text!videopreview/templates/upload.html',
	'plupload'
],
	function (
		vendor,
		views,
	    facade
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
				"click #videoup": "videoUploadClick"
			},

			uploader: {},

			initialize: function (options) {
				SectionView.prototype.initialize.call(this, options);
		//		this.setModel(options);

				_.bindAll(this, 'beforeRender', 'render', 'afterRender');
				var _this = this;
				this.render = _.wrap(this.render, function(render) {
					_this.beforeRender();
					render();
					_this.afterRender();
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

				console.log(this.$('#pickfiles')[0]);

				console.log("called afterRender");

				this.uploader = new plupload.Uploader({
					runtimes:'gears,html5,flash,silverlight,browserplus',
					browse_button:this.$('#pickfiles')[0],
					max_file_size:'500mb',
					max_file_count:1,
					chunk_size:'5mb',
					url:'/api/user/addvideo/425983',
					unique_names:true,
					flash_swf_url:'/vendor/plugins/Moxie.swf',
					silverlight_xap_url:'/vendor/plugins/Moxie.xap',
					filters:[
						{title:"Video files", extensions:"mov,mp4,mpeg4,avi,mkv,webm,ogg"}
					],
					multipart_params:{title:''}

				});
				console.log(this.uploader);

				this.uploader.bind('Init', function(up, params) {
					console.log("uploader initialized",up,params);
					this.$('#filelist').html(up.runtime);
				});

				try{
					this.uploader.init();
				//	console.log(this.$('#pickfiles').trigger());
				} catch (err) {
					console.log(err);
				}



			},

			plupInit: function()
			{


			},

			play: function(event)
			{
				this.file = event.target.files[0];
				Channel('select-video-preview-change').publish(this.file);
				console.log(this.uploader);
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