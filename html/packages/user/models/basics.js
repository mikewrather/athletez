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
                "grad_year": 0,
                "user_picture": null,
                "user_height": null,
                "user_weight": null,
                
                "num_followers": 0,
                "num_votes": 0
            },
            "desc": "Basic information about the user.",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return UserBasicsModel;
});

