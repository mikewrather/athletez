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
                "game_name": null,
                "game_day": null,
                "game_time": null,
                "game_picture": null,
                "teams": [{
                    "team_name": null,
                    "team_location": null,
                    "points_scored": 0,
                    "points_against": 0,
                    "is_winner": null
                }],                
                "game_location": null
            },
            "desc": "Game information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),


	    url: function(){ return "/api/game/basics/" + this.id; }
        
    });

    return SportorgGameModel;
});
