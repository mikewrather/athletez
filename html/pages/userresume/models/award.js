// gpa.js Model
// ------------
// Requires define
// Return {GpaModel} model constructor object

define(["facade", "user/models/common"], function(facade, CommonModel) {

	var Model, _ = facade._;

	Model = CommonModel.extend({
		idAttribute : 'id1',
		
		data : {
			user_id : this.user_id,
			year : this.year
		},
		
		processData : true,
		
		url : function() {
			if (this.action == "update")	
				return 'api/awards/basics/' + this.award_id + '?id1=' + this.award_id;
			if (this.action == "save")
				return 	'api/awards/add/';
			if(this.action == "delete");
				return 'api/awards/base/'+ this.award_id + '?id1=' + this.award_id;
	
	return 'api/awards/basics/';
	


		},

		/*Function To display SUCCESS messages returned by API*/
		showSuccessMessage : function(messages) {
			$(this.target).parent().find(".success_h").html(messages).fadeIn();
			$(this.target).parent().find(".error_h").html('').fadeOut();
		},
		/*Function To display ERROR messages returned by API*/
		showErrorMessage : function(errors) {
			$(this.target).parent().find(".success_h").html('').fadeOut();
			$(this.target).parent().find(".error_h").html(errors).fadeIn();
		},
	});
	return Model;
});

