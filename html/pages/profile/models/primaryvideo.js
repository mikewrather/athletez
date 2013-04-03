// primaryvideo.js Model
// ------------
// Requires define
// Return {PrimaryVideoModel} model constructor object

define( ["facade", "media/models/video"], function (facade, MediaVideoModel) {

    var PrimaryVideoModel,
        _ = facade._;

    PrimaryVideoModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/primaryvideo/' + this.id;
            return '/api/user/primaryvideo?user_id=' + this.id;
        }
        
    });

    return PrimaryVideoModel;
});

