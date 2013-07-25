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
				},
				
				select : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var target = $(e.currentTarget);
					var targetClass = target.attr('class');
					$('.dropdown-menu > li > a'+'.'+targetClass).removeClass('select');
					targetClass = target.attr('class').split(' ')[0];
					$(target).addClass('select');
					var ret = targetClass + ' ' + $(target).text();
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
				}

			});

			return MenuView;
		});