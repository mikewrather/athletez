//Home Controller

define(
		[ "require", "text!pages/home/templates/layout.html", "facade",
				"controller", "models", "views", "utils",
				"pages/home/models/menu", "pages/home/views/menu",
				"pages/home/views/image-list", "pages/home/collections/image",
				"packages/location/collections/states.js",
				"packages/location/models/city",
				"packages/location/views/city", "pages/home/views/state-list",
				"sport/collections/sports", "packages/sport/views/sport-list" ],
		function(require, pageLayoutTemplate) {

			var HomeController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"),

			HomeStateListView = require('pages/home/views/state-list'), LocationStateList = require('packages/location/collections/states.js'), HomeImageList = require('pages/home/collections/image'), MenuModel = require("pages/home/models/menu"), MenuView = require("pages/home/views/menu"), HomeImageListView = require("pages/home/views/image-list"),

			SportListView = require('packages/sport/views/sport-list'), SportList = require('sport/collections/sports'), CityModel = require('packages/location/models/city'), CityView = require('packages/location/views/city'), LayoutView = views.LayoutView, $ = facade.$, _ = facade._, Channel = utils.lib.Channel, cssArr = [ base_url
					+ "pages/home/home.css" ];

			HomeController = Controller.extend({

				initialize : function(options) {
					Channel('load:css').publish(cssArr);

					_.bindAll(this);

					this.handleOptions(options);

					this.init();
					this.urlOptions = {
						'states_id' : '',
						'sports_id' : '0',
						'order_by' : 'votes',
						'states_id' : ''
					};
					return this;
				},

				init : function() {
					this.setupLayout().render();
					this.createData();
					this.handleDeferreds();
				},

				createData : function() {
					// var imageListUrl = this.url();
					this.homeImageList = new HomeImageList([], {
						url : '/api/image/search',
						num : '12'
					});
					this.locationStateList = new LocationStateList(); 
					this.topratedImageList = new HomeImageList([], {
						url : '/api/user/search',
						num : '3'
					});
					this.BoysSportList = new SportList([], {
						url : '/api/sport/listall?male=1'
					});
					this.GirlsSportList = new SportList([], {
						url : '/api/sport/listall?female=1'
					});
					this.CommonSportList = new SportList([], {
						url : '/api/sport/listall?male=1&female=1'
					});
					this.topratedImageList.fetch();
					this.homeImageList.fetch();
					this.locationStateList.fetch();
					this.BoysSportList.fetch();
					this.GirlsSportList.fetch();
					this.CommonSportList.fetch();
				},

				handleDeferreds : function() {
					// TODO after creating building blocks, write this function
					var controller = this;
					this.setupMenuView();
					$.when(this.locationStateList.request).done(function() {
						controller.setupDropDownMenuView();
						Channel('rendered').publish();
					});
					$.when(this.homeImageList.request).done(function() {
						controller.setupResultView();
					});
					$.when(this.topratedImageList.request).done(function() {
						controller.setupTopRatedView();
					});
					$.when(this.BoysSportList.request).done(
							function() {
								controller.setupSportDDView(
										controller.BoysSportList, 'Guys',
										'#sport #boys');
							});
					$.when(this.GirlsSportList.request).done(
							function() {
								controller.setupSportDDView(
										controller.GirlsSportList, 'Girls',
										'#sport #girls');
							});
					$.when(this.CommonSportList.request).done(
							function() {
								controller.setupSportDDView(
										controller.CommonSportList, 'Both',
										'#sport #both');
							});
					$.when(this.layout.deferred).done(function(){
						Channel('rendered').publish();
					});
				},

				url : function(options) {
					var relativeUrl = '/api/image/search';
					var urlOptions = this.urlOptions;
					urlOptions.states_id = options.states_id
							|| urlOptions.states_id;
					urlOptions.sports_id = options.sports_id
							|| urlOptions.sports_id;
					urlOptions.order_by = options.order_by
							|| urlOptions.order_by;
					this.urlOptions = urlOptions;
					relativeUrl = relativeUrl + '?' + 'states_id='
							+ urlOptions.states_id + '&' + 'sports_id='
							+ urlOptions.sports_id + '&' + 'order_by='
							+ urlOptions.order_by;
					return relativeUrl;
				},

				setupSportDDView : function(c, n, d) {
					debug.log('Setting up Sport DD View' + ': ' + n);
					debug.log(c); // collection
					debug.log(d); // destination
					var sportListView;

					sportListView = new SportListView({
						collection : c,
						name : n,
						id : n,
						destination : d
					});

					this.scheme.push(sportListView);
					this.layout.render();
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

					var menuModel = new MenuModel();

					menuView = new MenuView({
						model : menuModel,
						name : "Menu",
						destination : "#menu"
					});

					this.scheme.push(menuView);
					this.layout.render();
				},

				setupDropDownMenuView : function() {
					var homeStateListView;
					var cityView;

					homeStateListView = new HomeStateListView({
						collection : this.locationStateList,
						name : 'State',
						destination : "#location .state"
					});

					cityModel = new CityModel();

					cityView = new CityView({
						model : cityModel,
						name : "City",
						destination : "#location .city"
					});

					this.scheme.push(homeStateListView);
					this.scheme.push(cityView);
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

					//console.log("Home page setupLayout Results: ", pageLayout);
					this.layout = pageLayout;

					return this.layout;
				}

			});

			return HomeController;
		});