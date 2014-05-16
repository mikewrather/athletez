// The CommentOf List
// --------------

define(['facade', 'utils', 'site/views/comment-list'],
function(facade,   utils,   BaseCommentListView) {

    var TeamCommentOfListView;

    TeamCommentOfListView = BaseCommentListView.extend({
        
        name: "team Commentof List",
        
        setupFormView: function () {
            
        }

    });

    return TeamCommentOfListView;
});
