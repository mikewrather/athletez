// Sportorg Sport Model
// -----------
// Requires define
// Return {SportorgSportModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgSportModel,
        _ = facade._;

    SportorgSportModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null,
                "male": false,
                "female": false,
                "type_name": null
            },
            "desc": "Sport information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SportorgSportModel;
});
