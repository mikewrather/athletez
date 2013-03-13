// team.js Model
// ------------
// Requires define
// Return {UserTeamModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserTeamModel,
        _ = facade._;

    UserTeamModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "team_name": null,
                "team_location": null
            },
            "desc": "Team information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, arguments);
            this.id = Math.ceil(Math.random() * 100000);
        }
        
        
    });

    return UserTeamModel;
});

