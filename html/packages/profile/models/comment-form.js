// comment-form.js Model
// ------------
// Requires define
// Return {ProfileCommentFormModel} model constructor object

define( ["facade", "user/models/comment-form", "utils"], function (facade, UserCommentFormModel, utils) {

    var ProfileCommentFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentFormModel = UserCommentFormModel.extend({
        
        defaults: _.extend({}, (new UserCommentFormModel).attributes, {
            "desc": "Comment form information about the profile page"
        }),
        
        initialize: function (attributes, options) {
            UserCommentFormModel.prototype.initialize.call(attributes, options);
            this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            UserCommentFormModel.prototype.fetchSuccess.call(model, response);
            Channel('profilecommentform:fetch').publish(model);
        }
        
    });

    return ProfileCommentFormModel;
});

