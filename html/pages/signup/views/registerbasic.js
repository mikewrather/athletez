define([
	'require',
	'text!signup/templates/registration.html', 
    'backbone',
    'underscore',
    'views',
    'facade', 
    'utils', 
	],function(require,  signupBasicTemplate,backbone,_) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
				
				initialize: function (options) {
            		this.template =  _.template(signupBasicTemplate);
            		this.$el = $(options.destination);
            		this.render();
            		        		
        		},
        		render: function(){

        			this.$el.html(this.template);
        		},
        		events:{
        		"click .regsubmit":"next",
                "click #fbpane":	"registerWithFacebook"
        		},
        		next: function(event){
        			event.preventDefault();
        			
        			
        			var fields = this.$(":input").serializeArray();
                	
                   Channel('register-basic-final').publish(fields);
                	           

                    
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

        		

			});

		return SignupBasicView;

	});	