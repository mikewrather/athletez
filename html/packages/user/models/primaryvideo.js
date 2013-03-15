// User Primary Video Model
// -----------
// Requires define
// Return {UserPrimaryVideoModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserPrimaryVideoModel,
        _ = facade._;

    UserPrimaryVideoModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "video_id": 0,
                "video_title": null,
                "video_quality": 0,
                "video_image": null,
                "org_name": null,
                "team": {
                    "complevel": null,
                    "season": null,
                    "year": null,
                    "schedule": {
                        "schedule_date": null,
                        "other_team": null,
                        "schedule_summary": null
                    }
                },
                "video_desc": null,
                "num_votes": 0,
                "num_views": 0,
                "num_comments": 0
            },
            "desc": "Primary Video information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        url: function() {
            if (testpath)
                return '/test/user/primaryvideo/' + this.id;
            return '/api/user/primaryvideo?user_id=' + this.id;
        }
    });

    return UserPrimaryVideoModel;
});
