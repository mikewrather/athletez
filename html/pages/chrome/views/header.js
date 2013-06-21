// header.js  
// -------  
// Requires `define`
// Return {HeaderView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/header.html',
        'chrome/models/header',
        'registration'
        ], 
function (
        vendor,
        views,
        headerTemplate,
        HeaderModel,
        RegistrationController
        ) {

    var HeaderView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      HeaderView = BaseView.extend({

        tagName: 'header',

        className: 'container-fluid clearfix',

        initialize: function (options) {
            this.template = headerTemplate;
        },

        model: new HeaderModel(),
        
        events: {
            "click .signup-facebook": "signupFacebook",
            "click .signup-email": "signupEmail"
        },

        render: function () {
            var self = this;
            this.model.fetchSuccess = this.model.fetchError = function(model, res) {
                var markup = Mustache.to_html(self.template, model.toJSON());
                self.$el.html(markup);
                
                var user_photo = model.get('user_photo');
                var user_email = model.get('user_email');
                if (!user_photo && user_email) {
                    self.$('.photo img').attr("src","http://www.gravatar.com/avatar/" + MD5(user_email) + "&s=29");
                }
                var authorized = model.get('authorized');
                if (authorized) {
                    var id = model.get('id');
                    Channel('app-inited').publish(id);
                }
            };
                
            this.model.fetch();
            return this;
        },
        
        signupFacebook: function(event) {
        	
            event.preventDefault();
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
  //          	alert("load fb");
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

        signupEmail: function(event) {
            event.preventDefault();

            if (!this.registrationController) {
                this.registrationController = new RegistrationController({
                    "route": ""
                });
            }

            Channel('registration-with-email').publish();
        }

      });

    return HeaderView;
});