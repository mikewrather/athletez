// videoplayer.js Model
// ------------
// Requires define
// Return {GameVideoPlayerModel} model constructor object

define( ["facade", "media/models/video"], function (facade, MediaVideoModel) {

    var GameVideoPlayerModel,
        _ = facade._;

    GameVideoPlayerModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/videoplayer/' + this.id;
            return '/api/game/videoplayer?user_id=' + this.id;
        }
        
    });

    return GameVideoPlayerModel;
});

