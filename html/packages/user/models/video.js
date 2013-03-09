// User Video Model
// -----------
// Requires define
// Return {UserVideoModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserVideoModel,
        _ = facade._;

    UserVideoModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "video_id": 0,
                "video_title": null,
                "video_quality": 0,
                "video_thumb": null,
                "teams": [                
                ],
                "games": [
                ],
                "video_desc": null,
                "user_name": null,
                "post_date": null,
                "tags_count": 0,
                "tags": [
                ],
                "num_votes": 0,
                "num_views": 0,
                "num_comments": 0
            },
            "desc": "Video information about the user",
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

    return UserVideoModel;
});
