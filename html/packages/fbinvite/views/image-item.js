// image-item.js
// -------
// Requires `define`
// Return {ImageItemView} object as constructor

define(['vendor', 'views', 'utils', 'text!packages/fbinvite/templates/image-item.html', 'packages/fbinvite/models/invite', 'utils/storage','chrome/views/header'], function(vendor, views, utils, imageItemTemplate) {

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
        },

		initialize : function(options) {
			this.template = imageItemTemplate;
			if(options.length)
			for(var i in options) {
				this[i] = options[i];
			}
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		render : function() {
			var _self = this, payload = this.model.get('payload');
			console.error(payload);
			var markup = Mustache.to_html(this.template, payload);
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
				if($num_words < 3) {
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
				else if($num_words < 25){
					$nopic_words_div.css('font-size','2em');
				}
				else if($num_words < 30){
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

			this.$el.find('.image-item-container').mouseover(function(){
				$(this).find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).find('.action-block').css({
					opacity : 90
				});
			});
			this.$el.find('.circle').mouseover(function() {
				$(this).parent().find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).parent().find('.action-block').css({
					opacity : 90
				});
			});

	        this.$el.find('.invite-h').click(function(e) {
	        	_self.invite(e);
	        });
			return this;
		},

		/**
		 * This entire block of functions here should call methods from the model so that it can be centralized
		 */

		invite: function(e) {
		   e.preventDefault();
		   e.stopPropagation();
		   
		   if(!this.checkForUser()) {
		  	   	routing.trigger('showSignup');	
		    	return;
	    	}
	    	
		    var model = new inviteModel();
			model.id = this.model.get("payload").id;
			model.setData();
			model.save();
			$.when(model.request).done(function() {
				$(e.currentTarget).addClass('link-disabled');
			});
	    }

	});

	return ImageItemView;
}); 