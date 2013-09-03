// videoup.js Model
// ------------
// Requires define
// Return {VideoUploaderModel} model constructor object

define(["facade", "models/base"], function (facade, BaseModel) {
	
	var VideoUploaderModel,
		_ = facade._;

	VideoUploaderModel = BaseModel.extend({
		
		

		initialize: function(options)
		{
			//this.file = options.file;
			//this.url = options.url;
			//this.url = '/api/user/addvideo/425983';

			//console.log(new plupload.Uploader());
			
			//this.doUpload();	
		},

		
		doUpload: function(attribute){
			
			return new plupload.Uploader({
					runtimes:'gears,html5,flash,silverlight,browserplus',
					browse_button:'pickfiles',
					container:'container_plupload',
					max_file_size:'500mb',
					max_file_count:1,
					chunk_size:'5mb',
					url:attribute,
					unique_names:true,
					flash_swf_url:'/plupload/js/plupload.flash.swf',
					silverlight_xap_url:'/plupload/js/plupload.silverlight.xap',
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
							if(result.result == 'success')
							{
								$('#resultdiv').html("SUCCESS! Your video has been uploaded and is now being encoded.  This may take a few minutes.  You will receive an email when the video is ready to view.  If anything goes wrong you can refer to the encode job ID: " + result.jobID).show();
							}
							console.log(file,info);
						}
					}
				});
		}

	
	});
	return VideoUploaderModel;
});