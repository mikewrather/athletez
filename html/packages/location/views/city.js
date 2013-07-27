//City View
//Inserts auto-completing input tag for getting city name as input

define([ 'require', 'text!location/templates/city.html', 'views', 'facade', 'utils', 'jqueryui', 'controller'], function(require,
		cityTemplate) {
	var CityView,
		views = require('views'),
		facade = require('facade'),
		utils = require('utils'),
		SectionView = views.SectionView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		controller = require('controller');
	
	CityView = SectionView.extend({
		
		template : cityTemplate,
		className : 'ui-front',
		
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			this.id = options.id || this.id || _.unique('v');
			this.addSubscribers();			
		},
		
		initPlugin : function() {
			//var input = this.$el.find('.city');
			//console.log($);
			var view = this;
			var id = this.model.id;
			$('#city').autocomplete({
				minLength: 3,
				source: function(request, response) {
					var term = request.term;
					var appStates = controller.prototype.appStates;
					if (appStates) {
						var collection = appStates.findByNameInStorage(term);
						if(collection){response(collection.data);
						return;}
					}
					var myResponse = function(collection) {
						var appStates = controller.prototype.appStates;
						if (appStates) {
							appStates.add({
								name: term,
								data: collection,
								storage: 'localStorage',
								expires: new Date(Date.now() + 315400000)
							});
							appStates.save(term);
						}
						response(collection);
						console.log(appStates.findByNameInStorage(term));
					};
					Channel('response :'+term).subscribe(myResponse);
					Channel('changeInput'+id).publish(term);
				},
				select: function(event, ui) {
					Channel('cityChanged:'+view.id).publish(ui.item);
					debug.log(ui.item);
				}
			});
		},
		
		addSubscribers : function() {
			var view = this;
			console.log("Subscriber added");
			Channel('layout:ready').subscribe(view.initPlugin);
		}
	
	});
	
	return CityView;
});