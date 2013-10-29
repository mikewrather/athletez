//Vote View
//Vote and follow up button functionality

define([ 'require', 'text!votes/templates/vote.html','views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'votes/models/vote', 'votes/models/follow'], function(require, voteTemplate) {
	var VoteView,
		views = require('views'),
		facade = require('facade'),
		utils = require('utils'),
		SectionView = views.SectionView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		vendor = require('vendor'),
        Mustache = vendor.Mustache,
        Channel = utils.lib.Channel,
        voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow');
	
	VoteView = facade.Backbone.View.extend({
		template: voteTemplate,
		events: {
			'click .team-action-h': 'vote',
			'click .follow-action-h': 'follow'
		},
		
		vote: function(e) {
			if(!this.checkForUser()) {
		  		
		  	   	routing.trigger('showSignup');	
		    	return;
	    	}
			this.voteModelOb.save();

		//	$(e.target).removeClass('team-action-h').addClass('team-noaction-h');

			$.when(this.voteModelOb.request).done(function() {
				$(e.currentTarget).addClass('link-disabled');
			});

		},
		
		follow: function(e) {
			if(!this.checkForUser()) {
		  	   	routing.trigger('showSignup');	
		    	return;
	    	}
			this.followModelOb.save();

		//	$(e.target).removeClass('follow-action-h').addClass('follow-noaction-h');

			$.when(this.followModelOb.request).done(function() {
				$(e.currentTarget).addClass('link-disabled');
			});

			Channel('new-fan').publish();
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		initialize : function(options) {
			var _self = this;
			_.bindAll(this);
			for(var i in options) {
				this[i] = options[i];
			}
			this.render();
			//SectionView.prototype.initialize.call(this, options);
		},
		
		render: function () {
			var payload = this.model.get('payload');
			var markup = Mustache.to_html(this.template, {data: payload});
            this.$el.html(markup);
            
            if(!payload.has_voted) {
				this.voteModelOb = new voteModel();
				this.voteModelOb.subject_id = payload.id;
				this.voteModelOb.entity_id = payload.enttypes_id;
				this.voteModelOb.setData();							
			} else {
				this.$el.find(".team-action-h").addClass('link-disabled');
			}
			
			if(!payload.is_following) {
				this.followModelOb = new followModel();
				this.followModelOb.subject_id = payload.id;
				this.followModelOb.entity_id = payload.enttypes_id;
			} else {
				this.$el.find(".follow-action-h").addClass('link-disabled');
			}
			
			return this.$el.html();
        }
		
	});
	
	return VoteView;
});