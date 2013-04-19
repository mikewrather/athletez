// addimage.js Model
// ------------
// Requires define
// Return {TeamAddImageModel} model constructor object

define( ["facade", "media/models/image", "utils"], function (facade, MediaImageModel, utils) {

    var TeamAddImageModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamAddImageModel = MediaImageModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/addimage/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/addimage?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;    
        },
        
        initialize: function (attributes, options) {
            MediaImageModel.prototype.initialize.call(attributes, options);            
            this.sport_id = attributes.sport_id;
            this.complevel_id = attributes.complevel_id;
            this.season_id = attributes.season_id;
        },
        
        fetchSuccess: function (model, response) {
            MediaImageModel.prototype.fetchSuccess.call(model, response);
            Channel('teamaddimage:fetch').publish(model);
        }
        
    });

    return TeamAddImageModel;
});

