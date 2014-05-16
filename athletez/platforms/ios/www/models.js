// models.js  
// ---------  
// models in this directory are intended for site-wide usage  
// Requires `define`  
// See http://requirejs.org/docs/api.html#define

define(["models/base", "models/messaging", "models/application-state"], 
function (BaseModel, MessagingModel, ApplicationStateModel) {

    // Add models in this same directory to this object, 
    // for use when requiring this module.  
    // grouping site-wide models in this module (object)
    return {
        "ApplicationStateModel": ApplicationStateModel,
        "BaseModel": BaseModel,
        "MessagingModel": MessagingModel
    };

});
