//Menu Model

define([ 'models' ], function(models) {

	var MenuModel, BaseModel = models.BaseModel;

	MenuModel = BaseModel.extend({

		defaults : {
			name : null,
			views : {
				browse : [ {
					name : 'Up Votes'
				}, {
					name : 'Newest'
				}, {
					name : 'Fans'
				} ],
				time : [ {
					name : 'Today'
				}, {
					name : 'Week'
				}, {
					name : 'Month'
				}, {
					name : 'Year'
				} ]
			}
		}

	});

	return MenuModel;
});