/*
 // -------------------
 // -------------------
 // module as controller for 'profilesetting' package
 // Returns {UserResumeController} constructor
 */

define(["require", "text!usercontrols/tag/templates/layout.html", 
	   "facade",
	  
	   "controller", "models", "views",
	   "usercontrols/tag/models/basic_info",
	    
	    //Collections
	    "usercontrols/tag/collections/sports",
	    
	    
	    //Views
	    "usercontrols/tag/views/main",
	     
	    ], function(require, pageLayoutTemplate) {

	var UserResumeController, facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicModel = require("usercontrols/tag/models/basic_info"),
	
	/*COLLECTIONS SECTIONS*/

	/*VIEW SECTION*/
	TagView = require("usercontrols/tag/views/main"),
	
	TagController = Controller.extend({
		/*CSS SECTION*/
		cssArr : ["/usercontrols/tag/tag.css"],

		events : {
		},
		/*Actions to be performed on the first time the object is created*/
		initialize : function(options) {

			/*Load CSS File*/
			Channel('load:css').publish(this.cssArr);
			/*Bind Class with all events*/
			_.bindAll(this);

			if (options.id) {
				this.id = options.id;
			}
			if(options.gender){
				this.gender = options.gender;
			}
				this.init();

			return this;

		},
		/*To reduce initialize methods length and all the view related functions */
		init : function() {
			this.setupLayout().render();
			this.setUpMainView();
			this.handleDeferreds();

		},
		/*Method renders the page layout for user setting page*/
		/*pageLayoutTemplate is just the skeleton for user setting page modules like High School,Clubs,Individual Sports,
		 *  Their respective implementation is done in their own view respectively*/
		setupLayout : function() {
			console.log("Set Up Layout Tag");
			if (this.layout)
				return this.layout;
			var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#main",
				template : ,
				displayWhen : "ready"
			});
			this.layout = pageLayout;

			return this.layout;
		},
		
		/* Set  Up  User References  View  View */
		setUpMainView : function() {
			console.log("Set Up Main View Tag");
			Channel('tag-team-success').subscribe(this.tagFunction);
			var self = this;
			this.tagView = new TagView({
				model : new BasicModel(),
				template : pageLayoutTemplate,
				name : "tag-main",
				destination : "#main",
				user_id : self.id,
				channel : 'tag-team-success',
			});

			this.scheme.push(this.tagView);
			this.layout.render();
		},
		tagFunction : function(data){
			alert(JSON.stringify(data));
		}
	});
	return TagController;

});

