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
			'click .see-more-h': 'seeMore',
			"click .open-photo-player-h": "initPhotoPlayer",
			"dragover #image-place-holder" : "drag",
			"drop #image-place-holder":"drop"
		},
		
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template, {target: this.target_id});
            this.$el.html(markup);
            return this;
       },
       
       
       drag: function(event) {
			event.stopPropagation();
		    event.preventDefault();
		    event.originalEvent.dataTransfer.dropEffect = 'copy';
		},
		
		drop: function(event) {
			var _self = this;
			event.stopPropagation();
			event.preventDefault();
			var files = event.originalEvent.dataTransfer.files;
			this.files_drag=event.originalEvent.dataTransfer.files;
		    var output = [], dataum=[], k=0;
		    for (var i = 0, f; f = files[i]; i++) {
		      if (!f.type.match('image.*'))  continue;
		      var reader = new FileReader();
		      reader.onload = (function(theFile) {
		        return function(e) {
					var preview_id="preview_"+k;
				  k++;
				  dataum.push({"preview_id":preview_id, drag_info: _self.files_drag, "width":"150","height":"150","filesrc":e.target.result,"title":escape(theFile.name)}); 
				  if(k==files.length) {
					data={"data":dataum};
					_self.openImageUploader(data);
				  }
				};
		      })(f);
		      reader.readAsDataURL(f);
		    }
		},
		
		openImageUploader: function(file) {
			 var id = this.sport_id, url = this.target_url+ this.target_id,
			    attr = {
				    "sports_id" : id
			    }, image = file;
			
			routing.trigger('add-image', url, attr, image);
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
        	
        	console.error(options);
        	
	       this.pageName = (options.pageName)?options.pageName:"profile";
        	//alert(this.page);
        	if(options.collecton) this.collection = options.collection;
        	this.target_id = options.target_id;	
        	this.target_url = options.target_url;
        	this.sport_id = options.sport_id;
        	this.user_id = options.user_id;
        	this.media_id = options.media_id;
        	this.triggerItem = options.triggerItem;
			// render template
			if(!options.dontrenderTemplate) this.renderTemplate();
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
        	//$(document).off('click','.image-outer-h');
        	//$(document).on('click','.image-outer-h', function() {
			//	_self.initPhotoPlayer();
			//});
			
			if(_self.media_id) {
				setTimeout(function() {
					if(_self.allData) {
						for(var i in _self.allData) {
							if(_self.media_id == _self.allData[i].get("payload").media_id) {
								routing.trigger('photo-player-init', i, _self.allData, _self.user_id, true);
								break;
							}
						}
					}
				}, 500);
			}
        },
        
        initPhotoPlayer: function(e) {
			var index = ($(e.target).parents('li').index());  
			if(index< 0) index = 0;
       		routing.trigger('photo-player-init', index, this.allData, this.user_id, true,  this.pageName);
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
        	var _self = this;
            
            setTimeout(function() {
	            if(_self.triggerItem && !$("#add-icons").length) {
	            	$(_self.listView).prepend('<li id="add-icons"></li>');
	            	 routing.trigger(_self.triggerItem, "#add-icons");            	
            	}
            }, 0);
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

