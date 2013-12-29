//Invite FB Friends Model

define([ 'models', 'facade' ], function(models, facade) {
	
	var BaseModel = models.BaseModel, $ = facade.$, _ = facade._;
	return BaseModel.extend({
		fbUserId: undefined,
		url : function() {
			return base_url + 'api/fbinvite/basics/'+this.fbUserId;
		}
	});
});