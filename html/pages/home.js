//Home Controller

define(
		[ "require", 
		  "text!pages/home/templates/layout.html",
		  "facade",
		  "controller",
		  "models",
		  "views",
		  "utils",
		  "pages/home/models/menu.js",
		  "pages/home/views/menu.js",
		  "pages/home/views/image.js",
		  "pages/home/views/image-list.js",
		  "pages/home/collections/search.js"],
		function(require, pageLayoutTemplate) {

			var HomeController,
				facade = require("facade"),
				Controller = require("controller"),
				models = require("models"),
				views = require("views"),
				utils = require("utils"),
				
				SearchCollection = require('pages/home/collections/search.js'),
				MenuModel = require("pages/home/models/menu.js"),
				MenuView = require("pages/home/views/menu.js"),
				
				LayoutView = views.LayoutView,
				$ = facade.$,
				_ = facade._,
				Channel = utils.lib.Channel,
				cssArr = [ "/pages/home/home.css" ];

			HomeController = Controller.extend({

				initialize : function(options) {
					Channel('load:css').publish(cssArr);

					_.bindAll(this);

					this.handleOptions(options);

					this.init();

					return this;
				},

				init : function() {
					this.setupLayout().render();
					this.createData();
					this.handleDeferreds();
				},

				createData : function() {
					this.searchresults = new SearchCollection();
					//debug.log(this.searchresults.url);
					this.searchresults.fetch();
					//debug.log(this.searchresults);
				},

				handleDeferreds : function() {
					// TODO after creating building blocks, write this function
					var controller = this;
					this.setupMenuView();
					$.when(this.searchresults.request).done(function(){
						controller.setupResultView();
					});
				},

				setupTopRatedView : function() {

				},

				setupResultView : function() {
					var imageListView;
					
					imageListView = new ImageListView({
						collection : this.searchresults,
						view : ImageView,
						tagName : 'div'
					});
					
					this.scheme.push(imageListView);
					this.layout.render();
				},

				setupMenuView : function() {
					var menuView;
					
					menuModel = new MenuModel();
					
					menuView = new MenuView({
						model : menuModel,
						name : "Menu",
						destination : "#menu"
					});

					this.scheme.push(menuView);
					this.layout.render();
				},

				setupLayout : function() {
					var pageLayout;

					pageLayout = new LayoutView({
						scheme : this.scheme,
						destination : "#main",
						template : pageLayoutTemplate,
						displayWhen : "ready"
					});

					console.log("Home page setupLayout Results: ", pageLayout);
					this.layout = pageLayout;

					return this.layout;
				}

			});

			return HomeController;
		});