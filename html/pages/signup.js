define(["require",
		 "text!signup/templates/layout.html", 
		 "facade", 
		 "controller", 
		 "models", 
		 "views", 
		 "utils", 
		"signup/models/registerbasic",
		"signup/models/registration-basics-final",
		"signup/views/registerbasic",
		"signup/views/registration-basics-final",
		"signup/models/image-upload",
		"signup/views/image-upload",
		
	
		], 
		 function(require, pageLayoutTemplate) {

				var SignupController,
		 		facade = require("facade"), 
		 		Controller = require("controller"), 
		 		models = require("models"), 
		 		views = require("views"), 
		 		utils = require("utils"), 
		 		signupBaseModel=require("signup/models/registerbasic"),
		 		signupBaseFinalModel=require("signup/models/registration-basics-final"),
		 		signupUploadImageModel=require("signup/models/image-upload"),
		 		signupBaseView=require("signup/views/registerbasic"),
		 		signupBaseFinalView=require("signup/views/registration-basics-final"),
		 		signupUploadImageView=require("signup/views/image-upload"),
		 		
 		
		 		LayoutView = views.LayoutView, 
		 		$ = facade.$,
		 		_ = facade._,
		 		debug = utils.debug,
		 		Channel = utils.lib.Channel,
		 		cssArr = ["/pages/signup/css/signupstyle.css", "/css/style.jrac.css","/pages/imageup/imageup.css"];

				SignupController = Controller.extend({

					initialize : function(options) {
					
						Channel('load:css').publish(cssArr);

						_.bindAll(this);

						this.handleOptions(options);

						this.init();

						return this;
					},
					init : function() {
						this.refreshPage();
						this.setupLayout()
						this.createData();
						//this.refreshPage();
						this.handleDeferreds();
					},
					//popup layput
					setupLayout: function ()
					{
						this.scheme=[];
						$('div#modalPopup').remove();
						$('body').append('<div id="modalPopup"></div>');

						pageLayout = new LayoutView({
						scheme: this.scheme,
						destination: "#modalPopup",
						template : pageLayoutTemplate,
						displayWhen : "ready"
						});
						this.layout=pageLayout;
						
						return this.layout;

					},	
					//normal layout
					/*setupLayout : function() {
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
					},*/
					createData : function() {
						this.select_type = new signupBaseModel();
					},
					refreshPage : function() {
						
						if (this.selectTypeView) {
							
							$(this.selectTypeView.destination).html('');
								position = $.inArray(this.selectTypeView, this.scheme);
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
						routing.off('register-basic');
          				//Bind a callback function to an object routing
          				routing.on('register-basic', function() {
            				controller.setupSelectTypeView();				
            			});
						
						
						
						function registerBasicFinal(attrs) {
							controller.initRegisterFinal({"attr":attrs});
						}
						//Remove a previously-bound callback function from routing
						routing.off('register-basic-final');
          				//Bind a callback function to an object routing
          				routing.on('register-basic-final', function(param) {
            							registerBasicFinal(param);
            			});
												
						function uploadImage(attrs) {
							controller.uploadUserImage({"attr":attrs});
						}
						//Channel('upload-user-image').subscribe(uploadImage);
						//Remove a previously-bound callback function from routing
						routing.off('upload-user-image');
          				//Bind a callback function to an object routing
          				routing.on('upload-user-image', function(param) {
            							uploadImage(param);
            			});

					},
					initRegisterFinal:function(attr){
						
						this.basic_type	= new signupBaseFinalModel();
						//alert("initRegisterBasicFinal2");
						this.selectRegisterBasicFinalView = new signupBaseFinalView({
						
							model : this.basic_type,
							name : "Final registration",
							destination : "#main-content-reg",
							attr: attr
						});
						//this.scheme.push(this.selectTypeView);*/
						this.layout.render();

					},
					uploadUserImage:function(attr){


						this.basic_type	= new signupUploadImageModel();
						//alert("initRegisterBasicFinal2");
						this.selectRegisterBasicFinalView = new signupUploadImageView({
							model : this.basic_type,
							name : "Final registration",
							destination : "#main-content-reg",
							attr: attr
						});
						//this.scheme.push(this.selectTypeView);*/
						this.layout.render();
					},
					setupSelectTypeView : function() {
						
						this.selectTypeView = new signupBaseView({
						 
							model : this.select_type,
							name : "Select Registration Type",
							destination : "#main-content-reg"
						});

						//this.scheme.push(this.selectTypeView);
						this.layout.render();
					},
				});
				return SignupController;
			});	