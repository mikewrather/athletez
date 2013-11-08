// The Participants List
// --------------

define(['facade','views', 'utils', 'media/views/image-item','text!game/templates/participats-list.html', 'game/models/addparticipate', 'common/models/add'], 
function(facade,  views,   utils,   ItemView,  templateList, Participate, addModel) {

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
		template : templateList,
        // Tag for the child views
        _tagName: "li",
        _className: "image",
		page: 0,
		page_limit: 8,
		listView : ".image-list",
        // Store constructor for the child views
        _view: ItemView,
		events: {
			'click .see-more-h': 'seeMore'
			//'click .add-comment': 'addParticipant'
			//'click .add-media': 'addParticipant'
		},
		
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template, {target: this.target_id});
            this.$el.html(markup);
            return this;
        },
       
        addParticipant: function() {
       		var participants = new Participate(), _self = this;
       		participants.set({games_id: this.game_id, sports_id: this.sports_id});
       		participants.save();
       		$.when(participants.request).done(function() {
       			var newAddModel = new addModel();
				newAddModel.processItemFromPayload(participants.toJSON());
				_self.$el.find(".add-to-event").hide();
       			_self.collection.add(newAddModel);
       		});
        },
             
             
        initialize: function(options) {
        	var _self = this;
        	$(document).off("click", ".add-to-event");
        	$(document).on("click", ".add-to-event", function() {
        		_self.addParticipant();
        	});
        	$(".participants-heading-h").removeClass("hide");
        	if(options.name)
        		this.name = options.name;
        	else
        		this.name = "image list";
        	
        	if(options.collecton) this.collection = options.collection;
        	
        	this.controller = options.controller;
        	this.sports_id = options.sports_id;
        	this.game_id = this.collection.id;
        	
        	this.renderTemplate();
        	
        	var json = this.collection.toArray();  
        	var a = json[0].get("payload"), b = [];
        	for(var i in a) {
        		console.error(routing.loggedInUserId == a[i].id);
        		if(routing.loggedInUserId == a[i].id) {
        			this.$el.find(".add-to-event").hide();
        		}
        		b.push({payload: a[i]});
        	}
        	
        	this.collection.reset(b);   
        	this.target_id = options.target_id;	
        	this.target_url = options.target_url;
        	this.sport_id = options.sport_id;
			// render template
			
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
        	this.setupAddView();
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
		}
    });

    return ImageListView;
});

