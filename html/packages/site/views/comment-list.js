// The Comment List
// --------------

define(['facade','views', 'utils', 'site/views/comment-item', 'site/views/comment-form',  'text!site/templates/comment-list.html'], 
function(facade,  views,   utils,   CommentItemView,    CommentFormView, commentListTemlate) {

    var CommentListView, 
        CommentListAbstract,
        Channel = utils.lib.Channel,
        vendor = require("vendor"),
        CollectionView = views.CollectionView,
        SectionView = views.SectionView,
        Mustache = vendor.Mustache;

    CommentListAbstract = CollectionView.extend(SectionView.prototype);

    CommentListView = CommentListAbstract.extend({

        __super__: CollectionView.prototype,

       // id: "comment-list",
        name: "Comment List",
       // tagName: "ul",
		listView: "#comment-list",
        // Tag for the child views
        _tagName: "li",
        _className: "comment",
		page: 1,
		page_limit: 5,
		prepend: false,
        // Store constructor for the child views
        _view: CommentItemView,
		template: commentListTemlate,
		events: {
			'click .see-more-h': 'seeMore'
		},
		// render list template
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template);
            this.$el.html(markup);
            return this;
       },
		
        initialize: function(options) {
        	this.renderTemplate();
	        //this.limitResults(4);
	        //console.log("options herebb",this.collection);
	        //options = {collection: this.collection.first(3)};
	         var _self = this;
	         this.collection = options.collection;
	         console.log(this.collection.toJSON());
			 _self.allData = this.collection.toArray();
			_self.seeMore();
			console.log(this.collection.toJSON());
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("CommentListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupFormView();
            /*this.collection.on('add', function() {
            	renderAddView();
            });*/
        },
        
        seeMore: function(e) {
        	var len = this.allData.length, limit = (len < this.page_limit)?len:this.page_limit, start = len - (this.page * limit), end = start + this.page_limit;
			
			if(start <= 0) {
				 this.$el.find('.see-more-h').hide();
			}
			
			// to append before (making true)
			this.prepend = true;
			
            if(e)
            	this.collection.add(this.allData.slice(start,end));
            else
	            this.collection.reset(this.allData.slice(start,end));
	           
	          this.page++; 
	           
	        // to append before (making false)
	        this.prepend = false;   
	           
	        if(e) {    
				if(this.addSubscribers) this.addSubscribers();
	            if(this.setupBoardView) this.setupBoardView();
	            if(this.setupAddView) this.setupAddView();   
        	}
        },

	    // Child views...
        childViews: {},

        // Event handlers...

        // Add Views
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
                $(listView.listView).prepend(formView.el);
            }
            
            Channel('commentform:fetch').subscribe(callback);
        }

    });

    return CommentListView;
});
