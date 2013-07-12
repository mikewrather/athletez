//City View
//Inserts auto-completing input tag for getting city name as input

define([ 'require', 'text!location/templates/city.html', 'views', 'facade', 'utils'], function(require,
		cityTemplate) {
	var CityView,
		views = require('views'),
		facade = require('facade'),
		utils = require('utils'),
		SectionView = views.SectionView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug;
	
	CityView = SectionView.extend({
		
		id : 'city',
		
		template : cityTemplate,
		
		initialize : function(options) {
			//debug.log('City View Initialized');
			SectionView.prototype.initialize.call(this, options);
		}
	
	});
	
	return CityView;
});