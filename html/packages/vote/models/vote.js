//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var VoteModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	VoteModel = BaseModel.extend({
		url : 'api/ent/follow/'+this.entity_id+'/'+this.id
	});

	return VoteModel;
});