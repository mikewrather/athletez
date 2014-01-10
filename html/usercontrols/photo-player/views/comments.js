// The CommentOn List
// --------------

define(['facade', 'utils', 'site/views/comment-list', 'usercontrols/photo-player/views/comment-form', 'site/collections/comments'],
function(facade,   utils,   BaseCommentListView,       CommentFormView, SiteCommentList) {

    var CommentOnListView, _ = facade._,
        Channel = utils.lib.Channel;

	CommentOnListView = BaseCommentListView.extend({

      // name: "games comments on view",
	    initialize: function (options) {
		    _.bindAll(this);
		    //this.limitResults();
		    console.error(options);
		    this.userId = (options.userId)?options.userId:undefined;
		    this.options.collection = this.collection;
		    this.name = options.name;
		    this._template = options.template;
		    BaseCommentListView.prototype.initialize.call(this, options);
		   // this.setupFormView();
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
        	this.collection.id = this.userId;
            var listView = this, _self = this,
	            formView = new CommentFormView({collection: this.collection}),
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

	        function callcommentslist(collection) {
	        	// scroll to bottom
	        	var scroll = $("#comment-list").height() + $("li.comment").height();
	        	$(".comment-outer-h").animate({scrollTop: scroll});
	        	
	        	// get last child to blick
	        	$("#comment-list li:last-child").addClass('newly-added-comment');
	        	
	        	//alert("sadasd");
		       // console.log("i refresh comment on");
		        //listView.collection.reset();
		       // listView.collection = collection;
		        
		       // console.log("new collection", listView.collection);
		       // var current_collections = listView.collection;
		            /*current_collections.each(function(imodel, index) {
			            console.log("imodel", imodel);
			            if (index == 0){
				            //listView.collection.remove(imodel);
				            console.log("I removed one modelx");
			            }
			        });*/
		       // console.log("updated collection", listView.collection);
		        //listView.render();
		       // console.log("comment on render executed");
		    }
			routing.off('profilecommentonform:fetch');
	        routing.on('profilecommentonform:fetch', function(model) {
	        	callback(model);
	        });
	        
	      
	        
	        
	        routing.off('profilecommentonlist:refresh');
	        routing.on('profilecommentonlist:refresh', function(model) {
	        	callcommentslist(model);
	        });
	        
           // Channel('profilecommentonlist:refresh').subscribe(callcommentslist);
        }
    });

    return CommentOnListView;
});