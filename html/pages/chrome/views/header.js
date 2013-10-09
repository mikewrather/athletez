// header.js  
// -------  
// Requires `define`
// Return {HeaderView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/header.html',
        'chrome/models/header',
        'registration',
        'login',
        'signup',
        'signup/views/shopopup',
       
        'utils/storage'
        ], 
function (
        vendor,
        views,
        headerTemplate,
        HeaderModel,
        RegistrationController,
        loginController,
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

        tagName: 'header',

        className: 'container-fluid clearfix',

        initialize: function (options) {
            this.template = headerTemplate;
        },

        model: new HeaderModel(),
        
        events: {
            "click .signup-facebook": "signupFacebook",
            "click .signup-email": "signupUser",
            "click .account clearfix a": "login",
            "click #userlogin":"userLogin"
        },

        render: function () {
            var self = this;
            this.model.fetchSuccess = this.model.fetchError = function(model, res) {
                var markup = Mustache.to_html(self.template, model.toJSON());
                self.$el.html(markup);
                console.log(model.toJSON());

                if(typeof(model.get('user_photo'))=='object')
                    if(typeof(model.get('user_photo').types)=='object')
                        if(typeof(model.get('user_photo').types.small_thumb)=='object')
                            var user_photo = model.get('user_photo').types.small_thumb.url;
                        else if(typeof(model.get('user_photo').types.large_thumb)=='object')
                            var user_photo = model.get('user_photo').types.large_thumb.url;
                        else if(typeof(model.get('user_photo').types.original)=='object')
                            var user_photo = model.get('user_photo').types.original.url;
                        else var user_photo = "";

              self.$('.photo img').attr("src",user_photo);

                var authorized = model.get('authorized');
                if (authorized) {
                    var id = model.get('id');
                    self.model.saveCookie();
                    routing.userLoggedIn = true;
                    routing.trigger('app-inited', id);
                } else {
                    routing.userLoggedIn = false;
                    routing.trigger('app-inited');
                }
            };
                
            this.model.fetch();
            return this;
        },
        userLogin:function(event){
                event.preventDefault();
                //this.logincontroller = new LoginController();
                //routing.trigger("Login");
                this.Fbinit();
                //this.getFBlogin();
                this.loadFBLogin();
        },

             
        signupFacebook: function(event) {
            var current = this;
            event.preventDefault();
          if (!this.registrationController) {
                this.registrationController = new RegistrationController();
                this.signupc = new scontroller({"route":""});
            }
            // Additional JS functions here
            var func = _.bind(current.getFBlogin, this);
            this.Fbinit(func);
            //this.getFBlogin();
            // Load the SDK Asynchronously
            
            this.loadFBLogin();
        },
        Fbinit : function(callLogin){
            var current =this;
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '239430712864961', // App ID
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
                    this.return;
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
                                console.log(response);
                               // this.signupc = new scontroller({"route":""});
                                Channel('registration-with-facebook').publish();
                                this.pop = new popupview();

                            });
                        } else if (response.status === 'not_authorized') {
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
               
                FB.login(function(response) {
                    if (response.authResponse) {
                        
                        Channel('registration-with-facebook').publish();
                        this.pop = new popupview();
                    } else {
                        alert('Cancelled ');
                    }
                },{scope: 'email, user_birthday, user_photos'});
            },
        checkFBlogin:function(){
            FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            FB.api('/me', function(response) {
                                console.log(response);
                               // this.signupc = new scontroller({"route":""});
                                Channel('registration-with-facebook').publish();
                                //this.pop = new popupview();

                            });
                        } 
            },{scope: 'email, user_birthday, user_photos'});
        },
        signupUser: function(event){
                    event.preventDefault();
                    this.signupc = new scontroller({"route":""});
                    routing.trigger("register-basic");
                    this.pop = new popupview();
                  
        }
      });

    return HeaderView;
});