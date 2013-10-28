// User Events Collection Data
// ----------

// Package Game
// Requires define

define(['facade', 'collections', 'utils'], 
function(facade, collections, utils) {

    var _ = facade._,
    	BaseCollection = collections.BaseCollection,
        Channel = utils.lib.Channel;

    return BaseCollection.extend({
        id: undefined,
        url: function() {
            if (testpath)
                return testpath + '/game/users/' + this.id;
            return '/api/game/users/' + this.id;
        }

    });
});
