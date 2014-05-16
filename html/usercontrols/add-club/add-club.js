/*
***** module as controller for 'photoplayer' control
*/

define(["require",
		"facade",
		"controller",
		"models",
		"views",
		"user/models/basic_info",
		"usercontrol/add-club/views/main"],
	function(require) {

	var facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,
	Backbone = facade.Backbone,
	// models
	BasicModel = require("user/models/basic_info"),
	
	//collections

	// views
	MainView = require("usercontrol/add-club/views/main");
	
	return Controller.extend({
		// define css files to load
		cssArr : [base_url + "usercontrols/add-club/add-club.css"],
		events : {
		},
		
		// controller intialize function
		initialize : function(options) {
			var _self = this;
			// load css file
			Channel('load:css').publish(this.cssArr);
			_.bindAll(this);
			// model box html 
			if (options.id) this.id = options.id;
			if (options.index) this.index = options.index;
			if(options.userId) this.userId = options.userId;
			if(options.type) this.type = options.type;
			if(options.orgNameSoFar) this.orgNameSoFar = options.orgNameSoFar;
			this.viewObj = options.viewObj;
			this.callback = options.callback;
			
			if (options._collection) this._collection = options._collection;
				this.modelHTML = '<div class="add-club-area-h photo-player"></div>';
		
  			// set up main layout view					
			this.setupLayout().render();
			this.setUpMainView();
		},
		
		// setup main layout
		setupLayout : function() {
			this.scheme=[];
            var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalBody",
				template : '',
				displayWhen : "ready"
			});
            this.layout=pageLayout;
          // $('#modalPopup').modal();
          var options = {};
            options.height = "500px";
            options.width = "500px";
            options.title = (this.type == "school")?"Add School":"Add Club";
			routing.trigger('common-popup-open', options); 
            return this.layout;
		},
		
		// set up photo player main view
		setUpMainView : function() {
			var self = this;

			var addClubForm = new MainView({
				model : new BasicModel(),
				name : "add club",
				destination : "#modalBody",
				addType: self.type,
				callback: self.callback,
				viewObj: self.viewObj,
				orgNameSoFar:self.orgNameSoFar
			});
			self.scheme.push(addClubForm);
			self.layout.render();

		}
	});

});

