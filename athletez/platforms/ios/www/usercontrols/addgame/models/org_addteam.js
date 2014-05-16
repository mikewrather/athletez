define(function(require){

	var TeamAddToOrgModel,
		facade = require('facade'),
		_ = facade._,
		TeamModel = require('usercontrol/addgame/models/team');

	TeamAddToOrgModel = TeamModel.extend({

		url : function(){
			return "/api/team/add"
		}
	});

	return TeamAddToOrgModel;

});