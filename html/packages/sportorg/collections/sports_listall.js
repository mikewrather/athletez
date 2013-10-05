// Sporta Sports Data
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
                    return '/api/sport/listall/';
      },
      
    ParseForDropdown : function(){
    	var self = this;

			var models = self.toJSON();
			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;
						
						var addition = "";
						if(payload.male=="1")
							addition = " (M)";
						else if(payload.female == "1")
							addition = " (F)";
						
						load.payload.custom_name = payload.sport_name + addition;	
						load.payload.team_type = payload.sport_type ? payload.sport_type.name || "" : "";
					}
				});
			}
			return models;
    }  
    });

    return SportsList;
});