define(["require",
		"text!login/templates/layout.html", 
		"application",
		"facade", 
		"controller", 
		"models", 
		"views", 
		"utils", 
		"login/models/Loginmodel",
		"login/views/Loginview",
		"login/models/Logoutmodel"
		], 
		 function(require, pageLayoutTemplate) {

				var SignupController,
				
		 		facade = require("facade"), 
		 		Controller = require("controller"), 
		 		models = require("models"), 
		 		views = require("views"), 
		 		utils = require("utils"), 
		 		loginBaseModel=require("login/models/Loginmodel"),
		 		loginBaseView=require("login/views/Loginview"),
		 		logoutBaseModel= require("login/models/Logoutmodel"),
		 		
		 		LayoutView = views.LayoutView, 
		 		$ = facade.$,
		 		_ = facade._,
		 		debug = utils.debug,
		 		Channel = utils.lib.Channel,
		 		cssArr = [base_url + "pages/imageup/imageup.css"];

			var LoginController =  Controller.extend({

				initialize : function(options) {
					Channel('load:css').publish(cssArr);
					this.callback = options.callback;
					_.bindAll(this);
					this.handleOptions(options);

					if(!_.isUndefined(options.attr) && _.isObject(options.attr)) this.attr = options.attr;
					this.init();
					return this;
				},
				init : function() {
					this.refreshPage();
					this.setupLayout();
					this.createData();
					this.refreshPage();
					this.handleDeferreds();
				},

				//popup layput
				setupLayout: function () {
					this.scheme=[];
					pageLayout = new LayoutView({
						scheme: this.scheme,
						destination: "#LoginPopup",
						template : pageLayoutTemplate,
						displayWhen : "ready"
					});
					this.layout=pageLayout;
					return this.layout;
				},

				createData : function() {
					this.login_type = new loginBaseModel();
				},
				refreshPage : function() {
					if (this.loginView) {
						$(this.loginView.destination).html('');
						position = $.inArray(this.loginView, this.scheme);
						if (~position) this.scheme.splice(position, 1);
					}
				},

				showPopup:function(){
					$('#imgUploadModal').modal('show') ;
                    $('#imgUploadModal').on('hidden', function () {
                      });
                     $('#imgUploadModal').on('hide', function () {
                    });
				},
				handleDeferreds : function() {
					var controller = this;
					 // display basic form for sign up
					 //Remove a previously-bound callback function from routing
					routing.off('Login');
                    //Bind a callback function to an object routing
                    routing.on('Login', function() {
                        controller.setupLoginView();
                    });

                    routing.off('Logout');
                    routing.on('Logout', function(attr) {
                        controller.setupLogout(attr);
                    });
				},

				setupLogout:function(attr) {
					var current = this;
					this.logoutcheck = new logoutBaseModel();
					this.logoutcheck.fetch();
					$.when(this.logoutcheck.request).done(function() {
						// clearing header model to delete local storage
						if(attr != undefined) attr.clear();
						window.localStorage.clear() ;
						location.href="/";
					});
				},

				setupLoginView : function() {
					var id = "modal-popup-"+Math.floor(Math.random() * Math.random() * 50 * Math.random() * 50), dest = "#"+id+" #modalBody", options = {};
		            options.height = "500px";
		            options.width = "600px";
		            options.title = "Log Into Athletez";
		            options.id = id;
					routing.trigger('common-popup-open', options);
					this.loginView = new loginBaseView({
						model : this.login_type,
						name : "Login View",
						destination : dest,
						callback: this.callback,
						attr: this.attr
					});
				//	this.scheme.push(this.selectTypeView);
				//	this.layout.render();
				}
			});

	return LoginController;
});
