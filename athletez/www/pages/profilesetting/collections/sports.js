// Sporta Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'sportorg/collections/sports_listall'],
function(facade, SportsOrgCollection) {

    var SportsList = SportsOrgCollection.extend({

    });

    return SportsList;
});