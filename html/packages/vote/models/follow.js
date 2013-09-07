//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var FollowModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	FollowModel = BaseModel.extend({
		url : 'api/vote/add?subject_type_id='+this.entity_id+'&subject_id='+this.id
	});

	return FollowModel;
});