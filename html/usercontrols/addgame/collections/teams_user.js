// GamesData
// ----------

// Package Sports
// Requires define
// Returns {GamesList} constructor
 
define(['facade', 'collections', 'sportorg/collections/games', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var TeamsList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamsList = SportsOrgCollection.extend({
    	url: function(){
                    return '/api/user/teams/'+ this.user_id + '?sport_id=' + this.sports_id ;
      },
       parseAsRequired : function() {
			var self = this;

			var models = self.toJSON();
			var d = [];
			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;						
						var location = {
							id : null,
							fulladdress : ''
						};
						 
						 if(payload && payload.org_sport_link_obj && payload.org_sport_link_obj.org && payload.org_sport_link_obj.org.locations)
							location = payload.org_sport_link_obj.org.locations;
											var temp = {
												team_id : payload.id,
												team_name : payload.team_name,
												location_id : location.id,
												location_name : location.full_address,
											};
						d.push(temp);
					}
				});
			}
			return d;
		},
		AppendItem : function(item){
			var self = this;
			var models = self.toJSON();
			var model = {
				payload : item
			}
			models.push(model);
			return models;
		}
    });

    return TeamsList;
});