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
       
        'utils/storage',
        'signup/views/facebooksignup',
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
        FbHeader = require("signup/views/facebooksignup"),
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
            "click #userlogin":"userLogin",
            "click #logoutId" :"LogoutUser"
        },

        render: function () {
            var self = this;
            this.model.fetchSuccess = this.model.fetchError = function(model, res) {
                var markup = Mustache.to_html(self.template, model.toJSON());
                self.$el.html(markup);
               // console.log(model.toJSON());
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
                     routing.loggedInUserId = id;
                    routing.trigger('app-inited', id);
                } else {
                    routing.userLoggedIn = false;
                    routing.trigger('app-inited');
                }
                $('#main').removeClass("region-loader");
                $(document).off("click", "a[href*='#fbinvite']");
                $(document).on("click", "a[href*='#fbinvite']", function(e) {
                	e.preventDefault();
                	 routing.trigger('fbInvite');
                });
                
            };
           // $.ajaxSetup({ cache: false });
            this.model.fetch();
            return this;
        },
        userLogin:function(event){
            event.preventDefault();
           // if(!this.logincontroller)
           this.logincontroller = new LoginController();
           routing.trigger("Login");
        },
        signupFBTest:function(event){
                     
        },
             
        signupFacebook: function(event) {
             event.preventDefault();
             headView = new FbHeader();
             headView.signupFacebook();
         },
         signupUser: function(){
           // event.preventDefault();
            this.signupc = new scontroller({"route":""});
            routing.trigger("register-basic");
            this.pop = new popupview();
        },
        LogoutUser:function(event){
            event.preventDefault();
            if(!this.logincontroller)
              this.logincontroller = new LoginController();
            routing.trigger("Logout",this.model);
        }
        
      });

    return HeaderView;
});