// Sportorg Sports Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgSportList} constructor

define(['facade', 'collections', 'sportorg/models/club', 'utils'], function(facade, collections, Model, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

	List = BaseCollection.extend({

		// Reference to this collection's model.
		model : Model,

		/*Url to fetch sports for aut complete*/
		/*If complete list required add a if condition and return the complete url list in case its different*/
		url : function() {
			var self = this;
			if (testpath)
				return testpath + '/club_search';

			if(self.states_id == undefined || self.sports_id == undefined || self.club_name == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return '/api/org/search/?sports_club=1&states_id=' + self.states_id + '&sports_id=' + self.sports_id + '&org_name=' + self.club_name;
		},

		// **Method:** `fetchSuccess` - resolve the deferred here in success
		fetchSuccess : function(collection, response) {
			collection.reset();

			var payload = response.payload;
			for (var key in payload) {
				var item = new SportorgSportModel();
				item.id = Math.ceil(Math.random() * 100000);
				item.set('payload', payload[key]);
				item.set('desc', response.desc);
				item.set('exec_data', response.exec_data);
				collection.push(item);
			}

			collection.deferred.resolve(response);
		}
	});

	return List;
});
