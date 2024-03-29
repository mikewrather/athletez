// User Related Model
// -----------
// Requires define
// Return {UserRelatedModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserRelatedModel,
        _ = facade._;

    UserRelatedModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "user_id": 0,
                "user_name": null,
                "user_picture": null,
                "teams": [{
                    "sport": null,
                    "position": null,
                    "org": null,
                    "season": null,
                    "year": null
                }],
                "num_votes": 0,
                "num_followers": 0
            },
            "desc": "Related user information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })

        
        
        
    });

    return UserRelatedModel;
});
