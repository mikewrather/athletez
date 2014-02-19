// image-item.js
// -------
// Requires `define`
// Return {ImageItemView} object as constructor

define(['vendor', 'views', 'utils', 'text!packages/fbinvite/templates/image-item.html', 'packages/fbinvite/models/invite', 'utils/storage','chrome/views/header', 'component/fb'], function(vendor, views, utils, imageItemTemplate) {

	var ImageItemView, $ = vendor.$, BaseView = views.BaseView, Mustache = vendor.Mustache,
	voteModel = require('votes/models/vote'),
	Store = require('utils/storage'),
    inviteModel = require('packages/fbinvite/models/invite'),
    header = require('chrome/views/header'),
    FBComponent = require('component/fb'),
	entParser = require('common/models/entparse');

	ImageItemView = BaseView.extend({
		tagName : "li",
		className : "image",
		// Event handlers...
		 events: {
         },

		initialize : function(options) {
			this.template = imageItemTemplate;
			this.FBoptions = options.FBoptions || {};
			if(options.length)
			for(var i in options) {
				this[i] = options[i];
			}
			if(this.FBoptions.invite_type === undefined || this.FBoptions.invite_type === null) this.FBoptions.invite_type = "join";
			this.FBComponent = new FBComponent();
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		render : function() {
			var _self = this, payload = this.model.get('payload');
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
		
		postMessage: function(e) {
			var _self = this, options = {};
			options.link = "#acceptfbinvite/"+this.model.get("payload").id;
			options.name = "Come join Me on Atheletez";
			options.picture = "http://cdn.athletez.com/resources/img/athletez_logo_small.png";
			options.description = "You have been invited to sign up for http://athletez.com";
			options.success = function() {
				_self.callModel(e);
			};
			options.error = function() {
				alert("Some Error Occured. Please try again.");
			};				
 			options.to = this.model.get("payload").id;
			this.FBComponent.sendInvite(options);
		},
		
		callModel: function(e) {
			var model = new inviteModel();
			model.set({'fbid': this.model.get("payload").id});
			console.log(this.FBoptions);
			if(this.FBoptions) model.set({invite_type:this.FBoptions.invite_type,'invite_to': {subject_id: this.FBoptions.subject_id, enttype_id: this.FBoptions.enttype_id}});
			model.save();
			$.when(model.request).done(function() {
				$(e.target).addClass('link-disabled');
			});
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
	    	this.postMessage(e);
	    }

	});

	return ImageItemView;
}); 