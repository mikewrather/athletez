/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 
'text!profilesetting/templates/individualsports.html',
'text!profilesetting/templates/sportscheckbox.html',
'text!profilesetting/templates/sportitem.html',
'facade', 'views', 'utils', 'vendor', 
'profilesetting/collections/individualsports',
'profilesetting/collections/sports',
'profilesetting/models/sport',
   ], function(require, individualSportsTemplate,sportsCheckboxes,sportsItem) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$,
	   IndividualSportsCollection = require('profilesetting/collections/individualsports'),SportsModel = require('profilesetting/models/sport'),

  	SportsCollection = require('profilesetting/collections/sports'),
	HighSchoolView = SectionView.extend({

		template : individualSportsTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
		"change .select-all" : "CheckAll",
		"change .chk-single" : "CheckSingle",
		"click .delete-individualsport" : "DeleteSport"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be prefixed so that it could be directly used with $ Sign*/
		controls : {
			content : '#section-individual-prof-setting',
			sportslist : '.sports-list-individial-sports',
			btnSave: '.btn-Save-Individual-Sports',
			chkAll : '.select-all',
			chkSingle : '.chk-single',
			userSportsList : ".sports-list-user-individual-sports"
		},
		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Couldn\'t find any matches',
			optionsMissing : 'HeaderView expects option with model property.'
		},

		/*FUNCTION TO BE CALLED AS SOON AS INTANCE CREATED SHOULD BE CALLED HERE*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options)
			this.init();
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupSportsView();
			//self.setUpUsersSports();
		},

		/*render displays the view in browser*/
		render : function() {
			SectionView.prototype.render.call(this);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id,
			this.gender = options.gender,
			this.destination = options.destination
		},
		
		/*Set User Sports View*/
		setUpUsersSports : function(){
		console.log("setUpSportsView Individual View");
		var List = new IndividualSportsCollection();
		List.user_id = self.user_id;
		//TODO:  Gender is missing in API so need to update code
		List.male = 1;
		List.female = 0;
		List.type = "get";
		List.fetch();

			$.when(List.request).done(function() {
				if (List.isError())
					return;

				var models = List.toJSON();
				if (models == null || models.length < 1){
					return;
				}
				
				self.sports = [];
				for (var key in models) {
					if(models[key].payload.team_type == "individual")
					self.sports.push(models[key].payload);
				}
				// Sort Sports According To The Names, false because the result required in asc form
				self.sort(self.sports,'sport_name',false);
				var markup = Mustache.to_html(sportsItem, {sports: self.sports});
            	console.log("Users Own Sports",self.sports);
            	self.$(self.controls.userSportsList).html(markup);
			});
		},
	setUpUsersSportsCheck : function(){
	console.log("setUpSportsView Individual View Check");
		var List = new IndividualSportsCollection();
		List.user_id = self.user_id;
		//TODO:  Gender is missing in API so need to update code
		List.male = 1;
		List.female = 0;
		List.type = "get";
		List.fetch();

			$.when(List.request).done(function() {
				if (List.isError())
					return;

				var models = List.toJSON();
				if (models == null || models.length < 1){
					return;
				}
				
				self.sports = [];
				for (var key in models) {
					if(models[key].payload.team_type == "individual")
					self.sports.push(models[key].payload);
				}
				// Sort Sports According To The Names, false because the result required in asc form
				self.sort(self.sports,'sport_name',false);
		    	$.each(self.sports,function(index,sport){
		    		self.$el.find("#chk-ind-" + sport.sport_id).attr('checked','checked');
		    		
		    	});
			});
},
		/*Set complete view like template rendering, default data bindings*/
		setupSportsView : function() {
		console.log("setUpSportsView Individual View");
		var List = new SportsCollection();
		List.user_id = self.user_id;
		List.sport_type_id = 2; // For Sports Only associated With Individuals
		//TODO:  Gender is missing in API so need to update code
			List.male = 1;
			List.female = 0;
			if(self.gender == "male"){
				List.male = 1;
			}else if (self.gender == "famale")
			{
				List.female = 0;	
			}
		List.type = "get";
		List.fetch();

			$.when(List.request).done(function() {
				
				if (List.isError())
					return;

				var models = List.toJSON();
				if (models == null || models.length < 1){
					return;
				}
				
				self.sports = [];
				for (var key in models) {
					self.sports.push(models[key].payload);
				}
				// Sort Sports According To The Names, false because the result required in asc form
				self.sort(self.sports,'sport_name',false);
				var markup = Mustache.to_html(sportsCheckboxes, {sports: self.sports});
            	self.$(self.controls.sportslist).html(markup);
            	
            	self.setUpUsersSportsCheck();
			});
		},

		/*SAVE SELECTED SPORT ON SERVER*/
		SaveSport : function(event){
			console.log("Save Sport");
			var sportsId = $(event.target).attr('sportid');
			console.log(sportsId);
			if(sportsId){
				var sportsModel = new SportsModel();
				sportsModel.user_id = self.user_id;
				sportsModel.sports_id = sportsId;
				sportsModel.type = "save";
				
				
				console.log("Save Model Request Abort Request Function");
				self.sportsModelFetchRequest = self.abortRequest(self.sportsModelFetchRequest);
				self.compLevelFetchRequest = sportsModel.save({
					sports_id : sportsId
				});
				
				$.when(sportsModel.request).done(function() {
					alert("Sports Added Successfully.");
					self.setUpUsersSportsCheck();
					//self.setUpUsersSports();
				});
			}
		},

		DeleteSport : function(event){
			console.log("Delete Sport");
			var sportsId = $(event.target).attr('sportid');
			console.log(sportsId);
			if(sportsId){
				var payload = {
					user_id : self.user_id,
					sports_id : sportsId
				};
				
				var sportsModel = new SportsModel(payload);
				sportsModel.user_id = self.user_id;
				sportsModel.type = "delete";
				sportsModel.destroy({data: payload, processData: true,
					success : function(){
						alert("Sports Removed Sussessfully.");
						self.setUpUsersSportsCheck();
						//self.setUpUsersSports();
					}});
			}
		},

		/*SELECT ALL SPORTS IF A USER CLICKS ON SELECT ALL*/
		CheckAll : function(e){
			if($(e.target).is(':checked')){
				self.$(self.controls.chkSingle).attr('checked','checked');
			}
			else {
				self.$(self.controls.chkSingle).removeAttr('checked','checked');
			}
		},

		/*CHECK UNCHECK SELECT ALL AS PER THE NUMBER OF SELECTED SPORTS, IF ALL ARE SELECTED THEN CHECKED ELSE UNCHECKED*/
		CheckSingle: function(e){
			if($(e.target).is(':checked')){
				self.SaveSport(e);
			}
			else {
				self.DeleteSport(e);
			}
		}
			});

	return HighSchoolView;
});
