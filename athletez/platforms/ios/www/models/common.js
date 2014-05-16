// The User Common Model
// This Model Will Be Used Where There Is No Need Of Physical Existance Of A Model And Its Properties
// It Saves Burdon Of Extra Files In Application As Well As On  DOM  
// Return {Resume Model} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var Model,
        _ = facade._;

    Model = BaseModel.extend({  
    });
    return Model;
});
