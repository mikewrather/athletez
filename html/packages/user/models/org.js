// User Org Model
// -----------
// Requires define
// Return {UserOrgModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserOrgModel,
        _ = facade._;

    UserOrgModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "org_id": 0,
                "org_name": null,
                "teams": [{
                    "team_id": 0,
                    "complevel": null,
                    "season": null,
                    "year": null,
                    "schedules": [{
                        "schedule_id": 0,
                        "schedule_date": null,
                        "other_team": null,
                        "schedule_summary": null
                    }],
                    "statval": null,
                    "stats": [{
                        "name": null,
                        "value": 0
                    }]
                }
                ]
            },
            "desc": "Org information about the user"
        }),
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, arguments);
            this.id = Math.ceil(Math.random() * 100000);
        },
        
    });

    return UserOrgModel;
});
