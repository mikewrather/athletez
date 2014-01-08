// header.js  
// -------  
// Requires `define`
// Return {HeaderView} object as constructor

define([
        'vendor', 
        'views',
        'registration',
        'signup',
        'signup/views/shopopup',
        'utils/storage'
        ], 
function (
        vendor,
        views,
        RegistrationController,
        scontroller,
        popupview,
        Store
        ) {

    var HeaderView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      HeaderView = BaseView.extend({

        signupFacebook: function(linkedToFB, callback) {
          var current = this;
          this.linkWithFB = (linkedToFB && linkedToFB == "linkWithFB")?true:false;
          if (!this.registrationController) {
                this.registrationController = new RegistrationController();
            }
            // Additional JS functions here
            var func = _.bind(current.getFBlogin, this);
            this.Fbinit(func);
            // Load the SDK Asynchronously
            if(callback) this.callback = callback;
            this.loadFBLogin();
        },
        Fbinit : function(callLogin){
            var current =this;
            window.fbAsyncInit = function() {
	            console.log("facebook");
                FB.init({
	                appId      : App.Settings.appId,
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true,  // parse XFBML
                    oauth      : true
                });
                // Additional init code here
                callLogin();
            };
            
        },
        loadFBLogin:function() {
            this.registrationController.refreshPage();
                var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
                if (document.getElementById(id)) {
                   
       				this.loginInfo = this.loginfb();
                    return;
	         }
     			js = document.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            },
        getFBlogin:function(){
            var temp = this;
            FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            FB.api('/me', function(response) {
                            	if(temp.linkWithFB) {
                            		alert("Facebook Account linked Successfully.");
                            	}
                            	if(temp.callback) temp.callback();
                                 if(!temp.callback) routing.trigger('registration-with-facebook');
                            });
                        } else if (response.status === 'not_authorized') {
                        	if(temp.linkWithFB) {
                            	alert("Some error occured. Please try again.");
                            }
                            console.log('not_authorized');
                             if(!temp.loginInfo)
                             temp.loginInfo=temp.loginfb();
                        } else {
                             if(!temp.loginInfo)
                             temp.loginInfo=temp.loginfb();
                        }
            },{scope: 'email, user_birthday, user_photos, send'});
            
        },
        loginfb:function() {
               var _self = this;
                FB.login(function(response) {
                    if (response.authResponse) {
                    	if(_self.callback) { 
                    		_self.callback();
                    	} else {
                         	routing.trigger('registration-with-facebook');
                        }
                       // Channel('registration-with-facebook').publish();
                        //this.pop = new popupview();
                    } else {
                        alert('Cancelled ');
                    }
                },{scope: 'email, user_birthday, user_photos, send'});
            },
        checkFBlogin:function(){
        	var _self = this;
            FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            FB.api('/me', function(response) {
                                console.log(response);
                                if(_self.callback) { 
                    				_self.callback();
                    			} else {
                         			routing.trigger('registration-with-facebook');
                        		}
                               // this.signupc = new scontroller({"route":""});
                               //routing.trigger('registration-with-facebook');
                                //Channel('registration-with-facebook').publish();
                                //this.pop = new popupview();

                            });
                        } 
            },{scope: 'email, user_birthday, user_photos, send'});
        }


      });

    return HeaderView;
});