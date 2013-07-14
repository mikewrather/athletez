//City Model

define([ 'models' ], function(models) {

	var CityModel, BaseModel = models.BaseModel;

	CityModel = BaseModel.extend({

		defaults : {
			name : null
		},

		initialize : function(attributes, options) {
			this.id = this.id || _.uniqueId('m');
			Channel('changeInput' + this.id).subscribe(this.search);
		},

		search : function(input_string) {
			//console.log(input_string);
			if (input_string.length > 2) {
				$.ajax({
					url : "/api/city/search?city_name=" + input_string
				}).done(function(data, textStatus, jqXHR) {
					//console.log(data);	
				});
			}
		}

	});

	return CityModel;
});