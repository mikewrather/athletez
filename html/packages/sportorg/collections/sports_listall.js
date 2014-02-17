// Sporta Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/sports'],
function(facade, collections, SportsOrgCollection) {

    var SportsList;

    SportsList = SportsOrgCollection.extend({
	    sport_type :1,
	    sport_type_id :1,
	    male : 1,
	    female : 0,
	    url: function(){
		    return baseUrl = '/api/sport/listall/?male=' + this.male +
			    '&female=' + this.female +
			    '&sport_type=' + this.sport_type+
			    '&sport_type_id='+this.sport_type_id;
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