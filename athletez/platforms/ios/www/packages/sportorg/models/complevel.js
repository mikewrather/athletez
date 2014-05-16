// Sportorg Complevel Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgComplevelModel,
        _ = facade._;

    SportorgComplevelModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null,
                "min_age": 0,
                "max_age": 0
            },
            "desc": "Complevel information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        
        /*Modify response as per the requirements*/
        fetchSuccess : function(model,response){
        	
        	
        }        
        
    });

    return SportorgComplevelModel;
});
