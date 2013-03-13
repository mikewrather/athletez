// fitnessbasics.js Model
// ------------
// Requires define
// Return {UserFitnessBasicModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserFitnessBasicModel,
        _ = facade._;

    UserFitnessBasicModel = BaseModel.extend({
        
        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "name": null,
                "val": null,
                "units": null
            },
            "desc": "Fitness Basic information about the user",
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

    return UserFitnessBasicModel;
});

