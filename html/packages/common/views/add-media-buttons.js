// Add Image View
// ---------
// Input form to add image

// Package Media
// Requires define
// Returns {AddImageView} constructor

define([
        'require', 
        "text!common/templates/heading.html",
        'facade', 
        'views',
        'votes/models/follow',
        'roster/models/roster'
        ], function(require, headingTemplate) {

    var AddImageView,
        facade = require('facade'),
        views = require('views'),
        followModel = require( 'votes/models/follow'),
        model = require('roster/models/roster'),
        BaseView = views.BaseView;

    AddImageView = BaseView.extend({

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        	"click .add-image-h": "addImage",
        	"click .add-video-h": "addVideo",
        	'click .question'   : "addQuestion",
        	"click .add-to-list-h": "addToList",
        	"click .invite-fans-from-fb-h": "InviteFansFromFB",
        	"click .add-to-roster-list-h": "addToRoster",
        	"click .invite-roster-from-fb-h": "inviteRosterFromFB"
        },
        
        addImage: function(e) {
        	 ga('send', 'event', 'Open-Add-Popup', 'Image', 'User opened image uploader', this.model.userid);
             var id = $('.selected-sport-h').data('id'), url = "/api/user/addimage/" + this.model.userid,
                url = "/api/user/addimage/" + this.model.userid,
			    attr = {
				    "sports_id" : id
			    };
			routing.trigger('add-image', url, attr);
        },
        
        addVideo: function(e) {
        	//** firing the call back list
			ga('send', 'event', 'Open-Add-Popup', 'Video', 'User opened video uploader', this.model.userid);
			var url = "/api/user/addvideo/" + this.model.userid;
			Channel('add-video').publish(url);
        },
        
        addQuestion: function(e) {
        	
        },
        
        checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},

        
        addToList: function(e) {
        	e.preventDefault();
		    var _self = this, followFn = function(callback) {
		    	var followModelOb = new followModel();
				followModelOb.subject_id = _self.collection.id;
				followModelOb.entity_id = _self.controllerObject.basics.get("payload").enttypes_id;
				followModelOb.save();
				$.when(followModelOb.request).done(function() {
					if(typeof(followModelOb.get('payload').follower) =='object' && typeof(followModelOb.get('payload').subject) =='object' && followModelOb.get('payload').id > 0) {
						$(e.target).addClass('link-disabled');
						if(_self.controllerObject && _self.controllerObject.reloadFans) _self.controllerObject.reloadFans();
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
        
        InviteFansFromFB: function(e) {
        	var _self = this, options = {};
			var inviteFb = function() {
				options.invite_type = 'follow';
				options.subject_id = _self.target_id;
				options.enttype_id = _self.controllerObject.basics.get("payload").enttypes_id;
				routing.trigger('fbInvite', undefined, options);
			};
			
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	inviteFb(function() {
			     		if(callback) callback();
			     	});
			     });
	    	} else {
	    		inviteFb();
	    	}
        },
        
        addToRoster: function(e) {
        	if(this.addToRoster) this.addToRoster();
        },
        
        inviteRosterFromFB: function(e) {
        	var _self = this, options = {};
			options.subject_id = this.team_id;
			options.enttype_id = this.entityId;
			routing.trigger('fbInvite', undefined, options);
        },
        
        className: "pull-left",        
        initialize: function(options) {
        	for(var i in options) {
        		this[i] = options[i];
        	}
        	this.render();
        },

        render: function () {
        	var markup = Mustache.to_html(headingTemplate, {heading: this.heading});
            this.$el.html(markup);
            $(this.target).html(this.$el);      
            var markupButtons = Mustache.to_html(this.template, {heading: this.heading});
        	this.$el.find(".buttons-h").html(markupButtons);
        }
    });

    return AddImageView;
});