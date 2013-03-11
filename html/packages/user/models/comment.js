// User Comment Model
// -----------
// Requires define
// Return {UserCommentModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserCommentModel,
        _ = facade._;

    UserCommentModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "comment_id": 0,
                "comment_author": null,
                "comment_author_picture": null,
                "comment_date": null,
                "comment": 0
            },
            "desc": "Comment information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, arguments);
            this.id = Math.ceil(Math.random() * 100000);
        },
        
        
    });

    return UserCommentModel;
});
