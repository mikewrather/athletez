// Sportorg Game Model
// -----------
// Requires define
// Return {SportorgGameModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgGameModel,
        _ = facade._;

    SportorgGameModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "game_day": null,
                "game_time": null,
                "locations": null
            },
            "desc": "Game information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgGameModel;
});
