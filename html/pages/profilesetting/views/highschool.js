/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/highschool.html', 'text!profilesetting/templates/sportslevel.html', 'text!profilesetting/templates/level.html', 'facade', 'views', 'utils', 'vendor', 'profilesetting/collections/states', 'profilesetting/collections/schools', 'profilesetting/collections/sports', 'profilesetting/views/teams', 'profilesetting/models/complevel', 'profilesetting/views/seasons', 'profilesetting/views/positions', 'profilesetting/models/team', 'profilesetting/models/position'], function(require, highSchoolTemplate, sportsLevelTemplate, levelTemplate) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, StatesCollection = require('profilesetting/collections/states'), SchoolCollection = require('profilesetting/collections/schools'), SportsCollection = require('profilesetting/collections/sports'), CompLevelModel = require('profilesetting/models/complevel'), SeasonsView = require('profilesetting/views/seasons'), PositionsView = require('profilesetting/views/positions'), TeamsView = require('profilesetting/views/teams'), TeamModel = require('profilesetting/models/team'), PositionModel = require('profilesetting/models/position'), HighSchoolView = SectionView.extend({

		template : highSchoolTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"keyup #txt-school-state" : "keyupState",
			"blur #txt-school-state" : "changeState",

			"keyup #txt-school-school" : "keyupSchool",
			"blur #txt-school-school" : "changeSchool",

			//"change .ddl-school-sports" : "changeSports",
			"change .ddl-sports" : "changeSports",
			//"change .ddl-school-complevel" : "changeCompLevel",
			"change .ddl-complevel" : "changeCompLevel",
			"change .chkSeasons" : "AddSportsItem",

			"click .btn-add-level" : "AddLevel",

			"click .spn-position-title_h" : "MarkPosition",

			"click .btn-add-sports" : "AddSports",

			"click .btn-Remove-Sport" : "RemoveSports",
			"click #btn-Add-School" : "SetUpAddSchool",
			"click .delete-team" : "DeleteTeam",
			"click .btn-Save-Positions" : "SavePositions",
			"click .btn-Close-Positions" : "ClosePositions",
			"click .btn-Finish-Sports" : "FinishSports",
			"click .edit-team" : "EditTeam"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			txtStates : '#txt-school-state',
			txtSchools : '#txt-school-school',
			content : '#content-school-prof-setting',
			fieldMessage : '.field-message',
			fieldError : '.field-error',
			ddlSports : '.ddl-sports',
			ddlComplevel : '.ddl-complevel',
			//	ddlSports : '#ddl-school-sports',
			//	ddlCompLevel : '#ddl-school-complevel',
			//	divSchoolSeasons :'#div-school-seasons',
			//	modalPosition : '.modal-school-positions',
			modalPosition : '.modal-positions',
			modalPositionBody : '.modal-position-body',
			modalPositionsTitle : '.spn-position-title_h',
			divSportsNameHeading : ".spn-sport-name",
			divMainSportsSection : "#def-school-sports-section",
			divLevels : ".div-sports-level",
			divSeasons : ".div-seasons",
			//	divLevels: ".div-school-sports-level",
			divsportsLevel : ".section-sportslevel",
			divSubLevels : ".div-levels",
			divSchoolSportsSection : ".school-sports-section",
			divSportsWrapper : ".div-sports-wrapper",
			/*Buttons And Links Used*/
			btnRemoveSports : ".btn-Remove-Sport",
			divTeamListDetail : ".section-team-list-detail",
			divAddSportSection : "#section-Add-Sports-school",
			btnAddSports : ".btn-add-sports",
			//btnSavePositions : ".btn-Save-Positions",
			btnClosePositions : ".btn-Close-Positions",
			btnFinishSports : ".btn-Finish-Sports"
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Data not exist.',
			optionsMissing : 'HeaderView expects option with model property.',

			selectSport : 'Please select sport',
			selectState : 'Please insert state',
			selectSchool : 'Please insert School',
			SelectLevel : 'Plesae Select Comp Level'
		},

		properties : {
			show_prev_year : 2
		},

		/*Selected States By API*/
		states : [],

		/*Seleted Schools By API*/
		schools : [],

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);
			this.init();
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
			self.SetUpTeamsView();

			//self.bindEvents();
		},

		/*render displays the view in browser*/
		render : function() {
			var self = this;

			SectionView.prototype.render.call(this);
		},

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
			//	self.fillSports();
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id, this.gender = options.gender
		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(event) {
			var state = $(self.controls.txtStates).val();
			var stateArr = [];
			var isValidKey = self.isValidAutoCompleteKey(event);
			if (state != '') {
				if (isValidKey == true) {
					// Disable Schools Text Box
					self.$(self.controls.txtSchools).attr('disabled', 'disabled');

					//// Remove Sports Section Html
					self.RemoveSportsSection();

					var stateList = new StatesCollection();
					stateList.state_name = state;
					stateList.fetch();
					$.when(stateList.request).done(function() {
						/*Don't Show Auto Complete In Case Of Error*/
						if (stateList.isError())
							return;

						var models = stateList.toJSON();
						if (models == null || models.length < 1)
							self.$el.find(self.controls.txtStates).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
						else
							self.$el.find(self.controls.txtStates).parent().find(self.controls.fieldMessage).html('').fadeOut();

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
							self.$el.find(self.controls.txtStates).autocomplete("destroy");
						} catch(ex) {
						}

						self.$el.find(self.controls.txtStates).autocomplete({
							source : stateArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						self.$el.find(self.controls.txtStates).trigger('keydown');
					});
				} else {
					console.log("Change State From else Called");
					self.changeState();
				}
			}
		},

		/*Change state_id as per the selected record from auto complete for state created in keyupState*/
		changeState : function(event) {
			var state_name = $(self.controls.txtStates).val();
			var isStateValid = false;
			self.states_id = '';

			self.states.forEach(function(value, index) {

				if (value['name'] == state_name) {
					isStateValid = true;
					self.states_id = value['id'];
					self.$(self.controls.txtSchools).removeAttr('disabled');
				}

			});

			if (!isStateValid) {
				self.states_id = 0;
				self.$(self.controls.txtSchools).attr('disabled', 'disabled');
			}
			self.keyupSchool();
		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupSchool : function(event) {
			var name = $(self.controls.txtSchools).val();
			var arr = [];
			var isValidKey = self.isValidAutoCompleteKey(event);
			if (name != '' && isValidKey == true) {

				//// Remove Sports Section Html
				self.RemoveSportsSection();

				var List = new SchoolCollection();
				List.sports_club = 0;
				List.states_id = self.states_id;
				List.org_name = name;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(self.controls.txtSchools).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();

					self.schools = [];
					for (var key in models) {
						self.schools.push(models[key].payload);
					}
					self.schools.forEach(function(value, index) {
						arr.push(value['org_name']);
					});
					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						self.$el.find(self.controls.txtSchools).autocomplete("destroy");
					} catch(ex) {
					}

					$(self.controls.txtSchools).autocomplete({
						source : arr
					});
					//Trigger keydown to display the autocomplete dropdown just created
					self.$el.find(self.controls.txtSchools).trigger('keydown');
				});
			} else {
				self.RemoveSportsSection();
				self.changeSchool();
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(event) {
			var name = this.$(self.controls.txtSchools).val();
			self.orgs_id = 0;
			self.schools.forEach(function(value, index) {
				if (value['org_name'] == name) {
					self.orgs_id = value['org_id'];
					if ($(self.controls.divMainSportsSection).find(self.controls.ddlSports).length < 1)
						self.fillSports(self.orgs_id, self.controls.divMainSportsSection);
				}
			});
		},

		/*IN CASE USER CHANGES SCHOOL OR STATE THE SPORT SECTION MUST BE DESTROYED AND RECONSTRUCTED*/
		RemoveSportsSection : function() {
			self.$el.find(self.controls.divMainSportsSection).html('');
		},

		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function(orgs_id, destination) {
			console.log("Fill Sports", orgs_id);
			if (self.sports && self.sports.length > 0) {
				self.SetupSportsView(orgs_id, destination);
			} else {
				var List = new SportsCollection();
				List.sport_type = 1;
				//TODO:  Gender is missing in API so need to update code
				List.male = 1;
				List.female = 0;
				if (self.gender == "male") {
					List.male = 1;
				} else if (self.gender == "famale") {
					List.female = 0;
				}
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();

					self.sports = [];
					for (var key in models) {
						self.sports.push(models[key].payload);
					}
					self.SetupSportsView(orgs_id, destination);
				});
			}
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSports : function(event) {
			var sportId = $(event.target).val();
			var orgsId = $(event.target).attr('orgsid');
			if ((sportId != 0 && sportId != null && sportId != '') && (orgsId && orgsId != 0 && orgsId != null && orgsId != '')) {
				self.sport_id = sportId;

				var controlToAppend = self.$(event.target).parents(self.controls.divsportsLevel).find(self.controls.divLevels);
				controlToAppend.html('');
				self.fillCompLevel(orgsId, controlToAppend, sportId);
			} else
				self.sport_id = 0;
		},
		/*Set up sports section as per the destination wehether default or updation case*/
		SetupSportsView : function(orgs_id, destination) {
			var markup = Mustache.to_html(sportsLevelTemplate, {
				sports : self.sports,
				orgsId : orgs_id
			});
			self.$(destination).append(markup);
			$(destination).parents(self.controls.divSportsWrapper).find(self.controls.btnAddSports).attr('orgsid', orgs_id);
			$(destination).parents(self.controls.divSportsWrapper).fadeIn();
		},
		/*Fills CompLevel DropDown after fetching data from API*/
		/*PARAMETER:
		 * orgs_id : int, School Id selected from changeSchool function */
		fillCompLevel : function(orgs_id, destination, sportsId) {
			self.compLevel_id = undefined;
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
					self.compLevel = [];
					if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length) {

						self.seasons = models.payload.seasons || [];
						for (var key in models.payload.complevels) {
							self.compLevel.push(models.payload.complevels[key]);
						}

						self.SetUpCompLevelView(orgs_id, destination, sportsId);
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
			self.compLevel_id = 0;

			for (var key in self.compLevel) {
				if (self.compLevel[key].complevel_id == value) {
					self.compLevel_id = value;
					console.log("if");
					self.$(event.target).attr('disabled', 'disabled');
					self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.divSeasons).fadeIn();
					return;
				}
			}
			console.log("else");
			console.log(self.compLevel_id);
			console.log(self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.divSeasons));
			self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.divSeasons).fadeOut();
		},
		/*SET UP LEVEL VIEW AS PER THE DESTINATION WHERE TO APPEND THE VIEW*/
		SetUpCompLevelView : function(orgs_id, destination, sports_id) {
			var data = self.GetSeasonsData(self.seasons, orgs_id, sports_id);
			console.log("Data", data);
			var markup = Mustache.to_html(levelTemplate, {
				levels : self.compLevel,
				Data : data
			});
			self.$(destination).append(markup);

			var controlPositions = self.$(destination).find(self.controls.modalPositionBody);
			self.fillPositions(self.sport_id, controlPositions);
		},
		/*FETCH SEASONS AS PER THE SCHOOL AND DISPLAY ACCORDINGLY*/
		GetSeasonsData : function(collection, orgs_id, sports_id) {
			var data = [];
			var y = (new Date).getFullYear();
			for (var i = self.properties.show_prev_year; i >= 0; i--) {
				var temp = {
					year : y,
					seasons : collection,
					orgsId : orgs_id,
					sportsId : sports_id
				};
				data.push(temp);
				y--;
			}
			return data;
		},
		/*Calls Positions View To Fill Data In Positions PopUp*/
		fillPositions : function(sport_id, destination) {
			if (self.sport_id) {
				this.positionView = new PositionsView({
					name : "settings-high-school-positions",
					destination : destination,
					sport_id : self.sport_id,
				});
			} else {
				self.$el.find(self.controls.ddlSports).parent().find(self.controls.fieldError).html(self.messages.selectSport).stop().fadeIn();
			}
		},
		/*Called on Checkbox click to show Positions PopUp to select Positions*/
		/*PARAMETERS:
		 e: event, checkbox click event consisting of all information of event triggered*/
		displayPositionPopup : function(event, teamId) {
			if ($(event.target).is(':checked')) {
				self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.modalPositionsTitle).attr('teamid', teamId);
				self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.modalPosition).modal('show')
			}
		},
		/*Mark Selected Position as Active ot inactive*/
		MarkPosition : function(event) {
			var control = self.$(event.target);
			var teamId = $(event.target).attr('teamid');
			var positionId = $(event.target).attr('positionId');
			var payload = {
				id1 : self.user_id,
				user_id : self.user_id,
				positions_id : positionId,
				teams_id : teamId,
			};

			if (control.hasClass('active')) {
				payload.position_id = positionId;
				var positionModel = new PositionModel(payload);
				positionModel.user_id = self.user_id;
				positionModel.type = "delete";
				positionModel.destroy();
				$.when(positionModel.request).done(function() {
					control.removeClass('active');
					console.log("positionModel", positionModel);
					console.log("positionModel", positionModel.toJSON());
				});

			} else {
				var positionModel = new PositionModel(payload);
				positionModel.user_id = self.user_id;
				control.addClass('active');
				positionModel.type = "save";
				positionModel.save();
				$.when(positionModel.request).done(function() {
					console.log("positionModel", positionModel);
					console.log("positionModel", positionModel.toJSON());
				});
			}
		},

		/*ADD LEVEL IF USER CLICKS ON ADD LEVEL BUTTON*/
		AddLevel : function(event) {

			var destination = self.$(event.target).parents(self.controls.divsportsLevel).find(self.controls.divLevels);
			var orgsId = $(event.target).attr('orgsid');
			var sportsId = self.$(event.target).parents(self.controls.divsportsLevel).find(self.controls.ddlSports).attr('sportsid');
			if (orgsId && orgsId != 0 && orgsId != null && orgsId != '') {
				self.fillCompLevel(orgsId, destination, sportsId);
			} else {
				console.error("Orgs Id is ", orgsId);
			}
		},
		/*ADD SPORT WHEN A USER CLICKS ON ADD SPORTS BUTTON*/
		AddSports : function(event) {
			var destination = self.$(event.target).parents(self.controls.divSportsWrapper).find(self.controls.divSchoolSportsSection);
			var orgsId = self.$(event.target).attr('orgsid');
			if (orgsId && orgsId != 0 && orgsId != null && orgsId != '') {
				self.fillSports(orgsId, destination);
				$(destination).parents(self.controls.divSportsWrapper).fadeIn();
			}

		},
		/*Removes Sports From HTML As Well As From Json*/
		RemoveSports : function(event) {

			self.$(event.target).parents(self.controls.divsportsLevel).remove();
		},
		/*SHOW EXISTING TEAM SECTION AT THE BOTTOM OF HIGHSCHOOL SECTION*/
		SetUpTeamsView : function() {
			console.log("Highschool teams view Set Up Teams View");
			this.teamsView = new TeamsView({
				user_id : self.user_id,
				destination : self.controls.divTeamListDetail,
				sports_club : 0
			});
		},
		/*Show Add Sport Section */
		SetUpAddSchool : function() {
			self.$el.find(self.controls.divAddSportSection).fadeIn();
		},
		/*Save Selected Sport To Database */
		AddSportsItem : function(event) {
			if ($(event.target).is(':checked') && $(event.target).attr('seasonid') && $(event.target).attr('year')) {
				var orgsId = $(event.target).attr('orgsid');
				var compLevelId = $(event.target).parents(self.controls.divSubLevels).find(self.controls.ddlComplevel).val();
				if ((orgsId && orgsId != 0 && orgsId != null && orgsId != '') && ((compLevelId && compLevelId != 0 && compLevelId != null && compLevelId != ''))) {

					var payload = {
						orgs_id : orgsId,
						teams_id : 0,
						id1 : self.user_id,
						user_id : self.user_id,
						sports_id : $(event.target).attr('sportsid'),
						complevels_id : compLevelId,
						seasons_id : $(event.target).attr('seasonid'),
						year : $(event.target).attr('year')
					};
					var teamsModel = new TeamModel(payload);
					teamsModel.type = "add";
					teamsModel.user_id = self.user_id;
					teamsModel.save();
					$.when(teamsModel.request).done(function() {
						console.log("teamsModel", teamsModel);
						console.log("teamsModel", teamsModel.toJSON());

						if (teamsModel.isError())
							return;

						var model = teamsModel.toJSON();
						if (model != null && model.payload != null || model.payload.team_id != null) {
							$(event.target).attr('teamid',model.payload.team_id);
							self.displayPositionPopup(event, model.payload.team_id);
						}
					});
				} else {
					console.error("OrgsId & ComplevelIds are", orgsId,compLevelId);
					var cont = $(event.target).parents(self.controls.divLevels).find(self.controls.ddlComplevel);
					console.log($(cont).parent().find(self.controls.fieldError));
					$(cont).parent().find(self.controls.fieldError).html(self.messages.SelectLevel).stop().fadeIn();
				}
			}
			else if(!$(event.target).is(':checked') && $(event.target).attr('teamid')){
				self.DeleteTeam(event);
			}
			 else {
			}
		},

		DeleteTeam : function(event) {
			console.log("Delete Team High School");
			var teamId = $(event.target).attr('teamid');
			console.log(teamId);
			if (teamId) {
				var payload = {};
				payload.user_id = self.user_id;
				payload.team_id = teamId;

				var teamsModel = new TeamModel(payload);
				teamsModel.user_id = self.user_id;
				teamsModel.team_id = teamId;
				teamsModel.type = "delete";
				teamsModel.destroy({
					data : {
						user_id : self.user_id,
						teams_id : teamId
					},
					processData : true,
					success : function() {
						$(event.target).removeAttr('teamid');
						//self.SetUpTeamsView();
					}
				});

			}
		},
		SavePositions : function(event) {
			//self.SetUpTeamsView();
			//alert($(event.target).attr('teamid'))
		},
		ClosePositions : function(event) {
			//self.SetUpTeamsView();
		},
		FinishSports : function() {
			console.log("SetUpTeamsView");
			self.ClearAddNewForm();
			self.init();
		},
		ClearAddNewForm : function() {
			self.RemoveSportsSection();
			self.$(self.controls.txtStates).val('');
			self.states_id = undefined;
			self.$(self.controls.txtSchools).attr('disabled', 'disabled').val('');
			self.orgs_id = undefined;
			self.$el.find(self.controls.divAddSportSection).fadeOut();
		},
		EditTeam : function(event) {
			console.log('self.teamsView.Teams', self.teamsView.Teams);
			//fillCompLevel : function(orgs_id, destination, sportsId) {
			var orgId = $(event.target).attr('orgsId');
			var sportId = $(event.target).attr('sportId');
			var destination = $(event.target).parent();
			$(destination).html('<span class="floatRight"><a href="javascript:void(0)" class=" well-small btn-primary btn-Finish-Sports" tabindex="0">Finish</a> </span>');
			$.each(self.teamsView.Teams, function(index, team) {
				console.log("team", team);
				if (orgId == team.payload.org_id) {
					$.each(team.payload.sports, function(index, sport) {
						console.log("sport", sport);
						if (sport.sports_id == sportId) {
							self.SetUpEditTeamView(orgId, destination, sportId, sport);
							return;
						}
					});
				}
			});

		},
		SetUpEditTeamView : function(orgId, destination, sportId, sport) {

			self.compLevel_id = undefined;
			// Destroy complevel id if request received to refill the comp level
			if (orgId && orgId > 0) {
				var List = new CompLevelModel();
				List.orgs_id = orgId;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					self.compLevel = [];
					if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length) {

						self.seasons = models.payload.seasons || [];
						for (var key in models.payload.complevels) {
							self.compLevel.push(models.payload.complevels[key]);
						}

						console.log(sport.complevels);
					$.each(sport.complevels, function(index, complevel) {
					self.SetUpCompLevelView(orgId, destination, sportId);
					console.log("complevel", complevel);
					
					var currDestinations = self.$(destination).find(self.controls.divSubLevels);
					
					
					console.log("currDestinations", currDestinations);
					if (currDestinations[index]) {
					var ddl = self.$(currDestinations[index]).find(self.controls.ddlComplevel);
						$(ddl).val(complevel.complevels_id).attr('disabled', 'disabled');
						$(currDestinations[index]).find(self.controls.divSeasons).fadeIn();
						
						$.each(complevel.seasons,function(i,season){
							console.log(".chkSeasons-"+ season.seasons_id + "-" +season.year);
							console.log("Checkbox",$(currDestinations[index]).find(".chkSeasons-"+ season.seasons_id + "-" +season.year));
							$(currDestinations[index]).find(".chkSeasons-"+ season.seasons_id + "-" +season.year).attr('checked','checked').attr('teamid',season.team_id);	
						});
						
					}
				});
					} else {
					}
				});

				

			} else {
				//	$(destination).html('');
			}

		},
	});

	return HighSchoolView;
});
