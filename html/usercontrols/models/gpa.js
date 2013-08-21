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
			if (this.action == "delete")
				return 'api/user/gpa/' + this.user_id + '?id1=' + this.user_id;

			return 'api/user/addgpa/' + this.user_id + '?id1=' + this.user_id;

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

