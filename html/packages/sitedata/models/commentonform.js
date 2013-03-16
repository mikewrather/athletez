// Sitedata CommentOn Form Model
// -----------
// Requires define
// Return {SitedataCommentOnFormModel} object as constructor  

define(["facade", "utils", "models/base"], function (facade, utils, BaseModel) {

    var SitedataCommentOnFormModel,
        _ = facade._,
        Channel = utils.lib.Channel;
        
        

    SitedataCommentOnFormModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "comment_id": 0,
                "comment_author": null,
                "comment_author_picture": null,
                "comment_placeholder": null,
                "comment_date": null,
                "comment": 0
            },
            "desc": "Comment form information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentonform/' + this.id;
            return base_url + '/api/user/commentonform?user_id=' + this.id;
        },
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(attributes, options);
            this.fetch();
        },
        
        fetchSuccess: function (model, response) {
            BaseModel.prototype.fetchSuccess.call(model, response);
            Channel('profilecommentonform:fetch').publish(model);
        }
        
    });

    return SitedataCommentOnFormModel;
});
