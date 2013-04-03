// addvideo.js Model
// ------------
// Requires define
// Return {AddVideoModel} model constructor object

define( ["facade", "media/models/video", "utils"], function (facade, MediaVideoModel, utils) {

    var AddVideoModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    AddVideoModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/addvideo/' + this.id;
            return '/api/game/addvideo?game_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            MediaVideoModel.prototype.initialize.call(attributes, options);            
            //this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            MediaVideoModel.prototype.fetchSuccess.call(model, response);
            Channel('addvideo:fetch').publish(model);
        }
        
    });

    return AddVideoModel;
});

