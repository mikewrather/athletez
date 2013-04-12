// The Comment List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'team/views/comment-form'], 
function(facade,   utils,   BaseCommentListView,       CommentFormView) {

    var CommentListView, 
        Channel = utils.lib.Channel;

    CommentListView = BaseCommentListView.extend({

        setupFormView: function () {
            var listView = this,
                formView = new CommentFormView({collection: this.collection}),
                renderAddView = this.addChildView(formView);
            
            this.childViews.form = formView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                formView.model = data;
                formView.render();
                listView.$el.prepend(formView.el);
            }
            
            Channel('commentform:fetch').subscribe(callback);
        }

    });

    return CommentListView;
});
