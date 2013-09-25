define([
	'require',
	'text!signup/templates/registration.html', 
    'backbone',
    'underscore',
    'registration',
    'views',
    'facade', 
    'utils', 

	],function(require,  signupBasicTemplate,backbone,_,RegistrationController) {
			
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
                    $("#errormsg, #preview").html("");
            
                     SectionView.prototype.initialize.call(this, options);   
                     debug.log("Image upload basic view");   
                     $('#imgUploadModal').modal('show') ;
                     $('#imgUploadModal').on('hidden', function () {
               
                        //routing.trigger('refresh-onImageUpload');
                    });
                    $('#imgUploadModal').on('hide', function () {
               
                        //routing.trigger('refresh-onImageUpload');
                      });
            		this.render();
            		        		
        		},
        		render: function(){

        			this.$el.html(this.template);
        		},
        		events:{
        		"click .regsubmit":"next",
                "click #fbpane":"signupFacebook"
        		},
        		next: function(event){
        			event.preventDefault();
        			
        			//backbone.validation.bind(this);
        			var fields = this.$(":input").serializeArray();
                    var flag= true;
                	$.each(fields, function( index, value ) {
                       if(!value.value){
                        alert(value.name +" is blank");
                        flag = false;
                        return false;
                       }
                      
                    });
                   if(flag)
                   //Channel('register-basic-final').publish(fields);
                	routing.trigger("register-basic-final", fields);           

                    
        		},
               //***************//

               signupFacebook: function(event) {

            
            event.preventDefault();

            $('#imgUploadModal').modal('hide') ;
          // event.preventDefault();
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
                    }
                },{scope: 'email, user_birthday, user_photos'});
            }

            // Load the SDK Asynchronously
            function loadFBLogin(){
  //            alert("load fb");
                if (!this.registrationController) {
                this.registrationController = new RegistrationController({
                    "route": ""
                });
            }
            this.registrationController.refreshPage();
//             alert("signupFaceook-header registration-with-facebook 1");
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
//************//
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