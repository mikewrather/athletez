/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Add Game VIEW} constructor
 */
define(['require', 'text!usercontrols/addevent/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 'sportorg/collections/sports_listall', 'location/collections/states', 'usercontrols/addgame/collections/teams', 'location/collections/cities', 'usercontrols/addgame/collections/teams_user', 'usercontrols/addgame/collections/teams', 'usercontrols/addgame/collections/games_search', 'usercontrols/addgame/models/team', 'usercontrols/addgame/models/team_add', 'usercontrols/addgame/models/game', 'usercontrols/addgame/models/uslgamelink',
'usercontrol/dropdown/view/dropdown', 'usercontrol/location/views/get-view-location'
], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, BasicModel = require('usercontrols/tag/models/basic_info'), SportsCollection = require('sportorg/collections/sports_listall'), StatesCollection = require('location/collections/states'), CityCollection = require('location/collections/cities'), UserTeamsCollection = require('usercontrols/addgame/collections/teams_user'), TeamsCollection = require('usercontrols/addgame/collections/teams'), TeamModel = require('usercontrols/addgame/models/team'), TeamAddModel = require('usercontrols/addgame/models/team_add'), GameModel = require('usercontrols/addgame/models/game'), GamesSearchCollection = require('usercontrols/addgame/collections/games_search'),
	DropDownList = require('usercontrol/dropdown/view/dropdown'),
	LocationView = require('usercontrol/location/views/get-view-location'),
	//Models
	UserGameLinkModel = require('usercontrols/addgame/models/uslgamelink');
	
	return SectionView.extend({
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
			'click .btn-ddl-team-game_h' : 'showDdlTeam',
			'click .rdo-game-location_h' : 'showLocation',
			'click .btn-game-Finish_h' : 'finishGame',
			'change .txt-game-date_h' : 'CheckTeamControlsVisibility',
			"click .btn-game-individual-Create_h" : 'createIndividualEvent',
			"click .btn-game-individual-Finish_h" : 'goThereIndividualGame'
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			sectionAddSports : ".section-Add-Sports_h",
			sectionDate : ".section-game-date_h",
			txtGameDate : ".txt-game-date_h",
			txtGameTime : ".txt-game-time_h",
			spnTimePeriod :".spn-ddl-time-period_h",
			ddlTimePeriod : ".ddl-time-period_h",
			spnSports : ".span-ddl-sports_h",
			ddlSports : ".ddl-game-sports_h",
			sectionTeams : ".section-game-teams_h",
			ddlUserTeams : ".ddl-game-userteams_h",
			spanddlteam : ".span_ddl_team_h",
			spanddlteamtwo : ".span_ddl_team_two_h",
			spanddlteamone : ".span_ddl_team_one_h",
			btnNewTeam : ".btn-new-team-game_h",
			btnDdlTem : ".btn-ddl-team-game_h",
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
			rdoTeamOne : ".rdo-game-location-one-home_h",
			rdoTeamTwo : ".rdo-game-location-two-home_h",
			rdoLocation : ".rdo-game-location_h",
			sectionMainLocation : ".section-main-location_h",
			sectionLocation : ".div-game-location_h",
			txtLocationId : ".txt-game-location-id_h",

			sectionIndividual : ".section-individual-game_h",
			txtIndividualGame : ".txt-individual-game_h",
			btnIndividualFinish : ".btn-game-individual-Finish_h",

			txtIndividualLocation : ".txt-individual-location_h",
			btnIndividualGameCreate : ".btn-game-individual-Create_h",
			// LABELS
			fieldMessage : '.field-message_h',
			secSports : ".section-game-sports_h",
			//fieldError : '.field-error',
			
			hdnSportsIdData : "hdn_sport_id",
			hdnSportsId : "#hdn_sport_id",
			hdnTimePeriodData : "hdn_time-period_h",
			hdnTimePeriod : "#hdn_time-period_h",
			indicator : ".indicator_h"
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
			dataNotExist : "Data does not exist . ",
			selectDateAndTime : "Please select date and time",
			selectTeam : "Please select team",
			selectScore : "Please enter score",
			selectLocation : "Please select location",
			selectLocationType : "Please select location type",
			gameFound : "Sweet ! This Event Already Exists ! ",
			enterEventName : "Please enter event name",
			selectSport : "Please select sport",
			selectValidTime : "Please enter valid time in format hh:mm (12 hours)"
		},
		
		/*tags to be used to tag the type of game in games data*/
		tags : {
			individual : "individual",
			team : "team",
			rgxTime : /^(0?[1-9]|1[012])(:[0-5]\d)$/,
			rgxTimeWhole : /^(0?[1-9]|1[012])$/
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
			$(self.el).find(self.controls.txtGameDate).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});
			
			
			var records = [{
				payload : {
					name : "AM",
					value : "AM"
				}
			},
			{
				payload : {
					name : "PM",
					value : "PM"					
				}
			}];
			
			var data = {};
               data.records = records;
               data.recordId = 'name';
			   data.recordValue = 'value';
			var DropDown = new DropDownList({
					data: data,
					elementId: self.controls.hdnTimePeriodData,
					destination: self.controls.spnTimePeriod,
					targetView: self,
					selectedValue : "PM",
					callback: function(result) {
					}
				});
				
			// $(self.el).find(self.controls.txtGameDate).datetimepicker({
				// timeFormat : 'hh:mm tt',
				// //separator : ' @ ',
				// showTimezone : true,
				// changeMonth : true,
				// changeYear : true
			// });
		},
		
		afterRender: function() {
			var _self = this, location = new LocationView({
				callback: function(id) {
					var disable = (id != '')?true:false;
					_self.$el.find(".btn-game-Finish_h").attr("disable", disable);
					_self.$el.find(".txt-game-location-id_h").val(id);
				}
			});
			this.$el.find('.location-view-h').html(location.el);
		},
  
		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
			if (!options.channel) {
				throw new Error("call back channel is must for this");
			} else {
				this.channel = options.channel;
				this.sports_id = options.sports_id || null;
				this.team_id = options.teams_id || null;
			}
			//console.log("CURRENT USER ID:", this,options);
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
		},
		setupView : function() {
			self.setUpMainView();
			if(self.team_id){
				var teamModel = new TeamModel();
					teamModel.id = self.team_id;
					teamModel.fetchSuccess = function(model, response) {
						var data = teamModel.parseAsRequired(response);
						self.team = data;
						self.sports_id = data.sports_id || null;
						self.fillSports();
				};
						teamModel.fetch();
			}else{
				self.fillSports();
			}
			//self.setFirstTeam();
		},
		setUpMainView : function() {
			var markup = Mustache.to_html(self.template, {});
			$(self.el).html(markup);
		},

		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function() {			
				var List = new SportsCollection();
				//List.user_id = self.user_id;
				List.processResult = function(collection) {
					var data = List.ParseForDropdown();
					self.SetupSportsView(data);
				};
				List.fetch();
		},
		SetupSportsView : function(List) {

			 self.sports = List;
			var data = {};
               data.records = self.sports;
               data.recordId = 'id';
			   data.recordValue = 'custom_name';
			var DropDown = new DropDownList({
					data: data,
					title: "Select Sport",
					elementId: self.controls.hdnSportsIdData,
					destination: self.controls.spnSports,
					targetView: self,
					selectedValue : self.sports_id || null,
					callback: function(result) {
						self.changeSport(result);						
					}
				});
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(result) {
		//	console.log("result",result);
			if (result && result != 0) {
				$(self.destination).find(self.controls.sectionTeams).show();
				$(self.destination).find(self.controls.btnFinish).fadeIn();
				$(self.destination).find("input").attr(self.attributes.sportId, result);
				
				// Fill Teams Only if Its Team Game
				var isTeam = self.getTeamType(result);
				if(isTeam){
					self.fillTeams(result);
				}
				
			} else {
				$(self.destination).find(self.controls.btnFinish).fadeOut();
				$(self.destination).find(self.controls.sectionTeams).fadeOut();
				$(self.destination).find("input").removeAttr(self.attributes.stateId);
			}
			self.CheckTeamControlsVisibility();

		},
		setFirstTeam : function(teamId) {
			console.log("setFirstTeam");
			var isTeamFound = false;
			if (self.team_id) {
				for (var key in self.teams) {
					if (self.teams[key].payload.id == self.team_id) {
						isTeamFound = true;
					}
				}
				if (!isTeamFound) {
					if(self.team){
						self.setSelectedTeam(self.team);
					}else{
					var teamModel = new TeamModel();
					teamModel.id = self.team_id;
					teamModel.fetchSuccess = function(model, response) {
						var data = teamModel.parseAsRequired(response);
						self.team = data;
						self.setSelectedTeam(data);
					};
						teamModel.fetch();
					}
				}
				self.CheckTeamControlsVisibility();
			}
		},
		setSelectedTeam : function(data) {
			console.log("setSelectedTeam");
			if (data) {
				console.log("data",data);
				var teamname = data['team_name'];
				var teamId = data['team_id'];
				$(self.destination).find(self.controls.sectionTeamOne).find("input").attr(self.attributes.teamId, teamId);
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.spanddlteamone).hide();
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.btnNewTeam).hide();
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtTeam).val(teamname).show();
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.indicator).addClass("valid").removeClass("invalid").show();
			}
		},
		fillTeams : function(sport_id) {
			var List = new UserTeamsCollection();
			List.user_id = self.user_id;
			List.sports_id = sport_id;
			List.processResult = function(collection) {
				var item = {
					team_name : "Team Not Found",
					id : -1
				};
				
				var list = List.AppendItem(item);
				self.setUpUserTeams(list);
			};
			//self.TeamFetchRequest = self.abortRequest(self.TeamFetchRequest);
			var tempCollection = List.fetch();
			//self.TeamFetchRequest.push(tempCollection);

		},
		setUpUserTeams : function(List) {
			self.teams = List || [];
			self.setFirstTeam(self.team_id);
			//spanddlteam
			var data = {};
               data.records = self.teams;
               data.recordId = 'id';
			   data.recordValue = 'team_name';
			   
			var DropDownOne = new DropDownList({
					data: data,
					//title: "Select Team",
					elementId: "hdn_team_id",
					targetView: self,					
					destination: self.controls.spanddlteamone,			
					selectedValue : self.team_id || null,
					callback: function(result) {
						self.changeUserTeamOne(result);						
					}
				});
			
			// var DropDownTwo = new DropDownList({
					// data: data,
					// title: "Select Team",
					// elementId: "hdn_team_id",
					// targetView: self,					
					// destination: self.controls.spanddlteamtwo,
					// //selectedValue : 14446,					
					// callback: function(result) {
						// self.changeUserTeamTwo(result);						
					// }
				// });
		},
		changeUserTeamOne : function(result) {
			console.log("result1",result);
			if(result == "-1"){
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.btnNewTeam).trigger('click');
			}
			else{
			//$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtTeam).hide();
			//$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.indicator).hide();
			//$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.spanddlteamone).show();
			$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.btnNewTeam).show();
			$(self.destination).find(self.controls.sectionTeamOne).find("input").attr(self.attributes.teamId, result);
			$(self.destination).find(self.controls.sectionTeamOne).find("input:checked").removeAttr("checked");
			self.showLocation();
			}
		},
		changeUserTeamTwo : function(result) {
			console.log("result",result);
			if(result == "-1"){
				$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.btnNewTeam).trigger('click');
			}
			else{
			//$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.txtTeam).hide();
			//$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.indicator).hide();
			//$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.spanddlteamtwo).show();
			$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.btnNewTeam).show();
			$(self.destination).find(self.controls.sectionTeamTwo).find("input").attr(self.attributes.teamId, result);
			$(self.destination).find(self.controls.sectionTeamTwo).find("input:checked").removeAttr("checked");
			self.showLocation();
			}
		},
		showAddTeam : function(e) {
			//Hide Link and DROPDOWN
			$(e.target).hide();
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.spanddlteam).hide();
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).show();
			$(e.target).parents(self.controls.sectionTeams).find("input").removeAttr(self.attributes.teamId);
			$(e.target).parents(self.controls.sectionTeams).find("input:checked").removeAttr("checked");
			self.showLocation();
		},
		showDdlTeam : function(e) {
			//Show Link and DROPDOWN
			$(e.target).hide();
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).val("").hide();
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).hide();
			$(e.target).parents(self.controls.sectionTeams).find("input").removeAttr(self.attributes.teamId);
			$(e.target).parents(self.controls.sectionTeams).find(self.controls.ddlUserTeams).val("").show();			
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

					console.log("State Request Abort Request Function AddGame/Main.js");
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
					$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).hide();
			
					}

				});
			}
			if (!isStateValid) {
				self.states_id = 0;
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.txtTeam).removeAttr(self.attributes.stateId).fadeOut();
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).hide();
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
					List.states_id = self.states_id;
					List.city_name = $(e.target).val();
					//console.log("City Request Abort Request Function AddGame/Main.js");
					self.cityFetchRequest = self.cityFetchRequest || [];
					self.cityFetchRequest.push(self.teamFetchRequest || []);

					self.cityFetchRequest = self.abortRequest(self.stateFetchRequest);
					var tempCollection = List.fetch();
					self.cityFetchRequest.push(tempCollection);

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
				//$(self.destination).find(self.controls.txtTeam).removeAttr(self.attributes.cityId).fadeOut();
				//$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).hide();
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
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).addClass("invalid").removeClass("valid").show();
				self.CheckTeamControlsVisibility();

				var List = new TeamsCollection();
				List.states_id = $(e.target).attr(self.attributes.stateId);
				List.city_id = $(e.target).attr(self.attributes.cityId);
				List.sports_id = $(e.target).attr(self.attributes.sportId);
				List.team_name = name;

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
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).addClass("invalid").removeClass("valid").show();
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
						$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).removeClass("invalid").addClass("valid").show();
					}
				});
			}
			//Check if team name is equal to the team passed
			if(self.team){
				var teamname = self.team['team_name'];
				var teamId = self.team['team_id'];
				if (teamname == name) {
						isSchoolValid = true;
						self.team_id = teamId;
						$(e.target).parents(self.controls.sectionTeams).find("input").attr(self.attributes.teamId, self.team_id);
						$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).removeClass("invalid").addClass("valid").show();
					}
				
			}
			
			if (!isSchoolValid) {
				// Hide all other controls
				$(e.target).parents(self.controls.sectionTeams).find("input").removeAttr(self.attributes.teamId);
				$(e.target).parents(self.controls.sectionTeams).find(self.controls.indicator).addClass("invalid").removeClass("valid").show();
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
				//List.sports_id = $(e.target).attr(self.attributes.sportId);
				List.game_name = name;

				self.individualGameFetchRequest = self.abortRequest(self.individualGameFetchRequest);
				var tempCollection = List.fetch();
				self.individualGameFetchRequest.push(tempCollection);

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1){
					//	self.$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					self.eventNotFound(e);
					}
					else{
						self.eventFound(e);
						self.$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
					}
					self.individualGames = [];
					for (var key in models) {
						self.individualGames.push(models[key].payload);
					}
					self.individualGames.forEach(function(value, index) {
						//	var name = value['game_name'] + "( " + +" )";
						var name = value['event_name'] + " " + value['game_name']; 
						arr.push(name);
					//	arr.push({label:name,value:value['id']});
					});

					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						self.$(e.target).autocomplete("destroy");
					} catch(ex) {
					}

					//console.log("s.arr", arr);
					$(e.target).autocomplete({
						source : arr,
						select :  function (event, ui) {
							
							self.individualGames.forEach(function(value, index) {
								//	var name = value['game_name'] + "( " + +" )";
								console.log(ui.item.label +"----"+ name);
								var name = value['event_name'] + " " + value['game_name']; 
								if (ui.item.label == name) {
									self.individual_game_id = value['id'];
								}
								//	arr.push({label:name,value:value['id']});
							});
							
							self.$el.find(".section-main-location_h").hide();
							self.$el.find(".section-game-date_h").hide();
							// self.$(e.target).val(ui.item.label);
							// //self.changeIndividualGame(event,ui);
					          // // display the selected text
					        // // $("#txtAllowSearchID").val(ui.item.value); // save selected id to hidden input
					    }
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
		changeIndividualGame : function(e,ui) {			
			var name = $(e.target).val();
			var isGameValid = false;
			self.individual_game_id = 0;
			//if(ui && ui.item != null && ui.item.value){
//			self.individual_game_id = ui.item.value;			
	//		isGameValid = true;
			if (self.individualGames) {
				self.individualGames.forEach(function(value, index) {
					var gamename = value['event_name']+ " "  + value['game_name'];
					if (gamename == name) {
						isGameValid = true;
						self.individual_game_id = value['id'];
						$(e.target).attr(self.attributes.gameId, self.individual_game_id);

					}
				});
			}
		//	}
			if (!isGameValid) {
				// Hide all other controls
				self.eventNotFound(e);

			} else {
				self.eventFound(e);

			}
			self.CheckTeamControlsVisibility();
		},

		/**********Create Event Starts Here***************/

		//txtIndividualLocation : ".txt-individual-location_h",
		//	btnIndividualGameCreate : ".btn-game-individual-Create_h",
		eventNotFound : function(e) {
			this.$el.find(".section-main-location_h").show();
			this.$el.find(".section-game-date_h").show();
			//$(self.destination).find(self.controls.txtIndividualLocation).show();
			$(self.destination).find(self.controls.btnIndividualGameCreate).show();
			$(self.destination).find(self.controls.btnIndividualFinish).hide();
			$(e.target).parent().find(self.controls.fieldMessage).html('').stop().fadeOut();
			$(e.target).removeAttr(self.attributes.gameId);
		},
		eventFound : function(e) {
			this.$el.find(".section-main-location_h").hide();
			this.$el.find(".section-game-date_h").hide();			
			//$(self.destination).find(self.controls.txtIndividualLocation).hide();
			$(self.destination).find(self.controls.btnIndividualGameCreate).hide();
			$(self.destination).find(self.controls.btnIndividualFinish).show();
			$(e.target).parent().find(self.controls.fieldMessage).html(self.messages.gameFound).fadeIn();
		},
		createIndividualEvent : function(e) {
			
			var isDataValid = true;
			var message = '';
			var date = $(self.destination).find(self.controls.txtGameDate).datepicker('getDate');
			var timeText = $(self.destination).find(self.controls.txtGameTime).val();
			var timeZone = $(self.destination).find(self.controls.hdnTimePeriod).val();;
			var locationId = self.location_id || $(self.controls.txtLocationId).val() || 0;
			var eventName = $(self.destination).find(self.controls.txtIndividualGame).val();
			var sportsId = $(self.destination).find(self.controls.hdnSportsId).val();
			if(!sportsId){
				$(self.destination).find(self.controls.secSports).find(self.controls.fieldMessage).html(self.messages.selectSport).fadeIn();
				isDataValid = false;
			}
			
			if (!date || !timeText) {
				$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html(self.messages.selectDateAndTime).fadeIn();
				isDataValid = false;
			}else{
					var validTime = timeText.match(self.tags.rgxTime) || timeText.match(self.tags.rgxTimeWhole);
					console.log("orginal date",date);
					console.log("orginal time",timeText);
					console.log("timeZone",timeZone);					
					if(!validTime){
						$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html(self.messages.selectValidTime).fadeIn();
						isDataValid = false;
					}else{
						$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html('').fadeOut();
						try{
						var array = timeText.split(':');
						if(array){	
							console.log(array);
							if(timeZone != "PM" && array[0] != "12")							
							date.setHours(array[0]);
							
							if(array.length > 1)
								date.setMinutes(array[1]);
							
							if(timeZone == "PM")
								date.addHours(12);
						}
						}catch(ex){}
					}
					console.log("new date",date);
			}

			if (!locationId) {
				message += self.messages.selectLocation;
				isDataValid = false;
			}

			if ($.trim(eventName) == "") {
				message += "<br/>" + self.messages.enterEventName;
				isDataValid = false;
			}

			if (isDataValid) {
				var completeDate = date ; //+ " " + timeText + " " + timeZone;
				$(e.target).parent().find(self.controls.fieldMessage).html('').fadeOut();
				var payload = {
					game_datetime : completeDate,
					locations_id : locationId,
					event_name : eventName,
					sports_id : sportsId

				};
				var gameModel = new GameModel(payload);
				gameModel.save({});

				$.when(gameModel.request).done(function(response) {
					routing.trigger(self.channel, response);
					//Channel(self.channel).publish(response);
				});
			} else {
				$(e.target).parent().find(self.controls.fieldMessage).html(message).fadeIn();
			}
		},
		
		goThereIndividualGame : function(e){
			
			var sportsId = $(self.destination).find(self.controls.hdnSportsId).val();
			var payload = {
				users_id : 	self.user_id,
				sports_id : sportsId,
				games_id : self.individual_game_id				
			};
				var model = new UserGameLinkModel(payload);
				model.save();
				
			$.when(model.request).done(function(response) {
				self.goThereSuccess(response);
			});
		},
		goThereSuccess : function(response){
			if(response && response.payload != null){
			var game = response.payload.game;
			if(game){
			self.gameData = {
							type : self.tags.individual,
							game_datetime : game.gameDay,
							event_name : game.event_name,
							game_location : game.game_location,
							games_id : game.id,							
							sports_id : response.payload.usl ? response.payload.usl.sports_id : null
					};
			routing.trigger(self.channel, self.gameData);
			//Channel(self.channel).publish(self.gameData);
			}
			}
		},

		/**********Create Event Ends Here*****************/

		CheckTeamControlsVisibility : function() {
			var value = $(self.destination).find(self.controls.hdnSportsId).val();			
			if (value && value != "" && value != 0) {
				//console.log("value");
				var isTeam = self.getTeamType(value);
				if (!isTeam) {
					
					$(self.destination).find(self.controls.sectionTeams).hide();
					$(self.destination).find(self.controls.sectionScore).hide();
					$(self.destination).find(self.controls.btnFinish).hide();
					//$(self.destination).find(self.controls.sectionMainLocation).hide();
			
					$(self.destination).find(self.controls.sectionIndividual).show();
			//		$(self.destination).find(self.controlsbtnIndividualFinish).show();
				} else {
					var date = $(self.destination).find(self.controls.txtGameDate).datepicker('getDate');
					var currentDate = new Date();
					if (date != null && currentDate >= date) {
						$(self.destination).find(self.controls.sectionScore).show();
					} else {
						$(self.destination).find(self.controls.sectionScore).hide();
						$(self.destination).find(self.controls.txtScore).val('');
					}

					$(self.destination).find(self.controls.sectionIndividual).hide();
					$(self.destination).find(self.controlsbtnIndividualFinish).hide();

					$(self.destination).find(self.controls.sectionTeams).show();
					$(self.destination).find(self.controls.btnFinish).show();
					$(self.destination).find(self.controls.sectionMainLocation).show();

				}
			} else {
				//console.log("value null");
				$(self.destination).find(self.controls.sectionIndividual).hide();
				$(self.destination).find(self.controls.btnIndividualFinish).hide();
				$(self.destination).find(self.controls.sectionTeams).hide();
				$(self.destination).find(self.controls.btnFinish).hide();
				$(self.destination).find(self.controls.sectionMainLocation).hide();
			}

			value = $(self.destination).find(self.controls.txtTeam).attr(self.attributes.teamId);
			if (value && value != "" && value != 0) {
				$(self.destination).find(self.controls.btnTeamDone).show();
			} else {
				$(self.destination).find(self.controls.btnTeamDone).hide();
			}
		},
		getTeamType : function(value) {
			if (value && value != "" && value != 0) {
				var isTeam = true;
				console.log("getteamtype",value);
				for (var key in self.sports) {
					if (self.sports[key].payload.id == value) {
						console.log("payload",self.sports[key].payload);
						if (self.sports[key].payload.team_type == "Individual") {
							isTeam = false;
						}
					}
				};
				return isTeam;
			}
			return false;
		},
		showLocation : function(e) {
			$(self.destination).find(self.controls.sectionMainLocation).show();
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
				$(self.destination).find(self.controls.txtLocationId).val('').fadeIn();
				self.clearLocation();
			}
		},
		setLocation : function(data) {
			if (data.location_id) {
				self.location_id = data.location_id || 0;
				$(self.destination).find(self.controls.txtLocationId).val('').fadeOut();
				// setting the location inside location view
				$(".address-h").val(data.location_name);
				$(".txt-game-location-id_h").val(data.location_id);
				$(".verify-address-h").trigger('click');
				//$(self.destination).find(self.controls.sectionLocation).html(data.location_name).attr(self.attributes.locationId, data.location_id);
			} else {
				$(self.destination).find(self.controls.txtLocationId).val('').fadeIn();
			}
		},
		clearLocation : function() {
			$(".address-h").val("");
			$(".txt-game-location-id_h").val("");
			//$(self.destination).find(self.controls.sectionLocation).html('').removeAttr(self.attributes.locationId);
		},

		finishGame : function() {
			$(self.destination).find(self.controls.fieldMessage).html('').hide();
			var isDataValid = true;
			var date = $(self.destination).find(self.controls.txtGameDate).datepicker('getDate');
			var timeText = $(self.destination).find(self.controls.txtGameTime).val();
			var timeZone = $(self.destination).find(self.controls.hdnTimePeriod).val();
			
			var teamOneId = $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtTeam).attr(self.attributes.teamId);
			var scoreOne = $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.txtScore).val();
			var teamTwoId = $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.txtTeam).attr(self.attributes.teamId);
			var scoreTwo = $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.txtScore).val();
			var sportsId = $(self.destination).find(self.controls.hdnSportsId).val();

			var locationId = self.location_id || $(self.controls.txtLocationId).val() || 0;
			
			
			if(!sportsId){
				$(self.destination).find(self.controls.secSports).find(self.controls.fieldMessage).html(self.messages.selectSport).fadeIn();
				isDataValid = false;
			}
						
			if (!date || !timeText) {
				$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html(self.messages.selectDateAndTime).fadeIn();
				isDataValid = false;
			}else{
					var validTime = timeText.match(self.tags.rgxTime) || timeText.match(self.tags.rgxTimeWhole);	
					console.log("orginal date",date);
					console.log("orginal time",timeText);
					console.log("timeZone",timeZone);					
					if(!validTime){
						$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html(self.messages.selectValidTime).fadeIn();
						isDataValid = false;
					}else{
						$(self.destination).find(self.controls.sectionDate).find(self.controls.fieldMessage).html('').fadeOut();
						try{
						var array = timeText.split(':');
						if(array){								
							console.log(array);
							console.log(array[0]);
							if(timeZone != "PM" && array[0] != "12")							
								date.setHours(array[0]);
							if(array.length > 1)
								date.setMinutes(array[1]);
							
							if(timeZone == "PM")
								date.addHours(12);
						}
						}catch(ex){}
					}
			}
				console.log("new date",date);
			if (!locationId) {
				$(self.destination).find(self.controls.sectionMainLocation).find(self.controls.fieldMessage).html(self.messages.selectLocation).fadeIn();
				isDataValid = false;
			}
			
			if (!(teamOneId > 0 )) {
				$(self.destination).find(self.controls.sectionTeamOne).find(self.controls.fieldMessage).html(self.messages.selectTeam).fadeIn();
				isDataValid = false;
			}
			var isTeam = self.getTeamType();
			if (isTeam) {

				var currentDate = new Date();
				//console.log("date", date, currentDate);

				if (!(teamTwoId > 0)) {
					$(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.fieldMessage).html(self.messages.selectTeam).fadeIn();
					isDataValid = false;
				}

				// if (scoreOne == '' && date != null && currentDate > date) {
					// $(self.destination).find(self.controls.sectionTeamOne).find(self.controls.fieldMessage).html(self.messages.selectScore).fadeIn();
					// isDataValid = false;
				// }
// 
				// if (scoreTwo == '' && date != null && currentDate > date) {
					// $(self.destination).find(self.controls.sectionTeamTwo).find(self.controls.fieldMessage).html(self.messages.selectScore).fadeIn();
					// isDataValid = false;
				// }

			}

			if (isDataValid) {
				var completeDate = date;// + " " + timeText + "00";// + timeZone;
				var payload = {
					game_datetime : completeDate,
					locations_id : locationId,
					teamOneId : teamOneId,
					teamTwoId : teamTwoId,
					sports_id : sportsId 

				};
				////console.log("payload", payload);
				var gameModel = new GameModel(payload);

				gameModel.save({});

				$.when(gameModel.request).done(function(response) {
					////console.log(response);
					if (response != null && response.payload != null) {
						self.game_id = response.payload.id;
						var isHome = $(self.destination).find(self.controls.rdoTeamOne).is(':checked');

						var payloadOne = {
							game_datetime : completeDate,
							games_id : self.game_id,
							home_team : isHome || false,
							locations_id : self.location_id,
							score : scoreOne
						};

						var addTeamModelOne = new TeamAddModel(payloadOne);
						addTeamModelOne.teams_id = teamOneId;
						//addTeamModelOne.games_id = self.game_id;
						addTeamModelOne.save();
						var payloadTwo = {
							game_datetime : completeDate,
							games_id : self.game_id,
							home_team : isHome || false,
							locations_id : self.location_id,
							score : scoreTwo
						};

						isHome = $(self.destination).find(self.controls.rdoTeamTwo).is(':checked');

						//console.log("home",isHome);

						var addTeamModelTwo = new TeamAddModel(payloadTwo);
						addTeamModelTwo.teams_id = teamTwoId;
						//addTeamModelTwq.games_id = self.game_id;
						addTeamModelTwo.save();

						self.gameData = {
							type : self.tags.team,
							game_datetime : completeDate,
							games_id : self.game_id,
							team_id_one : teamOneId,
							team_id_two : teamTwoId,
							sports_id : sportsId 
						};
						routing.trigger(self.channel, self.gameData);
						//Channel(self.channel).publish(self.gameData);
					}

				});

			}

		}
	});
});
