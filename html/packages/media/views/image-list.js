// The Image List
// --------------

define(['facade','views', 'utils', 'media/views/image-item', 'media/views/image-board', 'media/views/add-image','text!media/templates/image-list.html'], 
function(facade,  views,   utils,   ImageItemView,            ImageBoardView,            AddImageView, templateList) {

    var ImageListView, 
        ImageListAbstract,
        $ = facade.$,
        _ = facade._,
	    vendor = require("vendor"),
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView,
	    Mustache = vendor.Mustache;

    ImageListAbstract = CollectionView.extend(SectionView.prototype);

    ImageListView = ImageListAbstract.extend({

        __super__: CollectionView.prototype,

        //id: "image-list",
        //name: "Image List",
        //tagName: "ul",
		template : templateList,
        // Tag for the child views
        _tagName: "li",
        _className: "image",
		page: 0,
		page_limit: 8,
		listView : ".image-list",
        // Store constructor for the child views
        _view: ImageItemView,
		//template: imageListTemplate,
		events: {
			'click .see-more-h': 'seeMore'
		},
		
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template);
            this.$el.html(markup);
            return this;
       },

        initialize: function(options) {
        	if(options.name)
        		this.name = options.name;
        	else
        		this.name = "image list";
        	
        	
        	if(options.collecton)
        		this.collection = options.collection;
        		
			// render template
			this.renderTemplate();
	        //console.log(options);
	       
	      
	       
	        var _self = this;
			 _self.allData = this.collection.toArray();
			_self.seeMore();
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ImageListView expected options.collection.");
            }
            
            _.bindAll(this);
            this.addSubscribers();
            this.setupBoardView();
        	this.setupAddView();
        },
        
        seeMore: function(e) {
			var len = this.allData.length, start = this.page * this.page_limit, end = start + this.page_limit;
			if(len <= end) {
				 this.$el.find('.see-more-h').hide();
			}
			
            if(e)
            	this.collection.add(this.allData.slice(start,end));
            else
	            this.collection.reset(this.allData.slice(start,end));
	           
	         this.page++;  
	           
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
        setupAddView: function() {
            var listView,
                addView = new AddImageView({collection: this.collection}),
                renderAddView = this.addChildView(addView);

            this.childViews.form = addView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                addView.model = data;
                addView.render();
                $(this.listView).append(addView.el);
            }
            
            Channel('addimage:fetch').subscribe(callback);
        },

	    filterWithImageType: function(type) {
		    var c = this.collection;
			$.each(c.models, function(i, field){
				if(field.selectImageType) field.selectImageType(type);
		    });
		    return c;
		},

        setupBoardView: function() {
            if (this.collection.size() == 0)
                return;
            var filtered_images = this.filterWithImageType( this.imagetype );
            var listView,
                addView = new ImageBoardView({collection: filtered_images, model: filtered_images.at(0)}),
                renderAddView = this.addChildView(addView);
            this.childViews.board = addView;
            this.callbacks.add(function() {
                renderAddView();
                addView.render();
                $(this.listView).prepend(addView.el);
            });
           
            
            function changeBoard(data) {
                addView.model = data;
                addView.render();
            }
           // this.$el.append("this is for test");
            Channel('changeimage' + this.collection.id).subscribe(changeBoard);
        }
    });

    return ImageListView;
});

