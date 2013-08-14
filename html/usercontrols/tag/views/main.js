/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Awards VIEW} constructor
 */
define(['require', 'text!usercontrols/tag/templates/layout.html', 'text!usercontrols/tag/templates/sportoption.html', 'facade', 'views', 'utils', 'vendor', 
'usercontrols/models/basic_info',
 'usercontrols/tag/collections/sports', 'location/collections/states'], function(require, layoutTemplate, sportOptionTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, 
	BasicModel = require('usercontrols/tag/models/basic_info'), 
	SportsCollection = require('usercontrols/tag/collections/sports'),
	StatesCollection = require('location/collections/states')

	//Models
	TagView = SectionView.extend({

		template : layoutTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			'change .ddl-tag-sports_h' : 'changeSport',
			'click .btn-tag-sport_h' : 'sportsDone',
			'click .btn-tag-edit-sport_h' : 'editSport',
			'click .link-tag-team_h' : 'showTeamSection'
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
			lblTeamName : ".lbl-tag-team-state_h",
			secTeam : ".section-tag-team_h",
			txtTeamName : ".txt-tag-team-name_h",
			txtTeamSchool : ".txt-tag-team-school_h",
			ddlTeamLevel : ".ddl-tag-team-level_h",
			ddlTeamSeason : ".ddl-tag-team-season_h",
			btnTeamDone : ".btn-tag-team-Done_h",
			//Player
			secPlayer : ".section-tag-player_h",
			secPlayerInput : ".section-tag-player-input_h",
			txtPlayerName : ".txt-tag-player-name_h",
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

		inlineTemplates : {
			sportOption : '{{#sports}}<option value="{{sport_id}}">{{sport_name}}</option>{{/sports}}'
		},
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistAwards : "Data Does Not Exists For Awards.",
			MandatoryFields : "Sports Id, Name , Year are mandatory."
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
				self.$(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				return;
			}
			self.sports = [];
			for (var key in models) {
				self.sports.push(models[key].payload);
			}
			// Sort Sports Before Filling Up Into Drop-Down
			self.sort(self.sports, 'sport_name', false);
			self.sports.splice(0, 0, {
				sport_id : 0,
				sport_name : "Select"
			})

			var markup = Mustache.to_html(self.inlineTemplates.sportOption, {
				sports : self.sports
			});
			self.$(self.controls.ddlSports).html(markup);

		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSport : function(e) {
			if ($(e.target).val() && $(e.target).val() != 0)
				$(e.target).parent().find(self.controls.btnSportsDone).fadeIn();
			else
				$(e.target).parent().find(self.controls.btnSportsDone).fadeOut();
		},
		sportsDone : function(e) {
			$(self.destination).find(self.controls.lblSportName).html($(self.destination).find(self.controls.ddlSports + ' :selected').text())
			$(e.target).parents(self.controls.secAddSports).fadeOut();
			$(self.destination).find(self.controls.secSports).fadeIn();
$(self.destination).find(self.controls.secFooterLinks).fadeIn();
		},
		editSport : function() {
			$(self.destination).find(self.controls.secSports).fadeOut();
			$(self.destination).find(self.controls.secAddSports).fadeIn();
			$(self.destination).find(self.controls.secFooterLinks).fadeOut();
		},
		showTeamSection : function() {
			$(self.destination).find(self.controls.secTeam).fadeIn();
			
		},
		
		
		
		/**/
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(event) {
			var state = $(self.destination).find(self.controls.txtStates).val() ;
			var stateArr = [];
			if (state != '') {
				if (self.isValidAutoCompleteKey(event) == true) {
					// Disable Schools Text Box
					self.$(self.controls.txtSchools).attr('disabled', 'disabled');

					//// Remove Sports Section Html
					self.RemoveSportsSection();

					var stateList = new StatesCollection();
					stateList.state_name = $(self.controls.txtStates).val();
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
	});
	return TagView;
});
