//Menu View

define(
		[ 'require', 'text!pages/home/templates/menu.html', 'facade', 'views' ],
		function(require, menuTemplate) {

			var MenuView, facade = require('facade'), views = require('views'), SectionView = views.SectionView;

			MenuView = SectionView.extend({

				id : 'menu',

				events : {
					"blur #search" : "updateSearch",
					"focus #search": "hideDropdown",
					"click .searchBtn" : "changeBaseUrl",
					"click .dropdown-menu > li > a" : "select",
					"click .dd" : "doNothing",
					//"click .menu" : "toggle",
					"click .menu-link-h" : "showMenuDropdown",
					'click .views-reset-btn-h' : 'resetView',
					'click .sport-reset-btn-h' : 'resetSport',
					'click .location-reset-btn-h' : 'resetLocation'
					//'change #state-list' : 'stateListChange'
				},
				
				
				demoSelect: function() {
					
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
				intialize : function(options) {
					SectionView.prototype.initialize.call(this, options);
					console.log("intializwe menu view ----------->>>");
					
					
					//this.$el.find('.demo-select').html(DropDown.$el);
				},
				
				updateSearch : function(e) {
					Channel('textChanged').publish($(e.target).val());
				},
				
				changeBaseUrl : function(e) {
					var target = $(e.currentTarget);
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
						
						try{
                     		 console.log($(e.target).parents("#views").length);
                		}
                		catch(e){
                   			console={},
                    		console.log=function(e){}
        
                		}
						
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
					var ret = {
							'submenu' : targetClass,
							'value' :  $(target).data('id') || $(target).text()
							};
					Channel('viewFilterChanged').publish(ret);
					debug.log(ret);
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

					
					var data = this.model.toJSON();
					try{
						console.error(data.views);
					}
					catch(e){
						console={},
						console.log=function(e){}
					}
					

				}

			});

			return MenuView;
		});