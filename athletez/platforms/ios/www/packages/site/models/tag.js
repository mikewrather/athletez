// Site Tag Model
// -----------
// Requires define
// Return {SiteTagModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SiteTagModel,
        _ = facade._;

    SiteTagModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "subject" : null,
                "enttype" : null,
                "voter" : null
            },
            "desc": "Tag information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SiteTagModel;
});
