// addvideo.js Model
// ------------
// Requires define
// Return {AddVideoModel} model constructor object

define( ["facade", "media/models/video", "utils"], function (facade, MediaVideoModel, utils) {

    var ProfileAddVideoModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileAddVideoModel = MediaVideoModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/addvideo/' + this.id + '/' + this.sport_id;
            return '/api/user/addvideo?team_id=' + this.id + '&sport_id=' + this.sport_id;    
        },
        
        initialize: function (attributes, options) {
            MediaVideoModel.prototype.initialize.call(attributes, options);            
            this.sport_id = attributes.sport_id;
        },
        
        fetchSuccess: function (model, response) {
            MediaVideoModel.prototype.fetchSuccess.call(model, response);
            Channel('gameaddvideo:fetch').publish(model);
        }
        
    });

    return ProfileAddVideoModel;
});