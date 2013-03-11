// primaryvideo.js Model
// ------------
// Requires define
// Return {ProfilePrimaryVideoModel} model constructor object

define( ["facade", "user/models/primaryvideo"], function (facade, UserPrimaryVideoModel) {

    var ProfilePrimaryVideoModel,
        _ = facade._;

    ProfilePrimaryVideoModel = UserPrimaryVideoModel.extend({
        
        defaults: _.extend({}, (new UserPrimaryVideoModel).attributes, {
            "desc": "Primary video information about the profile page"
        })
        
    });

    return ProfilePrimaryVideoModel;
});

