// Profile Related Users Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileRelatedList} constructor

define(['facade', 'user/collections/relateds', 'utils'], 
function(facade, UserRelatedList, utils) {

    var ProfileRelatedList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileRelatedList = UserRelatedList.extend({
        
        

    });

    return ProfileRelatedList;
});
