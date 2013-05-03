// fbreg.js Model
// ------------
// Requires define
// Return {UserFBRegModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserFBRegModel,
        _ = facade._;

    UserFBRegModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            "payload": {
                "name": null,
                "birth_day": null,
                "high_school": null,
                "email": null,
                "user_picture": null
            },
            "desc": "Facebook Registration Information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }

        })
        
    });

    return UserFBRegModel;
});

