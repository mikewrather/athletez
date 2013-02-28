// Hello Controller
// ---------------
// module as controller for 'hello' package
// Returns {HelloController} constructor

define([
        "require",
        "text!hello/templates/layout.html",
        "vendor",
        "controller",
        "models",
        "views",
        "hello/models/welcome",
        "hello/views/welcome",
        "hello/models/about",
        "hello/views/about",
        "utils"
        ],
function (require, layoutTemplate) {

    var HelloController,
        vendor = require("vendor"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        WelcomeModel = require("hello/models/welcome"),
        WelcomeSectionView = require("hello/views/welcome"),
        AboutModel = require("hello/models/about"),
        AboutSectionView = require("hello/views/about"),
        utils = require("utils"),
        LayoutView = views.LayoutView,
        BaseModel = models.BaseModel,
        $ = vendor.$,
        _ = vendor._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/packages/hello/welcome.css"
        ];

    HelloController = Controller.extend(    {

        initialize: function (options) {
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

            this.handleOptions(options);
            this.setupSections();
            this.handleDeferreds();

            return this;
        },

        setupWelcomeSection: function () {
            var welcomeView, welcomeModel;

            welcomeModel = new WelcomeModel(this.params);

            welcomeView = new WelcomeSectionView({
                model: welcomeModel,
                name: "Welcome",
                destination: '#greeting'
            });

            debug.log("hello controller setup welcomeView");
            this.sections["Welcome"] = welcomeView;
        },

        setupAboutSection: function () {
            var aboutView, aboutModel,
                webservice = this.webServices.hello;

            aboutModel = new AboutModel(
                {id: 101}, // attributes
                {urlRoot: webservice} // options
            );
            aboutModel.request = aboutModel.fetch();

            aboutView = new AboutSectionView({
                model: aboutModel,
                name: "About",
                destination: '#about'
            });

            debug.log("hello controller setup aboutView");
            this.sections["About"] = aboutView;
        },

        setupSections: function () {
            var params = this.params;

            if (params && params.name && _.isString(params.name)) {
                this.setupWelcomeSection();
                this.meta.activeViews.push("Welcome");
            }
            this.setupAboutSection();
            this.meta.activeViews.push("About");
        },

        setupScheme: function () {
            var i, params = this.params;

            for (i = 0; i < this.meta.activeViews.length; i++) {
                this.scheme.push(this.sections[this.meta.activeViews[i]]);
            };
        },

        setupLayout: function () {
            var helloLayout;

            helloLayout = new LayoutView({
                scheme: this.scheme,
                destination: "body",
                // require a html page layout template with text! prefix
                template: layoutTemplate,
                displayWhen: "ready"
            });
            this.layout = helloLayout;

            return this.layout;
        },

        handleDeferreds: function () {
            var controller = this,
                aboutRequest = (this.sections["About"]) ? this.sections["About"].model.request : null;

            $.when(aboutRequest).then(function () {
                controller.setupScheme();
                controller.setupLayout().render();
            });
        },

        handleOptions: function (options) {
            if (options.params) {
                this.params = options.params;
            }
            Controller.prototype.handleOptions(options);
        }

    });

    return HelloController;
});