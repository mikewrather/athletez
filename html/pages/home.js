//Home Controller

define(
		[ "require", 
		  "text!pages/home/templates/layout.html", 
		  
		  "facade",
		  "controller", 
		  "models", 
		  "views", 
		  "utils",

		  //models
		  "pages/home/models/menu",
		  "packages/location/models/city",

		  //collections
		  "packages/sport/collections/sports",
		  "pages/home/collections/image",
		  "location/collections/states",

		  //views
		  "pages/home/views/menu",
		  "pages/home/views/image-list",
		  "pages/home/views/state-list",
		  "packages/sport/views/sport-list",
		  "packages/location/views/city"],
		function(require, pageLayoutTemplate) {

			var HomeController, 
				facade = require("facade"), 
				Controller = require("controller"), 
				models = require("models"), 
				views = require("views"), 
				utils = require("utils"),
				
				//collections
				SportList = require('packages/sport/collections/sports'), 
				StateList = require('location/collections/states'),
				ImageList = require('pages/home/collections/image'), 
	
				//models
				MenuModel = require("pages/home/models/menu"), 
				CityModel = require('packages/location/models/city'), 
				
				//views
				MenuView = require("pages/home/views/menu"), 
				ImageListView = require("pages/home/views/image-list"),
				StateListView = require('pages/home/views/state-list'), 
				SportListView = require('packages/sport/views/sport-list'), 
				CityView = require('packages/location/views/city'), 
				LayoutView = views.LayoutView, 
				
				$ = facade.$, 
				_ = facade._, 
				Channel = utils.lib.Channel, 
				cssArr = [ base_url + 'pages/home/home.css' ];

			HomeController = Controller.extend({

				initialize : function(options) {
					Channel('load:css').publish(cssArr);

					_.bindAll(this);

					this.handleOptions(options);
					this.genderTypes = ['boys', 'girls', 'both'];
					this.init();
					
					return this;
				},

				init : function() {
					this.initUrlOptions();
					this.createData();
					this.handleDeferreds();
				},
				
				initUrlOptions : function() {
					this.searchUrls = ['/api/video/search', 
					                   '/api/image/search', 
					                   '/api/user/search', 
					                   '/api/game/search'];
					this.baseUrl = this.searchUrls[1];
					this.urlOptions = {
						'sports_id' : '0',
						'cities_id' : '0',
						'orderby' : 'votes',
						'time' : 'DAY',
						'states_id' : '0',
						'searchtext' : '',
						'country_id' : '0'
					};
					
					this.viewOptions = ['orderby', 'time'];
					this.sportsOptions = ['sports_id'];
					this.locationOptions = ['cities_id', 'states_id', 'country_id'];
				},
				
				addSubscribers : function() {
					var _self = this;
					_.each(this.genderTypes, function(viewName){
						Channel('sportChanged:'+this.collections[viewName].cid).subscribe(this.changeSportFilter);						
					}, this);
					Channel('cityChanged:'+ this.sections['city'].id).subscribe(this.changeCityFilter);
					///alert("add");
					//routing.off("stateChanged");
					routing.on("stateChanged", function(id) {
						_self.changeStateFilter(id);
					});
					
					//Channel('stateChanged:'+ this.collections['state'].cid).subscribe(this.changeStateFilter);
					Channel('textChanged').subscribe(this.updateText);
					Channel('viewFilterChanged').subscribe(this.changeViewFilter);
					Channel('baseUrlChanged').subscribe(this.updateBaseUrl);
					Channel('resetFilter').subscribe(this.resetFilter);
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
		        	_.each(this.genderTypes, this.setupSportListView);
		        	_.each(['top-rated', 'search-result'], this.setupImageListView);
		        	this.setupScheme();
		        	this.setupLayout().render();
		        },
		        
		        updateBaseUrl : function(urlNumber) {
		        	this.baseUrl = this.searchUrls[urlNumber];
		        	this.transitionView();
		        },
		        
		        updateText : function(text) {
		        	this.urlOptions.searchtext = text;
		        	this.transitionView();
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
		        	console.log(model);
		        	var options = {'sports_id': model.attributes.payload.sport_id};
		        	this.transitionView(options);
		        },
		        
		        changeStateFilter : function(id) {
		        	var options = {'states_id' : id};
		        	this.transitionView(options);
		        },
		        
				changeCityFilter : function(item) {
					var options = {'city_id':item.id, 'states_id': item.state_id, 'country_id': item.country_id};
					console.log(options);
					this.transitionView(options);
				},
				
				resetFilter: function(page) {
					switch(page) {
						case 'view':
							for(var i in this.viewOptions) {
								if(i == "order_by")
									this.urlOptions[this.viewOptions[i]] = "voter";
								else if(i == "time")
									this.urlOptions[this.viewOptions[i]] = "today";
							}
						break;
						case 'sports':
							for(var i in this.sportsOptions) {
								console.log(this.sportsOptions[i]);
								console.log(this.urlOptions);
								this.urlOptions[this.sportsOptions[i]] = "0";
							}
						break;
						case 'location':
							for(var i in this.locationOptions) {
								this.urlOptions[this.locationOptions[i]] = "0";
							}
						break;
					}
					this.transitionView();
				},
				
				transitionView : function(options) {
					var viewName = 'search-result',
					    imageList = this.collections[viewName];
					    controller = this;
		
					imageList.url = this.url(options);
					imageList.fetch();

					$.when(imageList.request).done(function() {
						var view = new ImageListView({
							collection : imageList,
							name : viewName,
							destination : '#'+viewName
						});
						controller.layout.transition(viewName, view);
					});
				},
				
				url : function(options) {
					var base = this.baseUrl + '?';
					_.extend(this.urlOptions, options);
					var tail = [];
					 $.each(this.urlOptions, function(key, value) {
						    tail.push(key + "=" + encodeURIComponent(value));
						  });
					return base + tail.join('&');
				},
				
				createData : function() {
					var collections = this.collections = {};
					collections['search-result'] = new ImageList([], {
						url : this.url(),
						num : '12'
					});
					collections['state'] = new StateList(); 
					collections['top-rated'] = new ImageList([], {
						url : '/api/user/search',
						num : '3'
					});
					_.each(this.genderTypes, function(name) {
						collections[name] = new SportList([], {name : name});
					});
					//console.log(collections);
				},

				handleDeferreds : function() {
					var controller = this;
					var requests = [];
					_.each(this.collections, function(value, key, list){
							requests.push(value.fetch());
					});
					$.when.apply($, requests).done(controller.initSections, controller.addSubscribers);
				},

				setupImageListView : function(viewName) {
					var imageListView;

					imageListView = new ImageListView({
						collection : this.collections[viewName],
						name : viewName,
						destination : '#'+viewName
					});
					
					imageListView.render();
					this.sections[viewName] = imageListView;
					this.meta.activeViews.push(viewName);					
				},
				
				setupSportListView : function(viewName) {
					var sportListView;
					 
					sportListView = new SportListView({
						collection : this.collections[viewName],
						name : viewName,
						id : viewName,
						destination : '#sport #'+ viewName
					});

					sportListView.render();
					this.sections[viewName] = sportListView;
					this.meta.activeViews.push(viewName);
				},

				setupMenuView : function() {
					var menuModel = new MenuModel(),
						menuView,
						viewName = 'menu';

					menuView = new MenuView({
						model : menuModel,
						name : viewName,
						destination : '#'+viewName
					});
					
					menuView.render();
					this.sections[viewName] = menuView;
					this.meta.activeViews.push(viewName);
				},

				setupLocationDDView : function() {
					var stateListView, cityView,
					    stateViewName = 'state',
					    cityModel = new CityModel(),
					    cityViewName = 'city';
					
					//stateListView = new StateListView({
					//	collection : this.collections[stateViewName],
					//	name : stateViewName,
					//	destination : "#location .state"
					//});

					cityView = new CityView({
						model : cityModel,
						name : cityViewName,
						destination : "#location .city"
					});
					
					//stateListView.render();
					cityView.render();
					this.sections[cityViewName] = cityView;
					this.meta.activeViews.push(cityViewName);
					//this.sections[stateViewName] = stateListView;
					//this.meta.activeViews.push(stateViewName);
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