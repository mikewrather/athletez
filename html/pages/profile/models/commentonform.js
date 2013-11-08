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
            return '/api/user/basics/' + this.id;
        },
        
        initialize: function (attributes, options) {
        	_.bindAll(this);
            SiteCommentModel.prototype.initialize.call(attributes, options);            
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(this, model, response);
            routing.trigger('profilecommentonform:fetch', model);
        }
        
    });

    return ProfileCommentOnFormModel;
});

