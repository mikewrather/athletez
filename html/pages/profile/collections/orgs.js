// Profile Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileOrgList} constructor

define(['facade', 'sportorg/collections/orgs', 'utils'], 
function(facade, SportorgOrgList, utils) {

    var ProfileOrgList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileOrgList = SportorgOrgList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/orgs/' + this.id;
            return '/api/user/orgs?user_id=' + this.id;            
        }
        
        

    });

    return ProfileOrgList;
});
