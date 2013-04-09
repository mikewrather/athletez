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
                "picture": null,
                "grad_year": 0,
                "sport_type": null,
                "sport_name": null,
                "num_votes": 0,
                "num_fans": 0
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
