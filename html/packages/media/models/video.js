// Media Video Model
// -----------
// Requires define
// Return {MediaVideoModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var MediaVideoModel,
        _ = facade._;

    MediaVideoModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "video_id": 0,
                "video_title": null,
                "video_quality": 0,
                "video_thumb": null,
                "video_image": null,
                "org_name": null,
                "team": [{
                    "complevel": "Varsity",
                    "season": "Winter",
                    "year": "'12",
                    "schedule": {
                        "schedule_date": "Dec 14",
                        "other_team": "Mercersberg Academy",
                        "schedule_summary": "w 88- 72"
                    }
                }],
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
            "desc": "Video information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
        
    });

    return MediaVideoModel;
});
