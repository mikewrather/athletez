/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Awards VIEW} constructor
 */
define(['require', 'text!usercontrols/tag/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 'usercontrols/tag/models/basic_info', 'sportorg/collections/sports_listall', 'location/collections/states', 'usercontrols/tag/collections/schools', 'usercontrols/tag/collections/teams', 'location/collections/cities', 'user/collections/users', 'usercontrols/tag/collections/games', 'usercontrols/tag/models/complevel', 'usercontrol/dropdown/view/dropdown'], function(require) {

	var layoutTemplate=require('text!usercontrols/tag/templates/layout.html'),self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, BasicModel = require('usercontrols/tag/models/basic_info'), SportsCollection = require('sportorg/collections/sports_listall'), StatesCollection = require('location/collections/states'), CityCollection = require('location/collections/cities'), SchoolCollection = require('usercontrols/tag/collections/schools'), UsersCollection = require('user/collections/users'), GamesCollection = require('usercontrols/tag/collections/games'), TeamsCollection = require('usercontrols/tag/collections/teams'), CompLevelModel = require('usercontrols/tag/models/complevel'), DropDownList = require('usercontrol/dropdown/view/dropdown'),

	//Models
	TagView = SectionView.extend({

		template : layoutTemplate,

		/*Data to be sent as parameter in call back function*/
		tagData : {
			Game : {},
			Player : {},
			Team : {}
		},
		/*Bind Events on controls present in current view template*/
		events : {
			'change .ddl-tag-sports_h' : 'changeSport',
			'click .btn-tag-sport_h' : 'sportsDone',
			'click .btn-tag-edit-sport_h' : 'editSport',
			'click .link-tag-team_h' : 'showTeamSection',

			//Team Section
			'keyup .txt-tag-team-state_h' : 'keyupState',
			'blur .txt-tag-team-state_h' : 'changeState',
			'keyup .txt-tag-team-city_h' : 'keyupCity',
			'blur .txt-tag-team-city_h' : 'changeCity',
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
			'change .ddl-tag-game_h' : 'changeGame',
			'click .btn-tag-Finish_h' : 'finishTagging'
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
			spnSports : ".span-ddl-sports-tag_h",
			dropdownHeader : ".dropdown-header-box",

			//Team
			secTeam : ".section-team_h",
			lblTeamName : ".lbl-tag-team-name_h",
			secTagTeam : ".section-tag-team_h",
			txtTeamState : ".txt-tag-team-state_h",
			txtTeamCity : ".txt-tag-team-city_h",
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
			sectionSelectedPlayers : ".section-team-players_h",
			lblPlayerNames : ".lbl-tag-players-name_h",

			//Game
			secGame : ".section-tag-game_h",
			ddlGame : ".ddl-tag-game_h",
			btnGameDone : ".btn-tag-game-Done_h",
			secFooterLinks : ".section-link_h",
			lnkTeam : ".link-tag-team_h",
			lnkPlayer : ".link-tag-player_h",
			lnkGame : ".link-tag-Game_h",
			sectionSelectedGames : ".section-team-games_h",
			lblGameNames : ".lbl-tag-games-name_h",
			spnGames : ".span-ddl-games-tag_h",

			btnTeamFinish : '.btn-tag-Finish_h',
			//Common
			//Buttons

			//Input Controls

			// LABELS
			fieldMessage : '.field-message',
			fieldError : '.field-error',

			hdnSportsIdData : "hdn_sport_id",
			hdnSportsId : "#hdn_sport_id",
			hdnGamesIdData : "hdn_game_id",
			hdnGamesId : "#hdn_game_id",
		},

		attributes : {
			stateId : 'stateid',
			schoolId : 'schoolid',
			teamId : 'teamid',
			playersId : 'playerid',
			cityId : 'cityid'
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
			if (!options.channel) {
				throw new Error("call back channel is must for this");
			} else {
				this.channel = options.channel;
			}
			this.sports_id = options.sports_id || null;
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
				//	self.SetupSportsView(orgs_id, destination);
			} else {
				var List = new SportsCollection();
				List.processResult = function(collection) {
					var data = List.ParseForDropdown();
					self.SetupSportsView(data);
				};
				List.fetch();
			}
		},
		SetupSportsView : function(List) {
			//alert("sportsID " + self.sports_id);
			self.sports = List;
			var data = {};
			data.records = self.sports;
			data.recordId = 'id';
			data.recordValue = 'custom_name';
			var DropDown = new DropDownList({
				data : data,
				title : "Select Sport",
				elementId : self.controls.hdnSportsIdData,
				destination : self.controls.spnSports,
				targetView : self,
				selectedValue : self.sports_id || null,
				callback : function(result) {
					self.changeSport(result);
				}
			});
					if(self.sports_id){
						self.sportsDone();	
					}
			// var models = List.toJSON();
			// if (models == null || models.length < 1) {
			// $(self.destination).find(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
			// return;
			// }
			// self.sports = [];
			// for (var key in models) {
			// self.sports.push(models[key].payload);
			// }
			// // Sort Sports Before Filling Up Into Drop-Down
			// self.sort(self.sports, 'sport_name', false);
			// self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', $(self.destination).find(self.controls.ddlSports), 'Select Sport');
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(result) {
			if (result && result != 0) {
				$(self.destination).find(self.controls.btnSportsDone).fadeIn();
				//	$(self.destination).find(self.controls.ddlSports).val(result);
			} else {
				$(self.destination).find(self.controls.btnSportsDone).fadeOut();
			}
		},
		sportsDone : function(e) {
			self.sportsId = $(self.destination).find(self.controls.hdnSportsId).val();
			$(self.destination).find(self.controls.lblSportName).html($(self.destination).find(self.controls.spnSports).find(self.controls.dropdownHeader).text())
			$(self.destination).find(self.controls.secAddSports).fadeOut();
			$(self.destination).find(self.controls.secSports).fadeIn();
			$(self.destination).find(self.controls.secFooterLinks).fadeIn();
		},

		editSport : function() {

			this.tagData = {
				Game : {},
				Player : {},
				Team : {}
			};
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
			$(self.destination).find(self.controls.secFooterLinks).fadeOut();
			$(self.destination).find(self.controls.btnTeamFinish).fadeOut();
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

					self.stateFetchRequest = self.stateFetchRequest || [];
					self.stateFetchRequest.push(self.cityFetchRequest || []);
					self.stateFetchRequest.push(self.teamFetchRequest || []);

					self.stateFetchRequest = self.abortRequest(self.stateFetchRequest);
					var tempCollection = stateList.fetch();
					self.stateFetchRequest.push(tempCollection);

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
					//	$(e.target).parent().find(self.controls.txtTeamCity).removeAttr('disabled').attr(self.attributes.stateId, self.states_id).fadeIn();
						$(e.target).parent().find(self.controls.txtTeamSchool).removeAttr('disabled').attr(self.attributes.stateId, self.states_id);
					}

				});
			}
			if (!isStateValid) {
				self.states_id = 0;
				$(self.destination).find(self.controls.txtTeamSchool).attr('disabled', 'disabled').removeAttr(self.attributes.stateId).fadeOut();
			//	$(self.destination).find(self.controls.txtTeamCity).attr('disabled', 'disabled').removeAttr(self.attributes.stateId).fadeOut();
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
					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						self.$(e.target).autocomplete("destroy");
					} catch(ex) {
					}

					// Hide all other controls
					$(e.target).removeAttr(self.attributes.cityId);
					self.CheckTeamControlsVisibility();

					//Create Collection
					var List = new CityCollection();
					List.states_id = self.states_id;
					List.city_name = $(e.target).val();

					console.log("City Request Abort Request Function AddGame/Main.js");
					self.cityFetchRequest = self.cityFetchRequest || [];
					self.cityFetchRequest.push(self.teamFetchRequest || []);

					self.cityFetchRequest = self.abortRequest(self.cityFetchRequest);
					var tempCollection = List.fetch();
					self.cityFetchRequest.push(tempCollection);
					$.when(List.request).done(function() {
						/*Don't Show Auto Complete In Case Of Error*/
						if (List.isError())
							return;

						var models = List.toJSON();
						//console.log("City Models", models);
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
				$(self.destination).find(self.controls.txtTeamSchool).attr('disabled', 'disabled').removeAttr(self.attributes.cityId).fadeOut();
			} else {
				$(self.destination).find(self.controls.txtTeamSchool).removeAttr('disabled');
			}
			// Hide all other controls
			self.CheckTeamControlsVisibility();

		},

		/*******************************************************************************/
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupSchool : function(e) {
			var name = $(e.target).val();
			var arr = [];
			var isValidKey = self.isValidAutoCompleteKey(e);
			if (name != '' && isValidKey == true && name.length > 2) {

				// Hide all other controls
				$(e.target).removeAttr(self.attributes.teamId);
				self.CheckTeamControlsVisibility();

				var List = new TeamsCollection();
				List.states_id = $(e.target).attr(self.attributes.stateId);
				//List.cities_id = self.city_id;
				List.sports_id = $(self.destination).find(self.controls.hdnSportsId).val();
				List.team_name = name;

				console.log("Team Request Abort Request Function");
				self.TeamFetchRequest = self.abortRequest(self.TeamFetchRequest);
				var tempCollection = List.fetch();
				self.TeamFetchRequest.push(tempCollection);

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
						$(e.target).autocomplete("destroy");
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
					self.changeSchool(e);
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(e) {
			var name = $(e.target).val();
			var isSchoolValid = false;
			self.team_id = 0;
			if (self.teams) {
				self.teams.forEach(function(value, index) {
					var teamname = value['team_name'];
					if (teamname == name) {
						isSchoolValid = true;
						self.team_id = value['id'];
						$(e.target).attr(self.attributes.teamId, self.team_id);
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
			var value = $(self.destination).find(self.controls.txtTeamState).attr(self.attributes.stateId);
			// if (value && value != "" && value != 0) {
				// $(self.destination).find(self.controls.txtTeamCity).show();
			// } else {
				// $(self.destination).find(self.controls.txtTeamCity).val('').removeAttr(self.attributes.cityId).hide();
			// }
// 
			// value = $(self.destination).find(self.controls.txtTeamCity).attr(self.attributes.cityId);
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.txtTeamSchool).show();
			} else {
				$(self.destination).find(self.controls.txtTeamSchool).val('').removeAttr(self.attributes.teamId).hide();
			}

			value = $(self.destination).find(self.controls.txtTeamSchool).attr(self.attributes.teamId);
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.btnTeamDone).show();
			} else {
				$(self.destination).find(self.controls.btnTeamDone).hide();
			}
		},

		doneTagTeamTagging : function(e) {
			var teamId = $(self.destination).find(self.controls.txtTeamSchool).attr(self.attributes.teamId);
			self.team_id = teamId
			var seasonId = $(self.destination).find(self.controls.ddlTeamSeason).val();
			//var data = {};
			var data = [];
			if (teamId && teamId != "" && teamId != 0 && teamId && teamId != "" && teamId != 0) {
			var teamName = $(self.destination).find(self.controls.txtTeamSchool).val();
			//	data.teamName = teamName;
			//	data.id = teamId;
			data.push(teamId);
				
				$(self.destination).find(self.controls.lblTeamName).html(teamName);

				$(self.destination).find(self.controls.secTagTeam).fadeOut();
				$(self.destination).find(self.controls.secTeam).fadeIn();

				$(self.destination).find(self.controls.lnkPlayer).fadeIn();
				$(self.destination).find(self.controls.lnkGame).fadeIn();
				$(self.destination).find(self.controls.secFooterLinks).fadeIn();
				
			//	$(self.destination).find(self.controls.btnTeamFinish).fadeIn();
			} else {
				self.$(e.target).parents(self.controls.secTagTeam).find(self.controls.fieldMessage).html(self.messages.selectOrganization).stop().fadeIn();
			}
			
			//self.tagData.Team = data;
			var newData ={5 : data};
			Channel(self.channel).publish(newData);
		},

		/***********************TAG PLAYER SECTION STARTS HERE*********************************************/
		showPlayer : function(e) {
			$(self.destination).find(self.controls.secTagTeam).fadeOut();
			$(self.destination).find(self.controls.secGame).fadeOut();
			$(self.destination).find(self.controls.secPlayer).fadeIn();
			$(self.destination).find(self.controls.btnTeamFinish).fadeOut();

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
					List.states_id = self.states_id;
					// No Need to pass City Id in User Search as States Is is enough #961 (23/09/2013)
					//List.cities_id = self.city_id;
					List.sports_id = $(self.destination).find(self.controls.hdnSportsId).val();

					console.log("Player Request Abort Request Function");
					self.PlayerFetchRequest = self.abortRequest(self.PlayerFetchRequest);
					var tempCollection = List.fetch();
					self.PlayerFetchRequest.push(tempCollection);

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
			var playerNames = "";
			var nData = [];
			$(self.destination).find(self.controls.txtPlayerName).each(function() {
				var playerId = $(this).attr(self.attributes.playersId);
				if (playerId > 0) {
					players.push({
						name : $(this).val(),
						id : playerId
					})
					playerNames += "," + $(this).val();
					nData.push(playerId);

				}
			});
			if (players.length > 0) {
				var data = {
					players : players
				};
				//self.tagData.Player = data;

				var section = $(self.destination).find(self.controls.sectionSelectedPlayers);
				$(section).find(self.controls.lblPlayerNames).html(playerNames);
				$(section).fadeIn();

				$(self.destination).find(self.controls.secPlayer).fadeOut();
				$(self.destination).find(self.controls.btnTeamFinish).fadeIn();
				
			var newData ={1 : nData};
			Channel(self.channel).publish(newData);

			} else {
				$(e.target).parents(self.controls.secGame).find(self.controls.fieldMessage).html(self.messages.selectPlayer).fadeIn();
				var section = $(self.destination).find(self.controls.sectionSelectedPlayers);
				$(section).find(self.controls.lblPlayerNames).html('');
				$(section).fadeOut();
			}
		},

		/***********************TAG GAME SECTION STARTS HERE*********************************************/
		showGameSection : function(e) {
			self.bindGamesData(e);
			$(self.destination).find(self.controls.secTagTeam).fadeOut();
			$(self.destination).find(self.controls.secPlayer).fadeOut();
			$(self.destination).find(self.controls.secGame).fadeIn();
			$(self.destination).find(self.controls.btnTeamFinish).fadeOut();
		},
		bindGamesData : function(e) {
			var sportid = $(self.destination).find(self.controls.hdnSportsId).val();

			if (self.sportsId) {
				var List = new GamesCollection();
				List.states_id = self.states_id;
				//List.cities_id = self.city_id;
				List.sports_id = self.sportsId;
				List.teams_id = self.team_id;

				$(e.target).parents(self.controls.secGame).find(self.controls.fieldMessage).html('').fadeOut();
				List.processResult = function(collection) {
					self.SetupGamesView(collection);
				};

				console.log("Team Request Abort Request Function");
				self.GameFetchRequest = self.abortRequest(self.GameFetchRequest);
				var tempCollection = List.fetch();
				self.GameFetchRequest.push(tempCollection);

			} else {
				$(e.target).parents(self.controls.secGame).find(self.controls.fieldMessage).html(self.messages.selectTeamAndSports).fadeIn();
			}

		},
		SetupGamesView : function(List) {

			var models = List.toJSON();
			if (models == null || models.length < 1) {
				$(self.destination).find(self.controls.secGame).find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.games = models;
			var data = {};
			data.records = self.games;
			data.recordId = 'id';
			data.recordValue = 'game_name';
			var DropDown = new DropDownList({
				data : data,
				title : "Select Game",
				elementId : self.controls.hdnGamesIdData,
				destination : self.controls.spnGames,
				targetView : self,
				selectedValue : self.sports_id || null,
				callback : function(result) {
					self.changeGame(result);
				}
			});
			//
			// for (var key in models) {
			// self.games.push(models[key].payload);
			// }
			// // Sort Sports Before Filling Up Into Drop-Down
			// self.sort(self.games, 'game_name', false);
			// self.setDropdownOptions(self.games, 'game_name', 'id', $(self.destination).find(self.controls.ddlGame), 'Select Game');
		},
		changeGame : function(result) {
			var gameId = result;
			if (gameId && gameId != "" && gameId != 0) {
				$(self.destination).find(self.controls.secGame).find(self.controls.btnGameDone).fadeIn();
			} else {
				$(self.destination).find(self.controls.secGame).find(self.controls.btnGameDone).fadeOut();
			}
		},
		doneGameTagging : function(e) {
			var self = this;
			var gameId = $(e.target).parents(self.controls.secGame).find(self.controls.hdnGamesId).val();
			var gameName = '';
			if (gameId && gameId != "" && gameId != 0) {
				gameName = $(e.target).parents(self.controls.secGame).find(self.controls.spnGames).find(self.controls.dropdownHeader).text();
				var data = {
					game : {
						id : gameId,
						game_name : gameName
					}
				};

				var gData = [];
				gData.push(gameId);

				self.tagData.Game = data;
				var section = $(self.destination).find(self.controls.sectionSelectedGames);
				$(section).find(self.controls.lblGameNames).html(gameName);
				$(section).fadeIn();

				$(self.destination).find(self.controls.secGame).fadeOut();
				$(self.destination).find(self.controls.btnTeamFinish).fadeIn();
				
			var newData ={8 : gData};
			Channel(self.channel).publish(newData);
			
			} else {
				var section = $(self.destination).find(self.controls.sectionSelectedGames);
				$(section).find(self.controls.lblGameNames).html('');
				$(section).fadeIn();

			}
		},

		finishTagging : function() {
			//Channel(self.channel).publish(this.tagData);
		}
	});
	return TagView;
});
