// Profile Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileOrgList} constructor

define(['facade', 'user/collections/orgs', 'utils'], 
function(facade, UserOrgList, utils) {

    var ProfileOrgList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileOrgList = UserOrgList.extend({
        
        

    });

    return ProfileOrgList;
});
