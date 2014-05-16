/*
 Profile Setting Controller is used for profile setting page for a user
 // ---------------
 // module as controller for 'profilesetting' package
 // Returns {ProfileSettingController} constructor
 */

define(["require",
	"text!profilesetting/templates/layout.html",
	"facade",
	"controller",
	"models",
	"views",
	"utils",
	"profilesetting/models/basic_info",
	"profilesetting/views/basic_info",
	"profilesetting/views/org",
	"profilesetting/views/club",
	"profilesetting/models/high_school",
	"profilesetting/views/individuals"], function(require, pageLayoutTemplate) {

	var ProfileSettingController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"), $ = facade.$, _ = facade._, debug = utils.debug, Channel = utils.lib.Channel, LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicInfoModel = require("profilesetting/models/basic_info"),

	/*COLLECTIONS SECTIONS*/

	/*VIEW SECTION*/
	BasicInfoView = require("profilesetting/views/basic_info"), 
	OrgView = require("profilesetting/views/org"),
	ClubView = require("profilesetting/views/club"),
	IndividualSportsView = require("profilesetting/views/individuals");

	var HighSchoolModel = require("profilesetting/models/high_school");
	var IndividualSportsCollection = require("profilesetting/collections/individualsports");
	ProfileSettingController = Controller.extend({
		/*CSS SECTION*/
		cssArr : [base_url + "pages/profilesetting/profilesettings.css"],
		/*Actions to be performed on the first time the object is created*/
		initialize : function(options) {
			/*Load CSS File*/
			Channel('load:css').publish(this.cssArr);
			/*Bind Class with all events*/
			_.bindAll(this);
			 this.scheme = [];
			if (options.id) {
				this.id = options.id;
				this.init();
			}
			return this;
		},
		/*To reduce initialize methods length and all the view related functions */
		init : function() {
			this.setupLayout().render();
			this.setupView();
			this.handleDeferreds();
		},
		/*Method renders the page layout for user setting page*/
		/*pageLayoutTemplate is just the skeleton for user setting page modules like High School,Clubs,Individual Sports,
		 *  Their respective implementation is done in their own view respectively*/
		setupLayout : function() {
			var pageLayout;

			if (this.layout)
				return this.layout;

			pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#main",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout = pageLayout;

			return this.layout;
		},
		/*Creates objects for different child views used in the page like header, HighSchool, ClubView, IndividualSports*/
		setupView : function() {
			var self = this;
			this.basicInfoModel = new BasicInfoModel();
			this.basicInfoModel.id = self.id;
			this.basicInfoModel.fetch();
			//Set Up different views when you have all userinfo about user
			$.when(this.basicInfoModel.request).done(function() {
				var data = self.basicInfoModel.toJSON();
				// Assign Properties From Data
				self.gender = data.payload.gender;
				// Call All The Views
				self.setUpBasicView();
				//TODO: For Testing Purpose Remove following Lines as soon as AddSchool divs event gets bind
				self.addHighSchool();
				self.SetUpClubView();
				self.setUpIndividualView();
			});
		},

		/*Set up Basic Info View*/
		setUpBasicView : function() {
			this.basicView = new BasicInfoView({
				id : self.id
			});
		},

		/*Add School View if user clicks on Add School*/
		addHighSchool : function() {
			var self = this, schoolmodel = new HighSchoolModel();
			schoolmodel.set("type", "School");
			this.schoolView = new OrgView({
				model : schoolmodel,
				name : "settings-high-school",
				destination : "#content-school-prof-setting",
				user_id : self.id,
				type: "school",
				gender : self.gender
			});
			this.scheme.push(this.schoolView);
			this.layout.render();
		},
		/*Setup Individual Sports View */
		setUpIndividualView : function(){
			var self = this;
			this.individualSportsView = new IndividualSportsView({
				model : new IndividualSportsCollection({
					user_id : self.id
				}),
				name : "settings-individual-sports",
				destination : "#section-individual-prof-setting",
				user_id : self.id,
				gender : self.gender
			});
			this.scheme.push(this.individualSportsView);
			this.layout.render();
		},
		/*Add School View if user clicks on Add School*/
		SetUpClubView : function() {
			var self = this, clubmodel = new HighSchoolModel();
			clubmodel.set("type", "Club");
			this.clubView = new OrgView({
				model : clubmodel,
				name : "settings-club",
				type: "club",
				destination : "#content-club-prof-setting",
				user_id : self.id,
				gender : self.gender
			});
			this.scheme.push(this.clubView);
			this.layout.render();
		},
	});
	return ProfileSettingController;

});
