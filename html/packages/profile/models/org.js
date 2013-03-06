// Profile Org Model
// -----------
// Requires define
// Return {ProfileOrgModel} object as constructor  

define(['models/base'], function (BaseModel) {

    var ProfileOrgModel;

    ProfileOrgModel = BaseModel.extend({  

        defaults : {
            "userID": 0,
            "orgID": 0,
            "teams": [{
                "teamName": null,
                "compLevel": null,
                "season": null,
                "year": null,
                "schedules": [{
                    "scheduleID": 0,
                    "scheduleDate": null,
                    "otherTeam": null,
                    "scheduleSummary": null
                }],
                "stats": [{
                    "name": null,
                    "value": null
                }]
            }
            ]
        }  
    });

    return ProfileOrgModel;
});
