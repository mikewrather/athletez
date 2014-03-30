/**
 * Created with Sanjay Kumar
 * Spinner plugin
 */
define([
	'require',
	'facade',
	'views',
	'utils',
	'vendor/plugins/spin.min',
	'vendor'], function(require) {

	var facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		_ = facade._,
		$ = facade.$,

		BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		Spinner = require('vendor/plugins/spin.min'),
		opts = {
			lines: 15, // The number of lines to draw
			length: 5, // The length of each line
			width: 2, // The line thickness
			radius: 3, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 0.6, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
		};
		

	return function() {
		if(routing) {
			// show spinner
			routing.showSpinner = function(target) {
				if(target) {
					var spinner = new Spinner(opts).spin();
					$(target).parent().append(spinner.el);
					$(target).addClass('link-disabled');
					return spinner;
				}
			};
			
			// hide spiner
			routing.hideSpinner = function(ob, target) {
				if(ob) ob.stop();
				if(target) $(target).removeClass('link-disabled');
			};
		}
	};

});