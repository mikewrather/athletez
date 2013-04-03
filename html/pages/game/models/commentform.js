// comment-form.js Model
// ------------
// Requires define
// Return {CommentFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var CommentFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    CommentFormModel = SiteCommentModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/commentform/' + this.id;
            return '/api/game/commentform?game_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options);            
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('commentform:fetch').publish(model);
        }
        
    });

    return CommentFormModel;
});

