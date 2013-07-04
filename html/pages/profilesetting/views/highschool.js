/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/highschool.html',
'text!profilesetting/templates/sportslevel.html',
'text!profilesetting/templates/level.html',

 'facade', 'views', 'utils', 'vendor', 
'profilesetting/collections/states', 
'profilesetting/collections/schools',
 'profilesetting/collections/sports',
 'profilesetting/collections/teams',
  'profilesetting/models/complevel',
  'profilesetting/views/seasons',
  'profilesetting/views/positions',
  
   ], function(require, highSchoolTemplate,sportsLevelTemplate, levelTemplate) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$,
	 StatesCollection = require('profilesetting/collections/states'),
	  SchoolCollection = require('profilesetting/collections/schools'),
	   SportsCollection = require('profilesetting/collections/sports'),
	    CompLevelModel = require('profilesetting/models/complevel'),
	    SeasonsView = require('profilesetting/views/seasons'),
	    PositionsView = require('profilesetting/views/positions'),
	    TeamsCollection = require('profilesetting/collections/teams');

	HighSchoolView = SectionView.extend({

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
			"change .chkSeasons" : "displayPositionPopup",
			
			"click .btn-add-level" : "AddLevel",
			
			"click .spn-position-title_h" : "MarkPosition",
			
			"click .btn-add-sports" : "AddSports",
			
			"click .btn-Remove-Sport" : "RemoveSports"
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
			ddlSports : '.ddl-sports',
		//	ddlSports : '#ddl-school-sports',
		//	ddlCompLevel : '#ddl-school-complevel',
		//	divSchoolSeasons :'#div-school-seasons',
		//	modalPosition : '.modal-school-positions',
			modalPosition : '.modal-positions',
			modalPositionBody : '.modal-position-body',
			divSportsNameHeading : ".spn-sport-name",
			divMainSportsSection : "#def-school-sports-section",
			divLevels: ".div-sports-level",
		//	divLevels: ".div-school-sports-level",
			divsportsLevel : ".section-sportslevel",
			divSubLevels : ".div-levels",
			divSchoolSportsSection : ".school-sports-section",
			divSportsWrapper :".div-sports-wrapper",
			/*Buttons And Links Used*/
			btnRemoveSports : ".btn-Remove-Sport"
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
		
		properties: {
			show_prev_year : 2
			},
		/*Selected States By API*/
		states :[],
		/*Seleted Schools By API*/
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
			this.user_id = options.user_id,
			this.gender = options.gender
		},
		
		/*Event Called when a key is pressed
		 Fetch data from api and populate it in auto complete dropdown
		 */
		keyupState : function(event) {
			var state = $(self.controls.txtStates).val();
			var stateArr = [];
				var isValidKey = self.isValidAutoCompleteKey(event);
			if (state != '' && isValidKey == true) {
				// Disable Schools Text Box
				self.$(self.controls.txtSchools).attr('disabled','disabled');
				
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
					try{self.$el.find(self.controls.txtStates).autocomplete("destroy");}catch(ex){}
					
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
					self.$(self.controls.txtSchools).removeAttr('disabled');
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
					try{self.$el.find(self.controls.txtSchools).autocomplete("destroy");}catch(ex){}
					
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
			self.orgs_id = 0;
			self.schools.forEach(function(value, index) {
				if (value['org_name'] == name){
					self.orgs_id = value['org_id'];
					self.fillSports(self.orgs_id,self.controls.divMainSportsSection);
				}
			});
			
		},
		/*iN CASE USER CHANGES SCHOOL OR STATE THE SPORT SECTION MUST BE DESTROYED AND RECONSTRUCTED*/
		RemoveSportsSection: function(){
			self.$el.find(self.controls.divMainSportsSection).html('');
		},
		
		/*Fill Sports dropdown with sports on basis of gender and sports_club type*/
		fillSports : function(orgs_id,destination) {
			console.log("fill school");
			console.log("orgs_id,destination",orgs_id, destination);
			if(self.sports && self.sports.length > 0 ){
				self.SetupSportsView(orgs_id,destination);
			}
			else{
			var List = new SportsCollection();
			List.sport_type = 1;
			//TODO:  Gender is missing in API so need to update code
			List.male = 1;
			List.female = 0;
			if(self.gender == "male"){
				List.male = 1;
			}else if (self.gender == "famale")
			{
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
				self.SetupSportsView(orgs_id,destination);
			});
}
		},
		/*Change sport_id when a sport is selected from dropdown*/
		changeSports : function(event) {
			var sportId = $(event.target).val();
			if (sportId != 0 && sportId != null && sportId != ''){
				self.sport_id = sportId;
			
			var controlToAppend = self.$(event.target).parents(self.controls.divsportsLevel).find(self.controls.divLevels);
			self.fillCompLevel(self.orgs_id,controlToAppend);
			}
			else
				self.sport_id = 0;
		},
		/*Set up sports section as per the destination wehether default or updation case*/
		SetupSportsView : function(orgs_id,destination){
			var markup = Mustache.to_html(sportsLevelTemplate, {sports: self.sports});
            self.$(destination).append(markup);
		},
		/*Fills CompLevel DropDown after fetching data from API*/
		/*PARAMETER: 
		 * orgs_id : int, School Id selected from changeSchool function */
		fillCompLevel : function(orgs_id,destination) {
			console.log("fillCompLevel",orgs_id,destination);
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
				
				self.SetUpCompLevelView(orgs_id,destination);
				}
				else{
				}
			});
			}
			else {
				$(destination).html('');
				}
		},
		/*On CompLevel DropDown Change Its value is to be assigned into a variable*/
		changeCompLevel : function(event){
			var value = $(event.target).val();
				self.compLevel_id = 0;
			
			for(var key in self.compLevel)
			{
				if(self.compLevel[key].complevel_id == value){
					self.compLevel_id = value;
					return;
				}
			}
		},
		/*SET UP LEVEL VIEW AS PER THE DESTINATION WHERE TO APPEND THE VIEW*/
		SetUpCompLevelView : function(orgs_id, destination){
			var data = self.GetSeasonsData(self.seasons);
			var markup = Mustache.to_html(levelTemplate, {levels: self.compLevel,Data : data});
            self.$(destination).append(markup);
            
            var controlPositions = self.$(destination).find(self.controls.modalPositionBody);
				self.fillPositions(self.sport_id,controlPositions);
			
		},
		/*FETCH SEASONS AS PER THE SCHOOL AND DISPLAY ACCORDINGLY*/
		GetSeasonsData : function(collection){
			var data = [];
			var y = (new Date).getFullYear();
			for(var i = self.properties.show_prev_year; i >= 0; i--  ){
				var temp = {
					year : y,
					seasons : collection
				};
				data.push(temp);
				y--;
			}
			return data;
		},
		/*Calls Positions View To Fill Data In Positions PopUp*/
		fillPositions : function(sport_id,destination){
			if(self.sport_id)
			{
			this.positionView = new PositionsView(
			{
				name : "settings-high-school-positions",
				destination : destination,
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
		displayPositionPopup : function(event){
			if($(event.target).is(':checked')){
				
				self.$(event.target).parents(self.controls.divSubLevels).find(self.controls.modalPosition).modal('show')
			   }
		},
		/*Mark Selected Position as Active ot inactive*/
		MarkPosition : function(event) {
			var control = self.$(event.target);
			if (control.hasClass('active')) {
				control.removeClass('active');
			} else {
				control.addClass('active');
			}
		},
		
		/*ADD LEVEL IF USER CLICKS ON ADD LEVEL BUTTON*/
		AddLevel : function(event){
			
		var destination = self.$(event.target).parents(self.controls.divsportsLevel).find(self.controls.divLevels);
		self.fillCompLevel(self.orgs_id,destination);
		},
		/*ADD SPORT WHEN A USER CLICKS ON ADD SPORTS BUTTON*/
		AddSports : function(event){
			var destination = self.$(event.target).parents(self.controls.divSportsWrapper).find(self.controls.divSchoolSportsSection);
			self.fillSports(self.orgs_id,destination);
		},
		/*Removes Sports From HTML As Well As From Json*/
		RemoveSports : function(event){
			
			self.$(event.target).parents(self.controls.divsportsLevel).remove();
		},
		/*SHOW EXISTING TEAM SECTION AT THE BOTTOM OF HIGHSCHOOL SECTION*/
		SetUpTeamsView : function(){
			console.log("self.user_id;",self.user_id);
			var teamsCollection = new TeamsCollection();
			teamsCollection.user_id = self.user_id;
			teamsCollection.fetch();
			
			// $.when(teamsCollection.request).done(function() {
				// if (teamsCollection.isError())
					// return;
// 
				// var models = teamsCollection.toJSON();
				// console.log("Teams Collection highschool js",teamsCollection);
				// console.log("Teams Models",models);
				// console.log(models['payload')]);
				// console.log(models.payload.length);
				// if (models != null && models.payload != null){
// 				
				// for (var key in models.payload) {
					// models.payload[key].sports = [];
					// for (var sportskey in key.sports) {
						// var c = {
							// sports_name	: sportskey,
							// details : key.sports[sportskey]
					// }
					// models.payload[key].sports.push(c);
				// }
				// console.log("Modifies Models",models);
				// }
				// }
// 				
			// });
		}
			});

	return HighSchoolView;
});
