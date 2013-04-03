// commenton-form.js Model
// ------------
// Requires define
// Return {CommentOnFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var CommentOnFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    CommentOnFormModel = SiteCommentModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentonform/' + this.id;
            return '/api/user/commentonform?user_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options);            
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('commentonform:fetch').publish(model);
        }
        
    });

    return CommentOnFormModel;
});

