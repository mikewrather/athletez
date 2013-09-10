// CommentsOn Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOnList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var ProfileCommentOnList;

    ProfileCommentOnList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/comment/getall/' + this.id;
            return '/api/comment/getall/?subject_enttypes_id='+this.subject_entity_type+'&subject_id='+this.id;
        }

    });

    return ProfileCommentOnList;
});
