// header.js
// -------
// Requires `define`
// Return {HeaderView} object as constructor

define(['vendor', 'views', 'registration', 'signup', 'signup/views/shopopup', 'utils/storage'], function(vendor, views, RegistrationController, scontroller, popupview, Store) {

	var HeaderView, BaseView = views.BaseView, $ = vendor.$, _ = vendor._, Mustache = vendor.Mustache;

	HeaderView = BaseView.extend({

		initialize : function(options) {
			if (options && options.callback) this.callback = options.callback;
		},

		signupFacebook : function(linkedToFB) {
			var current = this;
			this.linkWithFB = (linkedToFB && linkedToFB == "linkWithFB") ? true : false;
			if (!this.registrationController) {
				this.registrationController = new RegistrationController({
					callback : current.calback
				});
			}
			// Additional JS functions here
			var func = _.bind(current.getFBlogin, this);
			this.Fbinit(func);
			// Load the SDK Asynchronously
			this.loadFBLogin();
		},
		
		checkFbLogin: function() {
			if (!this.registrationController) {
				this.registrationController = new RegistrationController();
			}
			//var func = 
			var _self = this;
			_.bind(this.getFBlogin, this);
			this.loadFBLogin();
			this.Fbinit(function() {
				_self.getFBlogin("proxy");
			});
			// Load the SDK Asynchronously
		},

		Fbinit : function(callLogin) {
			var current = this;
			window.fbAsyncInit = function() {
				FB.init({
					appId : App.Settings.appId,
					status : true, // check login status
					cookie : true, // enable cookies to allow the server to access the session
					xfbml : true, // parse XFBML
					oauth : true
				});
				// Additional init code here
				callLogin();
			};
		},
		loadFBLogin : function() {
			this.registrationController.refreshPage();
			var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
			if (document.getElementById(id)) {
				this.loginInfo = this.loginfb();
				return;
			}
			js = document.createElement('script');
			js.id = id;
			js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		},
		getFBlogin : function(proxy) {
			var temp = this;
			FB.getLoginStatus(function(response) {
				if(!proxy || proxy != "proxy") {
					if (response.status === 'connected') {
						FB.api('/me', function(response) {
							if (temp.linkWithFB) {
								alert("Facebook Account linked Successfully.");
							}
							routing.trigger('registration-with-facebook', temp.callback);
						});
					} else if (response.status === 'not_authorized') {
						if (temp.linkWithFB) {
							alert("There was a problem trying to establish a connection to Facebook.");
						}
						console.log('not_authorized');
						if (!temp.loginInfo)
							temp.loginInfo = temp.loginfb();
					} else {
						if (!temp.loginInfo) temp.loginInfo = temp.loginfb();
					}
				}
			}, true);
		},

		loginfb : function() {
			var _self = this;
			FB.login(function(response) {
				if (response.authResponse) {
					routing.trigger('registration-with-facebook', _self.callback);
				} else {
					alert('Cancelled ');
				}
			}, {
				scope : 'email, user_birthday, user_photos'
			});
		},

		checkFBlogin : function() {
			var _self = this;
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB.api('/me', function(response) {
						routing.trigger('registration-with-facebook', _self.callback);
					});
				}
			}, {
				scope : 'email, user_birthday, user_photos'
			});
		}
	});
	return HeaderView;
}); 