//Vote View
//Vote and follow up button functionality

define(['require', 'text!roster/templates/roster.html', 'views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'roster/models/roster', 'roster/collections/roster', 'roster/views/image-list', 'component/fb',  "common/views/add-media-buttons",
    "text!common/templates/add-roster-buttons.html",], function(require, rosterTemplate) {
	var RosterView, views = require('views'), facade = require('facade'), utils = require('utils'), SectionView = views.SectionView, $ = facade.$, _ = facade._, debug = utils.debug, vendor = require('vendor'), Mustache = vendor.Mustache, Channel = utils.lib.Channel, FBComponent = require('component/fb'), model = require('roster/models/roster'), ImageList = require('roster/views/image-list'), collection = require('roster/collections/roster'),
	 AddMediaView = require("common/views/add-media-buttons"),
		AddRosterViewTemplate = require("text!common/templates/add-roster-buttons.html");

	RosterView = SectionView.extend({
		template : rosterTemplate,
		events : {
			"click .add-to-roster-h" : "addToRoster",
			"mouseover a.tiles" : "showText",
			"mouseout a.tiles" : "showicon",
			"click .invite-team-player-h" : "inviteFBFriend"
		},

		showText : function(e) {
			$(e.target).parent().find("span").removeClass("hide");
		},

		// shoe icon
		showicon : function(e) {
			$(e.target).parent().find("span").addClass("hide");
		},

		afterRender : function() {
			var _self = this, t = setInterval(function() {
				$ele = _self.$el.find(".character-limit-h");
				if ($ele.length) {
					clearInterval(t);
					$ele.each(function() {
						_self.adJustFontDynamically($(this));
					});
				}
			}, 100);
		},

		inviteFBFriend : function(e) {
			var _self = this, options = {};

			options.subject_id = this.team_id;
			options.enttype_id = this.entityId;
			routing.trigger('fbInvite', undefined, options);
		},

		initialize : function(options) {
			var _self = this;
			options.mainView = this;
			this.mainView = this;
			SectionView.prototype.initialize.call(this, options);
			console.log("roster view",options);
			_self.team_id = options.team_id;
			_self.entityId = options.entityId;
			_self.team_name = options.team_name;
			_self.controllerObject = options.controllerObject;
			_self.viewName = options.viewName || ("Image List" + Math.random());
			_.bindAll(this);
			_self.getTeams();
		},

		getTeams : function() {
			var _self = this;
			if (_self.team_id) {
				_self.collection1 = new collection();
				_self.collection1.id = _self.team_id;
				_self.collection1.fetch();
				$.when(_self.collection1.request).done(function() {
					_self.setupTeamRosterListView();
				});
			}
		},

		setupTeamRosterListView : function() {
			var teamRosterListView,
				isInRoster = false;

			teamRosterListView = new ImageList({
				collection : this.collection1,
				name : this.viewName,
				mainView : this,
				dontrenderTemplate : true,
				model : new model()
			});

			if (this.checkForUser()) {
				try {
					var arr = this.collection1.toArray();
					for (var i in arr) {
						if (parseInt(arr[i].attributes.payload.id) === parseInt(routing.loggedInUserId)) {
							isInRoster = true;
							break;
						}
					}
				} catch(e) {
				}
			}
			this.$el.find(".roster-images-h").html(teamRosterListView.$el);
			//if (!this.$el.find(".add-to-roster-h").length) {
			//	var html = '<li class="teams image add-tile-outer">' + '<div class="add-icons-outer"><div>' + '<a href="javascript: void(0);" class="add-to-roster-h link-disabled pull-left tiles" title="Add to roster"></a>' + '<span class="hide character-limit-h">I play for ' + this.team_name + '</span></div>' + '<div>' + '<a href="javascript: void(0);" class="fb-invite-tile-btn invite-team-player-h tiles pull-right" title="Add to fb"></a>' + '<span class="hide character-limit-h">Know somebody who plays for ' + this.team_name + '</span>' + '</div></div></li>';
			//	this.$el.find(".roster-images-h ul").prepend(html);
			//}
			// sow roster add button
			if (isInRoster)	this.$el.find(".roster-heading-h").find(".add-to-roster-list-h").addClass("link-disabled");
		},

		checkForUser : function() {
			if (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},

		addToRoster : function(e) {

			var _self = this, modal = new model();

			var addToList = function(callback) {
				modal.url = "/api/team/player/" + _self.team_id;
				modal.save();
				$.when(modal.request).done(function() {
					$(e.currentTarget).addClass("link-disabled");
					_self.getTeams();
					if (callback)
						callback();
				});
			};

			if (!_self.checkForUser()) {
				routing.trigger('showSignup', function(callback) {
					addToList(function() {
						if (callback)
							callback();
					});
				});
			} else {
				addToList();
			}

		},

		render : function(domInsertion, dataDecorator, partials) {
			SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);
			//this.$el.find(".heading-h").html(this.team_name);
			
			// set up add media and heading 
				var addRoster = new AddMediaView({
					target: this.$el.find(".roster-heading-h"),
					heading: this.team_name,
					team_id: this.team_id,
					team_name: this.team_name,
					entityId: this.entityId,
					addToRoster: this.addToRoster,
					template: AddRosterViewTemplate
				});
		}
	});

	return RosterView;
}); 