// errorshow.js Model
// ------------
// Requires define
// Return {ErrorShowModel} model constructor object

define( ["facade","models/base"], function (facade,BaseModel) {

    var PreviewShowModel,
        _ = facade._;

    PreviewShowModel =  BaseModel.extend({

	    initialize: function (attributes, options) {
        }
	
	});

    return PreviewShowModel;
});

