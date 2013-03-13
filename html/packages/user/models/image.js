// User Image Model
// -----------
// Requires define
// Return {UserImageModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var UserImageModel,
        _ = facade._;

    UserImageModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "image_id": 0,
                "image_path": null,
                "image_title": null,
                "num_votes": 0
            },
            "desc": "Image information about the user",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, arguments);
            this.id = Math.ceil(Math.random() * 100000);
        }
        
        
    });

    return UserImageModel;
});
