/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Awards VIEW} constructor
 */
define(['require', 'text!usercontrols/tag/templates/layout.html', 'text!usercontrols/tag/templates/sportoption.html', 'facade', 'views', 'utils', 'vendor', 'usercontrols/models/basic_info', 'usercontrols/tag/collections/sports', 'location/collections/states', 'usercontrols/tag/collections/schools', 'user/collections/users', 'usercontrols/tag/collections/games', 'usercontrols/tag/models/complevel'], function(require, layoutTemplate, sportOptionTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, BasicModel = require('usercontrols/tag/models/basic_info'), SportsCollection = require('usercontrols/tag/collections/sports'), StatesCollection = require('location/collections/states'), SchoolCollection = require('usercontrols/tag/collections/schools'), UsersCollection = require('user/collections/users'), GamesCollection = require('usercontrols/tag/collections/games'), CompLevelModel = require('usercontrols/tag/models/complevel'),

	//Models
	TagView = SectionView.extend({

		template : layoutTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			'change .ddl-tag-sports_h' : 'changeSport',
			'click .btn-tag-sport_h' : 'sportsDone',
			'click .btn-tag-edit-sport_h' : 'editSport',
			'click .link-tag-team_h' : 'showTeamSection',

			//Team Section
			'keyup .txt-tag-team-state_h' : 'keyupState',
			'blur .txt-tag-team-state_h' : 'changeState',
			'keyup .txt-tag-team-school_h' : 'keyupSchool',
			'blur .txt-tag-team-school_h' : 'changeSchool',
			'change .ddl-tag-team-level_h' : 'changeCompLevel',
			'change .ddl-tag-team-season_h' : 'changeSeason',
			'click .btn-tag-team-Done_h' : 'doneTagTeamTagging',

			// Player Section
			'click .link-tag-player_h' : 'showPlayer',
			'click .btn-tag-add-player_h' : 'addPlayer',
			'keyup .txt-tag-player-name_h' : 'keyUpPlayer',
			'change .txt-tag-player-name_h' : 'setPlayerId',
			'click .btn-tag-player-Done_h' : 'donePlayerTagging',

			//Game Section
			'click .link-tag-Game_h' : 'showGameSection',
			'click .btn-tag-game-Done_h' : 'doneGameTagging',
			'change .ddl-tag-game_h' : 'changeGame'

		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {

			//Sports
			secAddSports : ".section-Add-Sports_h",
			divTagList : ".div-tag-list_h",
			secSports : ".section-sports_h",
			lblSportName : ".lbl-tag-sport-name_h",
			btnEditSport : ".btn-tag-edit-sport_h",
			btnSportsDone : '.btn-tag-sport_h',
			ddlSports : '.ddl-tag-sports_h',

			//Team
			secTeam : ".section-team_h",
			lblTeamName : ".lbl-tag-team-name_h",
			secTagTeam : ".section-tag-team_h",
			txtTeamState : ".txt-tag-team-state_h",
			txtTeamSchool : ".txt-tag-team-school_h",
			ddlTeamLevel : ".ddl-tag-team-level_h",
			ddlTeamSeason : ".ddl-tag-team-season_h",
			btnTeamDone : ".btn-tag-team-Done_h",
			//Player
			secPlayer : ".section-tag-player_h",
			secPlayerInput : ".section-tag-player-input_h",
			txtPlayerName : ".txt-tag-player-name_h",
			additionalPlayer : ".additional_h",
			btnAddPlayer : ".btn-tag-add-player_h",
			btnPlayerDone : ".btn-tag-player-Done_h",
			//Game
			secGame : ".section-tag-game_h",
			ddlGame : ".ddl-tag-game_h",
			btnGameDone : ".btn-tag-game-Done_h",
			secFooterLinks : ".section-link_h",
			lnkTeam : ".link-tag-team_h",
			lnkPlayer : ".link-tag-player_h",
			lnkGame : ".link-tag-Game_h",

			//Common
			//Buttons

			//Input Controls

			// LABELS
			fieldMessage : '.field-message',
			fieldError : '.field-error',
		},

		attributes : {
			stateId : 'stateid',
			schoolId : 'schoolid',
			playersId : 'playerid'
		},
		inlineTemplates : {
			sportOption : '{{#sports}}<option value="{{sport_id}}">{{sport_name}}</option>{{/sports}}',
			compLevelOption : '{{#levels}}<option value="{{complevel_id}}">{{complevel_name}}</option>{{/levels}}',
			seasonOption : '{{#seasons}}<option value="{{season_id}}">{{season_name}}</option>{{/seasons}}',
			addPlayerText : '</br><input type="text" class="txt-tag-player-name_h additional_h" placeholder="Enter Name" value="" />'
		},
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Does Not Exist . ",
			dataNotExistAwards : "Data Does Not Exists For Awards.",
			MandatoryFields : "Sports Id, Name , Year are mandatory.",
			selectOrganization : "Please Select High School Or Club & Season . ",
			selectTeamAndSports : "Please Select Both Sports And A Team . ",
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
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
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
			console.log("Fill Sports");
			if (self.sports && self.sports.length > 0) {
				//	self.SetupSportsView(orgs_id, destination);
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
			// self.sports.splice(0, 0, {
			// sport_id : 0,
			// sport_name : "Select"
			// })
			//
			// var markup = Mustache.to_html(self.inlineTemplates.sportOption, {
			// sports : self.sports
			// });
			self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', $(self.destination).find(self.controls.ddlSports), 'Select Sport');

			//			$(self.destination).find(self.controls.ddlSports).html(markup);

		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(e) {
			if ($(e.target).val() && $(e.target).val() != 0)
				$(e.target).parent().find(self.controls.btnSportsDone).fadeIn();
			else
				$(e.target).parent().find(self.controls.btnSportsDone).fadeOut();
		},
		sportsDone : function(e) {
			self.sportsId = $(self.destination).find(self.controls.ddlSports).val();
			$(self.destination).find(self.controls.lblSportName).html($(self.destination).find(self.controls.ddlSports + ' :selected').text())
			$(e.target).parents(self.controls.secAddSports).fadeOut();
			$(self.destination).find(self.controls.secSports).fadeIn();
			$(self.destination).find(self.controls.secFooterLinks).fadeIn();
		},

		editSport : function() {
			$(self.destination).find(self.controls.secSports).fadeOut();
			$(self.destination).find(self.controls.secAddSports).fadeIn();
			$(self.destination).find(self.controls.secFooterLinks).fadeOut();
			$(self.destination).find('*').show();
			$(self.destination).find('.displayNone').hide();
			$(self.destination).find('input').val('');
			//$(self.destination).find('select').html('');
			$(self.destination).find(self.controls.additionalPlayer).remove();
		},
		showTeamSection : function(e) {
			$(self.destination).find(self.controls.secPlayer).fadeOut();
			$(self.destination).find(self.controls.secGame).fadeOut();
			$(self.destination).find(self.controls.secTagTeam).fadeIn();
			$(e.target).hide();
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
							self.$(e.target).autocomplete("destroy");
						} catch(ex) {
						}

						self.$(e.target).autocomplete({
							source : stateArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						self.$(e.target).trigger('keydown');
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
						$(e.target).parent().find(self.controls.txtTeamSchool).removeAttr('disabled').attr(self.attributes.stateId, self.states_id).fadeIn();
					}

				});
			}
			if (!isStateValid) {
				self.states_id = 0;
				$(self.destination).find(self.controls.txtTeamSchool).attr('disabled', 'disabled').removeAttr(self.attributes.stateId).fadeOut();
			}
			// Hide all other controls
			self.CheckTeamControlsVisibility();

		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupSchool : function(e) {
			var name = $(e.target).val();
			var arr = [];
			var isValidKey = self.isValidAutoCompleteKey(e);
			if (name != '' && isValidKey == true) {

				// Hide all other controls
				$(e.target).removeAttr(self.attributes.schoolId);
				self.CheckTeamControlsVisibility();

				var List = new SchoolCollection();
				List.states_id = $(e.target).attr(self.attributes.stateId);
				List.org_name = name;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					else
						self.$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
					self.schools = [];
					for (var key in models) {
						self.schools.push(models[key].payload);
					}
					self.schools.forEach(function(value, index) {
						var name = value['org_name'];
						if (value['sports_club'] == 0)
							name += "( HS )";
						else
							name += "( Club )";
						arr.push(name);
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
				$(e.target).removeAttr(self.attributes.schoolId);
				self.CheckTeamControlsVisibility();

				if ((e.keyCode ? e.keyCode : e.which) == 13)
					self.changeSchool(e);
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(e) {
			var name = $(e.target).val();
			var isSchoolValid = false;
			self.orgs_id = 0;
			if (self.schools) {
				self.schools.forEach(function(value, index) {
					var orgname = value['org_name'];
					if (value['sports_club'] == 0)
						orgname += "( HS )";
					else
						orgname += "( Club )";
					if (orgname == name) {
						console.log(self.orgs_id);
						isSchoolValid = true;
						self.orgs_id = value['org_id'];
						$(e.target).attr(self.attributes.schoolId, self.orgs_id);
						$(e.target).parents(self.controls.secTagTeam).find(self.controls.ddlTeamLevel).attr(self.attributes.schoolId, self.orgs_id).attr(self.attributes.stateId, $(e.target).attr(self.attributes.stateId));
						self.fillCompLevel(e);
					}
				});
			}
			if (!isSchoolValid) {
				// Hide all other controls
				$(e.target).removeAttr(self.attributes.schoolId);
				self.CheckTeamControlsVisibility();

			}
		},
		/*Fills CompLevel DropDown after fetching data from API*/
		/*PARAMETER:
		 * orgs_id : int, School Id selected from changeSchool function */
		fillCompLevel : function(e) {
			var orgs_id = $(e.target).attr(self.attributes.schoolId);
			var sportsId = $(self.destination).find(self.controls.ddlSports).val();
			self.compLevel_id = undefined;
			console.log("orgs_id, destination, sportsId", orgs_id, sportsId)
			// Destroy complevel id if request received to refill the comp level
			console.log("Fill Comp Level High School");
			if (orgs_id && orgs_id > 0) {
				var List = new CompLevelModel();
				List.orgs_id = orgs_id;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					self.compLevel = [{
						complevel_id : "",
						complevel_name : "Select"
					}];
					if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length) {

						self.seasons = models.payload.seasons || [];
						for (var key in models.payload.complevels) {
							self.compLevel.push(models.payload.complevels[key]);
						}

						self.SetUpCompLevelView(orgs_id, sportsId, self.compLevel, self.seasons);
					} else {
					}
				});
			} else {
				$(destination).html('');
			}
		},
		/*On CompLevel DropDown Change Its value is to be assigned into a variable*/
		changeCompLevel : function(event) {
			var value = $(event.target).val();
			if (value != "" && value != 0) {
				$(self.destination).find(self.controls.ddlTeamSeason).fadeIn();
			} else {
				self.CheckTeamControlsVisibility();
			}
		},
		/*SET UP LEVEL VIEW AS PER THE DESTINATION WHERE TO APPEND THE VIEW*/
		SetUpCompLevelView : function(orgs_id, sports_id, levels, seasons) {
			var data = self.GetSeasonsData(seasons, orgs_id, sports_id);
			var markup = Mustache.to_html(self.inlineTemplates.compLevelOption, {
				levels : levels
			});
			$(self.destination).find(self.controls.ddlTeamLevel).html(markup).fadeIn();

			markup = Mustache.to_html(self.inlineTemplates.seasonOption, {
				seasons : data
			});
			$(self.destination).find(self.controls.ddlTeamSeason).html(markup);
		},
		/*FETCH SEASONS AS PER THE SCHOOL AND DISPLAY ACCORDINGLY*/
		GetSeasonsData : function(collection, orgs_id, sports_id) {
			console.log("GetSeasonsData", collection);
			var data = [{
				season_id : "",
				season_name : "Select"
			}];
			var y = (new Date).getFullYear();
			for (var i = 10; i >= 0; i--) {
				for (var key in collection) {
					var temp = {
						season_name : y + " - " + collection[key].season_name,
						season_id : collection[key].season_name + " " + y
					}
					data.push(temp);
				}

				y--;
			}
			return data;
		},

		changeSeason : function(e) {
			var value = $(e.target).val();
			if (value != "" && value != 0) {
				$(self.destination).find(self.controls.btnTeamDone).fadeIn();
			} else {
				self.CheckTeamControlsVisibility();
			}
		},

		CheckTeamControlsVisibility : function() {
			var value = $(self.controls.txtTeamState).attr(self.attributes.stateId);

			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.txtTeamSchool).show();
			} else {
				$(self.destination).find(self.controls.txtTeamSchool).val('').removeAttr(self.attributes.schoolId).hide();
			}

			value = $(self.controls.txtTeamSchool).attr(self.attributes.schoolId);
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.ddlTeamLevel).show();
			} else {
				$(self.destination).find(self.controls.ddlTeamLevel).val('').hide();
			}

			value = $(self.destination).find(self.controls.ddlTeamLevel).val();
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.ddlTeamSeason).show();
			} else {
				$(self.destination).find(self.controls.ddlTeamSeason).val('').hide();
			}

			value = $(self.destination).find(self.controls.ddlTeamSeason).val();
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.btnTeamDone).show();
			} else {
				$(self.destination).find(self.controls.btnTeamDone).hide();
			}
		},

		doneTagTeamTagging : function(e) {
			var schoolId = $(self.destination).find(self.controls.txtTeamSchool).attr(self.attributes.schoolId);
			var seasonId = $(self.destination).find(self.controls.ddlTeamSeason).val();
			if (schoolId && schoolId != "" && schoolId != 0 && seasonId && seasonId != "" && seasonId != 0) {
				var teamName = $(self.destination).find(self.controls.txtTeamSchool).val();
				teamName += " - " + $(self.destination).find(self.controls.ddlTeamSeason).val();
				//TODO: Set self.teamId
				//self.teamId=

				$(self.destination).find(self.controls.lblTeamName).html(teamName);

				$(self.destination).find(self.controls.secTagTeam).fadeOut();
				$(self.destination).find(self.controls.secTeam).fadeIn();

				$(self.destination).find(self.controls.lnkPlayer).fadeIn();
				$(self.destination).find(self.controls.lnkGame).fadeIn();
			} else {
				self.$(e.target).parents(self.controls.secTagTeam).find(self.controls.fieldMessage).html(self.messages.selectOrganization).stop().fadeIn();
			}
		},

		/***********************TAG PLAYER SECTION STARTS HERE*********************************************/
		showPlayer : function(e) {
			$(self.destination).find(self.controls.secTagTeam).fadeOut();
			$(self.destination).find(self.controls.secGame).fadeOut();
			$(self.destination).find(self.controls.secPlayer).fadeIn();

		},
		addPlayer : function(e) {
			$(self.destination).find(self.controls.secPlayerInput).append(self.inlineTemplates.addPlayerText);
		},
		keyUpPlayer : function(e) {
			var searchText = $(e.target).val();
			var playersArr = [];
			if (searchText != '') {
				if (self.isValidAutoCompleteKey(e) == true) {
					$(e.target).removeAttr(self.attributes.playersId);

					//Create Collection
					var List = new UsersCollection();
					List.user_name = searchText;
					List.fetch();
					$.when(List.request).done(function() {

						var models = List.toJSON();
						if (models == null || models.length < 1)
							self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
						else
							self.$(e.target).parent().find(self.controls.fieldMessage).html('').fadeOut();

						self.users = [];
						for (var key in models) {
							self.users.push(models[key].payload);
						}
						console.log("users", self.users)
						self.users.forEach(function(value, index) {
							playersArr.push(value['name']);
						});
						// Destroy existing autocomplete from text box before attaching it again
						// try catch as for the first time it gives error
						try {
							self.$(e.target).autocomplete("destroy");
						} catch(ex) {
						}

						self.$(e.target).autocomplete({
							source : playersArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						self.$(e.target).trigger('keydown');
					});
				} else {
					self.setPlayerId(e);
					if (self.isEnterKey(e))
						self.addPlayer(e);
				}
			} else {
				$(e.target).removeAttr(self.attributes.playersId);
			}
		},
		setPlayerId : function(e) {
			if (self.users) {
				var name = $(e.target).val().toLowerCase();
				for (var key in self.users) {
					if (self.users[key].name.toLowerCase() == name) {
						$(e.target).attr(self.attributes.playersId, self.users[key].id);
						return;
					}
				}
			}
		},
		donePlayerTagging : function(e) {
			var players = [];
			$(self.destination).find(self.controls.txtPlayerName).each(function() {
				if ($(this).attr(self.attributes.playersId) > 0) {
					players.push({
						name : $(this).val(),
						user_id : $(this).attr(self.attributes.playersId)
					})

				}
			});
			if (players.length > 0) {
				var data = JSON.stringify({
					players : players
				});
				alert(data);
			} else {
				$(e.target).parents(self.controls.secGame).find(self.controls.fieldMessage).html(self.messages.selectPlayer).fadeIn();
			}
		},

		/***********************TAG GAME SECTION STARTS HERE*********************************************/
		showGameSection : function(e) {
			self.bindGamesData(e);
			$(self.destination).find(self.controls.secTagTeam).fadeOut();
			$(self.destination).find(self.controls.secPlayer).fadeOut();
			$(self.destination).find(self.controls.secGame).fadeIn();
		},
		bindGamesData : function(e) {
			var sportid = $(self.destination).find(self.controls.ddlSports).val();

			if (self.sportsId) {
				//TODO:Apply following condtion for teamId
				// && self.teamId) {
				//	self.SetupSportsView(orgs_id, destination);
				var List = new GamesCollection();
				$(e.target).parents(self.controls.secFooterLinks).find(self.controls.fieldMessage).html('').fadeOut();
				List.processResult = function(collection) {
					self.SetupGamesView(collection);
				};
				List.fetch();
			} else {
				$(e.target).parents(self.controls.secFooterLinks).find(self.controls.fieldMessage).html(self.messages.selectTeamAndSports).fadeIn();
			}

		},
		SetupGamesView : function(List) {
			var models = List.toJSON();
			if (models == null || models.length < 1) {
				$(self.destination).find(self.controls.secFooterLinks).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.games = [];
			for (var key in models) {
				self.games.push(models[key].payload);
			}
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.games, 'game_name', false);
			self.setDropdownOptions(self.games, 'game_name', 'id', $(self.destination).find(self.controls.ddlGame), 'Select Game');
		},
		changeGame : function(e) {
			var gameId = $(e.target).val();
			if (gameId && gameId != "" && gameId != 0) {
				$(e.target).parents(self.controls.secGame).find(self.controls.btnGameDone).fadeIn();
			} else {
				$(e.target).parents(self.controls.secGame).find(self.controls.btnGameDone).fadeOut();
			}
		},
		doneGameTagging : function(e) {
			var data = {
				game : {
					game_id : $(e.target).parents(self.controls.secGame).find(self.controls.ddlGame).val(),
					game_name : $(e.target).parents(self.controls.secGame).find(self.controls.ddlGame "option:selected").text()
				}
			}
			alert(JSON.stringify({result : data}));
		}
	});
	return TagView;
});
