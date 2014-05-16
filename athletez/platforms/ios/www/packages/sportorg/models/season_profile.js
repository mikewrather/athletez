// Sportorg Season Model
// -----------
// Requires define
// Return {SportorgSeasonModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgSeasonProfileModel,
        _ = facade._;

	SportorgSeasonProfileModel = BaseModel.extend({

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null
            },
            "desc": "Season Profile information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgSeasonProfileModel;
});
