//Home Controller

define([
	"require",
	"text!/home/templates/layou.html"
	"facade",
	"controller",
	"models",
	"views",
	"utils"
	], function(require, pageLayoutTemplate) {
	
	var HomeController,
		facade = require("facade"),
		Controller = require("controller"),
		models = require("models"),
		views = require("views"),
		utils = require("utils"),
		
		LayoutView = views.LayoutView,
		$ = facade.$,
		_ = facade,
		Channel = utils.lib.Channel,
		cssArr = [
		    "/pages/home/home.css"
		];
	
	HomeController = Controller.extend({
		
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
        
        createData: function() {
        	//TODO after creating building blocks, write this function
        },
        
        handleDeferreds: function() {
        	//TODO after creating building blocks, write this function
        },
        
        setupLayout: function () {
            var pageLayout;

            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
                template: pageLayoutTemplate,
                displayWhen: "ready"
            });

	        console.log("Home page setupLayout Results: ",pageLayout);
            this.layout = pageLayout;

            return this.layout;
        }
        
	});
	
	return HomeController;
	}