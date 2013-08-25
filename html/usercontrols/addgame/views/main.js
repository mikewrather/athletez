/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Add Game VIEW} constructor
 */
define(['require', 'text!usercontrols/addgame/templates/layout.html', 'facade', 'views', 'utils', 'vendor',
'user/models/basic_info', 
'sportorg/collections/sports_listall', 
'location/collections/states', 
'usercontrols/addgame/collections/teams', 
'location/collections/cities', 
'usercontrols/addgame/collections/teams_user', 
'usercontrols/addgame/collections/teams' 
], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$, BasicModel = require('usercontrols/tag/models/basic_info'), 
	SportsCollection = require('sportorg/collections/sports_listall'), 
	StatesCollection = require('location/collections/states'), 
	CityCollection = require('location/collections/cities'), 
	UserTeamsCollection = require('usercontrols/addgame/collections/teams_user'), 
	TeamsCollection = require('usercontrols/addgame/collections/teams'),

	//Models
	AddGameView = SectionView.extend({

		template : layoutTemplate,

		/*Data to be sent as parameter in call back function*/
		gameData : {

		},
		/*Bind Events on controls present in current view template*/
		events : {
			"change .ddl-game-sports_h" : "changeSport",
			'keyup .txt-game-state_h' : 'keyupState',
			'blur .txt-game-state_h' : 'changeState',
			'keyup .txt-game-city_h' : 'keyupCity',
			'blur .txt-game-city_h' : 'changeCity',
			'keyup .txt-game-team_h' : 'keyupTeam',
			'blur .txt-game-team_h' : 'changeTeam',
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			sectionAddSports : ".section-Add-Sports_h",
			txtGameDate : ".txt-game-date_h",
			txtGameTime : ".txt-game-time_h",
			ddlTimePeriod : ".ddl-time-period_h",
			ddlSports : ".ddl-game-sports_h",
			sectionTeams : ".section-game-teams_h",
			ddlUserTeams : ".ddl-game-userteams_h",
			btnNewTeam : ".btn-new-team-game_h",
			sectionNewTeam : ".section-new-team_h",
			txtState : ".txt-game-state_h",
			txtCity : ".txt-game-city_h",
			txtTeam : ".txt-game-team_h",

			sectionScore : ".section-score_h",
			rdoTeamOne : ".rdo-team1_h",
			rdoTeamTwo : ".rdo-team2_h",

			// LABELS
			fieldMessage : '.field-message',
			fieldError : '.field-error',
		},

		attributes : {
			stateId : 'stateid',
			schoolId : 'schoolid',
			teamId : 'teamid',
			playersId : 'playerid',
			cityId : 'cityid'
		},
		inlineTemplates : {

		},
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Does Not Exist . ",
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			console.log("initialize addgame");
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);

			this.init();

		},

		/*render displays the view in browser*/
		render : function() {
			SectionView.prototype.render.call(this);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
			if (!options.channel) {
				throw new Error("call back channel is must for this");
			} else {
				this.channel = options.channel;
			}
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			console.log("init addgame");
			self.setupView();
		},
		setupView : function() {
			self.setUpMainView();
			self.fillSports();

		},
		setUpMainView : function() {
			var markup = Mustache.to_html(self.template, {});
			$(self.el).html(markup);
		},

		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function() {
			console.log("Fill Sports");
			if (self.sports && self.sports.length > 0) {
				self.SetupSportsView(orgs_id, destination);
			} else {
				var List = new SportsCollection();
				List.processResult = function(collection) {
					self.SetupSportsView(collection);
				};
				List.fetch();
			}
		},
		SetupSportsView : function(List) {
			var models = List.toJSON();
			if (models == null || models.length < 1) {
				$(self.destination).find(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.sports = [];
			for (var key in models) {
				self.sports.push(models[key].payload);
			}
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.sports, 'sport_name', false);
			self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', $(self.destination).find(self.controls.ddlSports), 'Select Sport');
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(e) {
			if ($(e.target).val() && $(e.target).val() != 0) {

				$(e.target).parents(self.controls.sectionTeams).fadeIn();
				$(self.destination).find("input").attr(self.attributes.stateId,$(e.target).val());
				self.fillTeams($(e.target).val());
			} else{
			
				$(e.target).parent().find(self.controls.sectionTeams).fadeOut();
				$(self.destination).find("input").removeAttr(self.attributes.stateId);
			}
		
		},
		fillTeams : function(sport_id) {
			var List = new UserTeamsCollection();
			List.user_id = self.user_id;
			List.sports_id = sport_id;
			List.processResult = function(collection) {
				self.setUpUserTeams(collection);
			};
			List.fetch();
		},
		setUpUserTeams : function(List) {
			var models = List.toJSON();
			console.log("Models Teams", models);
			if (models == null || models.length < 1) {
				$(self.destination).find(self.controls.ddlUserTeams).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.teams = [];
			for (var key in models) {
				self.teams.push(models[key].payload);
			}
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.teams, 'team_name', false);
			self.setDropdownOptions(self.teams, 'team_name', 'team_id', $(self.destination).find(self.controls.ddlUserTeams), 'Select Team');
		},
		/**/
		 /*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(e) {
			var state = $(e.target).val();
			var stateArr = [];
			if (state != '') {
				if (self.isValidAutoCompleteKey(e) == true) {
					// Hide all other controls
					$(e.target).removeAttr(self.attributes.stateId);
					self.CheckTeamControlsVisibility();

					//Create Collection
					var stateList = new StatesCollection();
					stateList.state_name = $(e.target).val();
					stateList.fetch();
					$.when(stateList.request).done(function() {
						/*Don't Show Auto Complete In Case Of Error*/
						if (stateList.isError())
							return;

						var models = stateList.toJSON();
						if (models == null || models.length < 1)
							self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
						else
							self.$(e.target).parent().find(self.controls.fieldMessage).html('').fadeOut();

						self.states = [];
						for (var key in models) {
							self.states.push(models[key].payload);
						}
						self.states.forEach(function(value, index) {
							stateArr.push(value['name']);
						});
						// Destroy existing autocomplete from text box before attaching it again
						// try catch as for the first time it gives error
						try {
							$(e.target).autocomplete("destroy");
						} catch(ex) {
						}
						
						$(e.target).autocomplete({
							source : stateArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						$(e.target).trigger('keydown');
					});
				} else {
					self.changeState(e);
				}
			}
		},

		/*Change state_id as per the selected record from auto complete for state created in keyupState*/
		changeState : function(e) {
			var state_name = $(e.target).val();
			$(e.target).removeAttr(self.attributes.stateId);
			var isStateValid = false;
			self.states_id = '';
			if (self.states) {
				self.states.forEach(function(value, index) {
					if (value['name'] == state_name) {
						isStateValid = true;
						self.states_id = value['id'];
						$(e.target).attr(self.attributes.stateId, self.states_id);
						$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtCity).attr(self.attributes.stateId, self.states_id).fadeIn();
						$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).attr(self.attributes.stateId, self.states_id).fadeOut();
					}

				});
			}
			if (!isStateValid) {
				self.states_id = 0;
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).removeAttr(self.attributes.stateId).fadeOut();
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtCity).removeAttr(self.attributes.stateId).fadeOut();
			}
			// Hide all other controls
			self.CheckTeamControlsVisibility();

		},

		/********************************************************************************************************/
		/**/
		 /*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupCity : function(e) {
			var city = $(e.target).val();
			var cityArr = [];
			if (city.length > 2) {
				if (self.isValidAutoCompleteKey(e) == true) {
					// Hide all other controls
					$(e.target).removeAttr(self.attributes.cityId);
					self.CheckTeamControlsVisibility();

					//Create Collection
					var List = new CityCollection();
					List.city_name = $(e.target).val();
					List.fetch();
					$.when(List.request).done(function() {
						/*Don't Show Auto Complete In Case Of Error*/
						if (List.isError())
							return;

						var models = List.toJSON();
						console.log("City Models", models);
						if (models == null || models.length < 1)
							self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
						else
							self.$(e.target).parent().find(self.controls.fieldMessage).html('').fadeOut();

						self.cities = [];
						for (var key in models) {
							self.cities.push(models[key]);
						}
						self.cities.forEach(function(value, index) {
							cityArr.push(value['city']);
						});
						// Destroy existing autocomplete from text box before attaching it again
						// try catch as for the first time it gives error
						try {
							self.$(e.target).autocomplete("destroy");
						} catch(ex) {
						}

						self.$(e.target).autocomplete({
							source : cityArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						self.$(e.target).trigger('keydown');
					});
				} else {
					self.changeCity(e);
				}
			}
		},

		/*Change state_id as per the selected record from auto complete for state created in keyupState*/
		changeCity : function(e) {
			var city_name = $(e.target).val();
			$(e.target).removeAttr(self.attributes.cityId);
			var isCityValid = false;
			self.city_id = '';
			console.log(self.cities);

			if (self.cities) {
				self.cities.forEach(function(value, index) {
					if (value['city'] == city_name) {
						isCityValid = true;
						self.city_id = value['id'];
						$(e.target).attr(self.attributes.cityId, self.city_id);
					}

				});
			}
			console.log(isCityValid);
			console.log(self.city_id);
			if (!isCityValid) {
				self.city_id = 0;
				$(self.destination).find(self.controls.txtTeam).removeAttr(self.attributes.cityId).fadeOut();
			}
			console.log(self.city_id);
			// Hide all other controls
			self.CheckTeamControlsVisibility();

		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupTeam : function(e) {
			var name = $(e.target).val();
			console.log(name);
			var arr = [];
			var isValidKey = self.isValidAutoCompleteKey(e);
			if (name != '' && isValidKey == true && name.length > 2) {

				// Hide all other controls
				$(e.target).removeAttr(self.attributes.teamId);
				self.CheckTeamControlsVisibility();

				var List = new TeamsCollection();
				List.states_id = $(e.target).attr(self.attributes.stateId);
				List.city_id = $(e.target).attr(self.attributes.cityId);
				List.team_name = name;
				List.fetch();
				console.log("List",List);
				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					else
						self.$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
					self.teams = [];
					for (var key in models) {
						self.teams.push(models[key].payload);
					}
					self.teams.forEach(function(value, index) {
						arr.push(value['team_name']);
					});
					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						self.$(e.target).autocomplete("destroy");
					} catch(ex) {
					}

					$(e.target).autocomplete({
						source : arr
					});
					//Trigger keydown to display the autocomplete dropdown just created
					$(e.target).trigger('keydown');
				});
			} else {
				// Hide all other controls
				$(e.target).removeAttr(self.attributes.teamId);
				self.CheckTeamControlsVisibility();

				if (self.isEnterKey(e))
					self.changeTeam(e);
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeTeam : function(e) {
			var name = $(e.target).val();
			var isSchoolValid = false;
			self.team_id = 0;
			if (self.teams) {
				self.teams.forEach(function(value, index) {
					var teamname = value['team_name'];
					if (teamname == name) {
						console.log(self.team_id);
						isSchoolValid = true;
						self.team_id = value['team_id'];
						$(e.target).attr(self.attributes.teamId, self.team_id);
						//				$(e.target).parents(self.controls.secTagTeam).find(self.controls.ddlTeamLevel).attr(self.attributes.teamId, self.orgs_id).attr(self.attributes.stateId, $(e.target).attr(self.attributes.stateId));
						//				self.fillCompLevel(e);
					}
				});
			}
			if (!isSchoolValid) {
				// Hide all other controls
				$(e.target).removeAttr(self.attributes.teamId);
			}
			self.CheckTeamControlsVisibility();
		},

		CheckTeamControlsVisibility : function() {
			// var value = $(self.destination).find(self.controls.txtTeamState).attr(self.attributes.stateId);
			// console.log(value);
			// if (value && value != "" && value != 0) {
				// $(self.destination).find(self.controls.txtTeamCity).show();
			// } else {
				// $(self.destination).find(self.controls.txtTeamCity).val('').removeAttr(self.attributes.cityId).hide();
			// }
// 
			// value = $(self.destination).find(self.controls.txtTeamCity).attr(self.attributes.cityId);
			// if (value && value != "" && value != 0) {
				// $(self.destination).find(self.controls.txtTeamSchool).show();
			// } else {
				// $(self.destination).find(self.controls.txtTeamSchool).val('').removeAttr(self.attributes.teamId).hide();
			// }
// 			
			// value = $(self.destination).find(self.controls.txtTeamSchool).attr(self.attributes.teamId);
			// if (value && value != "" && value != 0) {
				// $(self.destination).find(self.controls.btnTeamDone).show();
			// } else {
				// $(self.destination).find(self.controls.btnTeamDone).hide();
			// }
		},

		finishGame : function() {
			Channel(self.channel).publish(this.gameData);
		}
	});
	return AddGameView;
});
