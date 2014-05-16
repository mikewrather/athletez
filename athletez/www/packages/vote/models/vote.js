//City Model

define([ 'models', 'facade' ], function(models, facade) {

	var VoteModel, BaseModel = models.BaseModel;
	var $ = facade.$;
	var _ = facade._;
	VoteModel = BaseModel.extend({
		url : function() { 
			return base_url + 'api/vote/add?subject_type_id='+this.entity_id+'&subject_id='+this.subject_id;
		},
		
		setData: function() {
			this.set({'subject_type_id': this.entity_id, 'subject_id': this.subject_id});
		}
	});

	return VoteModel;
});