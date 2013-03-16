// Sitedata CommentOn Model
// -----------
// Requires define
// Return {SitedataCommentOnModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SitedataCommentOnModel,
        _ = facade._;

    SitedataCommentOnModel = BaseModel.extend({  

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
        })
        
    });

    return SitedataCommentOnModel;
});
