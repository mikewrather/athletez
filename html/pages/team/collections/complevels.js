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
                return testpath + '/team/complevels/' + this.id + '/' + this.sport_id;
            return '/api/team/complevels/' + this.id + '?sport_id=' + this.sport_id;
        }

    });

    return TeamComplevelList;
});
