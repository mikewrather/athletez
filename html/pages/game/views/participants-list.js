// The Participants List
// --------------

define(['facade','views', 'utils', 'media/views/image-item','text!media/templates/image-list.html'], 
function(facade,  views,   utils,   ItemView,  templateList) {

    var ImageListView, 
        ImageListAbstract,
        $ = facade.$,
        _ = facade._,
	    vendor = require("vendor"),
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView,
	    Mustache = vendor.Mustache;

    ParticipantsView = CollectionView.extend(SectionView.prototype);

    return ParticipantsView.extend({

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
        _view: ItemView,
		//template: imageListTemplate,
		events: {
			'click .see-more-h': 'seeMore'
		},
		
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template, {target: this.target_id});
            this.$el.html(markup);
            return this;
       },
       
       
        initialize: function(options) {
        	$(".participants-heading-h").removeClass("hide");
        	if(options.name)
        		this.name = options.name;
        	else
        		this.name = "image list";
        	
        	if(options.collecton)
        		this.collection = options.collection;
        		
        	var json = this.collection.toArray();
        	var a = json[0].get("payload"), b = [];
        	for(var i in a) {
        		b.push({payload: a[i]});
        	}
        	this.collection.reset(b);	
        		
        	this.target_id = options.target_id;	
        	this.target_url = options.target_url;
        	this.sport_id = options.sport_id;
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
        	//this.setupAddView();
        	//$(document).off('click','.image-outer-h');
        	//$(document).on('click','.image-outer-h', function() {
			//	_self.initPhotoPlayer();
			//});
        	
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
	           // if(this.setupAddView) this.setupAddView();   
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
		}
    });

    return ImageListView;
});

