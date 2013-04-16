// Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {OrgList} constructor

define(['facade', 'sportorg/collections/orgs', 'utils'], 
function(facade, SportorgOrgList, utils) {

    var OrgList,
        _ = facade._,
        Channel = utils.lib.Channel;

    OrgList = SportorgOrgList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/orgs/' + this.id + '/' + this.sport_id;
            return '/api/user/orgs?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }
        
        

    });

    return OrgList;
});
