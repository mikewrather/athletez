// Sportorg Position Model
// -----------
// Requires define
// Return {SportorgPositionModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgPositionModel,
        _ = facade._;

    SportorgPositionModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null,
                "sport_name": null,
                "stattab_id": 0,
                "stattab_name": null,
                "stattab_classname": null
            },
            "desc": "Position information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SportorgPositionModel;
});
