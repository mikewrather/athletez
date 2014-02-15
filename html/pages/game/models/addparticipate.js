// addimage.js Model
// ------------
// Requires define
// Return {GameAddImageModel} model constructor object

define( ["facade", "media/models/image", "utils"], function (facade, MediaImageModel, utils) {

    var GameAddImageModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameAddImageModel = MediaImageModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/uslgamelink/add/';
            return '/api/uslgamelink/add/';
        },

        
    });

    return GameAddImageModel;
});

