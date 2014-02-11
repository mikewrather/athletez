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
        'utils/storage',
		'facebook'
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
        Mustache = vendor.Mustache,
	    actionFunction;



      HeaderView = BaseView.extend({

       initialize: function(options) {
       		if(options && options.callback)
	       		this.callback = options.callback;

	  //     this.loadFBLogin();
	       FB.init({
		       appId      : App.Settings.appId,
		       status     : true, // check login status
		       cookie     : true, // enable cookies to allow the server to access the session
		       xfbml      : true,  // parse XFBML
		       oauth      : true
	       });
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
           this.getFBlogin();
        },

        loadFBLogin:function() {
        //    this.registrationController.refreshPage();
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
            var _self = this;
            FB.getLoginStatus(function(response) {
	            console.log("FB Response",response)
                        if (response.status === 'connected') {
	                        this.actionFunction = function(){
                            FB.api('/me', function(response) {
                            	if(_self.linkWithFB) {
                            		alert("Facebook Account linked Successfully.");
                            	}
                               // this.signupc = new scontroller({"route":""});
                                 routing.trigger('registration-with-facebook', _self.callback);
                                //Channel('registration-with-facebook').publish();
                                //this.pop = new popupview();

                            });
	                        }
                        } else if (response.status === 'not_authorized') {
                        	if(_self.linkWithFB) {
                            	alert("There was a problem trying to establish a connection to Facebook.");
                            }
                            console.log('not_authorized');
                             if(!_self.loginInfo)
                             _self.loginInfo=_self.loginfb();
                        } else {
                            //this.loginfb();
                             if(!_self.loginInfo)
                             _self.loginInfo=_self.loginfb();
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
                        alert('Facebook Login has been Cancelled');
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