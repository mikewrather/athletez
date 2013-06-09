// The CommentOn List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'profile/views/commenton-form'], 
function(facade,   utils,   BaseCommentListView,       ProfileCommentFormView) {

    var ProfileCommentOnListView, 
        Channel = utils.lib.Channel;

    ProfileCommentOnListView = BaseCommentListView.extend({

        name: "Commenton List",
        
        setupFormView: function () {
            var listView = this,
                formView = new ProfileCommentFormView({collection: this.collection}),
                renderAddView = this.addChildView(formView);
            
            this.childViews.form = formView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                formView.model = data;
	            formView.render();
            }

            Channel('profilecommentonform:fetch').subscribe(callback);
        }



    });

    return ProfileCommentOnListView;
});