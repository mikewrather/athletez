// base.js Model
// ------------
// Requires define
// Return {VideoPreviewBaseModel} model constructor object

define(["facade", "models/base"], function (facade, BaseModel) {

	var VideoPreviewBaseModel,
		_ = facade._;

	VideoPreviewBaseModel = BaseModel.extend({
		defaults: _.extend({}, (new BaseModel).attributes, {
			"URL": window.URL || window.webkitURL
		}),

		files: [],

		initialize: function () {
			
			if (!this.URL) {
		/*		this.displayMessage('Your browser is not ' +
					'<a href="http://caniuse.com/bloburls">supported</a>!', true);
				return;
				*/
			}
		},

		playSelectedFile: function(event)
		{
			var file = this.files[0],
				type = file.type,
				videoNode = document.querySelector('video'),
				canPlay = videoNode.canPlayType(type);

			canPlay = canPlay === '' ? 'no' : canPlay;

			var message = 'Can play type "' + type + '": ' + canPlay,
				isError = canPlay === 'no';

			this.displayMessage(message, isError);

			if (isError) {
				return;
			}

			var fileURL = this.URL.createObjectURL(file);

			videoNode.src = fileURL;
		},


	});

	return VideoPreviewBaseModel;
});