// Sportorg Roster Model
// -----------
// Requires define
// Return {SportorgRosterModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgRosterModel,
        _ = facade._;

    SportorgRosterModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "name": null,
                "user_picture": null,
                "grad_year": 0,
                "sport_name": null,
                "position": null,
                "num_votes": 0,
                "num_followers": 0
            },
            "desc": "Roster information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgRosterModel;
});
