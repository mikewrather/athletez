// Site Pog Model (Player of Game)
// -----------
// Requires define
// Return {SitePogModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SitePogModel,
        _ = facade._;

    SitePogModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "posted_time" : null,
                "player" : null,
                "voter" : null,
                "game" : null
            },
            "desc": "Pog information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SitePogModel;
});
