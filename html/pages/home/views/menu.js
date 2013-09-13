//Menu View

define(
		[ 'require', 'text!pages/home/templates/menu.html', 'facade', 'views' ],
		function(require, menuTemplate) {

			var MenuView, facade = require('facade'), views = require('views'), SectionView = views.SectionView;

			MenuView = SectionView.extend({

				id : 'menu',

				events : {
					"input #search" : "updateText",
					"click .searchBtn" : "changeBaseUrl",
					"click .dropdown-menu > li > a" : "select",
					"click .dd" : "doNothing",
					//"click .menu" : "toggle",
					"click .menu-link-h" : "showMenuDropdown"
				},

				template : menuTemplate,

				intialize : function(options) {
					SectionView.prototype.initialize.call(this, options);
				},
				
				updateText : function(e) {
					var target = $(e.currentTarget);
					var text = $(target).val();
					Channel('textChanged').publish(text);
				},
				
				changeBaseUrl : function(e) {
					var target = $(e.currentTarget);
					var num = target.data("number");
					Channel('baseUrlChanged').publish(num);
				},
				
				doNothing : function(e) {
					e.preventDefault();
					e.stopPropagation();
				},
				
				hideAllDropdowns: function() {
					var _self = this;
					$("html").click(function(e) {
						console.log($(e.target).parents("#views").length);
						if(!$(e.target).parents(".menu-outer-h").length)
							_self.$el.find(".menu-detail-h").hide();
					});
				},
				
				// show and hide dropdown
				showMenuDropdown: function(e) {
					var $target = $(e.target).next();
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
							'value' :  $(target).text()
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
				}

			});

			return MenuView;
		});