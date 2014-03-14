// image-item.js
// -------
// Requires `define`
// Return {ImageItemView} object as constructor

define(['vendor', 'views', 'utils', 'text!media/templates/image-item.html', 'votes/models/vote',

        'votes/models/follow','utils/storage','chrome/views/header', 'common/models/delete','common/models/entparse'], function(vendor, views, utils, imageItemTemplate) {

	var ImageItemView, $ = vendor.$, BaseView = views.BaseView, Mustache = vendor.Mustache,
	voteModel = require('votes/models/vote'),
	Store = require('utils/storage'),
    followModel = require('votes/models/follow'),

    DeleteModel = require('common/models/delete'),
    header = require('chrome/views/header'),
	entParser = require('common/models/entparse');

	ImageItemView = BaseView.extend({
		tagName : "li",
		className : "image",
		// Event handlers...
		 events: {
			"click .vote-h": "vote",
	        "click .follow-h": "follow",
			"click .edit-h": "edit",
			"click .delete-h": "delete"
        },

		initialize : function(options) {
			this.template = imageItemTemplate;
			if(options.length)
			for(var i in options) {
				this[i] = options[i];
			}
			if(options.mainView) this.mainView = options.mainView;
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		render : function() {
			var _self = this, payload = this.model.get('payload');
			if(_.isArray(payload) || payload.image_id == 0) { return false; }
			
			//the extra object is created here using the entity parsing model
			var parser = new entParser({mpay:payload});
			var extra = parser.parsedData;
			extra._media_id = payload.media_id;
			//console.log("Called Image Render", extra);
			var markup = Mustache.to_html(this.template, extra);
			this.$el.html(markup);

			var game_detail_view_height = '120px', detail_view_height = '92px';

			this.$el.find('.image-item-container').mouseout(function() {
				$(this).find('.action-block').css({
					opacity : 0
				});
				
				$(this).find('.detail-view').css({
					'bottom' : '-' + detail_view_height
				});
				
				$(this).find('.detail-view.game').css({
					'bottom' : '-' + game_detail_view_height
				});
			});

			$nopic_words_div = this.$el.find('.game-tile');
			if($nopic_words_div.length){
				$num_words = $nopic_words_div.text().length;
				console.log($num_words);
				if($num_words < 3){
					$nopic_words_div.css({
						'font-size':'5em',
						'top':'90px',
						'left':'60px'
					});
				}
				else if($num_words < 5){
					$nopic_words_div.css({
						'font-size':'4em',
						'top':'90px',
						'left':'40px'
					});
				}
				else if($num_words < 25) {
					$nopic_words_div.css('font-size','2em');
				}
				else if($num_words < 30) {
					$nopic_words_div.css({
						'font-size':'1.7em',
						'top':'65px'
					});
				}
				else if($num_words < 40){
					$nopic_words_div.css({
						'font-size':'1.5em',
						'top':'50px'
					});
				}
				else{
					$nopic_words_div.css('font-size','1em');
				}
			}

			if(!routing.mobile) {
				//set image positon
				if(extra.imgData.maxwidth)
					this.$el.find('img.list-thumbnail').css({
						'max-width':extra.imgData.maxwidth,
						'left':extra.imgData.left
					});
			}
			if(extra.imgData.maxheight)
				this.$el.find('img.list-thumbnail').css({
					'max-height':extra.imgData.maxheight,
					'top':extra.imgData.top
				});


			if(extra.show_play){
				this.$el.append('<div class="circle open-photo-player-h"><div class="play"></div></div>');
			}

			function show_details(e)
			{
				console.log($(this),e);

			}
			this.$el.find('.image-item-container').mouseover(function(){
				$(this).find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).find('.action-block').css({
					opacity : 90
				});
			});
			this.$el.find('.circle').mouseover(function(){
				$(this).parent().find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).parent().find('.action-block').css({
					opacity : 90
				});
			});

			 this.$el.find('.vote-h').click(function(e) {
	        	_self.vote(e);
	        });
	        
	        this.$el.find('.follow-h').click(function(e) {
	        	_self.follow(e);
	        });
	        
	        this.$el.find('.edit-h').click(function(e) {
	        	_self.edit(e);
	        });
	        
	        this.$el.find('.delete-h').click(function(e) {
	        	_self['delete'](e);
	        });
			return this;

			//console.log("Called Image Render",this.model);
			//var markup = Mustache.to_html(this.template, this.model.toJSON());
			//this.$el.html(markup);
			//return this;
		},

		/**
		 * This entire block of functions here should call methods from the model so that it can be centralized
		 */

		vote: function(e)
	    {
		   e.preventDefault();
		   e.stopPropagation();
			
			var _self = this, voteFn = function(callback) {
				var voteModelOb = new voteModel();
				voteModelOb.subject_id = _self.model.get("payload").id;
				voteModelOb.entity_id = _self.model.get("payload").enttypes_id;
				voteModelOb.setData();
				voteModelOb.save();
				$.when(voteModelOb.request).done(function() {
					$(e.currentTarget).addClass('link-disabled').html('voted');
					if(callback) callback();
				});	
			};	   

		   if(!_self.checkForUser()) {
		  	   	routing.trigger('showSignup', function(callback) {
		  	   		voteFn(function() {
			     		if(callback) callback();
			     	});
			     });	
	    	} else {
	    		voteFn();
	    	}
	    },

	    follow: function(e) {
		   e.preventDefault();
		    console.log(e.target);
		    e.stopPropagation();
		    var _self = this, followFn = function(callback) {
		    	var followModelOb = new followModel();
				followModelOb.subject_id = _self.model.get("payload").id;
				followModelOb.entity_id = _self.model.get("payload").enttypes_id;
				followModelOb.save();
				$.when(followModelOb.request).done(function() {
					if(typeof(followModelOb.get('payload').follower) =='object' && typeof(followModelOb.get('payload').subject) =='object' && followModelOb.get('payload').id > 0) {
						$(e.currentTarget).addClass('link-disabled').html('following');
					}
					if(callback) callback();
				});
		    };
		    
		    if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	followFn(function() {
			     		if(callback) callback();
			     	});
			     });
	    	} else {
	    		followFn();
	    	}
	    },

		edit: function(e) {
			e.stopPropagation();
			e.preventDefault();
		},

		'delete': function(e) {
			e.stopPropagation();
			e.preventDefault();

			deleteModel = new DeleteModel();
			deleteModel.subject_id = $(e.currentTarget).attr("subject-id");
			deleteModel.enttypes_id = $(e.currentTarget).attr("subject-type-id");
			deleteModel.removeNode =$(e.currentTarget).parents("li.image");
			deleteModel.destroyAndRemove();
			if(this.mainView && this.mainView.showAddButton && _.isFunction(this.mainView.showAddButton)) this.mainView.showAddButton();
		}

	});

	return ImageItemView;
}); 