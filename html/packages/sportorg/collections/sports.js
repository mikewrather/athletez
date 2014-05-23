// Sportorg Sports Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgSportList} constructor

define(['facade', 'collections', 'sportorg/models/sport', 'utils'], function(facade, collections, SportorgSportModel, utils) {

	var SportorgSportList, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

	SportorgSportList = BaseCollection.extend({

		// Reference to this collection's model.
		model : SportorgSportModel,

		/*Url to fetch sports for aut complete*/
		/*If complete list required add a if condition and return the complete url list in case its different*/
		url : function() {
			if (this.state_name == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return '/api/sport/search/?sport_name=' + this.sport_name + '&gender=' + this.gender;
		},

		// **Method:** `fetchSuccess` - resolve the deferred here in success
		fetchSuccess : function(collection, response) {
			collection.reset();

			var payload = response.payload;
			for (var key in payload) {
				var item = new SportorgSportModel();
				item.id = Math.ceil(Math.random() * 100000);

				if(payload[key]['icon'].indexOf("http://") < 0) payload[key]['icon'] = base_url + payload[key]['icon'];
				if(payload[key]['large_icon'].indexOf("http://") < 0) payload[key]['large_icon'] = base_url + payload[key]['large_icon'];
				if(payload[key]['small_icon'].indexOf("http://") < 0) payload[key]['small_icon'] = base_url + payload[key]['small_icon'];

				item.set('payload', payload[key]);
				item.set('desc', response.desc);
				item.set('exec_data', response.exec_data);
				collection.push(item);
			}

			collection.deferred.resolve(response);
			collection.processResult(collection);
		},
		// **MEthod:** Override this function in inherited class if any action is required 
		processResult : function (collection) {
			
			
		},
		returnProcessedData : function(collection){
			
		},

	});

	return SportorgSportList;
});
