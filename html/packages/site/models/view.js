// Site View Model
// -----------
// Requires define
// Return {SiteViewModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SiteViewModel,
        _ = facade._;

    SiteViewModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id" : 0,
                "subject" : null,
                "enttype" : null,
                "user" : null,
                "viewed_time" : null
            },
            "desc": "View information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })        
        
    });

    return SiteViewModel;
});
