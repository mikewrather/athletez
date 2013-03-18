// commenton-form.js Model
// ------------
// Requires define
// Return {ProfileCommentOnFormModel} model constructor object

define( ["facade", "site/models/comment", "utils"], function (facade, SiteCommentModel, utils) {

    var ProfileCommentOnFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOnFormModel = SiteCommentModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentonform/' + this.id;
            return '/api/user/commentonform?user_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            SiteCommentModel.prototype.initialize.call(attributes, options);
            this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            SiteCommentModel.prototype.fetchSuccess.call(model, response);
            Channel('profilecommentonform:fetch').publish(model);
        }
        
    });

    return ProfileCommentOnFormModel;
});

