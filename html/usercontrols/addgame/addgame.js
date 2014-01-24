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
		"jquery.slimscroll"
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
			
			if (options.sports_id) {
				this.sports_id = options.sports_id;
			}
			
			if (options.teams_id) {
				this.teams_id = options.teams_id;
			}
			
			if(options.user_id) {
				this.user_id = options.user_id;
			}
			
			this.callback = options.callback;
			
			if(options.popup) {
				this.popup = true;
				this.modelHTML = '<div id="addGamePopup"></div>';
			}
			
			if(options.gender){
				this.gender = options.gender;
			}
			this.init();
			return this;
		},
		/*To reduce initialize methods length and all the view related functions */
		init : function() {
		
			if(this.popup)
				this.setupPopupLayout().render();
			else
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
		
		setupPopupLayout: function () {
            var pageLayout;
			this.scheme=[];
            var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalBody",
				template : '',
				displayWhen : "ready"
			});
            this.layout=pageLayout;
            
          this.modelBoxId = "modal-popup-"+Math.floor(Math.random() * Math.random() * 50 * Math.random() * 50);  
          var options = {};
            options.height = "500px";
            options.width = "500px";
            options.title = "Add Game";
            options.id = this.modelBoxId;         
			routing.trigger('common-popup-open', options);
            return this.layout;
        },
		
		/* Set  Up  User References  View  View */
		setUpMainView : function() {
			var _self = this;
			routing.off('add-game-success');
			routing.on('add-game-success', function(data) {
				_self.addGameFunction(data);
			});			
			
			var self = this, destination = '#'+this.modelBoxId+' #modalBody';
			this.addGameView = new AddGameView({
				model : new BasicModel(),
				template : pageLayoutTemplate,
				name : "add-game-main",
				destination : destination,
				user_id : self.user_id,
				channel : 'add-game-success',
				sports_id : this.sports_id,
				teams_id : this.teams_id
			});

			this.scheme.push(this.addGameView);
			this.layout.render();
		},
		
		addGameFunction : function(data){
			if(this.callback) this.callback(data);
		}
	});
	return AddGameController;

});

