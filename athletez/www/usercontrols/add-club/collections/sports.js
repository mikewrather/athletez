// Sporta Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'sportorg/collections/sports_listall'],
function(facade, SportsOrgCollection) {

    var SportsList = SportsOrgCollection.extend({
		ParseForDropdown: function(){
			var results = SportsOrgCollection.prototype.ParseForDropdown.call(this);
			results.unshift({payload:{id:null,custom_name: "Don't use a single sport"}});
			return results;

		}
    });

    return SportsList;
});