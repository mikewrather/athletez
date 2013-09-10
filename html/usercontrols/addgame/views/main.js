/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Add Game VIEW} constructor
 */
define(['require', 'text!usercontrols/addgame/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 'user/models/basic_info', 
'sportorg/collections/sports_users', 'location/collections/states', 'usercontrols/addgame/collections/teams', 
'location/collections/cities', 'usercontrols/addgame/collections/teams_user', 
'usercontrols/addgame/collections/teams',
'usercontrols/addgame/collections/games_search',
'usercontrols/addgame/models/team', 
'usercontrols/addgame/models/team_add', 'usercontrols/addgame/models/game'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, 
	BasicModel = require('usercontrols/tag/models/basic_info'), SportsCollection = require('sportorg/collections/sports_users'), 
	StatesCollection = require('location/collections/states'), CityCollection = require('location/collections/cities'), 
	UserTeamsCollection = require('usercontrols/addgame/collections/teams_user'), 
	TeamsCollection = require('usercontrols/addgame/collections/teams'), TeamModel = require('usercontrols/addgame/models/team'), 
	TeamAddModel = require('usercontrols/addgame/models/team_add'), GameModel = require('usercontrols/addgame/models/game'),
	GamesSearchCollection = require('usercontrols/addgame/collections/games_search'),
	//Models
	AddGameView = SectionView.extend({

		template : layoutTemplate,

		/*Data to be sent as parameter in call back function*/
		gameData : {

		},

		teams : [],
		/*Bind Events on controls present in current view template*/
		events : {
			"change .ddl-game-sports_h" : "changeSport",
			'keyup .txt-game-state_h' : 'keyupState',
			'blur .txt-game-state_h' : 'changeState',
			'keyup .txt-game-city_h' : 'keyupCity',
			'blur .txt-game-city_h' : 'changeCity',
			'keyup .txt-game-team_h' : 'keyupTeam',
			'blur .txt-game-team_h' : 'changeTeam',
			'keyup .txt-individual-game_h' : 'keyupIndividualGame',
			'blur .txt-individual-game_h' : 'changeindividualGame',
			'change .ddl-game-userteams_h' : 'changeUserTeam',
			'click .btn-new-team-game_h' : 'showAddTeam',
			'click .rdo-game-location_h' : 'showLocation',
			'click .btn-game-Finish_h' : 'finishGame'
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			sectionAddSports : ".section-Add-Sports_h",
			sectionDate : ".section-game-date_h",
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
			txtScore : ".txt-score-team_h",
			btnFinish : ".btn-game-Finish_h",
			sectionTeamOne : ".team-one_h",
			sectionTeamTwo : ".team-two_h",

			sectionScore : ".section-score_h",
			sectionRadio : ".section-game-radio_h",
			rdoTeamOne : "rdo-team1_h",
			rdoTeamTwo : "rdo-team2_h",
			rdoLocation : ".rdo-game-location_h",
			sectionMainLocation : ".section-main-location_h",
			sectionLocation : ".div-game-location_h",

			sectionIndividual : ".secction-individual-game_h",
			txtIndividualGame : ".txt-individual-game_h",
			btnIndividualFinish : ".btn-game-individual-Finish_h",

			// LABELS
			fieldMessage : '.field-message',
			//fieldError : '.field-error'
		},

		attributes : {
			stateId : 'stateid',
			schoolId : 'schoolid',
			teamId : 'teamid',
			playersId : 'playerid',
			cityId : 'cityid',
			sportId : 'sportid',
			locationId : 'locationid',
			gameId : 'gameid'
		},
		inlineTemplates : {

		},
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Does Not Exist . ",
			selectDateAndTime : "Select Date And Time",
			selectTeam : "Select Team",
			selectScore : "Enter Score",
			selectLocation : "select location",
			selectLocationType : "select location type",
			gameFound : "Sweet ! This Event Already Exists ! "
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);

			this.init();

		},

		/*render displays the view in browser*/
		render : function() {
			SectionView.prototype.render.call(this);
			$(self.el).find(self.controls.txtGameDate).datetimepicker({
				altField : $(self.el).find(self.controls.txtGameTime),
				changeMonth : true,
				changeYear : true
			});
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
			if (self.sports && self.sports.length > 0) {
				self.SetupSportsView(orgs_id, destination);
			} else {
				var List = new SportsCollection();
				List.user_id = self.user_id;
				List.processResult = function(collection) {
					var data = List.parseAsRequired();
					self.SetupSportsView(data);
				};
				List.fetch();
			}
		},
		SetupSportsView : function(List) {
			if (List == null || List.length < 1) {
				$(self.destination).find(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.sports = List;
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.sports, 'sport_name', false);
			self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', $(self.destination).find(self.controls.ddlSports), 'Select Sport');
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(e) {
			if ($(e.target).val() && $(e.target).val() != 0) {

				$(e.target).parents(self.destination).find(self.controls.sectionTeams).show();
				$(e.target).parents(self.destination).find(self.controls.btnFinish).fadeIn();
				$(self.destination).find("input").attr(self.attributes.sportId, $(e.target).val());
				self.fillTeams($(e.target).val());
			} else {
				$(e.target).parents(self.destination).find(self.controls.btnFinish).fadeOut();

				$(e.target).parents(self.destination).find(self.controls.sectionTeams).fadeOut();
				$(self.destination).find("input").removeAttr(self.attributes.stateId);
			}
			self.CheckTeamControlsVisibility();

		},
		fillTeams : function(sport_id) {
			var List = new UserTeamsCollection();
			List.user_id = self.user_id;
			List.sports_id = sport_id;
			List.processResult = function(collection) {

				var data = List.parseAsRequired();
				//	console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				//	console.log("data",data);
				self.setUpUserTeams(data);

			};
			List.fetch();
		},
		setUpUserTeams : function(List) {
			//	var models = List.toJSON();
			//	console.log("Models Teams", models);
			if (List == null) {
				$(self.destination).find(self.controls.ddlUserTeams).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.teams = List;
			// [];
			// for (var key in List) {
			// self.teams.push(List[key].payload);
			// }
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.teams, 'team_name', false);
			self.setDropdownOptions(self.teams, 'team_name', 'team_id', $(self.destination).find(self.controls.ddlUserTeams), 'Select Team');
		},
		changeUserTeam : function(e) {
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).hide();
			$(e.target).parents(self.controls.sectionTeams).find("input").attr(self.attributes.teamId, $(e.target).val());
			$(e.target).parents(self.controls.sectionTeams).find("input:checked").removeAttr("checked");
			self.showLocation();
		},
		showAddTeam : function(e) {
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.ddlUserTeams).val("");
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).show();
			$(e.target).parents(self.controls.sectionTeams).find("input").removeAttr(self.attributes.teamId);
			$(e.target).parents(self.controls.sectionTeams).find("input:checked").removeAttr("checked");
			self.showLocation();
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

			if (self.cities) {
				self.cities.forEach(function(value, index) {
					if (value['city'] == city_name) {
						isCityValid = true;
						self.city_id = value['id'];
						$(e.target).attr(self.attributes.cityId, self.city_id);
					}

				});
			}
			if (!isCityValid) {
				self.city_id = 0;
				$(self.destination).find(self.controls.txtTeam).removeAttr(self.attributes.cityId).fadeOut();
			}
			// Hide all other controls
			self.CheckTeamControlsVisibility();

		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupTeam : function(e) {
			var name = $(e.target).val();
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
						isSchoolValid = true;
						self.team_id = value['id'];
						$(e.target).parents(self.controls.sectionTeams).find("input").attr(self.attributes.teamId, self.team_id);
					}
				});
			}
			if (!isSchoolValid) {
				// Hide all other controls
				$(e.target).parents(self.controls.sectionTeams).find("input").removeAttr(self.attributes.teamId);
			}
			self.CheckTeamControlsVisibility();
		},
		
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupIndividualGame : function(e) {
			var name = $(e.target).val();
			var arr = [];
			var isValidKey = self.isValidAutoCompleteKey(e);
			if (name != '' && isValidKey == true && name.length > 2) {

				// Hide all other controls
				$(e.target).removeAttr(self.attributes.gameId);
				self.CheckTeamControlsVisibility();

				var List = new GamesSearchCollection();
				List.sports_id = $(e.target).attr(self.attributes.sportId);
				List.game_name = name;
				List.fetch();
				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					else
						self.$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
					self.individualGames = [];
					for (var key in models) {
						self.individualGames.push(models[key].payload);
					}
					self.individualGames.forEach(function(value, index) {
					//	var name = value['game_name'] + "( " + +" )";
						arr.push(value['game_name']);
					});
					
					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						self.$(e.target).autocomplete("destroy");
					} catch(ex) {
					}

console.log("s.arr",arr);
					$(e.target).autocomplete({
						source : arr
					});
					//Trigger keydown to display the autocomplete dropdown just created
					$(e.target).trigger('keydown');
				});
			} else {
				// Hide all other controls
				$(e.target).removeAttr(self.attributes.gameId);
				self.CheckTeamControlsVisibility();

				if (self.isEnterKey(e))
					self.changeIndividualGame(e);
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeIndividualGame : function(e) {
			var name = $(e.target).val();
			var isGameValid = false;
			self.individual_game_id = 0;
			if (self.individualGames) {
				self.individualGames.forEach(function(value, index) {
					var gamename = value['game_name'];
					if (gamename == name) {
						isGameValid = true;
						self.individual_game_id = value['id'];
						$(e.target).attr(self.attributes.gameId, self.individual_game_id);
					}
				});
			}
			if (!isGameValid) {
				// Hide all other controls
				$(e.target).removeAttr(self.attributes.gameId);
				$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
			}else{
				$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.gameFound).fadeIn();
			}
			self.CheckTeamControlsVisibility();
		},
		
		
		CheckTeamControlsVisibility : function() {
			var value = $(self.destination).find(self.controls.ddlSports).val();
			// sectionIndividual : ".secction-individual-game_h",
			// txtIndividualGame : ".txt-individual-game_h",
			// btnIndividualFinish : ".btn-game-individual-Finish_h",
			//sssssssssssssssss
			if (value && value != "" && value != 0) {
				var isTeam = self.getTeamType();
				if (!isTeam) {
				$(self.destination).find(self.controls.sectionTeams).hide();
				$(self.destination).find(self.controls.sectionScore).hide();
				$(self.destination).find(self.controls.btnFinish).hide();


					$(self.destination).find(self.controls.sectionIndividual).show();
					$(self.destination).find(self.controlsbtnIndividualFinish).show();

				}
			} else {
				$(self.destination).find(self.controls.sectionIndividual).hide();
				$(self.destination).find(self.controlsbtnIndividualFinish).hide();
				
				$(self.destination).find(self.controls.sectionTeams).show();
				$(self.destination).find(self.controls.sectionScore).show();
				$(self.destination).find(self.controls.btnFinish).show();
			}

			value = $(self.destination).find(self.controls.txtTeam).attr(self.attributes.teamId);
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.btnTeamDone).show();
			} else {
				$(self.destination).find(self.controls.btnTeamDone).hide();
			}
		},
		getTeamType : function() {
			var value = $(self.destination).find(self.controls.ddlSports).val();
			if (value && value != "" && value != 0) {
				var isTeam = true;
				for (var key in self.sports) {
					if (self.sports[key].sport_id == value) {
						if (self.sports[key].team_type == "individual") {
							isTeam = false;
						}
					}
				};
				return isTeam;
			}
			return false;
		},
		showLocation : function(e) {
			var teamId = 0;
			var value = e ? $(e.target).val() : "away";
			if (value == "home") {
				teamId = $(e.target).attr(self.attributes.teamId);
			} else {
				var selectedItems = $(self.destination).find(self.controls.rdoLocation + ":checked");
				selectedItems.each(function() {
					value = $(this).val();
					if (value == "home") {
						teamId = $(this).attr(self.attributes.teamId);
					}
				});

			}
			if (teamId) {
				var teamModel = new TeamModel();
				teamModel.id = teamId;
				teamModel.fetchSuccess = function(model, response) {
					var data = teamModel.parseAsRequired(response);
					self.setLocation(data);

				};
				teamModel.fetch();

			} else {
				self.clearLocation();
			}
		},
		setLocation : function(data) {
			if (data.location_id) {
				self.location_id = data.location_id || 0;

				$(self.destination).find(self.controls.sectionLocation).html(data.location_name).attr(self.attributes.locationId, data.location_id);

			}
		},
		clearLocation : function() {
			$(self.destination).find(self.controls.sectionLocation).html('').removeAttr(self.attributes.locationId);
		},
		finishGame : function() {
			$(self.destination).find(self.controls.fieldMessage).html('').hide();
			var isDataValid = true;

			var date = $(self.destination).find(self.controls.txtGameDate).val();
			var time = $(self.destination).find(self.controls.txtGameTime).val();
			var teamOneId = $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtTeam).attr(self.attributes.teamId);
			var scoreOne = $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtScore).val();
			var teamTwoId = $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.txtTeam).attr(self.attributes.teamId);
			var scoreTwo = $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.txtScore).val();

			self.location_id = self.location_id || 0;
			if (date == '' || time == '') {
				$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html(self.messages.selectDateAndTime).fadeIn();
				isDataValid = false;
			}

			if (!self.location_id) {
				$(self.destination).find(self.controls.sectionMainLocation).find(self.controls.fieldMessage).html(self.messages.selectLocation).fadeIn();
				isDataValid = false;
			}

			console.log(teamOneId);
			console.log(teamTwoId);
			console.log(scoreOne);
			console.log(scoreTwo);
			if (!(teamOneId > 0 )) {
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.fieldMessage).html(self.messages.selectTeam).fadeIn();
				isDataValid = false;
			}

			// var location_type_one = $(self.destination).find(self.controls.rdoTeamOne + " :checked");
			// if (location_type_one.length < 1) {
			// $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.sectionRadio).find(self.controls.fieldMessage).html(self.messages.selectLocationType).fadeIn();
			// isDataValid = false;
			// }
			//	console.log("location_type",location_type_one);
			var isTeam = self.getTeamType();
			if (isTeam) {

				if (!(teamTwoId > 0)) {
					$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.fieldMessage).html(self.messages.selectTeam).fadeIn();
					isDataValid = false;
				}
				if (scoreOne == '') {
					$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.fieldMessage).html(self.messages.selectScore).fadeIn();
					isDataValid = false;
				}

				if (scoreTwo == '') {
					$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.fieldMessage).html(self.messages.selectScore).fadeIn();
					isDataValid = false;
				}

				// var location_type_two = $(self.destination).find(self.controls.rdoTeamTwo + " :checked");
				// console.log("location_type_two",location_type_two);
				// if (location_type_two.length < 1) {
				// $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.sectionRadio).find(self.controls.fieldMessage).html(self.messages.selectLocationType).fadeIn();
				// isDataValid = false;
				// }
			}

			if (isDataValid) {
				var payload = {
					game_datetime : date + " " + time,
					locations_id : self.location_id,
					teamOneId : teamOneId,
					teamTwoId : teamTwoId,

				};
				console.log("payload", payload);
				var gameModel = new GameModel(payload);

				gameModel.save({
					success : function(response) {
						alert("S");
						console.log("response", response);
						console.log("data", data);
					}
				});

				$.when(gameModel.request).done(function(response) {
					console.log(response);
					if (response != null && response.payload != null) {
						self.game_id = response.payload.id;

						var payloadOne = {
							game_datetime : date,
							games_id : self.game_id,
							home_team : true,
							locations_id : self.location_id,
							score : scoreOne
						}

						var addTeamModelOne = new TeamAddModel(payload);
						addTeamModelOne.teams_id = teamOneId;
						addTeamModelOne.games_id = self.game_id;
						addTeamModelOne.save();

						var payloadTwo = {
							game_datetime : date,
							games_id : self.game_id,
							home_team : true,
							locations_id : self.location_id,
							score : scoreTwo
						}

						var addTeamModelTwo = new TeamAddModel(payload);
						addTeamModelTwo.teams_id = teamTwoId;
						addTeamModelOne.games_id = self.game_id;
						addTeamModelTwo.save();

						self.gameData = {
							game_datetime : date,
							games_id : self.game_id,
							team_id_one : teamOneId,
							team_id_two : teamTwoId
						}
						Channel(self.channel).publish(self.gameData);
					}

				});

			}

		}
	});
	return AddGameView;
});
