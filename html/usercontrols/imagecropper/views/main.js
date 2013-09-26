/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define([
	'require',
	'facade',
	'views',
	'utils',
	'vendor'
], function (
	require) {

	var self,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		$ = facade.$;

	var ImageCropperView = SectionView.extend({
		events: {},

		/*initialize gets called by default when constructor is initialized*/
		initialize: function (options) {
		}

	});
	return ImageCropperView;
});
