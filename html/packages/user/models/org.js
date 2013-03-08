// User Org Model
// -----------
// Requires define
// Return {UserOrgModel} object as constructor  

define(['models/base'], function (BaseModel) {

    var ProfileOrgModel;

    ProfileOrgModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "user_name": null,
                "user_picture": null,
                "user_height": null,
                "user_weight": null,
                
                "num_followers": 0,
                "num_votes": 0,
                
                "sports": [{
                    "sport_name": null,
                    "sport_id": 0,
                    "teams": [{
                        "team_name": null,
                        "team_location": null
                    }],
                    "primary_position": null,
                    "social_links": [{
                        "class": null,
                        "title": null,
                        "link": null
                    }]
                }]
            },
            "desc": "Basic information about the user"
            
            "orgID": 0,
            "teams": [{
                "teamName": null,
                "compLevel": null,
                "season": null,
                "year": null,
                "schedules": [{
                    "scheduleID": 0,
                    "scheduleDate": null,
                    "otherTeam": null,
                    "scheduleSummary": null
                }],
                "stats": [{
                    "name": null,
                    "value": null
                }]
            }
            ]
        }  
    });

    return ProfileOrgModel;
});
