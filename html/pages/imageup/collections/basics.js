// Comments Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentList} constructor
console.log("Called");
define(['facade','media/collections/images', 'utils'], 
function(facade, MediaImageList , utils) {

    var ImageBasicsList,
        _ = facade._,
        Channel = utils.lib.Channel;

	ImageBasicsList = MediaImageList.extend({
        
        url: function() {
	        if (testpath)
                return testpath + '/user/'+ this.id +'/images/' ;
            return '/api/user/images/';
        }
        
    });

    return ImageBasicsList;
});
