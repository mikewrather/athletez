/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Add Game VIEW} constructor
 */
define(['require', 'text!usercontrols/addevent/templates/layout.html', 'facade', 'views', 'utils', 'vendor',
	'sportorg/collections/sports_listall', 'location/collections/states', 'usercontrols/addgame/collections/teams',
	'location/collections/cities', 'usercontrols/addgame/collections/teams_user', 'usercontrols/addgame/collections/teams',
	'usercontrols/addgame/collections/games_search', 'usercontrols/addgame/models/team', 'usercontrols/addgame/models/team_add',
	'usercontrols/addgame/models/game', 'usercontrols/addgame/models/uslgamelink','sportorg/models/game',
'usercontrol/dropdown/view/dropdown', 'usercontrol/location/views/get-view-location', 'component/forms',
	"vendor/plugins/dateformat"
], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'),
		Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$,
		BasicModel = require('usercontrols/tag/models/basic_info'), SportsCollection = require('sportorg/collections/sports_listall'),
		StatesCollection = require('location/collections/states'), CityCollection = require('location/collections/cities'),
		UserTeamsCollection = require('usercontrols/addgame/collections/teams_user'),
		TeamsCollection = require('usercontrols/addgame/collections/teams'), TeamModel = require('usercontrols/addgame/models/team'),
		TeamAddModel = require('usercontrols/addgame/models/team_add'), GameSaveModel = require('usercontrols/addgame/models/game'),
		GamesSearchCollection = require('usercontrols/addgame/collections/games_search'),
		GameModel = require('sportorg/models/game'),
		DropDownList = require('usercontrol/dropdown/view/dropdown'),
		dateFormat = require('vendor/plugins/dateformat'),
		FormComponent = require('component/forms'),
	//Models
	UserGameLinkModel = require('usercontrols/addgame/models/uslgamelink');
	
	return SectionView.extend({
		template : '<div class="add-event-container-h"></div>',
	//	template: layoutTemplate,
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
		/*	$(self.el).find(self.controls.txtGameDate).datepicker({
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
				*/
			this.setupForm();
				
			// $(self.el).find(self.controls.txtGameDate).datetimepicker({
				// timeFormat : 'hh:mm tt',
				// //separator : ' @ ',
				// showTimezone : true,
				// changeMonth : true,
				// changeYear : true
			// });
		},

		setupForm : function(){
			var _self = this;
			var formData = new FormComponent({
				'game_search' : {
					type : 'AutoComplete',
					label: "Event Name",
					form_values: {
						keyNameInPayload: 'event_name',
						subLabelInPayload: 'full_date',
						serverKey: 'event_name',
						serverDbField: 'event_name',
						defaultValue: '',
						field_width:'80%',
						request_fields : [{
							key : 'sports_id',
							value : function () { return _self.sports_id; }
						},
							{
								key : 'game_name',
								value: function(_that) {
									return _that.$el.val();
								}
							}
						],
		/*				initialInsert: {
							value: "New Event",
							l: "Add this as a new event",
							id: "0",
							customCallback: function(id,item){
								console.log(id,item);
								$('.date-picker-field').removeClass('hide');
								$('.time-picker-field').removeClass('hide');
								$('.ampm-field').removeClass('hide');
								$('.location-chooser').removeClass('hide');
							}
						},
		*/
						source_collection : GamesSearchCollection,
						request_finished : function() {
							console.log("request finished");
						},

						// fetch automatic and show first team
						automaticFetch: true,
						automaticFetchFn: function(_that) {
							console.log("auto fetch called",_that);
						},

						callback : function(id,item) {

							var $form = _self.$el.find('.add-event-container-h form');

							if(id > 0){
								var gameModel = new GameModel({id:id});
								gameModel.fetch();
								$.when(gameModel.request).done(function(){

									var dateStr = gameModel.get("payload").time_as_int,
										gDate = new Date(dateStr);


									$form.find('input[type="submit"]').val("Add Me to This Event");
									$form.find('input[name="games_id"]').val(gameModel.get('payload').id);
 									$form.find('input[name="date_chooser"]').val(dateFormat(gDate,"mmm d, yyyy")).attr('disabled','disabled');
									$form.find('input[name="time_chooser"]').val(dateFormat(gDate,"h:MM")).attr('disabled','disabled');
									$form.find('textarea.location-h').html(gameModel.get('payload').game_location).trigger('blur').attr('disabled','disabled');

									$form.find('.verify-address-h').trigger('click');


								});
							}
							else
							{
								$form.find('input[type="submit"]').val("Create Event");
								$form.find('input[name="games_id"]').val("0");
								$form.find('input[name="game_name"]').val($('input[name="game_search"]').val());
								$form.find('input[name="date_chooser"]').removeAttr('disabled').val("");
								$form.find('input[name="time_chooser"]').removeAttr('disabled').val("");
								$form.find('textarea.location-h').removeAttr('disabled').html("");
							}
						},

						afterSetValue: function(show) {
							console.log("After set value called",show);
						}
					},

					validators : []
				},
				'date_chooser' : {
					form_values: {
						post_to_server	: false,
						serverKey : "game_date",
						serverDbField: 'gameDay',
						objectValuesToUpdate: ["game_datetime"],
						getValue: function() {
							return this.$el.val();
						}
					},
			//		hideElement: true,
					fieldClass: "date-picker-field",
					type : 'Text',
					attr : {
						'placeholder' : 'Enter Date',
						'class' : "txt-game-date_h txtDate"
					},

					showLable : false,
					label: "Date",
					//validators : [{type : 'required',
					//	message : 'Please select date.'}],
					bindDatePicker : true,
					changeEvent : function() {
						var date = new Date(this.getValue()), currentDate = new Date();
						if (date != null && currentDate >= date) {
							$(".txt-score-team-h").removeClass('hidden');
						} else {
							$(".txt-score-team-h").addClass('hidden').val("");
						}
					}
				},

				'time_chooser' : {
					form_values: {
						post_to_server	: false,
						serverDbField: 'gameTime',
						serverKey: "game_time",
						objectValuesToUpdate: ["game_datetime"]
					},
	//				hideElement: true,
					type : 'Text',
					fieldClass: "time-picker-field",
					attr : {
						'placeholder' : 'Time',
						'class' : "txt-game-time_h hasDatepicker txtTime"
					},

					showLable : false,
					label: "Time",
					validators : [{
						type : 'required',
						message : 'Please enter a time'
					}, /^(0?[1-9]|1[012])(:[0-5]\d)?$/]
				},

				'Day_light' : {
					type : 'DropDown',
					fieldClass: "ampm-field",
					form_values : {
						post_to_server	: false,
						serverKey : "game_ampm",
						objectValuesToUpdate: ["game_datetime"],
						data : {
							records : [{
								payload : {
									name : "AM",
									value : "AM"
								}
							}, {
								payload : {
									name : "PM",
									value : "PM"
								}
							}],
							recordId : 'name',
							recordValue : 'value',
							selectedValue : "PM"
						},
						elementId : _self.controls.hdnTimePeriodData,
						callback : function(result) {
						}
					},
		//			hideElement: true,
					showLable : false,
					label: ""
				},

				'game_datetime'	: {
					type: "Hidden",
					form_values : {
						serverDbField: 'game_datetime',
						valueBindings : ['date_chooser','time_chooser','Day_light'],
						serverKey: "game_datetime",
						post_to_server	: true
					}
				},

				'event_location' : {
		//			hideElement: true,
					form_values: {
						serverKey : "locations_id",
						post_to_server	: true,
						serverDbField: 'locations_id'
					},
					type : 'Location',
					label: "Location",
					fieldClass: 'location-chooser',
					validators : [{type : 'required',
						message : 'Please select location.'}],
				},
				'users_id'	: {
					form_values: {
						serverKey: 'users_id',
						post_to_server	: true,
						value: _self.user_id
					},
					type: "Hidden",
				},
				'games_id'	: {
					form_values: {
						serverKey: "games_id",
						post_to_server	: true,
						value: 0
					},
					type: "Hidden"
				},
				'game_name'	: {
					form_values: {
						serverKey: "game_name",
						post_to_server	: true,
						value: 0
					},
					type: "Hidden"
				},
				'submit' : {
					type : 'Submit',
					fieldClass: "button-field",
					attr : {
						'value' : 'Create Event'
					},
					showLable : false,
					onSubmit : function(e) {
						var errors = form.commit();
						if (errors) {
							// auto scroll to focus element which has error
							for (var i in errors) {
								var $ob = $("*[name=" + i + "]"), $pos = $ob.position();
								$ob.parents(".common-modal #modalBody").animate({
									scrollTop : $pos.top
								}, '500', function() {
									$ob.addClass('focus-error-animation');
									setTimeout(function() {
										$ob.removeClass('focus-error-animation');
									}, 2000);
								});
								break;
							}
						} else {


							var formData = _self.formValues.getFormValues(),
								self = _self;
							console.log(formData);

							if(formData.games_id > 0){
								payload = {
									games_id : formData.games_id,
									sports_id : self.sports_id,
									users_id : self.user_id
								};
								var usl = new UserGameLinkModel(payload);
								usl.save();

								$.when(usl.request).fail(function(res) {
									var response = JSON.parse(res.responseText);
									var errorArray = response.exec_data.error_array;
									_self.formValues.showServersErrors(errorArray);
								});


								$.when(usl.request).done(function(response) {
									routing.trigger(self.channel, response);
								});

							} else {
								var payload = {
									game_datetime : formData.game_datetime,
									game_location : formData['locations_id'],
									games_id : formData.games_id,
									sports_id : self.sports_id,
									event_name : formData.game_name,
									users_id : self.user_id
								};

								var gameSaveModel = new GameSaveModel(payload);
								gameSaveModel.save({});

								//window.formValues1.showServersErrors([{ key: "gameDay", message: "error_message" }]);

								$.when(gameSaveModel.request).fail(function(res) {
									var response = JSON.parse(res.responseText);
									var errorArray = response.exec_data.error_array;
									_self.formValues.showServersErrors(errorArray);
								});


								$.when(gameSaveModel.request).done(function(response) {
									routing.trigger(self.channel, response);
								});
							}



						}
					}
				},
				'button' : {
					type : 'Button',
					fieldClass: "button-field",
					attr : {
						'value' : 'Cancel',
						'class' : 'cancel-btn'
					},
					onClick : function() {
						routing.trigger('common-popup-close');
					},
					showLable : false
				}
			}, this.$el.find('.add-event-container-h'));

			var form = formData.form;
			this.formValues = formData.formValues;
		},
		
		afterRender: function() {

		},
  
		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
			if (!options.channel) {
				throw new Error("call back channel is must for this");
			} else {
				this.channel = options.channel;
				this.sports_id = options.sports_id || null;
			}
			//console.log("CURRENT USER ID:", this,options);
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setUpMainView();
		},

		setUpMainView : function() {
			var markup = Mustache.to_html(self.template, {});
			$(self.el).html(markup);
		}
	});
});
