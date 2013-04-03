// videoplayer.js Model
// ------------
// Requires define
// Return {VideoPlayerModel} model constructor object

define( ["facade", "media/models/video"], function (facade, MediaVideoModel) {

    var VideoPlayerModel,
        _ = facade._;

    VideoPlayerModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/videoplayer/' + this.id;
            return '/api/game/videoplayer?game_id=' + this.id;
        }
        
    });

    return VideoPlayerModel;
});

