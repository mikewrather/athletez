// Sportorg Complevel Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgComplevelModel,
        _ = facade._;

    var SportorgComplevelProfileModel = BaseModel.extend({

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "id": 0,
                "name": null,
                "min_age": 0,
                "max_age": 0
            },
            "desc": "Complevel Profile information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),
        url: function(){
	       return "/api/complevelprofile/basics/" + this.id;
        },
        /*Modify response as per the requirements*/
        fetchSuccess : function(model,response){
        	
        	
        }        
        
    });

    return SportorgComplevelProfileModel;
});
