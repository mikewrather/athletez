// Images Data
// ----------

// Package Team
// Requires define
// Returns {TeamImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var TeamImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamImageList = MediaImageList.extend({
        limit: 8,
        offset: 0,
        url: function() {
            if (testpath)
                return testpath + '/team/media/' + this.team_id+'/'+ this.sport_id;
            return '/api/team/media/' + this.team_id + '?sport_id=' + this.sport_id+ "&limit="+this.limit+"&offset="+this.offset;
        }

    });

    return TeamImageList;
});
