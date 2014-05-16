// Complevels Data
// ----------

// Package Team
// Requires define
// Returns {TeamComplevelsList} constructor

define(['facade', 'sportorg/collections/complevels', 'utils'], 
function(facade, SportorgComplevelList, utils) {

    var TeamComplevelList,
        Channel = utils.lib.Channel;

    TeamComplevelList = SportorgComplevelList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/org/complevels/' + this.id + '/' + this.sport_id;
            return '/api/org/complevels/' + this.id + '?sports_id=' + this.sport_id;
        }

    });

    return TeamComplevelList;
});
