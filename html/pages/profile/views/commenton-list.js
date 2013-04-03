// The CommentOn List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'profile/views/commenton-form'], 
function(facade,   utils,   BaseCommentListView,       CommentFormView) {

    var CommentOnListView, 
        Channel = utils.lib.Channel;

    CommentOnListView = BaseCommentListView.extend({

        name: "Commenton List",
        
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
            
            Channel('commentonform:fetch').subscribe(callback);
        }

    });

    return CommentOnListView;
});