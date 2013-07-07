//Menu View

define(
		[ 'require', 'text!pages/home/templates/menu.html', 'facade', 'views' ],
		function(require, menuTemplate) {

			var MenuView, facade = require('facade'), views = require('views'), SectionView = views.SectionView;

			MenuView = SectionView.extend({

				id : 'menu',

				template : menuTemplate,

				intialize : function(options) {
					SectionView.prototype.intialize.call(this, options);
				}
			});

			return MenuView;
		});