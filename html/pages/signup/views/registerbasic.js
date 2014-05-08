define(['require', 'text!signup/templates/registration.html', 'text!signup/templates/registration_landing.html', 'backbone', 'underscore', 'registration', 'login', 'views', 'signup/views/facebooksignup', 'facade', 'utils', "signup/views/registration-basics-final", "signup/models/registration-basics-final"], function(require, signupBasicTemplate, signupBasicLandingTemplate, backbone, _, RegistrationController, LoginController) {

	var SignupBasicView,
		facade = require('facade'),
		views = require('views'),
		FbHeader = require('signup/views/facebooksignup'),
		utils = require('utils'),
		Channel = utils.lib.Channel,
		signupBaseFinalView = require("signup/views/registration-basics-final"),
		signupBaseFinalModel = require("signup/models/registration-basics-final"),
		SectionView = backbone.View;

	SignupBasicView = SectionView.extend({
		initialize : function(options) {
			if (options.openAsaPage)
				this.openAsaPage = options.openAsaPage;
			this.callback = options.callback;
			this.registrationController = new RegistrationController({
				"route" : "",
				callback: this.callback
			});

			this.invite_hash = options.invite_hash ? options.invite_hash : false;
			console.log("Options passed to registerbasics",options);
			this.AcceptData = (options.data) ? options.data : undefined;

			if (options.showOnLanding == true)
				this.template = _.template(signupBasicLandingTemplate, {
					onlyRegister : (this.openAsaPage) ? true : false,
					invite_hash : this.invite_hash
				});
			else
				this.template = _.template(signupBasicTemplate, {
					onlyRegister : (this.openAsaPage) ? true : false,
					invite_hash : this.invite_hash
				});

			this.$el = $(options.destination);
			$("#errormsg, #preview").html("");
			SectionView.prototype.initialize.call(this, options);
			this.render();

			// I'm assigning this to a global variable because we are going to be calling it from an el's onclick event
			this.facebookView = new FbHeader({callback: this.callback,invite_hash:this.invite_hash});
		},

		render : function() {
			this.$el.html(this.template);
			if (this.AcceptData) {
				this.$el.find("input[name=firstname]").val(this.AcceptData.firstname);
				this.$el.find("input[name=lastname]").val(this.AcceptData.lastname);
				this.$el.find("input[name=email]").val(this.AcceptData.email);
			}
			routing.trigger('center-landing-image',{});
		},

		events : {
			"click .regsubmit" : "next",
			"click #fbpane" : "signupFacebook",
			"click #reglogin a" : "showLogin",
			"click .login" : "showLogin"
		},

		next : function(event) {
			event.preventDefault();
			// -_. 
			var $firstName = $(event.target).parents("form").find("input[name=fullname]"), v = $firstName.val(), regex = /[a-zA-Z\.\_\-]$/;
			
		    if(!regex.test(v)) {
				$firstName.addClass('field-failed');
		        setTimeout(function() {
					$firstName.removeClass('field-failed');
				}, 2000);
		        return false;
		    }
						
			var fields = this.$(":input").serializeArray(), flag = true;
			$.each(this.$(":input"), function(key, value) {
				if (!value.value) {
					setTimeout(function() {
						$(value).addClass('field-failed');
						setTimeout(function() {
							$(value).removeClass('field-failed');
						}, 2000);
					}, parseInt(key + "00"));
					flag = false;
				}
			});
			try {

				if (this.openAsaPage && flag) {

				//	console.log("called",this.selectRegisterBasicFinalView.$el.html());
					routing.trigger('common-popup-close');
					var options = {};
					options.height = "500px";
					options.width = "500px";
					options.title = "The Basics";
					options.html = '<div id="reg-cont"></div>';
					routing.trigger('common-popup-open', options);

					this.basic_type = new signupBaseFinalModel();
					var options = {
						model : this.basic_type,
						name : "Final registration",
						attr : {
							"attr" : fields
						},
						openAsPopUp : true,
						callback : this.callback,
						invite_hash:this.invite_hash,
						destination:$('#reg-cont')

					};
					//	console.log("called");
					this.selectRegisterBasicFinalView = new signupBaseFinalView(options);

				} else {
					if (flag)
						routing.trigger("register-basic-final", fields, this.callback);
				}
			} catch(e) {
				console.log(e.stack);
			}
		},

		signupFacebook : function(event) {
			event.preventDefault();
			$(event.target).parent().find('#label').addClass('loading').html('Connecting to Facebook...');
			$('#RegModal').modal('hide');

			this.facebookView.loginfb();
		},

		showLogin : function(event) {
			event.preventDefault();
			var fields = this.$(":input").serializeArray();
			var LoginController = require('login');

			routing.trigger('common-popup-close');
			this.logincontroller = new LoginController({
				callback : this.callback,
				attr : {
					"attr" : fields
				}
			});
			routing.trigger("Login");
		}
	});
	return SignupBasicView;
});
