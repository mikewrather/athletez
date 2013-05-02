// basics.js Model
// ------------
// Requires define
// Return {UserBasicsModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserBasicsModel,
        _ = facade._;

    UserBasicsModel = BaseModel.extend({
        
    });

    return UserBasicsModel;
});

