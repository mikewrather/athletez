// The CommentOf List
// --------------

define(['facade', 'utils', 'site/views/comment-list'],
function(facade,   utils,   BaseCommentListView) {

    var CommentOfListView, 
        Channel = utils.lib.Channel;

    CommentOfListView = BaseCommentListView.extend({
        
        name: "Commentof List",
        
        setupFormView: function () {
            
        }

    });

    return CommentOfListView;
});
