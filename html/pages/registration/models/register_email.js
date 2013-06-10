// register_email.js Model
// ------------
// Requires define
// Return {RegistrationEmailModel} model constructor object

define( ["user/models/basics"], function (UserBasicsModel) {

    var RegistrationEmailModel;

    RegistrationEmailModel = UserBasicsModel.extend({

        url: function() {
            if (testpath)
                return testpath + '/user/basics';
            return '/api/user/basics/'+this.id;
        }

    });

    return RegistrationEmailModel;
});

