//Menu View

define(
		[ 'require', 'text!pages/home/templates/menu.html', 'facade', 'views', 'jquery.slimscroll', 'common/models/get-city' ],
		function(require, menuTemplate) {

			var MenuView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, getCity = require('common/models/get-city');

			MenuView = SectionView.extend({

				id : 'menu',
				events : {
					"blur #search" : "updateSearch",
					"focus #search": "hideDropdown",
					"click .restype" : "changeBaseUrl",
					"click .dropdown-menu-alias > li > a" : "select",
					"click .dd" : "doNothing",
					"click .menu-link-h" : "showMenuDropdown",
					'click .views-reset-btn-h' : 'resetView',
					'click .sport-reset-btn-h' : 'resetSport',
					'click .location-reset-btn-h' : 'resetLocation',
					'click .reset-all-btn-h' : 'resetAll',
					"click .reset-option-btn-h": "resetIndividual"
				},
				
				demoSelect: function() { },
				
				resetIndividual: function(e) {
					var fn = $(e.currentTarget).data("type");
					$(e.currentTarget).addClass("hide");
					if(fn && _.isFunction(this[fn])) this[fn]();
				},
				
				restype: function() {
					Channel('resetIndividual').publish("restype");
				},
				
				sport: function() {
					Channel('resetIndividual').publish("sports");
				},
				
				city: function() {
					Channel('resetIndividual').publish("location");
				},
				
				views: function() {
					Channel('resetIndividual').publish("view");
				},

				resetAll: function() {
					this.resetView();
					this.resetLocation();
					this.resetSport();
				},
				
				resetView: function() {
					var page = "view";
					Channel('resetFilter').publish(page);
					this.$el.find(".menu-detail-h").hide();
					this.$el.find('.reset-view-area-h ul li a.select, .reset-view-area-h ul li.select').removeClass('select');
				},
				
				resetSport: function() {
					var page = "sports";
					Channel('resetFilter').publish(page);
					this.$el.find(".menu-detail-h").hide();
					this.$el.find('.reset-sport-area-h ul li a.select, .reset-sport-area-h ul li.select').removeClass('select');
				},
				
				resetLocation: function() {
					var page = "location";
					Channel('resetFilter').publish(page);
					this.$el.find('#city').val('');
					//var s = document.getElementById('state-list');
					//s.selectedIndex = 0;
					this.$el.find(".menu-detail-h").hide();
					this.$el.find('.reset-location-area-h ul li a.select, .reset-location-area-h ul li.select').removeClass('select');
				},

				template : menuTemplate,
				initialize : function(options) {
					SectionView.prototype.initialize.call(this, options);
					this.options = (options.options)?options.options:{};
				},
				
				updateSearch : function(e) {
					Channel('textChanged').publish($(e.target).val());
				},
				
				changeBaseUrl : function(e) {
					var target = $(e.currentTarget);
					this.$el.find(".icons").each(function() {
						$(this).removeClass($(this).data("selected-class"));
					});
					target.addClass(target.data("selected-class"));
					var num = target.data("number");
					Channel('baseUrlChanged').publish(num);
				},
				
				stateListChange: function(e) {
					var target = $(e.currentTarget).val();
					console.log(target);
					var num = target.data("id");
					routing.trigger('stateChanged', num);
					//Channel('baseUrlChanged').publish(num);
				},
				
				doNothing : function(e) {
					e.preventDefault();
					e.stopPropagation();
				},
				
				hideDropdown: function() {
					this.$el.find(".menu-detail-h").hide();
				},
				
				hideAllDropdowns: function() {
					var _self = this;
					$("html, #search").click(function(e) {
						if(!$(e.target).parents(".menu").length)
							_self.hideDropdown();
					});
				},
				
				// show and hide dropdown
				showMenuDropdown: function(e) {
					var $target = $(e.currentTarget).next();
					if($target.css('display') == "none") {
						this.$el.find(".menu-detail-h").hide();
						$target.show();
					} else {
						$target.hide();
					}
				},
				
				select : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var target = $(e.currentTarget);
					var targetClass = target.attr('class');
					$('.dropdown-menu > li > a'+'.'+targetClass).removeClass('select');
					targetClass = target.attr('class').split(' ')[0];
					$(target).addClass('select');
					$(".menu-detail-h").hide();
					this.$el.find(".reset-option-btn-h[data-type="+$(target).parents(".menu").attr("id")+"]").removeClass("hide");
					
					var ret = {
						'submenu' : targetClass,
						'value' :  $(target).data('id') || $(target).text()
					};
					Channel('viewFilterChanged').publish(ret);
				},
				
				toggle : function(e) {
					e.preventDefault();
					var target = $(e.currentTarget);
					var off = $(target).offset();
					var off_top = off.top + 40;
					var off_left = off.left + 10;
					var selector = target.attr('id');
					selector = '#'+ selector + ' .dd';
					if($(selector).attr('class') === 'dd open') {
						$(selector).hide().removeClass('open');
					} else {
						$('.open').hide().removeClass('open');
						$(selector).css('top', off_top).css('left', off_left);
						$(selector).show();
						$(selector).addClass('open');
					}
				},
				
				afterRender: function() {
					this.hideAllDropdowns();
					var self=this;
					var trySlimscroll = setInterval(function(){
						try {
							$(self.el).find('.sport-list').slimScroll();
							clearInterval(trySlimscroll);
						} catch(ex) {}
					},1000);
					
					var data = this.model.toJSON();
					// show option seleted
					
					if(this.options.searchtext) {
						this.$el.find("#search").val(this.options.searchtext);
					}
					
					if(this.options.cities_id || this.options.states_id || this.options.country_id) {
						
						// get location name
						var cityModel = new getCity();
						cityModel.cityId = this.options.cities_id || this.options.states_id || this.options.country_id;
						cityModel.fetch();
						
						$.when(cityModel.request).done(function() {
							self.$el.find(".reset-option-btn-h[data-type=city]").removeClass("hide");
							var name = cityModel.get("payload").name;
							if(cityModel.get("payload").states_obj)
								name +=", "+cityModel.get("payload").states_obj.name;

							if(cityModel.get("payload").county)
								name +=", "+cityModel.get("payload").county.name;
									
							self.$el.find(".location-link-h .option-heading-h").html(name);
						});
					}

					if(this.options.base) {
						var $ob = this.$el.find(".restype[data-number="+this.options.base+"]");
						$ob.addClass($ob.data("selected-class"));
					}
					
					if(this.options.sports_id && this.options.sports_id != "0") {
						self.$el.find(".reset-option-btn-h[data-type=sport]").removeClass("hide");
					}
					
					if(this.options.orderby != "random") {
						self.$el.find(".reset-option-btn-h[data-type=views]").removeClass("hide");						
					}
					
					if(this.options.orderby) {
						var $this = this.$el.find("a.browse[data-id="+this.options.orderby+"]");
						$this.parents("ul").find("a").removeClass("select");					
						$this.addClass("select");
						var interval = setInterval(function() {
							if($("#views .view-link-h .option-heading-h").length) {
								clearInterval(interval);
								if($this.text())
									$("#views .view-link-h .option-heading-h").html($this.text());
							}
						} , 500);
					}
				}
			});

			return MenuView;
		});