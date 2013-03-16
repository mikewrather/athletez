// sport.js Model
// ------------
// Requires define
// Return {UserSportModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserSportModel,
        _ = facade._;

    UserSportModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "sport_name": null,
                "sport_id": 0,
                "primary_position": null,
                "social_links": [{
                    "class": null,
                    "title": null,
                    "link": null
                }]
            },
            "desc": "List of sports associated with the user.",
            "exec_data": { 
                "exec_time": 0,
                "exec_error": false
            }
        })
        
        
    });

    return UserSportModel;
});

