// The Comment List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'team/views/comment-form'], 
function(facade,   utils,   BaseCommentListView,       TeamCommentFormView) {

    var TeamCommentListView, 
        Channel = utils.lib.Channel;

    TeamCommentListView = BaseCommentListView.extend({

        setupFormView: function () {
            var listView = this,
                formView = new TeamCommentFormView({collection: this.collection}),
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
            
            Channel('teamcommentform:fetch').subscribe(callback);
        }

    });

    return TeamCommentListView;
});
