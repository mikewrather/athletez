/*
 Profile Setting Controller is used for profile setting page for a user
// ---------------
// module as controller for 'profilesetting' package
// Returns {ProfileSettingController} constructor
  */
 
define(["require", "text!profilesetting/templates/layout.html", "facade", "controller", "models", "views", "utils",
 "profilesetting/models/basic_info",
  "profilesetting/views/basic_info",
  "profilesetting/views/highschool",
  "profilesetting/views/club",
  "profilesetting/views/sport"], function(require, pageLayoutTemplate){
	
	var ProfileSettingController,
	facade = require("facade"),
	Controller = require("controller"),
	models = require("models"),
	views = require("views"),
	utils = require("utils"),
	
	$ = facade.$, _ = facade._,
	debug = utils.debug,
	Channel = utils.lib.Channel,
	LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicInfoModel = require("profilesetting/models/basic_info"),
	
	 /*COLLECTIONS SECTIONS*/
	
	
	/*VIEW SECTION*/
	BasicInfoView = require("profilesetting/views/basic_info"),
	HighSchoolView = require("profilesetting/views/highschool");           
	ClubView = require("profilesetting/views/club");           
	SportView = require("profilesetting/views/sport");           
	
	
	             
	                 
	ProfileSettingController = Controller.extend({
		/*CSS SECTION*/
		cssArr : ["/pages/profilesetting/profilesettings.css"],
	
	events:{
		"Click .div-add-dotted" : "addHighSchool",
	},
	
		initialize: function(options){
			
			/*Load CSS File*/
			console.log("Load CSS by ");
			Channel('load:css').publish(this.cssArr);
			console.log(cssArr);
			/*Bind Class with all events*/
			_.bindAll(this);
			
			if (options.id) {
                this.id = options.id;
                this.init();
            }

			return this;

		},
		init: function(){
			this.setupLayout().render();
			this.setupView();
			this.handleDeferreds();

		},
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
		
		setupView : function(){
			console.log("Setup View");
			var self = this;
		this.basicView = new BasicInfoView({
			id: self.id
		});	
		},
		addHighSchool : function(){
			alert("Add School");
			console.log("Add High School Information");
			this.schoolView = new HighSchoolView({});
			//this.schoolView.render();
			
		}
		
	});
	return ProfileSettingController;
	
});
