//Delete Model

define([ 'models', 'facade' ], function(models, facade) {



	var BaseModel = models.BaseModel, Backbone = facade.Backbone, $ = facade.$, _ = facade._;
	return BaseModel.extend({
		subject_id: undefined,
		enttypes_id: undefined,
		id:1,
		url: function() {
			return "/api/ent/delete/"+this.enttypes_id+"/"+this.subject_id;
		}
	});
});