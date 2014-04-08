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
        'roster/models/roster',
		'vendor',
        "vendor/plugins/qtip/qtip-wrapper",
        "text!vendor/plugins/qtip/qtip.css"
        ], function(require, headingTemplate) {

    var AddImageView,
        facade = require('facade'),
        views = require('views'),
        followModel = require( 'votes/models/follow'),
        model = require('roster/models/roster'),
        BaseView = views.BaseView,
	    vendor = require('vendor'),
	    Mustache = vendor.Mustache;

    AddImageView = BaseView.extend({

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        	"click .add-image-h": "addImage",
        	"click .add-video-h": "addVideo",
        	'click .question'   : "addQuestion",
        	"click .add-to-list-h": "addToList",
        	"click .invite-fans-from-fb-h": "InviteFromFB",
	        "click .invite-participant-from-fb-h": "InviteFromFB",
        	"click .add-to-roster-list-h": "addToRoster",
	        "click .add-to-participants-list-h": "addParticipant",
        	"click .invite-roster-from-fb-h": "InviteFromFB"
        },
        
        addImage: function(e) {
	        var page = $(e.currentTarget).data('page-base') || "user",
		        ent_id = $(e.currentTarget).data('ent-id'),
		        sports_id = $(e.currentTarget).data('sports-id');

        	 ga('send', 'event', 'Open-Add-Popup', 'Image', 'User opened ' + page + ' image uploader', ent_id);
             var id = $('.selected-sport-h').data('id') || $(".sports-h").val() || $(".sports-h").attr("data-id"),
                url = "/api/" + page  + "/addimage/" + ent_id,
			    attr = {
				    "sports_id" : sports_id
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

	    addParticipant: function(e){
		    routing.trigger("add-to-event");
	    },
        
        addToList: function(e) {
        	e.preventDefault();
		    var ob = routing.showSpinner(e.currentTarget), _self = this, followFn = function(callback) {
		    	var followModelOb = new followModel();
				followModelOb.subject_id = _self.collection.id;
				followModelOb.entity_id = _self.controllerObject.basics.get("payload").enttypes_id;
				followModelOb.save();
				$.when(followModelOb.request).done(function() {
					routing.hideSpinner(ob, e.currentTarget);
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

	    InviteFromFB: function(e){
		    var _self = this,
			    options = {};

		    console.log(_self.controllerObject);

		    if(_self.data.inviteData == undefined || !typeof(_self.data.inviteData) === 'object'){
			    options.invite_type = 'follow';
			    options.subject_id = _self.target_id ? _self.target_id : _self.controllerObject.basics.get("payload").id;
			    options.enttype_id = _self.controllerObject.basics.get("payload").enttypes_id;
		    }
		    else{
			    options = _self.data.inviteData;
		    }

		    console.log(options);

		    var inviteFb = function() {
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
        /*
        InviteFansFromFB: function(e) {
        	var _self = this, options = {};
	        console.log(_self.controllerObject.basics.get("payload"));
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
        */
        addToRoster: function(e) {
        	if(this.addToRoster) this.addToRoster();
        },
        /*
        inviteRosterFromFB: function(e) {
        	var _self = this, options = {};
			options.subject_id = this.team_id;
			options.enttype_id = this.entityId;
			routing.trigger('fbInvite', undefined, options);
        },
        */
        className: "pull-left",        
        initialize: function(options) {
	        console.error(options);
        	for(var i in options) {
        		this[i] = options[i];
        	}
        	
			this.data = options;        	
        	
        	this.render();
        },

        render: function () {
        	var _self = this, markup = Mustache.to_html(headingTemplate, {heading: this.heading});
            this.$el.html(markup);
            $(this.target).html(this.$el);
            
            var markupButtons = Mustache.to_html(this.template, {data: this.data});
        	this.$el.find(".buttons-h").html(markupButtons);

        	this.$el.find("a").each(function() {
        	$(this).qtip2({
				content: $(this).data("content"),
				position: {
				  my: "bottom center",
				  at: "top center"
				},
				//tip: 'leftMiddle',
				style: {
					classes: $(this).data('tip-style')
				}
			});
        	
        	});        	
        }
    });

    return AddImageView;
});