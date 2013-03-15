// User Comment Form Model
// -----------
// Requires define
// Return {UserCommentFormModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserCommentFormModel,
        _ = facade._;

    UserCommentFormModel = BaseModel.extend({  

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
                return '/test/user/commentson/' + this.id;
            return '/api/user/commentson?user_id=' + this.id;
        }
        
    });

    return UserCommentFormModel;
});
