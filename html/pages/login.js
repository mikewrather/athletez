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
		"login/models/Logoutmodel",
		
		
	
		], 
		 function(require, pageLayoutTemplate,apps) {

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
		 		cssArr = ["/pages/imageup/imageup.css"];

				LoginController = Controller.extend({

					initialize : function(options) {
					
						Channel('load:css').publish(cssArr);

						_.bindAll(this);

						this.handleOptions(options);

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
					setupLayout: function ()
					{
						
						this.scheme=[];
						$('div#LoginPopup').remove();
						$('body').append('<div id="LoginPopup"></div>');
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
								if (~position)
									this.scheme.splice(position, 1);
						}


					},
					showPopup:function(){
						
							$('#imgUploadModal').modal('show') ;
                     		$('#imgUploadModal').on('hidden', function () {
               
                        		//routing.trigger('refresh-onImageUpload');
              			      });
                   			 $('#imgUploadModal').on('hide', function () {
               
                        	//routing.trigger('refresh-onImageUpload');
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
					setupLogout:function(attr){
						var current = this
						this.logoutcheck = new logoutBaseModel()
						this.logoutcheck.fetch()
						$.when(this.logoutcheck.request).done(function(){
							// clearing header model to delete local storage
							attr.clear();
							window.localStorage.clear() ;
							
							//console.log(localStorage);
							//console.log(window.localStorage.getItem("user"),"localStorage aftr user remove");
							location.href="/";
							// to avoid page reload please uncomment below
							//attr.attributes.authorized = false;
							//routing.trigger('reload-home');
						});

					},
					
					setupLoginView : function() {
						
						this.loginView = new loginBaseView({
						 
							model : this.login_type,
							name : "Login View",
							destination : "#main-content-reg"
						});
						
						this.scheme.push(this.selectTypeView);
						this.layout.render();
					},
				});
				return LoginController;
			});	