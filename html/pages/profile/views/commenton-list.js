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

		    this.limitResults();
		    this.options.collection = this.collection;
		    BaseCommentListView.prototype.initialize.call(this, options);
		},

		limitResults: function () {
			var origin_collection = this.collection;
			var subset = origin_collection.last(5);
			var new_collectoin = new SiteCommentList();
			_.each(subset, function(element, index){
				new_collectoin.push(element);
			});
			this.collection.reset();
			this.collection = new_collectoin;
		},

        setupFormView: function () {
            var listView = this,
	            formView = new ProfileCommentFormView({collection: this.collection}),
                renderAddView = this.addChildView(formView);

	        //this.childViews.form = formView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
	            console.log("Comments callback",data.user_pic_small);
                formView.model = data;
	            formView.render();
	        }

	        function callcommentslist(collection){
		        console.log("i refresh comment on");
		        //listView.collection.reset();
		        listView.collection = collection;
		        console.log("new collection", listView.collection);
		        var current_collections = listView.collection;
		            current_collections.each(function(imodel, index) {
			            console.log("imodel", imodel);
			            if (index == 0){
				            listView.collection.remove(imodel);
				            console.log("I removed one modelx");
			            }
			        });
		        console.log("updated collection", listView.collection);
		        listView.render();
		        console.log("comment on render executed");
		    }

	        Channel('profilecommentonform:fetch').subscribe(callback);
            Channel('profilecommentonlist:refresh').subscribe(callcommentslist);
        }
    });

    return ProfileCommentOnListView;
});