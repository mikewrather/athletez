//Vote View
//Vote and follow up button functionality

define([ 'require', 'text!roster/templates/roster.html','views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'roster/models/roster', 'roster/collections/roster' , 'roster/views/image-list', 'component/fb'], function(require, rosterTemplate) {
	var RosterView,
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
         FBComponent = require('component/fb'),
        model = require('roster/models/roster'),
        ImageList = require('roster/views/image-list'),
        collection = require('roster/collections/roster');
	
	RosterView = SectionView.extend({
		template: rosterTemplate,
		events: {
		   "click .add-to-roster-h": "addToRoster",
		   "mouseover a.tiles": "showText",
           "mouseout a.tiles": "showicon",
           "click .invite-team-player-h": "inviteFBFriend"
		},
		
       showText: function(e) {
        	$(e.target).parent().find("span").removeClass("hide");
        },
        
        // shoe icon
        showicon: function(e) {
        	$(e.target).parent().find("span").addClass("hide");        	
        },
        
         inviteFBFriend: function(e) {
        	//var fb = new FBComponent({currentTarget: e.target});
        	var _self = this, options = {};
			options.subject_id = this.team_id;
			options.enttype_id = this.controllerObject.basics.get("payload").enttypes_id;
			//options.name = "We were playing for "+ this.team_name;
			//options.picture = "http://cdn.athletez.com/resources/img/athletez_logo_small.png";
			//options.description = "",//this.team_name,
			//options.success = function() {
			//	alert("Invitation send successfully.");
			//};
			//options.error = function() {
			//	alert("Some Error Occured. Please try again.");
			//};
        	routing.trigger('fbInvite', undefined, options);
        	//fb.sendInvite(options);
        },
		
		
		initialize : function(options) {
			var _self = this;
			SectionView.prototype.initialize.call(this, options);
			_self.team_id = options.team_id;
			_self.team_name = options.team_name;
			_self.controllerObject = options.controllerObject;
			_self.viewName = options.viewName || ("Image List" + Math.random());
			_.bindAll(this);
			_self.getTeams();
		},
		
		getTeams: function() {
			var _self = this;
			if(_self.team_id) {
				_self.collection1 = new collection();
				_self.collection1.id = _self.team_id;
				_self.collection1.fetch();
				$.when(_self.collection1.request).done(function () {
					_self.setupTeamRosterListView();
				});
			}
		},
		
		setupTeamRosterListView: function() {
			var teamRosterListView, found = "";
			teamRosterListView = new ImageList({
				collection: this.collection1,
				name: this.viewName,
				dontrenderTemplate: true,
				model: new model()
			});
			
			
			if(this.checkForUser()) {
				try {
					var arr = this.collection1.toArray();
					console.error(arr);
					for(var i in arr) {
						if(arr[i].attributes.payload.id == routing.loggedInUserId) {
							found = true;
							break;
						}
					}
				} catch(e) {}
			}
			this.$el.find(".roster-images-h").html(teamRosterListView.$el);
			if(!this.$el.find(".add-to-roster-h").length) {
				var html = '<li class="teams image add-tile-outer">\
				<div>\
				<a href="javascript: void(0);" class="add-to-roster-h link-disabled pull-left tiles" title="Add to roster"></a>\
				<span class="hide">I play for '+this.team_name+'</span></div>\
				<div>\
				<span class="hide">Know somebody who plays for '+this.team_name+'</span>\
				<a href="javascript: void(0);" class="fb-invite-tile-btn invite-team-player-h tiles pull-right" title="Add to fb"></a></div>\
				</li>';
				this.$el.find(".roster-images-h ul").prepend(html);	
			}		
			// sow roster add button
            if(found == "") this.$el.find(".add-to-roster-h").removeClass("link-disabled");
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		addToRoster: function(e) {
			if(!this.checkForUser()) {
		  	   	routing.trigger('showSignup');	
		    	return;
	    	}
			
			var _self = this, modal = new model();
			modal.url = "/api/team/player/"+this.team_id;
			modal.save();
			$.when(modal.request).done(function() {
				$(e.currentTarget).parent().hide();
				_self.getTeams();
			});
		},
		
		render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
            this.$el.find(".heading-h").html(this.team_name);
        }		
	});
	
	return RosterView;
});