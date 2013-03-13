// sport.js Model
// ------------
// Requires define
// Return {UserSportModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserSportModel,
        _ = facade._;

    UserSportModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "sport_name": null,
                "sport_id": 0,
                "primary_position": null,
                "social_links": [{
                    "class": null,
                    "title": null,
                    "link": null
                }]
            },
            "desc": "Sport information about the user",
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

    return UserSportModel;
});

