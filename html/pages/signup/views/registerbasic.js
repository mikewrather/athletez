define(['require', 'text!signup/templates/registration.html', 'text!signup/templates/registration_landing.html', 'backbone', 'underscore', 'registration', 'login', 'views', 'signup/views/facebooksignup', 'facade', 'utils', "signup/views/registration-basics-final", "signup/models/registration-basics-final"], function(require, signupBasicTemplate, signupBasicLandingTemplate, backbone, _, RegistrationController, loginController) {

	var SignupBasicView, facade = require('facade'), views = require('views'), FbHeader = require('signup/views/facebooksignup'), utils = require('utils'), Channel = utils.lib.Channel, signupBaseFinalView = require("signup/views/registration-basics-final"), signupBaseFinalModel = require("signup/models/registration-basics-final"), SectionView = backbone.View;
	SignupBasicView = SectionView.extend({
		initialize : function(options) {
			if (options.openAsaPage)
				this.openAsaPage = options.openAsaPage;
			this.callback = options.callback;
			//alert(options.destination);
			this.registrationController = new RegistrationController({
				"route" : ""
			});

			this.AcceptData = (options.data) ? options.data : undefined;

			if (options.showOnLanding == true)
				this.template = _.template(signupBasicLandingTemplate, {
					onlyRegister : (this.openAsaPage) ? true : false
				});
			else
				this.template = _.template(signupBasicTemplate, {
					onlyRegister : (this.openAsaPage) ? true : false
				});

			this.$el = $(options.destination);
			$("#errormsg, #preview").html("");
			SectionView.prototype.initialize.call(this, options);
			this.render();
		},

		render : function() {
			this.$el.html(this.template);
			if (this.AcceptData) {
				this.$el.find("input[name=firstname]").val(this.AcceptData.firstname);
				this.$el.find("input[name=lastname]").val(this.AcceptData.lastname);
			}
		},

		events : {
			"click .regsubmit" : "next",
			"click #fbpane" : "signupFacebook",
			"click #reglogin a" : "showLogin",
			"click .login" : "showLogin"
		},

		next : function(event) {
			event.preventDefault();
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
					this.basic_type = new signupBaseFinalModel();
					var options = {
						model : this.basic_type,
						name : "Final registration",
						attr : {
							"attr" : fields
						},
						openAsPopUp : true,
						callback : this.callback
					};

					this.selectRegisterBasicFinalView = new signupBaseFinalView(options);
					var options = {};
					options.height = "500px";
					options.width = "500px";
					options.title = "The Basics";
					options.html = this.selectRegisterBasicFinalView.$el;
					routing.trigger('common-popup-open', options);
				} else {
					if (flag)
						routing.trigger("register-basic-final", fields, this.callback);
				}
			} catch(e) {

			}
		},

		signupFacebook : function(event) {
			event.preventDefault();
			$(event.target).parent().find('#label').addClass('loading').html('Connecting to Facebook...');
			$('#RegModal').modal('hide');
			headView = new FbHeader({callback: this.callback});
			headView.signupFacebook();
		},

		showLogin : function(event) {
			event.preventDefault();
			routing.trigger('popup-close');
			this.logincontroller = new LoginController({
				callback : this.callback
			});
			routing.trigger("Login");
		}
	});
	return SignupBasicView;
});
