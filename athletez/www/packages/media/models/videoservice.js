// Media Video Service Model
// -----------
// Requires define
// Return {MediaVideoServiceModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var MediaVideoServiceModel,
        _ = facade._;

    MediaVideoServiceModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "service_id": 0,
                "name": null,
                "website": null
            },
            "desc": "Video service information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        })
        
        
    });

    return MediaVideoServiceModel;
});
