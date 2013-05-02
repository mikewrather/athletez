// upload_image.js Model
// ------------
// Requires define
// Return {RegistrationUploadImageModel} model constructor object

define( ["user/models/basics"], function (UserBasicsModel) {

    var RegistrationUploadImageModel;

    RegistrationUploadImageModel = UserBasicsModel.extend({

        url: function() {
            if (testpath)
                return testpath + '/user/uploadimage';
            return '/api/user/uploadimage';
        }

    });

    return RegistrationUploadImageModel;
});

