// select_org.js Model
// ------------
// Requires define
// Return {RegistrationSelectOrgModel} model constructor object

define( ["user/models/basics"], function (UserBasicsModel) {

    var RegistrationSelectOrgModel;

    RegistrationSelectOrgModel = UserBasicsModel.extend({

        fetchSuccess: function(model, response) {
            UserBasicsModel.prototype.fetchSuccess.call(this, model, response);
	        console.log("model in select_org", model);
            var dob = new Date(model.get('payload')['dob']);
            var now = new Date();
            var diff = now.getFullYear() - dob.getFullYear();
            if (diff > 18)
                model.set('show_highschool', false);
            else
                model.set('show_highschool', true);
        }
        
    });

    return RegistrationSelectOrgModel;
});

