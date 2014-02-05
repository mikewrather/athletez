// The CommentOn List
// --------------

define(['facade', 'vendor', 'utils', 'views', "text!usercontrol/photo-player/templates/tags.html", "usercontrol/photo-player/views/tags-item","usercontrols/photo-player/models/tags","jquery.slimscroll"],
function(facade, vendor,  utils, views) {

    var TagListView, _ = facade._,
		CollectionView = views.CollectionView,
		SectionView = views.SectionView,
		Mustache = vendor.Mustache,
        Channel = utils.lib.Channel,
	    tagListTemlate = require("text!usercontrol/photo-player/templates/tags.html"),
	    TagItemView = require("usercontrol/photo-player/views/tags-item"),
	    TagsSectionmodel = require("usercontrols/photo-player/models/tags");
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
			'click .see-more-h': 'seeMore',
			"click .photo-player-detail-arrow": "toggleDetail"
		},
		
		toggleDetail: function(e) {
			if($(e.currentTarget).hasClass("down-arrow-photoplayer")) {
				$(e.currentTarget).removeClass("down-arrow-photoplayer");
				$(e.currentTarget).addClass("up-arrow-photoplayer");
				this.$el.find("#tags-list").slideDown();
			} else {
				$(e.currentTarget).removeClass("up-arrow-photoplayer");
				$(e.currentTarget).addClass("down-arrow-photoplayer");
				this.$el.find("#tags-list").slideUp();
			}
		},
		
		// render list template
		renderTemplate: function () {
            var markup = Mustache.to_html(this.template);
            this.$el.html(markup);
            return this;
       },
		
        initialize: function(options) {
        	this.renderTemplate();
	        console.log(options);
	         var _self = this;
	         this.name = options.name;
	         this.collection = options.collection;
	        this.uploader_id = options.uploader;
	         console.log(this.collection.toJSON());
			 _self.allData = this.collection.toArray();
			_self.cleardata();
	        _self.getprofile();
			$(".photo-player-right-area").slimScroll({
   			 height: '100%'
			});
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
        	
        	var len = this.allData.length,
		        limit = (len < this.page_limit)?len:this.page_limit,
		        start = len - (this.page * limit),
		        end = start + this.page_limit;
			
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
        getprofile:function(){

			var urlmain ='/api/user/basics/' + this.uploader_id;
			this.model.set('url',urlmain);
			var mymodel = new TagsSectionmodel({id:this.uploader_id});
			mymodel.fetch({
				success: (function (msg) {
                //	        alert(' Service request success: ');
                	        var element = '<div class="user-photo-profile"><img src='+msg.attributes.payload.user_picture_obj.image_path+' alt=""></div><div class="content-prof-sub"><span class="user-comment">Uploaded By&nbsp;</span><span class="user-comment">'+msg.attributes.payload.label+'</span></div>';
                	        $(".prof-name-area").html(element);
                    	})
			});
        },
        cleardata:function(){
        	$(".headerinfo").empty();
        	$(".teamName-area").empty();
        	$(".prof-name-area").empty();
        },
	    // Child views...
        childViews: {}
    });
    return TagListView;
});