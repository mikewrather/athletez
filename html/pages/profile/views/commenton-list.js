// The CommentOn List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'profile/views/commenton-form', 'site/collections/comments'],
function(facade,   utils,   BaseCommentListView,       ProfileCommentFormView, SiteCommentList) {

    var ProfileCommentOnListView, _ = facade._,
        Channel = utils.lib.Channel;

	ProfileCommentOnListView = BaseCommentListView.extend({

        name: "Commenton List",
	    initialize: function (options) {
		    _.bindAll(this);
		    //options = {collection: this.collection.first(3)};
		    BaseCommentListView.prototype.initialize.call(this, options);
		    var ab  = this.collection.first(3);
		    var a = new SiteCommentList();
		    a.push(ab[0]);
		    a.push(ab[1]);
		    this.collection = a;
		    console.log("init here", this.collection);
		    //this.collection.deferred.resolve(response);
	    },

        setupFormView: function () {
            var listView = this,
	            formView = new ProfileCommentFormView({collection: this.collection}),
                renderAddView = this.addChildView(formView);
//	        console.log("aabbcc = ", this.collection);
//	        listView.setOptions({collection: this.collection.first(3)});
//	        console.log("abccceee = ", this.collection);
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