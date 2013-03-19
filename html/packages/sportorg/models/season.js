// Sportorg Season Model
// -----------
// Requires define
// Return {SportorgSeasonModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgSeasonModel,
        _ = facade._;

    SportorgSeasonModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "season_name": null
            },
            "desc": "Season information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgSeasonModel;
});
