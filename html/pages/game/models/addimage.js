// addimage.js Model
// ------------
// Requires define
// Return {AddImageModel} model constructor object

define( ["facade", "media/models/image", "utils"], function (facade, MediaImageModel, utils) {

    var AddImageModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    AddImageModel = MediaImageModel.extend({
        
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
            MediaImageModel.prototype.fetchSuccess.call(model, response);
            Channel('addimage:fetch').publish(model);
        }
        
    });

    return AddImageModel;
});

