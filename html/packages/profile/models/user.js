// user.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var ProfileUserModel,
        _ = facade._;

    ProfileUserModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "userName": null,
            "userPicture": null,
            "userHeight": null,
            "userWeight": null,
            
            "numTeamMates": 0,
            "numFollowers": 0,
            "numVotes": 0,
            
            "sports": [{
                "sportName": null,
                "teams": [{
                    "teamName": null
                }],
                "primaryPosition": null,
                "athleticData": [{
                        
                }]
                }            
            ]
        }),
        
        urlRoot: '/api/user/basics/',

        initialize: function() {
            
        }
        
    });

    return ProfileUserModel;
});

