// basics.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "user/models/basics"], function (facade, UserBasicsModel) {

	var ProfileBasicsModel,
		_ = facade._;

	ProfileBasicsModel = UserBasicsModel.extend({

	});

	return ProfileBasicsModel;
});

