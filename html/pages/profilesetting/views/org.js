/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require',
	'text!profilesetting/templates/highschool.html',
	'text!profilesetting/templates/club.html',
	'text!profilesetting/templates/sportslevel.html',
	'text!profilesetting/templates/level.html',
	'facade',
	'views',
	'utils',
	'vendor',
	'profilesetting/collections/states',
	'profilesetting/collections/schools',
	'profilesetting/collections/sports',
	'profilesetting/views/teams',
	'profilesetting/models/complevel',
	'profilesetting/views/seasons',
	'profilesetting/views/positions',
	'profilesetting/models/team',
	'profilesetting/models/position'],
	function(
		require,
		highSchoolTemplate,
		clubTemplate,
		sportsLevelTemplate,
		levelTemplate) {

	var self,
		HighSchoolView,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		$ = facade.$,
		StatesCollection = require('profilesetting/collections/states'),
		SchoolCollection = require('profilesetting/collections/schools'),
		SportsCollection = require('profilesetting/collections/sports'),
		CompLevelModel = require('profilesetting/models/complevel'),
		SeasonsView = require('profilesetting/views/seasons'),
		PositionsView = require('profilesetting/views/positions'),
		TeamsView = require('profilesetting/views/teams'),
		TeamModel = require('profilesetting/models/team'),
		PositionModel = require('profilesetting/models/position');

	HighSchoolView = SectionView.extend({



		/*Bind Events on controls present in current view template*/
		events : {
			"keyup #txt-school-state" : "keyupState",
			"blur #txt-school-state" : "changeState",
			"keyup #txt-school-school" : "keyupSchool",
			"blur #txt-school-school" : "changeSchool",
			"keyup #txt-club-state" : "keyupState",
			"blur #txt-club-state" : "changeState",
			"keyup #txt-club-club" : "keyupSchool",
			"blur #txt-club-club" : "changeSchool",
			"change .ddl-sports" : "changeSports",
			"change .ddl-complevel" : "changeCompLevel",
			"change .chkSeasons" : "AddSportsItem",
			"click .btn-add-level" : "AddLevel",
			"click .spn-position-title_h" : "MarkPosition",
			"click .btn-add-sports" : "AddSports",
			"click .btn-Remove-Sport" : "RemoveSports",
			"click #btn-Add-School" : "SetUpAddSchool",
			"click #btn-Add-club" : "SetUpAddSchool",
			"click .delete-team" : "DeleteTeam",
			"click .btn-Save-Positions" : "SavePositions",
			"click .btn-Close-Positions" : "ClosePositions",
			"click .btn-Finish-Sports" : "FinishSports",
			"click .edit-team" : "EditTeam",
			"click .btnOpenPositions" : "displayPositionPopup",
			"click .add-school-h": "openAddHighSchoolPopup",
			"click .add-club-h" : "openAddClubPopup",
			"click .up-arrow-h" : "levelUpArrow",
			"click .down-arrow-h": "levelDownArrow"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/

		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'You don\'t have any teams registered yet.  Why not do that now?',
			optionsMissing : 'HeaderView expects option with model property.',
			selectSport : 'Please select sport',
			selectState : 'Please insert state',
			selectSchool : 'Please insert School',
			SelectLevel : 'Plesae Select Comp Level'
		},

		properties : {
			show_prev_year : 30
		},

		/*Selected States By API*/
		states : [],

		/*Seleted Schools By API*/
		schools : [],

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			if(options.type && options.type == "school") {
				this.type = "school";
				this.controls  = {
					txtStates : '#txt-school-state',
					txtSchools : '#txt-school-school',
					content : '#content-school-prof-setting',
					fieldMessage : '.field-message',
					fieldError : '.field-error',
					ddlSports : '.ddl-sports',
					ddlComplevel : '.ddl-complevel',
					modalPosition : '.modal-positions',
					modalPositionBody : '.modal-position-body',
					modalPositionsTitle : '.spn-position-title_h',
					divSportsNameHeading : ".spn-sport-name",
					divMainSportsSection : "#def-school-sports-section",
					divLevels : ".div-sports-level",
					divSeasons : ".div-seasons",
					divsportsLevel : ".section-sportslevel",
					divSubLevels : ".div-levels",
					divSchoolSportsSection : ".school-sports-section",
					divSportsWrapper : ".div-sports-wrapper",
					btnRemoveSports : ".btn-Remove-Sport",
					divTeamListDetail : ".section-team-list-detail",
					divAddSportSection : "#section-Add-Sports-school",
					btnAddSports : ".btn-add-sports",
					btnClosePositions : ".btn-Close-Positions",
					btnFinishSports : ".btn-Finish-Sports",
					btnOpenPositions : ".btnOpenPositions",
					chkSeasons : ".chkSeasons",
					btnAddLevel : ".btn-add-level"
				};
				this.template = highSchoolTemplate;
			} else {
				this.type = "club";
				this.controls  = {
					txtStates : '#txt-club-state',
					txtSchools : '#txt-club-club',
					content : '#content-club-prof-setting',
					fieldMessage : '.field-message',
					fieldError : '.field-error',
					ddlSports : '.ddl-sports',
					ddlComplevel : '.ddl-complevel',
					modalPosition : '.modal-positions',
					modalPositionBody : '.modal-position-body',
					modalPositionsTitle : '.spn-position-title_h',
					divSportsNameHeading : ".spn-sport-name",
					divMainSportsSection : "#def-club-sports-section",
					divLevels : ".div-sports-level",
					divSeasons : ".div-seasons",
					divsportsLevel : ".section-sportslevel",
					divSubLevels : ".div-levels",
					divSchoolSportsSection : ".school-sports-section",
					divSportsWrapper : ".div-sports-wrapper",
					btnRemoveSports : ".btn-Remove-Sport",
					divTeamListDetail : ".section-team-list-detail-club",
					divAddSportSection : "#section-Add-Sports-club",
					btnAddSports : ".btn-add-sports",
					btnClosePositions : ".btn-Close-Positions",
					btnFinishSports : ".btn-Finish-Sports",
					btnOpenPositions : ".btnOpenPositions",
					chkSeasons : ".chkSeasons",
					btnAddLevel : ".btn-add-level"
				};
				this.template = clubTemplate;
			}
			
			SectionView.prototype.initialize.call(this, options);
			_self = this;
			_self.setOptions(options);
			this.init();
		},
		
		/* Add club popup  */
		openAddHighSchoolPopup: function() {
			var _self = this;
			routing.trigger('add-school-init', '', '', 'school', _self, function(res) {
				console.log(res);
				_self.$el.find(_self.controls.txtSchools).val(res.name);
				_self.$el.find(_self.controls.txtStates).val(res.locationState.name);
				
				_self.states_id = "";
				_self.orgs_id = "";
				_self.states_id = res.locationState.id;
				_self.$(_self.controls.txtSchools).removeAttr('disabled');
				
				_self.orgs_id = res.org_id;
				if (_self.$el.find(_self.controls.divMainSportsSection).find(_self.controls.ddlSports).length < 1) {
					_self.fillSports(_self.orgs_id, _self.controls.divMainSportsSection);
				}
				_self.$el.find(".add-school-h").hide();
				
			});
		},
		
		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			var _self = this;
			_self.setupView();
			_self.SetUpTeamsView();
		},

		/*render displays the view in browser*/
		render : function() {
			var self = this;
			SectionView.prototype.render.call(this);
		},

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
			//	_self.fillSports();
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id, this.gender = options.gender;
		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(e) {
			var _self = this;
			var state = $(e.target).val();
			var stateArr = [];
			var isValidKey = _self.isValidAutoCompleteKey(e);
			if (state != '') {
				if (isValidKey == true) {
					// Disable Schools Text Box
					_self.$(e.target).parents(_self.controls.divAddSportSection).find(_self.controls.txtSchools).attr('disabled', 'disabled').val('');

					//// Remove Sports Section Html
					_self.RemoveSportsSection();

					var stateList = new StatesCollection();
					stateList.state_name = state;
					
					console.log("State Request Abort Request Function AddGame/Main.js");
					_self.stateFetchRequest = _self.stateFetchRequest || [];
					_self.stateFetchRequest.push(_self.cityFetchRequest || []);
					_self.stateFetchRequest.push(_self.schoolFetchRequest || []);

					_self.stateFetchRequest = _self.abortRequest(_self.stateFetchRequest);
					$(e.target).addClass('ui-autocomplete-loading');
					var tempCollection = stateList.fetch();
					_self.stateFetchRequest.push(tempCollection);
					
					$.when(stateList.request).done(function() {
						/*Don't Show Auto Complete In Case Of Error*/
						if (stateList.isError())
							return;

						var models = stateList.toJSON();
						if (models == null || models.length < 1)
							_self.$el.find(_self.controls.txtStates).parent().find(_self.controls.fieldMessage).html(_self.messages.dataNotExist).stop().fadeIn();
						else
							_self.$el.find(_self.controls.txtStates).parent().find(_self.controls.fieldMessage).html('').fadeOut();

						_self.states = [];
						for (var key in models) {
							_self.states.push(models[key].payload);
						}
						_self.states.forEach(function(value, index) {
							stateArr.push(value['name']);
						});
						// Destroy existing autocomplete from text box before attaching it again
						// try catch as for the first time it gives error
						try {
							_self.$el.find(_self.controls.txtStates).autocomplete("destroy");
						} catch(ex) {
						}

						_self.$el.find(_self.controls.txtStates).autocomplete({
							source : stateArr
						});

						//Trigger keydown to display the autocomplete dropdown just created
						_self.$el.find(_self.controls.txtStates).trigger('keydown');
					});
				} else {
					_self.changeState(e);
				}
			}
		},

		/*Change state_id as per the selected record from auto complete for state created in keyupState*/
		changeState : function(e) {
			var _self = this;
			var state_name = $(e.target).val();
			var isStateValid = false;
			_self.states_id = '';
			
			
			_self.states.forEach(function(value, index) {
				if (value['name'] == state_name) {
					isStateValid = true;
					_self.states_id = value['id'];
					_self.$(_self.controls.txtSchools).removeAttr('disabled');
				}

			});

			if (!isStateValid) {
				_self.states_id = 0;
				_self.$(_self.controls.txtSchools).attr('disabled', 'disabled');
			}
			//_self.keyupSchool(event);
		},

		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupSchool : function(event) {
			var _self = this;
			var name = $(event.target).val();
			var arr = [];
			var isValidKey = _self.isValidAutoCompleteKey(event);
			if (name != '' && isValidKey == true) {

				//// Remove Sports Section Html
				_self.RemoveSportsSection();

				var List = new SchoolCollection();
				List.sports_club = (_self.type == "school")?0:1;
				List.states_id = _self.states_id;
				List.org_name = name;
				console.log("School Request Abort Request Function");
				_self.schoolFetchRequest = _self.abortRequest(_self.schoolFetchRequest);
				$(event.target).addClass('ui-autocomplete-loading');
				$(event.target).removeAttr("data-id");
				var tempCollection = List.fetch();
				_self.schoolFetchRequest.push(tempCollection);

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						_self.$el.find(_self.controls.txtSchools).parent().find(_self.controls.fieldMessage).html(_self.messages.dataNotExist).stop().fadeIn();
					else
						_self.$el.find(_self.controls.txtSchools).parent().find(_self.controls.fieldMessage).html('').stop().fadeOut();
					_self.schools = [];
					for (var key in models) {
						_self.schools.push(models[key].payload);
					}
					
					_self.schools.forEach(function(value, index) {
						arr.push({id: value['id'], value: value['org_name'], city: value['city']});
					});
					// Destroy existing autocomplete from text box before attaching it again
					// try catch as for the first time it gives error
					try {
						_self.$el.find(_self.controls.txtSchools).autocomplete("destroy");
					} catch(ex) {
						
					}

					$(event.target).autocomplete({
						source : arr,
						select :  function (e, ui) {
							//console.error($(event.target));
							console.error(e);
							setTimeout(function() {
								$(event.target).val(ui.item.value);
								$(event.target).attr("data-id", ui.item.id);
								$(event.target).trigger("blur");								
							}, 100);

							//self.changeIndividualGame(event,ui);
							// display the selected text
							// $("#txtAllowSearchID").val(ui.item.value); // save selected id to hidden input
							}
					}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
						return $( "<li>" )
							.append( "<a>" + item.value + "<br><span class='sub-label'>" + item.city + "</span></a>" )
							.appendTo( ul );
					};

					//Trigger keydown to display the autocomplete dropdown just created
					$(event.target).trigger('keydown');
				});
			} else {
				_self.RemoveSportsSection();
				_self.changeSchool(event);
			}
		},

		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(event) {
			var _self = this, i, len = _self.schools.length;
			var name = _self.$(event.target).attr("data-id");
			_self.orgs_id = 0;
			
			for(i = 0; i < len; i++) {
				if (_self.schools[i]['id'] == name) {
					_self.orgs_id = _self.schools[i]['org_id'];
					var sportId = _self.schools[i]["single_sport_id"];
					if (_self.$el.find(_self.controls.divMainSportsSection).find(_self.controls.ddlSports).length < 1)
						_self.fillSports(_self.orgs_id, _self.controls.divMainSportsSection, sportId);
					break;
				}
			}
		},
		
		/* Add club popup  */
		openAddClubPopup: function(e) {

			var orgNameSoFar = $(e.target).parent().find('input#txt-club-club').val();

			var _self = this;
			routing.trigger('add-school-init', '', '', 'club', _self, function(res) {
				console.log("RESULT",res);
				_self.$el.find(_self.controls.txtSchools).val(res.name);
				_self.$el.find(_self.controls.txtSchools).attr("data-id", res.org_id);
				_self.$el.find(_self.controls.txtStates).val(res.locationState.name);

				_self.$el.find(_self.controls.divSportsWrapper).css({
					'background-color':'rgb(255, 223, 223)'
				})
				_self.states_id = "";
				_self.orgs_id = "";
				_self.states_id = res.locationState.id;
				_self.$(_self.controls.txtSchools).removeAttr('disabled');
				
				_self.orgs_id = res.org_id;
				if (_self.$el.find(_self.controls.divMainSportsSection).find(_self.controls.ddlSports).length < 1) {
						_self.fillSports(_self.orgs_id, _self.controls.divMainSportsSection, res.single_sport_id);
				}

				var $ob = _self.$el.parents().find($('#btn-Add-club')),
					$pos = $ob.position();
				$ob.parents(document).animate({
					scrollTop : $pos.top
				}, '1000');

				_self.$el.find(".add-club-h").hide();
				
			},orgNameSoFar);
		},

		/*IN CASE USER CHANGES SCHOOL OR STATE THE SPORT SECTION MUST BE DESTROYED AND RECONSTRUCTED*/
		RemoveSportsSection : function() {
			var _self = this;
			_self.$el.find(_self.controls.divMainSportsSection).html('');
		},

		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function(orgs_id, destination, sportId) {
			var _self = this;
			if (_self.sports && _self.sports.length > 0) {
				_self.SetupSportsView(orgs_id, destination, sportId);
			} else {
				var List = new SportsCollection();
				//this shows all sports if it is a club.
				List.sport_type = this.type == 'club' ? 0 : 1;
					List.sport_type_id = List.sport_type;
					// For Sports Not associated With Individuals
					//TODO:  Gender is missing in API so need to update code
					List.male = 1;
					List.female = 0;
					if (_self.gender == "male") {
						List.male = 1;
					} else if (_self.gender == "famale") {
						List.female = 0;
					}

		//		alert("called");

					List.fetch();
					$.when(List.request).done(function() {
		//				alert("called");
					if (List.isError()) return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						_self.$el.find(_self.controls.ddlSports).parent().find(_self.controls.fieldMessage).html(_self.messages.dataNotExist).stop().fadeIn();

					_self.sports = [];
					for (var key in models) {
						_self.sports.push(models[key].payload);
					}
					
					// Sort Sports Before Filling Up Into Drop-Down
					_self.sort(_self.sports, 'sport_name', false);
					_self.SetupSportsView(orgs_id, destination, sportId);
				});
			}
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSports : function(event) {
			var _self = this;
			console.log("SPORTS",_self.sports);
			var sportId = $(event.target).val();
			var orgsId = $(event.target).attr('orgsid');
			console.log("Event Target Sports List",$(event.target), sportId, orgsId);
			if ((sportId != 0 && sportId != null && sportId != '') && (orgsId && orgsId != 0 && orgsId != null && orgsId != '')) {
				_self.sport_id = sportId;
				var controlToAppend = _self.$(event.target).parents(_self.controls.divsportsLevel).find(_self.controls.divLevels);
				console.log("CALLED",controlToAppend);
				controlToAppend.html('');
				_self.$(event.target).parents(_self.controls.divsportsLevel).find(_self.controls.btnAddLevel).attr('sportid',sportId);
				_self.fillCompLevel(orgsId, controlToAppend, sportId);
			} else
				_self.sport_id = 0;
		},
		/*Set up sports section as per the destination wehether default or updation case*/
		SetupSportsView : function(orgs_id, destination, sportId) {
			var _self = this;
			var markup = Mustache.to_html(sportsLevelTemplate, {
				sports : _self.sports,
				orgsId : orgs_id
			});
			
			_self.$(destination).append(markup);
			if(sportId) _self.$(destination).find(".section-sportslevel .select-sports-outer-h").hide();
			$(destination).parents(_self.controls.divSportsWrapper).find(_self.controls.btnAddSports).attr('orgsid', orgs_id);
			if(sportId) _self.$(destination).find(".ddl-sports").val(sportId).trigger("change");
			$(destination).parents(_self.controls.divSportsWrapper).fadeIn();
		},

		findSportById: function(sports_id) {
			var _self = this;
			if(_self.sports && _self.sports.length < 1) {
				for (var k=0; k< _self.sports.length; k++) {
					if(_self.sports[k].id==sports_id) return _self.sports[k];
				}
			} else {
				 return 0;				
			}
		},

		/*Fills CompLevel DropDown after fetching data from API*/
		/*PARAMETER:
		 * orgs_id : int, School Id selected from changeSchool function */
		fillCompLevel : function(orgs_id, destination, sportsId) {
			var _self = this;
			_self.compLevel_id = undefined;
			// Destroy complevel id if request received to refill the comp level
			if (orgs_id && orgs_id > 0) {
				var List = new CompLevelModel();
				List.orgs_id = orgs_id;
				_self.compFetchRequest = _self.abortRequest(_self.compFetchRequest);
				var tempCollection = List.fetch();
				_self.compFetchRequest.push(tempCollection);
				$.when(List.request).done(function() {
					if (List.isError()) return;
					var models = List.toJSON();
					_self.compLevel = [];
					if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length) {
						_self.seasons = models.payload.seasons || [];
						for (var key in models.payload.complevels) {
							_self.compLevel.push(models.payload.complevels[key]);
						}
						var sport = _self.findSportById(sportsId);
						
						if(!sport)
							sport = sportsId;
						
						_self.SetUpCompLevelView(orgs_id, destination, sport);
					} else {
					}
				});
			} else {
				$(destination).html('');
			}
		},
		
		/*On CompLevel DropDown Change Its value is to be assigned into a variable*/
		changeCompLevel : function(event) {
			var _self = this;
			var value = $(event.target).val();
			_self.compLevel_id = 0;
			for (var key in _self.compLevel) {
				if (_self.compLevel[key].complevel_id == value) {
					_self.compLevel_id = value;
					_self.$(event.target).attr('disabled', 'disabled');
					_self.$(event.target).parents(_self.controls.divSubLevels).find(_self.controls.divSeasons).fadeIn();
					return;
				}
			}
			_self.$(event.target).parents(_self.controls.divSubLevels).find(_self.controls.divSeasons).fadeOut();
		},
		
		/*SET UP LEVEL VIEW AS PER THE DESTINATION WHERE TO APPEND THE VIEW*/
		SetUpCompLevelView : function(orgs_id, destination, sport) {
			var _self = this;
			var sports_id = sport.sports_id;
			
			if(!sports_id) sports_id = sport;
			
			var data = _self.GetSeasonsData(_self.seasons, orgs_id, sports_id);
			console.log(data);
			var markup = Mustache.to_html(levelTemplate, {
				levels : _self.compLevel,
				Data : data,
				'sport' : sport
			});
			_self.$(destination).append(markup);
			var controlPositions = _self.$(destination).find(_self.controls.modalPositionBody);
			_self.fillPositions(sports_id, controlPositions);
		},
		
		
		/* level Up Arrow */
		levelUpArrow: function(e) {
			var _self = this;
			var $parent = $(e.currentTarget).parents(".complevels-wrapper");
			var scrollTop =  $parent.find(".complevels-container").scrollTop();
			var height = $parent.find(".complevels-container").height();
			if(scrollTop > height)
				var top = scrollTop - height;
			else
				var top = 0;
			$parent.find('.complevels-container').animate({scrollTop: top});
		},
		
		
		/* level Down Arrow */
		levelDownArrow: function(e) {
			var _self = this;
			var $parent = $(e.currentTarget).parents(".complevels-wrapper");
			var scrollTop =  $parent.find(".complevels-container").scrollTop();
			var top = scrollTop + $parent.find(".complevels-container").height();
			$parent.find('.complevels-container').animate({scrollTop: top});	
		},
		
		
		
		/*FETCH SEASONS AS PER THE SCHOOL AND DISPLAY ACCORDINGLY*/
		GetSeasonsData : function(collection, orgs_id, sports_id) {
			var _self = this;
			var data = [];
			var y = (new Date).getFullYear();
			for (var i = _self.properties.show_prev_year; i >= 0; i--) {
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
			var _self = this;
			console.log("fillpositions",sport_id,destination);
			if (sport_id) {
				console.log("sport_id", sport_id, "destination", destination);
				this.positionView = new PositionsView({
					name : "settings-high-school-positions",
					destination : destination,
					sport_id : sport_id
				});
				_self.$el.find(_self.controls.ddlSports).parent().find(_self.controls.fieldError).html('').fadeOut();
			} else {
				_self.$el.find(_self.controls.ddlSports).parent().find(_self.controls.fieldError).html(_self.messages.selectSport).stop().fadeIn();
			}
		},
		/*Called on Checkbox click to show Positions PopUp to select Positions*/
		/*PARAMETERS:
		 e: event, checkbox click event consisting of all information of event triggered*/
		displayPositionPopup : function(event) {
			var _self = this;
			_self.clickedPositionTarget = $(event.target);
			if ($(event.target).parent().find(_self.controls.chkSeasons).is(':checked')) {
				var teamId = $(event.target).attr('teamid');
				console.log($(event.target).parents(_self.controls.divSubLevels).find(_self.controls.modalPositionsTitle));
				if ($(event.target).parents(_self.controls.divSubLevels).find(_self.controls.modalPositionsTitle).length > 0) {
					_self.$(event.target).parents(_self.controls.divSubLevels).find(_self.controls.modalPositionsTitle).attr('teamid', teamId).removeClass('active');
					// Iterate through the existing positions and mark them active
					var ids = $(event.target).attr('positions');
					console.log("ids", ids);
					if (ids) {
						var array = ids.split(',');
						$.each(array, function(index, id) {
							_self.$(event.target).parents(_self.controls.divSubLevels).find("#pos-" + id).addClass("active");
						});
					}
					_self.$(event.target).parents(_self.controls.divSubLevels).find(_self.controls.modalPosition).modal('show');
				} else {
					// Alert Message If No Positions Exists For The Sport Selected
					alert("No Positions exists for the sport");
				}
			} else {
				alert("Select Season");
			}
		},

		/*Mark Selected Position as Active ot inactive*/
		MarkPosition : function(event) {
			var _self = this;
			var control = _self.$(event.target);
			var teamId = $(event.target).attr('teamid');
			var positionId = $(event.target).attr('positionId');
			var payload = {
				id1 : _self.user_id,
				user_id : _self.user_id,
				positions_id : positionId,
				teams_id : teamId
			};

			if (control.hasClass('active')) {//If the positions is already added then remove it
				payload.position_id = positionId;
				var positionModel = new PositionModel(payload);
				positionModel.user_id = _self.user_id;
				positionModel.type = "delete";
				positionModel.destroy({
					data : payload
				});

				$.when(positionModel.request).done(function() {
					control.removeClass('active');
					_self.updatePositionButtonNumber(teamId,false);
				});

			} else {//If the positions inactive add it on server
				var positionModel = new PositionModel(payload);
				positionModel.user_id = _self.user_id;
				positionModel.type = "save";
				positionModel.save();
				$.when(positionModel.request).done(function() {
					control.addClass('active');
					_self.updatePositionButtonNumber(teamId,true);
				});
			}
		},

		/*ADD LEVEL IF USER CLICKS ON ADD LEVEL BUTTON*/
		AddLevel : function(event) {
			var _self = this;
			var destination = _self.$(event.target).parents(_self.controls.divsportsLevel).find(_self.controls.divLevels);
			var orgsId = $(event.target).attr('orgsid');
			var sportsId = $(event.target).attr('sportid');
			if (orgsId && orgsId != 0 && orgsId != null && orgsId != '') {
				console.log("destination add level function", destination);
				_self.fillCompLevel(orgsId, destination, sportsId);
			} else {
				console.error("Orgs Id is ", orgsId);
			}
		},
		
		/*ADD SPORT WHEN A USER CLICKS ON ADD SPORTS BUTTON*/
		AddSports : function(event) {
			var _self = this;
			var orgsId = _self.$(event.target).attr('orgsid');
			var destination = $(_self.controls.divSportsWrapper + '[orgsId="'+orgsId+'"] ' + _self.controls.divSchoolSportsSection);
			if (orgsId && orgsId != 0 && orgsId != null && orgsId != '') {
				_self.fillSports(orgsId, destination);
				$(destination).parents(_self.controls.divSportsWrapper).fadeIn();
			}
		},
		/*Removes Sports From HTML As Well As From Json*/
		RemoveSports : function(event) {
			var _self = this;
			_self.$(event.target).parents(_self.controls.divsportsLevel).remove();
		},
		/*SHOW EXISTING TEAM SECTION AT THE BOTTOM OF HIGHSCHOOL SECTION*/
		SetUpTeamsView : function() {
			var _self = this;
			console.log("Highschool teams view Set Up Teams View",_self.type);
			this.teamsView = new TeamsView({
				user_id : _self.user_id,
				destination : _self.controls.divTeamListDetail,
				sports_club : (_self.type == "school")?0:1,
				org_type : _self.type

			});
		},
		/*Show Add Sport Section */
		SetUpAddSchool : function() {
			var _self = this;
			_self.$el.find(_self.controls.divAddSportSection).fadeIn();
		},
		
		/*Save Selected Sport To Database */
		AddSportsItem : function(event) {
			var _self = this;

			_self.$el.find(_self.controls.btnFinishSports).html('Finish');

			if ($(event.target).is(':checked') && $(event.target).attr('seasonid') && $(event.target).attr('year')) {
				var orgsId = $(event.target).attr('orgsid');
				var compLevelId = $(event.target).parents(_self.controls.divSubLevels).find(_self.controls.ddlComplevel).val();
				if ((orgsId && orgsId != 0 && orgsId != null && orgsId != '') && ((compLevelId && compLevelId != 0 && compLevelId != null && compLevelId != ''))) {
					var payload = {
						orgs_id : orgsId,
						teams_id : 0,
						id1 : _self.user_id,
						user_id : _self.user_id,
						sports_id : $(event.target).attr('sportsid'),
						complevels_id : compLevelId,
						seasons_id : $(event.target).attr('seasonid'),
						year : $(event.target).attr('year')
					};
					var teamsModel = new TeamModel(payload);
					teamsModel.type = "add";
					teamsModel.user_id = _self.user_id;
					teamsModel.save();
					$.when(teamsModel.request).done(function() {
						if (teamsModel.isError())
							return;
							
						var model = teamsModel.toJSON();
						if (model != null && model.payload != null || model.payload.id != null) {
							$(event.target).attr('teamid', model.payload.id);

							console.log(model.payload.seasons_obj);

							_self.insertPositionsButton($(event.target),model.payload.seasons_obj,model.payload.year,model.payload.id);
							_self.displayPositionPopup(event, model.payload.id);
						}
					});
				} else {
					var cont = $(event.target).parents(_self.controls.divLevels).find(_self.controls.ddlComplevel);
					$(cont).parent().find(_self.controls.fieldError).html(_self.messages.SelectLevel).stop().fadeIn();
					$(event.target).parent().find(_self.controls.btnOpenPositions).attr('disabled','disabled');
				}
			} else if (!$(event.target).is(':checked') && $(event.target).attr('teamid')) {
				// IN CASE TEAM IS ALREADY ADDED INTO DATABASE DELETE IT
				_self.DeleteTeam(event);
			}
		},
		// DELETE TEAM FROM DATABASE
		DeleteTeam : function(event) {
			var _self = this;
			var teamId = $(event.target).attr('teamid');
			if (teamId) {
				var payload = {};
				payload.user_id = _self.user_id;
				payload.team_id = teamId;

				var teamsModel = new TeamModel(payload);
				teamsModel.user_id = _self.user_id;
				teamsModel.team_id = teamId;
				teamsModel.type = "delete";
				teamsModel.destroy({
					data : {
						user_id : _self.user_id,
						teams_id : teamId
					},
					processData : true,
					success : function() {
						$(event.target).removeAttr('teamid');
						$(event.target).parent().find(_self.controls.btnOpenPositions).attr('disabled','disabled');
					}
				});

			}
		},
		//REFRESH TEAM LIST AS SOON AS USER IS DONE WITH THE CHANGES AND CLICKS FINISH
		FinishSports : function() {
			console.log("Current state of view",this);
			var _self = this;
			_self.ClearAddNewForm();
			_self.init();
		},
		// CLEAR THE COMPLEE FORM WHICH IS USED TO ADD NEW ORGANIZATION AND RELATED DATA
		ClearAddNewForm : function() {
			var _self = this;
			_self.RemoveSportsSection();
			_self.$(_self.controls.txtStates).val('');
			_self.states_id = undefined;
			_self.$(_self.controls.txtSchools).attr('disabled', 'disabled').val('');
			_self.orgs_id = undefined;
			if(_self.type == 'club')
				_self.$el.find(".add-club-h").show();
			else
				_self.$el.find(".add-school-h").show();

			_self.$el.find(_self.controls.divAddSportSection).fadeOut();
		},
		// EDIT VIEW FOR A TEAM IF USER CLICKS EDIT LINK FOR TEAMS
		EditTeam : function(event) {
			var _self = this;
			console.log('Event',event.target);
			//fillCompLevel : function(orgs_id, destination, sportsId) {
			var orgId = $(event.target).attr('orgsId');
			var sportId = $(event.target).attr('sportId');
			var destination = $(event.target).parent();

			var tempHtml = '<div class="section-sportslevel"><div class="div-sports-level"></div>';
			tempHtml += '<a tabindex="0" orgsid="' + orgId + '" class="btn-add-level" href="javascript:void(0)">Add Level</a>';
			tempHtml += '<span class="floatRight"><a href="javascript:void(0)" class="common-btn common-btn-direction btn-Finish-Sports" tabindex="0">Finish</a> </span>';
			tempHtml += '</div>';
			
			$(destination).html(tempHtml);
			var sportDestination = $(destination).find(_self.controls.divLevels);
			
			$.each(_self.teamsView.Teams, function(index, team) {
				if (orgId == team.payload.org_id) {
					$.each(team.payload.sports, function(index, sport) {
						if (sport.sports_id == sportId) {
							_self.SetUpEditTeamView(orgId, sportDestination, sportId, sport);
							return;
						}
					});
				}
			});

		},
		// DISPLAY THE SPORT AS FETCHED FROM RECORDS IN FUNTION "EDITTEAM" AS PER THE VIEW
		/*PARAMETERS:
		 orgId :int, schoolId,
		 destination: jquery selector to add created markup
		 sportId : selected sport for which edit button is clicked
		 sport : single object of sports
		 * */
		SetUpEditTeamView : function(orgId, destination, sportId, sport) {
			var _self = this;
			_self.compLevel_id = undefined;
			// Destroy complevel id if request received to refill the comp level
			if (orgId && orgId > 0) {
				var List = new CompLevelModel();
				List.orgs_id = orgId;
				List.fetch();

				console.log("Complevel Model Request Abort Request Function");
				_self.compLevelFetchRequest = _self.abortRequest(_self.compLevelFetchRequest);
				_self.compLevelFetchRequest = List.fetch();
				
				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					_self.compLevel = [];
					if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length) {

						_self.seasons = models.payload.seasons || [];
						for (var key in models.payload.complevels) {
							_self.compLevel.push(models.payload.complevels[key]);
						}

						$.each(sport.complevels, function(index, complevel) {
							_self.SetUpCompLevelView(orgId, destination, sport);

							var currDestinations = _self.$(destination).find(_self.controls.divSubLevels);

							if (currDestinations[index]) {
								var ddl = _self.$(currDestinations[index]).find(_self.controls.ddlComplevel);
								$(ddl).val(complevel.complevels_id).attr('disabled', 'disabled');
								$(currDestinations[index]).find(_self.controls.divSeasons).fadeIn();

								$.each(complevel.seasons, function(i, season) {

									$(currDestinations[index]).find(".chkSeasons-" + season.seasons_id + "-" + season.year).attr('checked', 'checked').attr('teamid', season.team_id);

									_self.insertPositionsButton($(currDestinations[index]).find(".chkSeasons-" + season.seasons_id + "-" + season.year),season);

								});

							}
						});
					} else {
					}
				});
				
				_self.$(destination).parents(_self.controls.divsportsLevel).find(_self.controls.btnAddLevel).attr('sportid',sportId);
			} else {
			}

		},

		insertPositionsButton: function(seasonChk,season,year,team_id){

			console.log(season);

			if(!season.positions) season.positions = [];
			if(!season.seasons_id) season.seasons_id = season.season_id;
			if(season.year) year = season.year;
			if(season.team_id) team_id = season.team_id;

			console.log(_self.controls.btnOpenPositions + '[teamid="'+ team_id + '"]',$(_self.controls.btnOpenPositions + '[teamid="'+ team_id + '"]'));
			if($(seasonChk).parent().find(_self.controls.btnOpenPositions + '[teamid="'+ team_id + '"]').length)
			{
				$(seasonChk).parent().find(_self.controls.btnOpenPositions + '[teamid="'+ team_id + '"]').attr('disabled','disabled');
			}
			else
			{
				$(seasonChk).parent().append('<a href="javascript:void(0)" id="season-positions-' + season.seasons_id + '-' + year + '" class="btnOpenPositions btn" >Positions (' + season.positions.length + ')</a>');
			}

			$(seasonChk).parent().find(_self.controls.btnOpenPositions).attr('teamid', team_id);
			$(seasonChk).parent().find(_self.controls.btnOpenPositions).attr('data-number-positions', season.positions.length);

			var positionIds = "";
			if (season.positions) {
				$.each(season.positions, function(j, position) {
					if (position) {
						positionIds += position.id + ",";
					}
				});
			}
			$(seasonChk).parent().find(_self.controls.btnOpenPositions).attr('positions', positionIds);

		},

		updatePositionButtonNumber: function(teamid,addTo){
			var $posBtn = $(_self.controls.btnOpenPositions + '[teamid="'+ teamid + '"]'),
				oldNumber = $posBtn.data('number-positions'),
				newNumber = addTo ? oldNumber+1 : oldNumber-1;
			$posBtn.data('number-positions', newNumber)
				.html('Positions (' + newNumber + ')');
		},

		ClosePositions: function(event){
			var _self = this;
			if(_self.clickedPositionTarget){
				var titles = $(event.target).parents(_self.controls.modalPosition).find(_self.controls.modalPositionsTitle);
				var positionIds = '';
				titles.each(function(){
					if($(this).hasClass("active"))
						positionIds += $(this).attr("positionid") + ",";
				});
				$(_self.clickedPositionTarget).attr('positions', positionIds);
				_self.clickedPositionTarget = undefined;
			}
			
		}
	});

	return HighSchoolView;
});
