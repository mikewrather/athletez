// header.js Model
// ------------
// Requires define
// Return {ProfileHeaderModel} model constructor object

define( ["facade", "user/models/basics"], function (facade, UserBasicsModel) {

    var ProfileHeaderModel,
        _ = facade._;

    ProfileHeaderModel = UserBasicsModel.extend({
        
        defaults: _.extend({}, (new UserBasicsModel).attributes, {
            "desc": "Header information about the profile page"
        })
        
    });

    return ProfileHeaderModel;
});

