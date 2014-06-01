// header.js
// -------
// Requires `define`
// Return {HeaderView} object as constructor

define(['vendor',
	'views',
	'registration',
	'signup',
	'signup/views/shopopup',
	'utils/storage',
	'facebook',
	'packages/invite/models/invite'],

	function(vendor, views, RegistrationController, scontroller, popupview, Store) {

	var HeaderView, BaseView = views.BaseView, $ = vendor.$, _ = vendor._, Mustache = vendor.Mustache, actionFunction,
		InviteModel = require('packages/invite/models/invite');

	var FB_obj = window.cordova && window.facebookConnectPlugin ? window.facebookConnectPlugin : FB;

	HeaderView = BaseView.extend({

		initialize : function(options) {
			if (options && options.callback){
				this.callback = options.callback;
			}
			if(options && options.invite_hash){

				this.invite_hash = options.invite_hash;
			}
			console.log(options);

			if(!window.cordova && !window.facebookConnectPlugin) {
				FB_obj.init({
					appId: App.Settings.appId,
					status: true, // check login status
					cookie: true, // enable cookies to allow the server to access the session
					xfbml: true, // parse XFBML
					oauth: true
				});
			}
		},

		signupFacebook : function(linkedToFB,successCallback) {
			var current = this;
			this.linkWithFB = (linkedToFB && linkedToFB == "linkWithFB") ? true : false;
			if (!this.registrationController) {
				this.registrationController = new RegistrationController({
					callback : current.calback
				});
			}
			// Additional JS functions here
			//var func = _.bind(current.getFBlogin, this);
			//this.getFBlogin();
			this.loginfb(successCallback);
		},

		getFBlogin : function() {
			var _self = this;
			alert("getFBlogin");
			FB_obj.getLoginStatus(function(response) {
				console.log(response);
				if (response.status === 'connected') {
					this.actionFunction = function() {
						FB_obj.api('/me', function(response) {
							if (_self.linkWithFB) {
								alert("Facebook Account linked Successfully.");
							}
							routing.trigger('registration-with-facebook', _self.callback);
						});
					};
				} else if (response.status === 'not_authorized') {
					if (_self.linkWithFB) {
						alert("There was a problem trying to establish a connection to Facebook.");
					}
					console.log('not_authorized');
					if (!_self.loginInfo)
						_self.loginInfo = _self.loginfb();
				} else {

					if (!_self.loginInfo)
						_self.loginInfo = _self.loginfb();
				}
			}, {
				scope : 'email, user_birthday, user_photos'
			});

		},
		loginfb : function(successCallback) {
			var _self = this;

			console.log(FB_obj);
			console.log(successCallback);

			var successFunction = function(response) {
				console.log(response);

				if (response.authResponse) {

					console.log(response);
					_self.saveAccessToken(response.authResponse);

					// hides the landing section
					routing.trigger('hide-landing');

					if(_self.invite_hash){
						var inviteModel = new InviteModel({sechash:_self.invite_hash});
					}



					if(successCallback && _.isFunction(successCallback)) {
						successCallback();
					}
					else {
						routing.trigger('registration-with-facebook', _self.callback,inviteModel);
					}

					// Channel('registration-with-facebook').publish();
					//this.pop = new popupview();
				} else {
					alert('Facebook Login has been cancelled');
				}
			},
				failFunction = function(data){ console.log(data);},
				scope = window.cordova && window.facebookConnectPlugin ? ['email, user_birthday, user_photos'] : {scope: 'email,user_birthday,user_photos'}

			var FacebookCall = window.cordova && window.facebookConnectPlugin ?
				FB_obj.login(scope,successFunction,failFunction) :
				FB_obj.login(successFunction,failFunction,scope);

		},
		saveAccessToken: function(token){

			var session = {id:"FBAuthToken","value":token},
				saveSession = new Store("FBAuthToken","localStorage");
			saveSession.create(session);

		},
		checkFBlogin : function() {
			var _self = this;
			FB_obj.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB_obj.api('/me', function(response) {
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