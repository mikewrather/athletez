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
	
	VoteView = SectionView.extend({
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
			SectionView.prototype.initialize.call(this, options);
		},
		
		render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
            var payload = this.model.get('payload');
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
        }
		
	});
	
	return VoteView;
});