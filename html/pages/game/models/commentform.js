// comment-form.js Model
// ------------
// Requires define
// Return {GameCommentFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var GameCommentFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameCommentFormModel = SiteCommentModel.extend({
	    defaults: {
		     payload: {}
	    },
        
        url: function() {
            if (testpath)
                return testpath + '/game/commentform/' + this.id;
            return '/api/game/commentform/' + this.id;
        },

        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options);            
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('gamecommentform:fetch').publish(model);
        }
        
    });

    return GameCommentFormModel;
});

