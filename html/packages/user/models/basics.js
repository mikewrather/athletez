// basics.js Model
// ------------
// Requires define
// Return {UserBasicsModel} model constructor object

define(["facade", "models/base"], function (facade, BaseModel) {

	var UserBasicsModel,
		_ = facade._;

	UserBasicsModel = BaseModel.extend({
		url: function () {
			if ('undefined' == typeof this.id) {
				if (testpath)
					return testpath + '/user/basics/425983';
				return '/api/user/basics/';
			} else {
				if (testpath)
					return testpath + '/user/basics/' + this.id;
				return '/api/user/basics/' + this.id;
			}
		},
		initialize: function () {
			UserBasicsModel.__super__.initialize.apply(this, arguments);

		},
		user_pic_small: function()
		{
			return this.payload.user_picture.types.small_thumb.url;
		}
	});

	return UserBasicsModel;
});