// The CommentOf List
// --------------

define(['facade', 'utils', 'site/views/comment-list'],
function(facade,   utils,   BaseCommentListView) {

    var ProfileCommentOfListView;

    ProfileCommentOfListView = BaseCommentListView.extend({
        
        name: "Commentof List",
        
        setupFormView: function () {
            
        }

    });

    return ProfileCommentOfListView;
});
