// Clubs Data
// ----------

// Package Sports
// Requires define
// Returns {ClubsList} constructor

define(['facade', 'collections', 'sportorg/collections/clubs', 'utils'
], 
function(facade, collections, MainCollection, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    List = MainCollection.extend({
    });

    return List;
});