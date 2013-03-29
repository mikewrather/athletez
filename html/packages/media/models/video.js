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
                "teams": [{
                    "complevel": null,
                    "season": null,
                    "grad_year": 0,
                    "team_name": null,
                    "schedule": {
                        "schedule_date": null,
                        "other_team": null,
                        "schedule_summary": null
                    }
                }],
                "games": [{
                    "team1_name": null,
                    "team2_name": null
                }],
                "video_desc": null,
                "user_name": null,
                "post_date": null,
                "tags_count": 0,
                "tags": [
                ],
                "num_votes": 0,
                "num_views": 0,
                "num_comments": 0,
                "social_links": [{
                    "class": null,
                    "title": null,
                    "link": null
                }]
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
