/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrols/landing/templates/landing.html','text!usercontrols/landing/landing.css', 'facade', 'views', 'utils', 'vendor','landing'], function(require) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!usercontrols/landing/templates/landing.html');
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click .close":"closePopup"
		},
		cssArr : ["usercontrols/landing/landing.css"],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			Channel('load:css').publish(this.cssArr);
			_self = this;
			_self.data = {};
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},

		//render displays the view in landing
		render : function() {
			var _self = this, markup = Mustache.to_html(_self.template,_self.data);
			//console.error(markup);
			//this.el = markup;
			//console.error(this.el);
			var options = {};
			options.width = "100%";
					options.height = "100%";
					options.title = "Welcome to Athletez!";
					options.html = markup;
					options.id = "landing";
					options.addClass = ['noBorder'];
					console.error(options);
					routing.trigger('common-popup-open', options);
			
			return this;
			//markup should open up in a popup
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		closePopup:function(){

		}
	});
});
