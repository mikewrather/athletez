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

       initialize: function(options) {
       		this.callback = options.callback;
       },
               
             
        signupFacebook: function(linkedToFB) {
            var current = this;
            this.linkWithFB = (linkedToFB && linkedToFB == "linkWithFB")?true:false;
            //event.preventDefault();
          if (!this.registrationController) {
                this.registrationController = new RegistrationController({callback: current.calback});
               // this.signupc = new scontroller();
           }
            // Additional JS functions here
           var func = _.bind(current.getFBlogin, this);
           this.Fbinit(func);
           // Load the SDK Asynchronously
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
                               // this.signupc = new scontroller({"route":""});
                                 routing.trigger('registration-with-facebook', temp.callback);
                                //Channel('registration-with-facebook').publish();
                                //this.pop = new popupview();

                            });
                        } else if (response.status === 'not_authorized') {
                        	if(temp.linkWithFB) {
                            	alert("There was a problem trying to establish a connection to Facebook.");
                            }
                            console.log('not_authorized');
                             if(!temp.loginInfo)
                             temp.loginInfo=temp.loginfb();
                        } else {
                            //this.loginfb();
                             if(!temp.loginInfo)
                             temp.loginInfo=temp.loginfb();
                        }
            },{scope: 'email, user_birthday, user_photos'});
            
        },
        loginfb:function() {
               var _self = this;
                FB.login(function(response) {
                    if (response.authResponse) {
                         routing.trigger('registration-with-facebook', _self.callback);
                       // Channel('registration-with-facebook').publish();
                        //this.pop = new popupview();
                    } else {
                        alert('Cancelled ');
                    }
                },{scope: 'email, user_birthday, user_photos'});
            },
        checkFBlogin:function(){
        	var _self = this;
            FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            FB.api('/me', function(response) {
                               routing.trigger('registration-with-facebook', _self.callback);
                            });
                        } 
            },{scope: 'email, user_birthday, user_photos'});
        }


      });

    return HeaderView;
});