// Related Users Data
// ----------

// Package Profile
// Requires define
// Returns {RelatedList} constructor

define(['facade', 'user/collections/relateds', 'utils'], 
function(facade, UserRelatedList, utils) {

    var RelatedList,
        _ = facade._,
        Channel = utils.lib.Channel;

    RelatedList = UserRelatedList.extend({
        
        url: function() {
            if (testpath)
                return '/test/user/related/' + this.id + '/' + this.sport_id;
            return '/api/user/related?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return RelatedList;
});
