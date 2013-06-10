// Select Registration Type View
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationSelectTypeView} constructor

define([
        'require', 
        'text!registration/templates/select_type.html', 
        'facade', 
        'views',
        'utils',
        ], 
function(require, registrationSelectTypeTemplate) {

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
            "click .register_email": "registerWithEmail"
        },

        template: registrationSelectTypeTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
        registerWithFacebook: function(event) {                                
            event.preventDefault();
            // Additional JS functions here
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '239430712864961', // App ID
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true,  // parse XFBML
                    oauth      : true
                });

                // Additional init code here
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function(response) {
                            console.log(response);
                            Channel('registration-with-facebook').publish();
                        });
                    } else if (response.status === 'not_authorized') {
                        console.log('not_authorized');
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
        }
                
    });

    return RegistrationSelectTypeView;
});