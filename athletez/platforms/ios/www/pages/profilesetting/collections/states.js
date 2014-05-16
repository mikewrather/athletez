// Location States Data
// ----------

// Package Location
// Requires define
// Returns {LocationStateList} constructor

define(['facade', 'collections', 'location/collections/states', 'utils'
], 
function(facade, collections, LocationStateCollection, utils) {

    var LocationStateList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    LocationStateList = LocationStateCollection.extend({
    });

    return LocationStateList;
});