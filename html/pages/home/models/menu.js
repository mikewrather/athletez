//Menu Model

define([ 'models' ], function(models) {

	var MenuModel, BaseModel = models.BaseModel;

	MenuModel = BaseModel.extend({

		defaults : {
			name : null,
			views : {
				browse : [ {
					name : 'Up Votes',
					value: 'votes'
				}, {
					name : 'Newest',
					value: 'newest'
				}, {
					name : 'Fans',
					value: 'followers'
				} ],
				time : [ {
					name : 'Today',
					value: 'DAY'
				}, {
					name : 'Week',
					value: 'WEEK'
				}, {
					name : 'Month',
					value: 'MONTH'
				}, {
					name : 'Year',
					value: 'YEAR'
				} ]
			}
		}

	});

	return MenuModel;
});