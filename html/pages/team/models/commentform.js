// comment-form.js Model
// ------------
// Requires define
// Return {TeamCommentFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var TeamCommentFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamCommentFormModel = SiteCommentModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/commentform/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/commentform?game_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;         
        },
        
        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options); 
            this.sport_id = attributes.sport_id;
            this.complevel_id = attributes.complevel_id;
            this.season_id = attributes.season_id;           
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('teamcommentform:fetch').publish(model);
        }
        
    });

    return TeamCommentFormModel;
});

