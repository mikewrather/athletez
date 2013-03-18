// Site Comment Model
// -----------
// Requires define
// Return {SiteCommentModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SiteCommentModel,
        _ = facade._;

    SiteCommentModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "subject" : null,
                "enttype" : null,
                "poster" : null,
                "poster_picture" : null,
                "comment" : null
            },
            "desc": "Comment information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SiteCommentModel;
});
