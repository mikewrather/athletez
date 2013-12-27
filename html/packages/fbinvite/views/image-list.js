// The Image List
// --------------

define(['facade','views', 'utils', 'packages/fbinvite/views/image-item','text!packages/fbinvite/templates/image-list.html', 'votes/models/follow'], 
function(facade,  views,   utils,   ImageItemView, templateList) {

    var ImageListView, 
        ImageListAbstract,
        $ = facade.$,
        _ = facade._,
	    vendor = require("vendor"),
	    followModel = require('votes/models/follow'),
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView,
	    Mustache = vendor.Mustache;

    ImageListAbstract = CollectionView.extend(SectionView.prototype);

    ImageListView = ImageListAbstract.extend({

        __super__: CollectionView.prototype,
		template : templateList,
        _tagName: "li",
        _className: "image",
		page: 0,
		page_limit: 20,
		listView : ".image-list",
        // Store constructor for the child views
        _view: ImageItemView,
		events: {
		},
		
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template, {target: this.target_id});
            this.$el.html(markup);
            return this;
       },
      		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
        initialize: function(options) {
        	if(options.name)
        		this.name = options.name;
        	else
        		this.name = "image list";
        	
        	this.renderTemplate();
	       this.pageName = (options.pageName)?options.pageName:"profile";
        	if(options.collecton) this.collection = options.collection;
        	this.data = options.data;
        	this.controllerObject = options.controllerObject;
			// render template
	       
	        var _self = this;
			 _self.allData = this.collection.toArray();
			 var len = _self.allData.length;
			 
			// setting the pagination start and end and reset the pagination to 8 
			 _self.start = 0;
			 _self.end = _self.page_limit;
			 _self.page_limit = 8;
			
			_self.seeMore();
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ImageListView expected options.collection.");
            }
            
            _.bindAll(this);
            this.addSubscribers();
        },
        
        
        seeMore: function(e) {
        	var len = this.allData.length;
        	if(e) {
				this.start = this.end;
				this.end = this.end + this.page_limit;
			}
			
			if(len <= this.end) {
				 this.$el.find('.see-more-h').hide();
			}
			
            if(e)
            	this.collection.add(this.allData.slice(this.start,this.end));
            else
	            this.collection.reset(this.allData.slice(this.start,this.end));
	           
	         this.page++;  
	           
	        if(e) {    
				if(this.addSubscribers) this.addSubscribers();
        	   
        	}
        },
            
        // Child views...
        childViews: {},
        // Event handlers...
    });

    return ImageListView;
});

