//SportListModel

define([ "facade", "models/base" ], function(facade, BaseModel) {
	var SportListModel,
		_ = facade._;
	
	SportListModel = BaseModel.extend({
		
		defaults : _.extend({}, (new BaseModel).attributes, {
			
			"payload": {
                "sport_id": 0,
                "sport_name": null,
                "sport_type": null
            },
            "desc": "Sport Information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
		})
	});
	
	return SportListModel;
});