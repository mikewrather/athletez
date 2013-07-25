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
					this.searchUrls = ['/api/video/search', '/api/image/search', '/api/user/search', '/api/game/search'];
					this.baseUrl = this.searchUrls[1];
					this.urlOptions = {
						'sports_id' : '0',
						'city_id' : '0',
						'order_by' : 'votes',
						'time' : 'today',
						'state_id' : '0',
						'searchtext' : ''
					};
					this.init();
					return this;
				},

				init : function() {
					this.createData();
					this.handleDeferreds();
				},
				
				addSubscribers : function() {
					Channel('cityChanged:'+ this.sections["city"].id).subscribe(this.changeCityFilter);
					Channel('viewFilterChanged').subscribe(this.changeViewFilter);
					Channel('stateChanged:'+ this.locationStateList.cid).subscribe(this.changeStateFilter);
					Channel('sportChanged:'+this.BoysSportList.cid).subscribe(this.changeSportFilter);
					Channel('sportChanged:'+this.GirlsSportList.cid).subscribe(this.changeSportFilter);
					Channel('sportChanged:'+this.CommonSportList.cid).subscribe(this.changeSportFilter);
					Channel('textChanged').subscribe(this.updateText);
					Channel('baseUrlChanged').subscribe(this.updateBaseUrl);
				},
				
				setupScheme: function () {
		            var i, params = this.params;

		            for (i = 0; i < this.meta.activeViews.length; i++) {
		                this.scheme.push(this.sections[this.meta.activeViews[i]]);
		            };
		        },
		        
		        initSections : function () {
		        	this.setupMenuView();
		        	this.setupLocationDDView();
		        	this.setupSportDDView(this.CommonSportList, 'Both', '#sport #both');
		        	this.setupSportDDView(this.GirlsSportList, 'Girls',	'#sport #girls');
		        	this.setupSportDDView(this.BoysSportList, 'Guys', '#sport #boys');
		        	this.setupTopRatedView();
		        	this.setupResultView();
		        	this.setupScheme();
		        	this.setupLayout().render();
		        },
		        
		        updateBaseUrl : function(urlNumber) {
		        	this.baseUrl = this.searchUrls[urlNumber];
		        	this.transitionView();
		        },
		        
		        updateText : function(text) {
		        	this.urlOptions.searchtext = text;
		        },
		        
		        changeViewFilter : function(str) {
		        	if(str.submenu === 'browse') {
		        		options = {'order_by': str.value};
		        	} else {
		        		options = {'time' : str.value};
		        	}
		        	this.transitionView(options);
		        },
		        
		        changeSportFilter : function(model) {
		        	debug.log(model);
		        	debug.log(model.attributes.payload.sport_id);
		        	var options = {'sports_id': model.attributes.payload.sport_id};
		        	this.transitionView(options);
		        },
		        
		        changeStateFilter : function(model) {
		        	var options = {'state_id' : model.attributes.payload.id};
		        	this.transitionView(options);
		        },
		        
				changeCityFilter : function(item) {
					var options = {'city_id':item.id};
					this.transitionView(options);
				},
				
				transitionView : function(options) {
					console.log(options);
					this.homeImageList.url = this.url(options);
					this.homeImageList.fetch();
					var controller = this;
					$.when(this.homeImageList.request).done(function() {
						var view = new HomeImageListView({
							collection : controller.homeImageList,
							name : "search-result",
							destination : "#search-results"
						});
						controller.layout.transition("search-result", view);
					});
				},
				
				url : function(options) {
					var relativeUrl = this.baseUrl;
					_.extend(this.urlOptions, options);
					var urlOptions = this.urlOptions;
					relativeUrl = relativeUrl + '?' + 'sports_id='
							+ urlOptions.sports_id + '&city_id='
							+ urlOptions.city_id + '&order_by='
							+ urlOptions.order_by + '&time='
							+ urlOptions.time + '&state_id='
							+ urlOptions.state_id + '&searchtext='
							+ urlOptions.searchtext;
					return relativeUrl;
				},
				
				createData : function() {
					this.homeImageList = new HomeImageList([], {
						url : this.url(),
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
					var requests = this.requests = [];
					requests.push(this.topratedImageList.fetch());
					requests.push(this.homeImageList.fetch());
					requests.push(this.locationStateList.fetch());
					requests.push(this.BoysSportList.fetch());
					requests.push(this.CommonSportList.fetch());
					requests.push(this.GirlsSportList.fetch());
				},

				handleDeferreds : function() {
					var controller = this;
					$.when.apply($, this.requests).done(controller.initSections, controller.addSubscribers);
				},

				setupSportDDView : function(c, n, d) {
					var sportListView;

					sportListView = new SportListView({
						collection : c,
						name : n,
						id : n,
						destination : d
					});

					sportListView.render();
					this.sections[n] = sportListView;
					this.meta.activeViews.push(n);
				},

				setupTopRatedView : function() {
					var topratedImageListView;

					topratedImageListView = new HomeImageListView({
						collection : this.topratedImageList,
						name : "top-rated",
						destination : "#top-rated"
					});
					
					topratedImageListView.render();
					this.sections["top-rated"] = topratedImageListView;
					this.meta.activeViews.push("top-rated");
				},

				setupResultView : function() {
					var homeImageListView;

					homeImageListView = new HomeImageListView({
						collection : this.homeImageList,
						name : "search-result",
						destination : "#search-results"
					});
					
					homeImageListView.render();
					this.sections["search-result"] = homeImageListView;
					this.meta.activeViews.push("search-result");					
				},

				setupMenuView : function() {
					var menuModel = new MenuModel(),
						menuView;

					menuView = new MenuView({
						model : menuModel,
						name : "menu",
						destination : "#menu"
					});
					
					menuView.render();
					this.sections["menu"] = menuView;
					this.meta.activeViews.push("menu");
				},

				setupLocationDDView : function() {
					var homeStateListView;

					homeStateListView = new HomeStateListView({
						collection : this.locationStateList,
						name : 'state',
						destination : "#location .state"
					});

					var cityModel = new CityModel();

					var cityView = new CityView({
						model : cityModel,
						name : "city",
						destination : "#location .city"
					});
					
					homeStateListView.render();
					cityView.render();
					this.sections["city"] = cityView;
					this.meta.activeViews.push("city");
					this.sections["state"] = homeStateListView;
					this.meta.activeViews.push("state");
				},

				setupLayout : function() {
					var pageLayout;

					pageLayout = new LayoutView({
						scheme : this.scheme,
						destination : "#main",
						template : pageLayoutTemplate/*,
						displayWhen : "ready"*/
					});

					this.layout = pageLayout;

					return this.layout;
				}

			});

			return HomeController;
		});