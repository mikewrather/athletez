// Sportorg Org Model
// -----------
// Requires define
// Return {SportorgOrgModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserOrgModel,
        _ = facade._;

    SportorgOrgModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null,
                "sport": null,
                "leagues": null,
                "division": null,
                "season_profile": null,
                "complevel_profile": null,
                "location": null,
                "teams": [{
                    "team_id": 0,
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
                }
                ]
            },
            "desc": "Org information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgOrgModel;
});
