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
				url : "/api/location/search/?search_text=" + term
			}).done(function(data, textStatus, jqXHR) {
				console.log(data);
				 var collection = [];
				 var payload = data.payload;
		         if(payload != null){
		         	 for (i = 0; i < (payload.length > 10 ? 10 : payload.length) ; i++) {
		         		 var item = {};
		         		 item.label = payload[i].str;
		         		 item.id = payload[i].id;
		         		 item.state_id = payload[i].obj.states_obj.id;
		         		 item.country_id = payload[i].obj.states_obj.country.id;
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