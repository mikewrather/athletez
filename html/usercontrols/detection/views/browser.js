/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrols/detection/templates/browser.html', 'facade', 'views', 'utils', 'vendor'], function(require) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!usercontrols/detection/templates/browser.html');
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click .close":"closePopup"
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},		

		//render displays the view in browser
		render : function() {
			console.log(layoutTemplate);
			var data = {};
			var _self = this, markup = Mustache.to_html(_self.template,data);
			//markup should open up in a popup
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		closePopup:function(){
			$('#modalPopup.old-browser-modal').remove();
		}
	});
});
