// Profile Video Model
// -----------
// Requires define
// Return {ProfileVideoModel} object as constructor  

define(['models/base'], function (BaseModel) {

    var ProfileVideoModel;

    ProfileVideoModel = BaseModel.extend({  

        defaults : {
            "userID": 0,
            "quality": null,
            "largeThumb": null,
            "title": null,
            "teamAssociation": null,
            "gameAssociation": null,
            "numVotes": 0,
            "numViews": 0,
            "numComments": 0
        }  
    });

    return ProfileVideoModel;
});
