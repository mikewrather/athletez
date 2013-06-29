// imageupload.js Model
// ------------
// Requires define
// Return {ImageUploadModel} model constructor object

define( ["facade","media/models/image"], function (facade,MediaImageModel) {

    var ImageBasicsModel,
        _ = facade._;

    ImageUploadModel =  MediaImageModel.extend({
	    initialize: function (attributes, options) {
            MediaImageModel.prototype.initialize.call(attributes, options);
        }
	
	});

    return ImageBasicsModel;
});

