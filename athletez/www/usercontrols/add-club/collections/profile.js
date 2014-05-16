
define(['facade', 'sportorg/collections/season_profiles', 'utils'],
	function(facade, SeasonProfilesCollection, utils, model) {

		return SeasonProfilesCollection.extend({

			ParseForDropdown: function(){
				return this.toJSON();
			}
		});
	});
