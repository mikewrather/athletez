// gpa.js Model
// ------------
// Requires define
// Return {GpaModel} model constructor object

define(["facade", "user/models/common"], function(facade, CommonModel) {

	var Model, _ = facade._;

	Model = CommonModel.extend({
		idAttribute : 'academics_tests_topics_id',

		data : {
			user_id : this.user_id,
			year : this.year
		},

		processData : true,

		url : function() {
			if (this.action == "update")
				return 'api/user/testscore/' + this.users_id + '?id1=' + this.users_id;
			if (this.action == "save")
				return 'api/user/addtestscore/' + this.users_id + '?id1=' + this.users_id;
			if (this.action == "delete")
			return 'api/user/testscore/' + this.users_id + '?id1=' + this.users_id;

			return 'api/user/addtestscore/';

		},

		/*Function To display SUCCESS messages returned by API*/
		showSuccessMessage : function(messages) {
			console.log("showSuccessMessage test");
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

