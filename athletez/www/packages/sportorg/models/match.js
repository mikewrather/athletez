// Sportorg Match Model
// -----------
// Requires define
// Return {SportorgMatchModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgMatchModel,
        _ = facade._;

    SportorgMatchModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "game_day": null,
                "game_time": null,
                "locations": null,
                "players": [{
                    "player_name": null,
                    "points_awarded": null,
                    "result_time": null,
                    "match_winner": false
                }
                ]
            },
            "desc": "Match information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
    });

    return SportorgMatchModel;
});
