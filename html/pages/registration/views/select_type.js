// Select Registration Type View
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationSelectTypeView} constructor

define([
        'require',
		'registration/models/select_type',
        'text!registration/templates/select_type.html', 
        'facade', 
        'views',
        'utils'
        ], 
function(require, RegistrationSelectTypeModel, registrationSelectTypeTemplate) {

    var RegistrationSelectTypeView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView;
        

    RegistrationSelectTypeView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "click .register_facebook": "registerWithFacebook",
            "click .register_email": "registerWithEmail",
	        "click .go_club": "selectOrg"
        },

        template: registrationSelectTypeTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);
	        this.initModel();
        },
        
        registerWithFacebook: function(event) {                                
            event.preventDefault();
            
            // Additional JS functions here
            window.fbAsyncInit = function() {
                FB.init({
                    //appId      : '219148511595084', // App ID
                    appId      :'219148511595084',
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true,  // parse XFBML
                    oauth      : true
                });

                // Additional init code here
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function(response) {
                            Channel('registration-with-facebook').publish();
                        });
                    } else if (response.status === 'not_authorized') {
                        login();
                    } else {
                        login();
                    }
                },{scope: 'email, user_birthday, user_photos'});
            };

            function login() {
                FB.login(function(response) {
                    if (response.authResponse) {
                        Channel('registration-with-facebook').publish();
                    } else {
                        alert('Cancelled');
                        // for test
                        //Channel('registration-with-facebook').publish();
                    }
                },{scope: 'email, user_birthday, user_photos'});
            }

            // Load the SDK Asynchronously
            function loadFBLogin(){
                var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
                if (document.getElementById(id)) {
                    login();
                    return;
                }
                js = document.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }

            loadFBLogin();
        },
        
        registerWithEmail: function(event) {
            event.preventDefault();
            Channel('registration-with-email').publish();
		},

		initModel: function(){
			var self = this;
			function loggedUserInfo (id){
				self.select_type = new RegistrationSelectTypeModel();
				self.select_type.id = id;
				self.select_type.fetch();

				$.when(self.select_type.request).done(function() {
					self.model = self.select_type;
				});
			}

			Channel('app-inited').subscribe(loggedUserInfo);
		},

	    selectOrg: function (event){
		    event.preventDefault();
		    var self = this;
		    var payload = self.model.get("payload");
		    Channel('registration-select-org').publish(payload);
	    }
    });

    return RegistrationSelectTypeView;
});