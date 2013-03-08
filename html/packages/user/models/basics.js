// basics.js Model
// ------------
// Requires define
// Return {UserBasicsModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserBasicsModel,
        _ = facade._;

    UserBasicsModel = BaseModel.extend({
        
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
        }),
        
        urlRoot: '/api/user/basics/'
        
        
    });

    return UserBasicsModel;
});

