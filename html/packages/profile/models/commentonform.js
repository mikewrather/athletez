// commenton-form.js Model
// ------------
// Requires define
// Return {ProfileCommentOnFormModel} model constructor object

define( ["facade", "user/models/commentonform", "utils"], function (facade, UserCommentOnFormModel, utils) {

    var ProfileCommentOnFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOnFormModel = UserCommentOnFormModel.extend({
        
        defaults: _.extend({}, (new UserCommentOnFormModel).attributes, {
            "desc": "Comment form information about the profile page"
        }),
        
        initialize: function (attributes, options) {
            UserCommentOnFormModel.prototype.initialize.call(attributes, options);
            this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            UserCommentOnFormModel.prototype.fetchSuccess.call(model, response);
            Channel('profilecommentonform:fetch').publish(model);
        }
        
    });

    return ProfileCommentOnFormModel;
});

