// Profile Preview Model
// -----------
// Requires define
// Return {ProfilePreviewModel} object as constructor  

define(['models/base'], function (BaseModel) {

    var ProfilePreviewModel;

    ProfilePreviewModel = BaseModel.extend({  

        defaults : {
            "userID": 0,
            "userPicture": null,
            "userName": null,
            "teamInfo": {
                "sport": null,
                "position": null,
                "org": null,
                "season": null,
                "year": null
            },
            numVotes: 0,
            numFans: 0
        }  
    });

    return ProfilePreviewModel;
});
