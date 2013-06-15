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

	        this.childViews.form = formView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                formView.model = data;
	            formView.render();
	        }

	        function callcommentslist(){
//		        console.log("i didyzzz");
//		        var collection = listView.collection;
//		        console.log("previous collection1", collection);
//
//		        var model = collection.at(collection.length - 3);
//		        console.log("new model", model);
//		        collection.remove(model, {});
//		        console.log("after listView", listView);
//		        listView.collection = collection;
//
//		        console.log("before render executed");
//		        var a = listView.toHTML();
//		        listView.$el.append(a);
//		        listView.render();
//		        console.log("render executed");
		    }

	        Channel('profilecommentonform:fetch').subscribe(callback);
            //Channel('profilecommentonlist:refresh').subscribe(callcommentslist);
        }
    });

    return ProfileCommentOnListView;
});