/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/highschool.html', 'facade', 'views', 'utils', 'vendor', 
'profilesetting/collections/states', 
'profilesetting/collections/schools',
'profilesetting/collections/sports',
'profilesetting/collections/complevel',
 ], function(require, highSchoolTemplate) {


	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'),
	Mustache = vendor.Mustache, $ = facade.$, StatesCollection = require('profilesetting/collections/states'),
	SchoolCollection = require('profilesetting/collections/schools'),
	SportsCollection = require('profilesetting/collections/sports'),
	CompLevelCollection = require('profilesetting/collections/complevel');
	HighSchoolView = SectionView.extend({

		template : highSchoolTemplate,
/*Bind Events on controls present in current view template*/
		events : {
			"click #txt-school-state" : "keyupState",
			// "keyup #sports_id" : "keyupSport",
			// "keyup #txt-school-state" : "keyupSchool",
			// "blur #states_id" : "changeState",
			// "blur #sports_id" : "changeSport",
			// "change #orgs_id" : "changeClub"
		},
		/*Holds */

		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			txtStates : '#txt-school-state',
			txtSchools : '#txt-school-school',
			content : '#content-school-prof-setting',
			fieldMessage : '.field-message',
			ddlSports : '#ddl-school-sports',

		},
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Data not exist.',
			optionsMissing : 'HeaderView expects option with model property.'

		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			self = this;
			_.bindAll(this);
			this.init();
		},

		init : function() {
			self.setupView();
			self.bindEvents();
		},

		/*function used to bind events on controls not present in current $el
		 Always use on so that dynamic creation of controls could be handled
		 * */
		bindEvents : function() {
			$(self.controls.txtStates).on('keyup', function(e) {
				self.keyupState(e);
			});

			$(self.controls.txtStates).on('blur', function(e) {
				self.changeState(e);
			});

			$(self.controls.txtSchools).on('keyup', function(e) {
				self.keyupSchool(e);
			});	

			$(self.controls.txtSchools).on('blur', function(e) {
				self.changeSchool(e);
			});

			$(self.controls.ddlSports).on('change', function(e) {
				self.changeSports(e);
			});

		},

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
			var markup = Mustache.to_html(self.template, []);
			$(self.controls.content).html(markup);
			self.fillSports();
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			if (!this.model) {
				throw new Error(this.messages.optionsMissing);
			}
		},
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(event) {
			var state = $(self.controls.txtStates).val();
			var stateArr = [];

			if (state != '') {
				console.log("self.model", self.model);
				var stateList = new StatesCollection();
				stateList.state_name = state;
				stateList.fetch();
				$.when(stateList.request).done(function() {
					/*Don't Show Auto Complete In Case Of Error*/
					if (stateList.isError())
						return;

					var models = stateList.toJSON();
					if (models == null || models.length < 1)
						$(self.controls.txtStates).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					else
						$(self.controls.txtStates).parent().find(self.controls.fieldMessage).html('').fadeOut();

					self.states = [];
					for (var key in models) {
						self.states.push(models[key].payload);
					}
					debug.log("self.states", self.states);
					self.states.forEach(function(value, index) {
						stateArr.push(value['name']);
					});
					debug.log("stateArr", stateArr);
					$(self.controls.txtStates).autocomplete({
						source : stateArr
					});
				});
			}
		},
		/*Change state_id as per the selected record from auto complete for state created in keyupState*/
		changeState : function(event) {
			var state_name = $(self.controls.txtStates).val();
			self.states_id = '';
			self.states.forEach(function(value, index) {

				if (value['name'] == state_name) {
					self.states_id = value['id'];
				}

			});
			self.keyupSchool();
		},
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupSchool : function(event) {
			var name = $(self.controls.txtSchools).val();
			var arr = [];

			if (name != '') {
				var List = new SchoolCollection();
				console.log(self.states_id, name);
				List.states_id = self.states_id;
				List.org_name = name;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					console.log("models", models);
					if (models == null || models.length < 1)
						self.$(self.controls.txtSchools).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
					self.schools = [];
					for (var key in models) {
						self.schools.push(models[key].payload);
					}
					self.schools.forEach(function(value, index) {
						arr.push(value['org_name']);
					});
					console.log("arr", arr);
					$(self.controls.txtSchools).autocomplete({
						source : arr
					});
				});

			}
		},
		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(event) {
			var name = this.$(self.controls.txtSchools).val();
			self.school_id = 0;
			self.schools.forEach(function(value, index) {
				if (value['name'] == name)
					self.school_id = value['id'];
			});
		},
		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function() {
			var List = new SportsCollection();
			List.sport_type = 1;
			List.male = 1;
			List.female = 0;
			List.fetch();

			$.when(List.request).done(function() {
				if (List.isError())
					return;

				var models = List.toJSON();
				console.log("models", models);
				if (models == null || models.length < 1)
					self.$(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				self.sports = [];
				for (var key in models) {
					self.sports.push(models[key].payload);
				}
				console.log("sports", self.sports);
				self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', self.controls.ddlSports)
			});

		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSports : function() {
			var sportId = $(self.controls.ddlSports).val();
			if (sportId != 0 && sportId != null && sportId != '')
				self.sport_id = sportId;
			else
				self.sport_id = 0;
		},
		fillCompLevel: function(orgs_id){
			var List = CompLevelCollection.extend({
				
				
			});
		}	});

	return HighSchoolView;
});
