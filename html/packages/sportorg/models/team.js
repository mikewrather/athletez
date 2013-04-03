// Sportorg Team Model
// -----------
// Requires define
// Return {SportorgTeamModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgTeamModel,
        _ = facade._;

    SportorgTeamModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                
                "complevel": null,
                "season": null,
                "year": null,
                "mascot": null,
                "unique_ident": null,
                "statvals": [{
                    "statval": null,
                    "statdate": null,
                    "statteam": null,
                    "stat_context": null
                }]
            },
            "desc": "Team information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgTeamModel;
});
