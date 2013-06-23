// select_org.js Model
// ------------
// Requires define
// Return {RegistrationSelectOrgModel} model constructor object

define( ["user/models/basics"], function (UserBasicsModel) {

    var HighSchoolModel;

    HighSchoolModel = UserBasicsModel.extend({

        fetchSuccess: function(model, response) {
            UserBasicsModel.prototype.fetchSuccess.call(this, model, response);
            var dob = new Date(model.get('payload')['dob']);
            var now = new Date();
            var diff = now.getFullYear() - dob.getFullYear();
            if (diff > 18)
                model.set('show_highschool', false);
            else
                model.set('show_highschool', true);
        }
        
    });

    return HighSchoolModel;
});

