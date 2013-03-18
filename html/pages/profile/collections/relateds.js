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
        
        url: function() {
            if (testpath)
                return '/test/user/related/' + this.id;
            return '/api/user/related?user_id=' + this.id;            
        }

    });

    return ProfileRelatedList;
});
