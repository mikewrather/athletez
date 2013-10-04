// The CommentOn List
// --------------

define(['facade', 'vendor', 'utils', 'views', 'text!usercontrol/photo-player/templates/tags.html', 'usercontrol/photo-player/views/tags-item'],
function(facade, vendor,  utils, views, tagListTemlate, TagItemView) {

    var TagListView, _ = facade._,
    CollectionView = views.CollectionView,
    SectionView = views.SectionView,
     Mustache = vendor.Mustache;
        Channel = utils.lib.Channel;

	CommentListAbstract = CollectionView.extend(SectionView.prototype);

    TagListView = CommentListAbstract.extend({
		__super__: CollectionView.prototype,

		listView: "#tags-list",
        // Tag for the child views
        _tagName: "li",
        _className: "tags-li",
		page: 1,
		page_limit: 5,
		prepend: false,
        // Store constructor for the child views
        _view: TagItemView,
		template: tagListTemlate,
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
	         var _self = this;
	         this.name = options.name;
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
        childViews: {}
    });
    return TagListView;
});