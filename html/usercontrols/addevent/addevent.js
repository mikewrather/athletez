/*
 // -------------------
 // -------------------
 // module as controller for 'profilesetting' package
 // Returns {UserResumeController} constructor
 */

define(["require", "text!usercontrols/addevent/templates/layout.html", 
	   "facade",
	  
	   "controller", "models", "views",
	   "user/models/basic_info",
	    
	    //Collections
	  //  'sportorg/collections/sports_listall',
	   
	    
	    //Views
	    "usercontrols/addevent/views/main"
	     
	    ], function(require, pageLayoutTemplate) {

	var AddEventController, facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicModel = require("user/models/basic_info"),
	
	/*COLLECTIONS SECTIONS*/

	/*VIEW SECTION*/
	AddGameView = require("usercontrols/addevent/views/main"),
	
	AddGameController = Controller.extend({
		/*CSS SECTION*/
		cssArr : ["/usercontrols/addevent/addevent.css"],

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

			if (options.id) this.id = options.id;
			if (options.sports_id) this.sports_id = options.sports_id;
			if (options.users_id) this.users_id = options.users_id;
			this.callback = options.callback;
			if(options.popup) {
				this.popup = true;
				this.modelHTML = '<div id="modalPopup" class="modal hide fade model-popup-h add-game-modal">'+
								'<div class="modal-header">'+
   			 					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
    							'<h3>Add Event</h3>'+
  								'</div>'+
								'<div class="modal-body page-content-h"></div>'+
    							'</div>';
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
			$(".model-popup-h").remove();
			$('body').append(this.modelHTML);
            var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalPopup",
				template : '',
				displayWhen : "ready"
			});
            this.layout=pageLayout;
           $('#modalPopup').modal();
            return this.layout;
        },
		
		/* Set  Up  User References  View  View */
		setUpMainView : function() {
			//		console.log("Set Up Main View Add Game");
			var _self = this;
			routing.off('add-event-success');
			routing.on('add-event-success', function(data) {
				_self.addTeamFunction(data);
			});	
			//Channel('add-event-success').subscribe(this.addTeamFunction);
			
			var self = this;
			this.addGameView = new AddGameView({
				model : new BasicModel(),
				template : pageLayoutTemplate,
				name : "add-event-main",
				destination : (this.popup)?".page-content-h":"#main",
				user_id : self.users_id,
				channel : 'add-event-success',
				sports_id : this.sports_id,
				teams_id : this.teams_id
			});

			this.scheme.push(this.addGameView);
			this.layout.render();
			$('#modalPopup .modal-body').slimScroll({
				height:'430px',
				railVisible:true,
				allowPageScroll:true,
				disableFadeOut:true
			});
		},
		addTeamFunction : function(data){
			if(this.callback) this.callback(data);
			//alert(JSON.stringify(data));
		}
	});
	return AddGameController;

});

