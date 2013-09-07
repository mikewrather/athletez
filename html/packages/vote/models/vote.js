//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var VoteModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	VoteModel = BaseModel.extend({
		url : function() { 
			return base_url + 'api/vote/add?subject_type_id='+this.id+'&subject_id='+this.entity_id;
		}
	});

	return VoteModel;
});