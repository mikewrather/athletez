// EventsData
// ----------

// Package Sports
// Requires define
// Returns {EventsList} constructor

define(['facade', 'collections', 'sportorg/collections/games', 'utils'
],
	function (facade, collections, SportsOrgCollection, utils) {

		var EventsList,
			BaseCollection = collections.BaseCollection,
			_ = facade._,
			Channel = utils.lib.Channel;

		EventsList = SportsOrgCollection.extend({
			url: function () {
				var params = '';
				//http://localhost/api/game/search/0?id1=0&sports_id=48&complevels_id=0&orderby=&searchtext=&loc_search=&states_id=2&cities_id=46&teams_id=4&apiaccess_id=441

				if (this.sports_id)
					params += 'sports_id=' + this.sports_id + '&';

				if (this.states_id)
					params += 'states_id=' + this.states_id + '&';
				if (this.event_name)
					params += 'searchtext=' + encodeURI(this.event_name);

				return '/api/game/search?' + params;
			}
		});

		return EventsList;
	});