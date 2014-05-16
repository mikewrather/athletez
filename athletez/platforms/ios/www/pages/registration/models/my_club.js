// my_club.js Model
// ------------
// Requires define
// Return {RegistrationFindMyClubModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var RegistrationMyClubModel;

    RegistrationMyClubModel = BaseModel.extend({

        url: function() {
            if (testpath)
                return testpath + '/user/myclub';
	        return '/api/user/basics/'+this.id;
        }
    });

    return RegistrationMyClubModel;
});

