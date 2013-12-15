//Vote View
//Vote and follow up button functionality

define([ 'require', 'text!roster/templates/roster.html','views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'roster/models/roster', 'roster/collections/roster' , 'roster/views/image-list'], function(require, rosterTemplate) {
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
        model = require('roster/models/roster'),
        ImageList = require('roster/views/image-list'),
        collection = require('roster/collections/roster');
	
	RosterView = SectionView.extend({
		template: rosterTemplate,
		events: {
			"click .add-to-roster-h": "addToRoster"
		},
		
		initialize : function(options) {
			var _self = this;
			SectionView.prototype.initialize.call(this, options);
			_self.team_id = options.team_id;
			_self.team_name = options.team_name;
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
			this.$el.find(".roster-images-h ul").prepend('<li class="teams hide image"><a href="javascript: void(0);" class="add-to-roster-h" title="Add to roster">Add to Roster</a></li>');			
			// sow roster add button
            if(found == "") this.$el.find(".add-to-roster-h").parent().removeClass("hide");

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