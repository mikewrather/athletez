// Sportorg TeamRoster Model
// -----------
// Requires define
// Return {SportorgTeamRosterModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgTeamRosterModel,
        _ = facade._;

    SportorgTeamRosterModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "team_id": 0,
                "team_name": null,
                "rosters": [{
                    "name": null,
                    "picture": null,
                    "grad_year": 0,
                    "sport_type": null,
                    "sport_name": null
                }]
            },
            "desc": "Team Roster information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgTeamRosterModel;
});
