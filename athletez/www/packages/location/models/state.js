// Location State Model
// -----------
// Requires define
// Return {LocationStateModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var LocationStateModel,
        _ = facade._;

    LocationStateModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "location_id": 0,
                "location_name": null,
                "location_country": null
            },
            "desc": "State Information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
        
    });

    return LocationStateModel;
});
