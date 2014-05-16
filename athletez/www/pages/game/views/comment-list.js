// The Comment List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'game/views/comment-form'], 
function(facade,   utils,   BaseCommentListView,       GameCommentFormView) {

    var GameCommentListView, 
        Channel = utils.lib.Channel;

    GameCommentListView = BaseCommentListView.extend({

        setupFormView: function () {
            var listView = this,
                formView = new GameCommentFormView({collection: this.collection}),
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
            
            Channel('gamecommentform:fetch').subscribe(callback);
        }

    });

    return GameCommentListView;
});
