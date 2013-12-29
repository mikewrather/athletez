//Invite FB Friends Model

define([ 'models', 'facade' ], function(models, facade) {
	
	var BaseModel = models.BaseModel, $ = facade.$, _ = facade._;
	return BaseModel.extend({
		idAttribute: 'id',
		url : function() {
			return base_url + 'api/fbinvite/invite/';
		}
	});
});