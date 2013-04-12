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
                return testpath + '/team/addvideo/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/addvideo?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;    
        },
        
        initialize: function (attributes, options) {
            MediaVideoModel.prototype.initialize.call(attributes, options);            
            this.sport_id = attributes.sport_id;
            this.complevel_id = attributes.complevel_id;
            this.season_id = attributes.season_id;
        },
        
        fetchSuccess: function (model, response) {
            MediaVideoModel.prototype.fetchSuccess.call(model, response);
            Channel('addvideo:fetch').publish(model);
        }
        
    });

    return AddVideoModel;
});
