// The CommentOf List
// --------------

define(['facade', 'utils', 'site/views/comment-list'],
function(facade,   utils,   BaseCommentListView) {

    var ProfileCommentOfListView, 
        Channel = utils.lib.Channel;

    ProfileCommentOfListView = BaseCommentListView.extend({
        
        name: "Commentof List",
        
        setupFormView: function () {
            
        }

    });

    return ProfileCommentOfListView;
});
