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
						if(payload.male=="1" && payload.female == "1")
							addition = "";
						else if(payload.male=="1")
							addition = "Men's ";
						else if(payload.female == "1")
							addition = "Women's ";
						
						load.payload.custom_name = addition + payload.sport_name;	
						load.payload.team_type = payload.sport_type ? payload.sport_type.name || "" : "";
					}
				});
			}
			return models;
    }  
    });

    return SportsList;
});