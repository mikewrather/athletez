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
	                return testpath + '/user/addimage/' + this.id;
	            return '/api/user/addimage?user_id=' + this.id;
	    },
	    initialize: function (attributes, options) {
            MediaImageModel.prototype.initialize.call(attributes, options);
            //this.fetch();
        }
	
	});

    return ImageBasicsModel;
});

