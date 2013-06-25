// basics.js Model
// ------------
// Requires define
// Return {GameBasicsModel} model constructor object

define( ["facade","media/models/image"], function (facade,MediaImageModel) {

    var ImageBasicsModel,
        _ = facade._;

    ImageBasicsModel =  MediaImageModel.extend({
		url: function() {
	            if (testpath)
	                return testpath + '/user/images/' + this.id;
	            return '/api/user/images/' + this.id;
	    },
	    initialize: function (attributes, options) {
			this.id="426004";
            MediaImageModel.prototype.initialize.call(attributes, options);
            this.fetch();
        }
	
	});

    return ImageBasicsModel;
});

