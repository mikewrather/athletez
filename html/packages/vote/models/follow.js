//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var FollowModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	FollowModel = BaseModel.extend({
		url : function() { 
			return base_url + 'api/ent/follow/'+this.id+'/'+this.entity_id;
		}
	});

	return FollowModel;
});