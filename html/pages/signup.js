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
		"signup/views/image-upload"
		/* "registration/models/select_type", 
		 "registration/models/register_facebook", 
		 "registration/models/register_email", 
		 "registration/models/upload_image", 
		 "registration/models/select_org", 
		 "registration/views/select_type", 
		 "registration/views/register_facebook", 
		 "registration/views/register_email", 
		 "registration/views/upload_image", 
		 "registration/views/select_org"*/], 
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

		 		/*RegistrationSelectTypeModel = require("registration/models/select_type"), 
		 		RegistrationFacebookModel = require("registration/models/register_facebook"), 
		 		RegistrationEmailModel = require("registration/models/register_email"),
		 		RegistrationUploadImageModel = require("registration/models/upload_image"),
		 		RegistrationSelectOrgModel = require("registration/models/select_org"),
		 		RegistrationSelectTypeView = require("registration/views/select_type"),
		 		RegistrationFacebookView = require("registration/views/register_facebook"),
		 		RegistrationEmailView = require("registration/views/register_email"),
		 		RegistrationUploadImageView = require("registration/views/upload_image"),
		 		RegistrationSelectOrgView = require("registration/views/select_org"),*/
		 		LayoutView = views.LayoutView, 
		 		$ = facade.$,
		 		_ = facade._,
		 		debug = utils.debug,
		 		Channel = utils.lib.Channel,
		 		cssArr = ["/pages/signup/css/signupstyle.css", "/css/style.jrac.css"];

				SignupController = Controller.extend({

					initialize : function(options) {
					
						Channel('load:css').publish(cssArr);

						_.bindAll(this);

						this.handleOptions(options);

						this.init();

						return this;
					},
					init : function() {
						this.setupLayout().render();
						this.createData();
						this.refreshPage();
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
					createData : function() {
						this.select_type = new signupBaseModel();
					},
					refreshPage : function() {
						//refresh page will show appropreate view as per the event
						var position;

						if (this.selectTypeView) {
							$(this.selectTypeView.destination).html('');
								position = $.inArray(this.selectTypeView, this.scheme);
								if (~position)
									this.scheme.splice(position, 1);
						}
					},
					handleDeferreds : function() {
						var controller = this;
						
						
						controller.setupSelectTypeView();
						
						function registerBasicFinal(attrs) {
							controller.initRegisterFinal({"attr":attrs});
						}
						Channel('register-basic-final').subscribe(registerBasicFinal);
						
						function uploadImage(attrs) {
							controller.uploadUserImage({"attr":attrs});
						}
						Channel('upload-user-image').subscribe(uploadImage);

					},
					initRegisterFinal:function(attr){
						
						this.basic_type	= new signupBaseFinalModel();
						//alert("initRegisterBasicFinal2");
						this.selectRegisterBasicFinalView = new signupBaseFinalView({
							model : this.basic_type,
							name : "Final registration",
							destination : "#main-content",
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
							destination : "#main-content",
							attr: attr
						});
						//this.scheme.push(this.selectTypeView);*/
						this.layout.render();
					},
					setupSelectTypeView : function() {
						
						this.selectTypeView = new signupBaseView({
							model : this.select_type,
							name : "Select Registration Type",
							destination : "#main-content"
						});
						//this.scheme.push(this.selectTypeView);
						this.layout.render();
					},
				});
				return SignupController;
			});	