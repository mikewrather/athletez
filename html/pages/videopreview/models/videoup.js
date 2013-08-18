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
			this.file = options.file;
			this.url = options.url;
			this.url = '/api/user/addvideo/425983';

			console.log(new plupload.Uploader());
		},

		doUpload: function()
		{
			var uploader = new plupload.Uploader({
			//	runtimes : 'gears,html5,flash,silverlight,browserplus',
			//	max_file_size : '500mb',
				url : '/api/user/addvideo/425983',
				browse_button : '#chooseVideoFile'
			//	filters : [
			//		{title:"Video files", extensions:"mov,mp4,mpeg4,avi,mkv,webm,ogg"}
			//	]
			});

			console.log(uploader);

			uploader.init();

			try{
				uploader.init();
				console.log("here");
			} catch(err){
				console.log(err);
			}

			var pFile = new plupload.File(this.file);

			console.log("File We're adding:",pFile);
			uploader.addFile(pFile);


			console.log(uploader);

			uploader.bind('FilesAdded', function (up, files) {
				console.log("Filesadded",up,files);
				up.refresh(); // Reposition Flash/Silverlight
			});

			uploader.bind('Error', function (up, err) {
				console.log("ERROR",up,err);
				up.refresh(); // Reposition Flash/Silverlight
			});

			uploader.bind('PostInit', function(up){
				console.log("Initialized!",up);
				try{
					console.log(uploader);
					console.log(up);
					uploader.start();
				} catch(err) {
					console.log(err);
				}
			});

			uploader.bind('ChunkUploaded', function(up,file,info){
				console.log(file,info);
			});

			uploader.bind('FileUploaded', function(up,file,info){
				console.log(up,file,info)
			});

		}
	});
	return VideoUploaderModel;
});