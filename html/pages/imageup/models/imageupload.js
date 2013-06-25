// imageupload.js Model
// ------------
// Requires define
// Return {ImageUploadModel} model constructor object

define( ["facade","media/models/image"], function (facade,MediaImageModel) {

    var ImageBasicsModel,
        _ = facade._;

    ImageUploadModel =  MediaImageModel.extend({
		url: function() {
	            if (testpath)
	                return testpath + '/image/add/' + this.images_id;
	            return '/api/image/add/' + this.images_id;
	    },
	    initialize: function (attributes, options) {
			this.user_id="426004";
			this.images_id="426004";
			this.sports_id="46";
            MediaImageModel.prototype.initialize.call(attributes, options);
        }
	
	});

    return ImageBasicsModel;
});

