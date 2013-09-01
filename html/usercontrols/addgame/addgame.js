/*
 // -------------------
 // -------------------
 // module as controller for 'profilesetting' package
 // Returns {UserResumeController} constructor
 */

define(["require", "text!usercontrols/addgame/templates/layout.html", 
	   "facade",
	  
	   "controller", "models", "views",
	   "user/models/basic_info",
	    
	    //Collections
	  //  'sportorg/collections/sports_listall',
	   
	    
	    //Views
	    "usercontrols/addgame/views/main",
	     
	    ], function(require, pageLayoutTemplate) {

	var AddGameController, facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicModel = require("user/models/basic_info"),
	
	/*COLLECTIONS SECTIONS*/

	/*VIEW SECTION*/
	AddGameView = require("usercontrols/addgame/views/main"),
	
	AddGameController = Controller.extend({
		/*CSS SECTION*/
		cssArr : ["/usercontrols/addgame/addgame.css"],

		events : {
		},
		/*Actions to be performed on the first time the object is created*/
		initialize : function(options) {
//			console.log("****************************************************");
//console.log("options",options);
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
//			console.log("Set Up Layout Tag");
			if (this.layout)
				return this.layout;
			var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#main",
				template : '',
				displayWhen : "ready"
			});
			this.layout = pageLayout;

			return this.layout;
		},
		
		/* Set  Up  User References  View  View */
		setUpMainView : function() {
	//		console.log("Set Up Main View Add Game");
			Channel('add-game-success').subscribe(this.addGameFunction);
			var self = this;
			this.addGameView = new AddGameView({
				model : new BasicModel(),
				template : pageLayoutTemplate,
				name : "add-game-main",
				destination : "#main",
				user_id : self.id,
				channel : 'add-game-success',
			});

			this.scheme.push(this.addGameView);
			this.layout.render();
		},
		addGameFunction : function(data){
			alert(JSON.stringify(data));
		}
	});
	return AddGameController;

});

