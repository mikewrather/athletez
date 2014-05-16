// Sports Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/sports', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var SportsList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportsList = SportsOrgCollection.extend({
    	url: function(){
                    return '/api/user/sports/'+ this.user_id;
     },
     parseAsRequired : function() {
			var self = this;

			var models = self.toJSON();
			var d = [];
			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;						
						var temp = {
							
							id : payload.id,
							sport_id : payload.sport_id,
							sport_name : payload.sport_name,
							team_type : payload.team_type,
						};
						d.push(temp);
					}
				});
			}
			return d;
		}
     
    });

    return SportsList;
});