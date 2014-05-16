//Menu Model

define([ 'models' ], function(models) {

	var MenuModel, BaseModel = models.BaseModel;

	MenuModel = BaseModel.extend({

		defaults : {
			name : null,
			views : {
				browse : [ {
					name : 'VOTES',
					value: 'votes'
				}, {
					name : 'RECENT',
					value: 'newest'
				}, {
					name : 'FANS',
					value: 'followers'
				} ],
				time : [ {
					name : 'TODAY',
					value: 'DAY'
				}, {
					name : 'THIS WEEK',
					value: 'WEEK'
				}, {
					name : 'THIS MONTH',
					value: 'MONTH'
				}, {
					name : 'ALL TIME',
					value: 'YEAR'
				} ]
			}
		}

	});

	return MenuModel;
});