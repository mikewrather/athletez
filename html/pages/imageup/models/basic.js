// basics.js Model
// ------------
// Requires define
// Return {GameBasicsModel} model constructor object

define( ["facade","media/models/image"], function (facade,MediaImageModel) {

    var ImageBasicsModel,
        _ = facade._;

    ImageBasicsModel =  MediaImageModel.extend({
	    initialize: function (attributes, options) {
            MediaImageModel.prototype.initialize.call(attributes, options);
        }
	
	});

    return ImageBasicsModel;
});

