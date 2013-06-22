// select_type.js Model
// ------------
// Requires define
// Return {RegistrationSelectTypeModel} model constructor object

define( ["user/models/basics"], function (UserBasicsModel) {

    var RegistrationSelectTypeModel;

    RegistrationSelectTypeModel = UserBasicsModel.extend({
	    url: function(){
		    return '/api/user/basics/' + this.id;
	    },

	    fetchSuccess: function(model, response) {
		    UserBasicsModel.prototype.fetchSuccess.call(this, model, response);
		}
    });

    return RegistrationSelectTypeModel;
});

