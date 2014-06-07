//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var FollowModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	FollowModel = BaseModel.extend({
		url : function() { 
			return '/api/ent/follow/'+this.entity_id+'/'+this.subject_id;
		}
		
	});

	return FollowModel;
});