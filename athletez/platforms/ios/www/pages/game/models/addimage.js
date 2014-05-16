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
                return testpath + '/game/addimage/' + this.id;
            return '/api/game/addimage?game_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            MediaImageModel.prototype.initialize.call(attributes, options);
            //this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            MediaImageModel.prototype.fetchSuccess.call(this, model, response);
            Channel('gameaddimage:fetch').publish(model);
        }
        
    });

    return GameAddImageModel;
});

