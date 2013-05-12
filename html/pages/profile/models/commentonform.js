// commenton-form.js Model
// ------------
// Requires define
// Return {CommentOnFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var ProfileCommentOnFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOnFormModel = SiteCommentModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentonform/' + this.id;
            return '/api/user/commentonform/' + this.id;
        },
        
        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options);            
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('gamecommentonform:fetch').publish(model);
        }
        
    });

    return ProfileCommentOnFormModel;
});

