// User CommentOn Form Model
// -----------
// Requires define
// Return {UserCommentOnFormModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserCommentOnFormModel,
        _ = facade._;

    UserCommentOnFormModel = BaseModel.extend({  

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
                return '/test/user/commentonform/' + this.id;
            return '/api/user/commentonform?user_id=' + this.id;
        }
        
    });

    return UserCommentOnFormModel;
});
