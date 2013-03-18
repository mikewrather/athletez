// primaryvideo.js Model
// ------------
// Requires define
// Return {ProfilePrimaryVideoModel} model constructor object

define( ["facade", "media/models/video"], function (facade, MediaVideoModel) {

    var ProfilePrimaryVideoModel,
        _ = facade._;

    ProfilePrimaryVideoModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/primaryvideo/' + this.id;
            return '/api/user/primaryvideo?user_id=' + this.id;
        }
        
    });

    return ProfilePrimaryVideoModel;
});

