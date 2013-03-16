// Sitedata CommentOf Model
// -----------
// Requires define
// Return {SitedataCommentOfModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SitedataCommentOfModel,
        _ = facade._;

    SitedataCommentOfModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "comment_id": 0,
                "comment_author": null,
                "comment_author_picture": null,
                "comment_date": null,
                "comment": 0
            },
            "desc": "Comment information by the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SitedataCommentOfModel;
});
