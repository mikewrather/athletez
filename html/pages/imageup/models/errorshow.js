// errorshow.js Model
// ------------
// Requires define
// Return {ErrorShowModel} model constructor object

define( ["facade","models/base"], function (facade,BaseModel) {

    var ErrorShowModel,
        _ = facade._;

    ErrorShowModel =  BaseModel.extend({
		defaults: _.extend({}, (new BaseModel).attributes, {
                "msg": null,
                "color": "yellow"        }),
	    initialize: function (attributes, options) {
			console.log(attributes);
        }
	
	});

    return ErrorShowModel;
});

