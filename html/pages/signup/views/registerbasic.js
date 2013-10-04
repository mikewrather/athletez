define([
	'require',
	'text!signup/templates/registration.html',
    'chrome/views/header', 
    'backbone',
    'underscore',
    'registration',
    'views',
    'facade', 
    'utils', 

	],function(require,  signupBasicTemplate,chromeHeader,backbone,_,RegistrationController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
				
				initialize: function (options) {
                    this.registrationController = new RegistrationController({
                    "route": ""
                     });
            		this.template =  _.template(signupBasicTemplate);
            		this.$el = $(options.destination);
                    $("#errormsg, #preview").html("");
            
                     SectionView.prototype.initialize.call(this, options);   
                     debug.log("Image upload basic view");   
                     $('#RegModal').modal('show') ;
                     $('#RegModal').on('hidden', function () {
               
                        //routing.trigger('refresh-onImageUpload');
                    });
                    $('#RegModal').on('hide', function () {
                        $('div#modalPopup').remove();
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
              var self = this;          // event.preventDefault();
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
                            //sthis.signupc = new scontroller({"route":""});
                            Channel('registration-with-facebook').publish();
                             //this.pop = new popupview();

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
                        //this.signupc = new scontroller({"route":""});
                        Channel('registration-with-facebook').publish();
                        //this.pop = new popupview();
                    } else {
                        alert('Cancelled');
                    }
                },{scope: 'email, user_birthday, user_photos'});
            }

            // Load the SDK Asynchronously
            function loadFBLogin(){
  //          
                if (!self.registrationController) {
                self.registrationController = new RegistrationController({
                    "route": ""
                });
            }
            self.registrationController.refreshPage();
//            
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