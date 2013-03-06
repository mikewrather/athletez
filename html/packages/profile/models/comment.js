// Profile Comment Model
// -----------
// Requires define
// Return {ProfileCommentModel} object as constructor  

define( ["facade", "models/base"], function (facade, BaseModel) {

    var ProfileCommentModel,
        _ = facade._;

    ProfileCommentModel = BaseModel.extend({  

        defaults : {
            "userID": 0,
            "userName": null,
            "commentDate": null,
            "comment": null
        }  
    });

    return ProfileCommentModel;
});
