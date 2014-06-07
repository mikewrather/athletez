//Invite FB Friends Model

define([ 'models', 'facade' ], function(models, facade) {
	
	var BaseModel = models.BaseModel, $ = facade.$, _ = facade._;
	return BaseModel.extend({
		fbUserId: undefined,
		url : function() {
			return '/api/fbinvite/basics?fbid='+this.fbUserId;
		}
	});
});