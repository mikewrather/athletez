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
				searchPage: 0,
				initialize : function(options) {
					Channel('load:css').publish(cssArr);
					_.bindAll(this);
					this.handleOptions(options);
					this.scheme = [];
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
						'orderby' : 'random',
						'time' : 'DAY',
						'states_id' : '0',
						'searchtext' : '',
						'country_id' : '0'
					};
					
					this.menuValues = [
						{src : '.view-options-h .browse.select', target: '.view-link-h .option-heading-h', input: false, defaultValue: 'ORDER'},
     					{src: '.sports-option-h .sport.select', target: '.sport-link-h .option-heading-h', input: false, defaultValue: 'ALL SPORTS'},
     					{src: '#city', target: '.location-link-h .option-heading-h', input: true, defaultValue: 'ANYWHERE'}
					];
					
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
		        	_.each(this.genderTypes, this.setupSportListView);
		        	_.each(['top-rated', 'search-result'], this.setupImageListView);
		        	this.setupLocationDDView();
		        	this.setupScheme();
		        	this.setupLayout().render();
		        	if(this.cityView) this.cityView.initPlugin();
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
		        		options = {'orderby': str.value};
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
					//console.log(item);
					if(item.label)
						$("#city").val(item.label);
						
					var options = {'cities_id':item.id, 'states_id': item.state_id, 'country_id': item.country_id};
					this.transitionView(options);
				},
				
				resetFilter: function(page) {
					
					for(var i in this.menuValues) {
						if(this.menuValues[i].input) {
							$(this.menuValues[i].src).val("");
						} else {
							$(this.menuValues[i].src).removeClass("select");
						}
					}
					
					switch(page) {
						case 'view':
							for(var i in this.viewOptions) {
								if(this.viewOptions[i] == "orderby") {
									$(".dropdown-menu .browse").removeClass('select');
									this.urlOptions[this.viewOptions[i]] = "random";
								} else if(i == "time")
									this.urlOptions[this.viewOptions[i]] = "today";
							}
						break;
						case 'sports':
							for(var i in this.sportsOptions) {
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
					this.searchPage = 0;
					this.searchView(options);
				},
				
				
				searchView: function(options) {
					var _self = this, viewName = 'search-result',
					    imageList = this.collections[viewName];
					    controller = this;

					imageList.url = this.url(options);
					imageList.fetch();
					
					$.when(imageList.request).done(function() {
						if(imageList.length < 12)
							$(".right-arrow-page-h").addClass("disable-arrow-link");
						else
							$(".right-arrow-page-h").removeClass("disable-arrow-link");							
							
						if(_self.searchPage == 0)
							$(".left-arrow-page-h").addClass("disable-arrow-link");
						else
							$(".left-arrow-page-h").removeClass("disable-arrow-link");														
							
						var view = new ImageListView({
							collection : imageList,
							name : viewName,
							destination : '#'+viewName
						});
						controller.layout.transition(viewName, view);
					});
					for(var i in this.menuValues) {
						if(this.menuValues[i].input) {
							var val = $(this.menuValues[i].src).val();
						} else {
							var val = $(this.menuValues[i].src).text();
						}
						
						if(val != '') {
							$(this.menuValues[i].target).html(val);
						} else {
							$(this.menuValues[i].target).html(this.menuValues[i].defaultValue);
						}
					}
				},
				
				bindCickEvents: function() {
					var _self = this;
					$(document).on("click", ".left-arrow-page-h", function() {
						_self.searchPage--;
						_self.searchView();
					});
					
					$(document).on("click", ".right-arrow-page-h", function() {
						_self.searchPage++;
						_self.searchView();
					});
					
					
					if(_self.searchPage == 0)
						$(".left-arrow-page-h").addClass("disable-arrow-link");
					else
						$(".left-arrow-page-h").removeClass("disable-arrow-link");	
					
					
				},
				
				url : function(options) {
					var base = this.baseUrl + '?offset='+this.searchPage+"&";
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
						num : '4'
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
					var stateListView,
					    stateViewName = 'state',
					    cityModel = new CityModel(),
					    cityViewName = 'city';
					
					this.cityView = new CityView({
						model : cityModel,
						name : cityViewName,
						destination : "#location .city"
					});
					
					this.cityView.render();
					
					this.sections[cityViewName] = this.cityView;
					this.meta.activeViews.push(cityViewName);
				},

				setupLayout : function() {
					var pageLayout;

					pageLayout = new LayoutView({
						scheme : this.scheme,
						destination : "#main",
						template : pageLayoutTemplate,
						displayWhen : "ready"
					});

					this.layout = pageLayout;
					this.bindCickEvents();
					return this.layout;
				}

			});

			return HomeController;
		});