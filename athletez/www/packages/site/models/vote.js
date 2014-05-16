// Site Vote Model
// -----------
// Requires define
// Return {SiteVoteModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SiteVoteModel,
        _ = facade._;

    SiteVoteModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "subject" : null,
                "enttype" : null,
                "voter" : null,
                "voter_picture" : null
            },
            "desc": "Vote information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SiteVoteModel;
});
