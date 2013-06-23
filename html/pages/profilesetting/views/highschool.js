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
  'profilesetting/models/complevel',
  'profilesetting/views/seasons',
  'profilesetting/views/positions',
  
   ], function(require, highSchoolTemplate) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$,
	 StatesCollection = require('profilesetting/collections/states'),
	  SchoolCollection = require('profilesetting/collections/schools'),
	   SportsCollection = require('profilesetting/collections/sports'),
	    CompLevelModel = require('profilesetting/models/complevel'),
	    SeasonsView = require('profilesetting/views/seasons'),
	    PositionsView = require('profilesetting/views/positions');

	HighSchoolView = SectionView.extend({

		template : highSchoolTemplate,
		/*Bind Events on controls present in current view template*/
		events : {
			"keyup #txt-school-state" : "keyupState",
			"blur #txt-school-state" : "changeState",

			"keyup #txt-school-school" : "keyupSchool",
			"blur #txt-school-school" : "changeSchool",

			"change #ddl-school-sports" : "changeSports",
			
			"change #ddl-school-complevel" : "changeCompLevel",
			
			"change .chkSeasons" : 'displayPositionPopup'
		},
		/*Holds */

		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			txtStates : '#txt-school-state',
			txtSchools : '#txt-school-school',
			content : '#content-school-prof-setting',
			fieldMessage : '.field-message',
			fieldError :'.field-error',
			ddlSports : '#ddl-school-sports',
			ddlCompLevel : '#ddl-school-complevel',
			divSchoolSeasons :'#div-school-seasons',
			modalPosition : '#modal-school-positions',
			modalPositionBody : '#modal-school-positions-body'
		},
		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Data not exist.',
			optionsMissing : 'HeaderView expects option with model property.',
			
			selectSport : 'Please select sport',
			selectState : 'Please insert state',
			selectSchool : 'Please insert School'

		},
		/*Selected States By API*/
		states :[],
		/*Seletec Schools By API*/
		schools :[],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options)

			this.init();

		},
/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
			

			//self.bindEvents();
		},
		/*render displays the view in browser*/
		render : function() {
			var self = this;

			SectionView.prototype.render.call(this);
		},

		/*function used to bind events on controls not present in current $el
		 Always use on so that dynamic creation of controls could be handled
		 * */
		bindEvents : function() {
		

		},

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
			self.fillSports();
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id
		},
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(event) {
			var state = $(self.controls.txtStates).val();
			var stateArr = [];

			if (state != '') {
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
					self.$el.find(self.controls.txtStates).autocomplete({
						source : stateArr
					});
					
					//Trigger keydown to display the autocomplete dropdown just created
					self.$el.find(self.controls.txtStates).trigger('keydown');
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
					$(self.controls.txtSchools).autocomplete({
						source : arr
					});
					//Trigger keydown to display the autocomplete dropdown just created
					self.$el.find(self.controls.txtSchools).trigger('keydown');
				});

			}
		},
		/*Change school_id as per the selected record from auto complete for state created in keyupSchool*/
		changeSchool : function(event) {
			var name = this.$(self.controls.txtSchools).val();
			self.school_id = 0;
			self.schools.forEach(function(value, index) {
				if (value['org_name'] == name){
					self.school_id = value['org_id'];
				}
			});
			self.fillCompLevel(self.school_id);
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
				if (models == null || models.length < 1)
					self.$(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				self.sports = [];
				for (var key in models) {
					self.sports.push(models[key].payload);
				}
				self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', self.controls.ddlSports)
			});

		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSports : function() {
			var sportId = $(self.controls.ddlSports).val();
			if (sportId != 0 && sportId != null && sportId != ''){
				self.sport_id = sportId;
				self.fillPositions(self.sport_id);
			}
			else
				self.sport_id = 0;
				
				
		},
		/*Fills CompLevel DropDown after fetching data from API*/
		/*PARAMETER: 
		 * orgs_id : int, School Id selected from changeSchool function */
		fillCompLevel : function(orgs_id) {
			
			self.compLevel_id = undefined; // Destroy complevel id if request received to refill the comp level
			
			if(orgs_id && orgs_id > 0){
			var List = new CompLevelModel();
			List.orgs_id = orgs_id;
			List.fetch();
			
			$.when(List.request).done(function() {
				if (List.isError())
					return;

				var models = List.toJSON();
				self.compLevel = [];
				if (models != null && models.payload != null || models.payload.complevels != null && models.payload.complevels.length){
				
				self.seasons = models.payload.seasons || [];
				for (var key in models.payload.complevels) {
					self.compLevel.push(models.payload.complevels[key]);
				}
					self.setDropdownOptions(self.compLevel, 'complevel_name', 'complevel_id', self.controls.ddlCompLevel,'Select Level')	
				}
				else{
					self.$(self.controls.ddlCompLevel).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();
				}
			});
			}
			else {
				/*Remove items from dropdown*/
				self.setDropdownOptions([], 'complevel_name', 'complevel_id', self.controls.ddlCompLevel,'Select Level');
			}
		},
		/*On CompLevel DropDown Change Its value is to be assigned into a variable*/
		changeCompLevel : function(){
			var value = $(self.controls.ddlCompLevel).val();
				self.compLevel_id = 0;
			
			for(var key in self.compLevel)
			{
				if(self.compLevel[key].complevel_id == value){
					self.compLevel_id = value;
					self.setUpSeasonView();
					return;
				}
			}
		},
		/*Function to call seasons view to display it on front end*/
		setUpSeasonView :function(){
			if(self.sport_id && self.school_id && self.compLevel_id )
			{
			
			this.seasonsView = new SeasonsView(
			{
				collection : self.seasons,
				name : "settings-high-school-seasons",
				destination : self.controls.divSchoolSeasons,
				sport_id : self.sport_id,
				orgs_id : self.school_id,
				user_id : self.user_id,
				complevel_id : self.compLevel_id
			});
			}
			else{
				if(! self.sport_id)
				self.$el.find(self.controls.ddlSports).parent().find(self.controls.fieldError).html(self.messages.selectSport).stop().fadeIn();
				
				if(! self.complevel_id)
				self.$el.find(self.controls.ddlCompLevel).parent().find(self.controls.fieldError).html(self.messages.selectCompLevel).stop().fadeIn();
				
				if(! self.school_id)
				self.$el.find(self.controls.txtSchools).parent().find(self.controls.fieldError).html(self.messages.selectSchool).stop().fadeIn();				
			}
		},
		/*Calls Positions View To Fill Data In Positions PopUp*/
		fillPositions : function(sport_id){
			if(self.sport_id)
			{
			this.positionView = new PositionsView(
			{
				name : "settings-high-school-positions",
				destination : self.controls.modalPosition,
				sport_id : self.sport_id,
			});
			}
			else{
				self.$el.find(self.controls.ddlSports).parent().find(self.controls.fieldError).html(self.messages.selectSport).stop().fadeIn();
				}
		},
		/*Called on Checkbox click to show Positions PopUp to select Positions*/
		/*PARAMETERS:
		 e: event, checkbox click event consisting of all information of event triggered*/
		displayPositionPopup : function(e){
			if($(e.target).is(':checked'))
			    self.$el.find(self.controls.modalPosition).modal('show')
		},
			});

	return HighSchoolView;
});
