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
		
		className : 'city',
		tagName : 'span',
		attributes : {
			"style" : "position:relative; display:inline-block;"
		},
		
		events : {
			"input .query" : 'changeInput'  //works for IE >= 9
		},
		
		template : cityTemplate,
		
		initialize : function(options) {
			//debug.log('City View Initialized');
			//cssArr = [base_url + "/packages/location/city.css"];
			SectionView.prototype.initialize.call(this, options);
			//Channel('load:css').publish(cssArr);
		},
		
		//Subscribe to this event for capturing the input text
		changeInput : function(e) {
			var target = $(e.currentTarget);
			//debug.log('Event'+ $(target).val());
			var inputText = $(target).val();
			Channel('changeInput' + this.model.id).publish(inputText);
		}
	
	});
	
	return CityView;
});