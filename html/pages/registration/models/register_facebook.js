// register_facebook.js Model
// ------------
// Requires define
// Return {RegistrationFacebookModel} model constructor object

define( ["facade", "user/models/fbreg", "utils"], function (facade, UserFBRegModel, utils) {

    var RegistrationFacebookModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    RegistrationFacebookModel = UserFBRegModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/fbreg';
            return '/api/user/fbreg';
        }
    });

    return RegistrationFacebookModel;
});