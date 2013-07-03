//Home Controller

define(
		[ "require", "text!pages/home/templates/layout.html", "facade",
				"controller", "models", "views", "utils",
				"pages/home/models/menu.js", "pages/home/views/menu.js",
				"pages/home/views/image-list.js",
				"pages/home/collections/image.js" ],
		function(require, pageLayoutTemplate) {

			var HomeController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"),

			HomeImageList = require('pages/home/collections/image.js'), MenuModel = require("pages/home/models/menu.js"), MenuView = require("pages/home/views/menu.js"), HomeImageListView = require("pages/home/views/image-list.js"),

			LayoutView = views.LayoutView, $ = facade.$, _ = facade._, Channel = utils.lib.Channel, cssArr = [ "/pages/home/home.css" ];

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
					this.homeImageList = new HomeImageList([], {
						url : '/api/user/search?orderby=followers',
						num : '12'
					});
					this.homeImageList.request = this.homeImageList.fetch();
					this.topratedImageList = new HomeImageList([], {
						url : '/api/user/search',
						num : '3'
					});
					this.topratedImageList.request = this.topratedImageList.fetch();
				},

				handleDeferreds : function() {
					// TODO after creating building blocks, write this function
					var controller = this;
					this.setupMenuView();
					$.when(this.homeImageList.request).done(function() {
						controller.setupResultView();
					});
					$.when(this.topratedImageList.request).done(function() {
						controller.setupTopRatedView();
					});
				},

				setupTopRatedView : function() {
					debug.log('set top-rated view');
					var topratedImageListView;

					topratedImageListView = new HomeImageListView({
						collection : this.topratedImageList,
						name : "top-rated",
						destination : "#top-rated"
					});

					this.scheme.push(topratedImageListView);
					this.layout.render();
				},

				setupResultView : function() {
					debug.log('set search result view');
					var homeImageListView;

					homeImageListView = new HomeImageListView({
						collection : this.homeImageList,
						name : "search-result",
						destination : "#search-results"
					});

					this.scheme.push(homeImageListView);
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