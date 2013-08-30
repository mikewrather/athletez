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
				//alert("before afterrender");
				//var uploader = videoupmodel.doUpload();
				//alert("after afterender");

			/*

				alert("after render");
				console.log(this.$('#pickfiles').html() +"psbh testst");
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
					multipart_params:{title:''},
					init : {
						ChunkUploaded : function(up,file,info){
							console.log(file,info);
						},
						FileUploaded : function(up,file,info){
							$('#' + file.id + " b").html("100%");
							$('#uploadfiles').removeClass('isUploading');
							up.refresh();
							$('form.form input').val('');
							var result = $.parseJSON(info.response);
							console.log(result);
							if(result.result == 'success'){
									$('#resultdiv').html("SUCCESS! Your video has been uploaded and is now being encoded.  This may take a few minutes.  You will receive an email when the video is ready to view.  If anything goes wrong you can refer to the encode job ID: " + result.jobID).show();
							}
							console.log(file,info);
						}
					}

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
				this.uploader.bind('FilesAdded', function (up, files) {
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

				this.uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + " b").html(file.percent + "%");
				});

				this.uploader.bind('Error', function (up, err) {
					$('#filelist').append("<div>Error: " + err.code +
						", Message: " + err.message +
						(err.file ? ", File: " + err.file.name : "") +
						"</div>"
					);

					up.refresh(); // Reposition Flash/Silverlight
				});

			*/
			},
			uploadFiles : function(e){
						this.uploader= window.uploader;
						console.log(window.uploader,"pluploader1234");
						
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
				console.log(event.target.id,"prasobh");
				var id = event.target.id;
				console.log($('#'+id));
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