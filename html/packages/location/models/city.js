//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var CityModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	CityModel = BaseModel.extend({

		defaults : {
			name : null
		},

		initialize : function(attributes, options) {
			this.id = this.id || _.uniqueId('m');
			this.addSubscribers();
			_.bindAll(this);
		},

		search : function(term) {
			if(this.request) this.request.abort();
			
			this.request = $.ajax({
				url : "/api/city/search?city_name=" + term
			}).done(function(data, textStatus, jqXHR) {
				 var collection = [];
				 var payload = data.payload;
		         if(payload != null){
		         	 for (i = 0; i < (payload.length > 10 ? 10 : payload.length) ; i++) {
		         		 var item = {};
		         		 item.label = item.value = payload[i].name + ', ' + payload[i].county.state.name;
		         		 item.id = payload[i].id;
		         		 collection.push(item);
		         	 }
		         }
				Channel('response :'+term).publish(collection);
			});
		},
		
		addSubscribers : function() {
			var mod = this;
			Channel('changeInput' + this.id).subscribe(mod.search);
		}

	});

	return CityModel;
});