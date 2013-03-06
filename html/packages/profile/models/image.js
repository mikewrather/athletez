// Profile Image Model
// -----------
// Requires define
// Return {ProfileImageModel} object as constructor  

define( ["facade", "models/base"], function (facade, BaseModel) {

    var ProfileImageModel, 
        _ = facade._;

    ProfileImageModel = BaseModel.extend({  

        defaults : {
            
            "images": [
                
            ]
        }  
    });

    return ProfileImageModel;
});
