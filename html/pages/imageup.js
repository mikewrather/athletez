// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
    "require",
    "text!imageup/templates/basic.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",

    "imageup/models/basic",
    "imageup/collections/basics",

    "imageup/views/basic",
    
    ], function (require, pageLayoutTemplate) {

    var ImageController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        ImageBasicModel = require("imageup/models/basic"),
        ImageBasicList = require("imageup/collections/basics");
        
        ImageBasicView = require("imageup/views/basic"),
        
        
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/pages/imageup/imageup.css"
        ];

    ImageController = Controller.extend({

        initialize: function (options) {
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

            this.handleOptions(options);
            
            this.init();
            
            return this;
        },
        
        init: function() {
			console.log("Imagecontroller Init");
            this.setupLayout().render();
            this.showuploader();            
        },
        
        showuploader: function () {
            //this.basics = new ImageBasicModel();
            addBasicView = new ImageBasicView({
                name: "Add Media",
                destination: "body"
            });
            console.log("Imagecontroller Show");
            this.scheme.push(addBasicView);
            this.layout.render();
        },
		setupLayout: function () {
            var pageLayout;
			console.log("Imagecontroller Layout");
            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "body",
                template: pageLayoutTemplate,
                displayWhen: "ready"
            });
            this.layout = pageLayout;

            return this.layout;
        }


    });

    return ImageController;
});
