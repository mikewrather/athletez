//Menu View

define(
		[ 'require', 'text!pages/home/templates/menu.html', 'facade', 'views' ],
		function(require, menuTemplate) {

			var MenuView, facade = require('facade'), views = require('views'), SectionView = views.SectionView;

			MenuView = SectionView.extend({

				id : 'menu',

				events : {
					"click .dropdown-menu > li > a" : "select",
					"click .dd" : "doNothing",
					"click .menu" : "toggle"
				},

				template : menuTemplate,

				intialize : function(options) {
					SectionView.prototype.initialize.call(this, options);
				},
				
				doNothing : function(e) {
					e.preventDefault();
					e.stopPropagation();
					//console.log('we came here.');
				},
				
				select : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var target = $(e.currentTarget);
					var targetClass = target.attr('class');
					$('.dropdown-menu > li > a'+'.'+targetClass).removeClass('select');
					$(target).addClass('select');
					//console.log($(target).text());
				},
				
				toggle : function(e) {
					e.preventDefault();
					var target = $(e.currentTarget);
					var off = $(target).offset();
					var off_top = off.top + 40;
					var off_left = off.left + 10;
					var selector = target.attr('id');
					selector = '#'+ selector + ' .dd';
					//console.log(selector);
					$(selector).css('top', off_top).css('left', off_left);
					$(selector).toggle();
				}

			});

			return MenuView;
		});