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
        headerTemplate,
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

       
               
        signupFacebook: function() {
            
            
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
                            //this.signupc = new scontroller({"route":""});
                             Channel('registration-with-facebook').publish();
                             this.pop = new popupview();

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
                       // this.signupc = new scontroller({"route":""});
                        Channel('registration-with-facebook').publish();
                        this.pop = new popupview();
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
                if(!this.signupc){

                    this.signupc = new scontroller({"route":""});
                }

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


      });

    return HeaderView;
});