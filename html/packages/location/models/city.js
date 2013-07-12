//City Model


define([ 'models' ], function(models) {

	var CityModel, BaseModel = models.BaseModel;

	CityModel = BaseModel.extend({

		defaults : {
			name : null
		}

	});

	return CityModel;
});