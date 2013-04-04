// Complevels Data
// ----------

// Package Team
// Requires define
// Returns {ComplevelsList} constructor

define(['facade', 'sportorg/collections/complevels', 'utils'], 
function(facade, SportorgComplevelList, utils) {

    var ComplevelList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ComplevelList = SportorgComplevelList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/complevels/' + this.id + '/' + this.sport_id;
            return '/api/team/complevels?team_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return ComplevelList;
});
