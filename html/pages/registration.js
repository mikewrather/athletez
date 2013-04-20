// Registration Controller
// ---------------
// module as controller for 'registration' package
// Returns {RegistrationController} constructor

define([
    "require",
    "text!registration/templates/layout.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    
    "registration/models/select_type",
    "registration/models/register_facebook",
    "registration/models/register_email",
    
    "registration/views/select_type",
    "registration/views/register_facebook",
    "registration/views/register_email"
    
    ], function (require, pageLayoutTemplate) {

    var RegistrationController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        RegistrationSelectTypeModel = require("registration/models/select_type"),
        RegistrationFacebookModel = require("registration/models/register_facebook"),
        RegistrationEmailModel = require("registration/models/register_email"),
        
        RegistrationSelectTypeView = require("registration/views/select_type"),
        RegistrationFacebookView = require("registration/views/register_facebook"),
        RegistrationEmailView = require("registration/views/register_email"),
        
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/pages/registration/registration.css",
            "/css/imgareaselect-default.css"
        ];

    RegistrationController = Controller.extend({

        initialize: function (options) {
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

            this.handleOptions(options);
            
            this.init();
            
            return this;
        },
        
        init: function() {
            this.setupLayout().render();
            this.createData();
            this.handleDeferreds();            
        },
        
        createData: function () {
            this.select_type = new RegistrationSelectTypeModel();
        },
        
        handleDeferreds: function() {
            var controller = this;
            
            controller.setupSelectTypeView();
            
            function registerWithFacebook() {
                controller.initRegisterFacebook();
            }           
            Channel('registration-with-facebook').subscribe(registerWithFacebook);
            
            function registerWithEmail() {
                controller.initRegisterEmail();
            }
            Channel('registration-with-email').subscribe(registerWithEmail);
        },
        
        refreshPage: function() {
            var position;
            
            if (this.selectTypeView) {
                $(this.selectTypeView.destination).html('');
                position = $.inArray(this.selectTypeView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.registerFacebookView) {
                $(this.registerFacebookView.destination).html('');
                position = $.inArray(this.registerFacebookView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.registerEmailView) {
                $(this.registerEmailView.destination).html('');
                position = $.inArray(this.registerEmailView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
        },
        
        setupSelectTypeView: function() {
            this.selectTypeView = new RegistrationSelectTypeView({
                model: this.select_type,
                name: "Select Registration Type",
                destination: "#main-content"
            });

            this.scheme.push(this.selectTypeView);
            this.layout.render();
        },
        
        initRegisterFacebook: function() {
            var controller = this;
            
            this.refreshPage();
            this.register_facebook = new RegistrationFacebookModel();
            this.register_facebook.fetch();
            
            $.when(this.register_facebook.request).done(function () {
                controller.setupRegisterFacebookView();
            });
        },
        
        setupRegisterFacebookView: function() {
            this.registerFacebookView = new RegistrationFacebookView({
                model: this.register_facebook,
                name: "Registration with Facebook",
                destination: "#main-content"
            });

            this.scheme.push(this.registerFacebookView);
            this.layout.render();
        },
        
        initRegisterEmail: function() {
            var controller = this;
            
            this.refreshPage();
            this.register_email = new RegistrationEmailModel();
            
            controller.setupRegisterEmailView();            
        },
        
        setupRegisterEmailView: function() {
            this.registerEmailView = new RegistrationEmailView({
                model: this.select_type,
                name: "Registration with Email Address",
                destination: "#main-content"
            });

            this.scheme.push(this.registerEmailView);
            this.layout.render();
        },
        
        
        
        setupLayout: function () {
            var pageLayout;

            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
                template: pageLayoutTemplate,
                displayWhen: "ready"
            });
            this.layout = pageLayout;

            return this.layout;
        }

    });

    return RegistrationController;
});
