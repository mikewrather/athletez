// gpa.js Model
// ------------
// Requires define
// Return {GpaModel} model constructor object

define(["facade", "user/models/common"], function(facade, CommonModel) {

	var Model, _ = facade._;

	Model = CommonModel.extend({
		idAttribute : 'id1',
		
		// data : {
			// user_id : this.user_id,
			// year : this.year
		// },
		
		processData : true,
		
		url : function() {
			if (this.action == "update")	
				return 'api/references/basics/' + this.reference_id + '?id1=' + this.reference_id;
			if (this.action == "save")
				return 	'api/references/add/';
			if(this.action == "delete");
				return 'api/references/base/'+ this.reference_id + '?id1=' + this.reference_id;
	
	return 'api/references/basics/';
	
// 
// apiaccess_id	485
// email	yashpal.wadhwa15@gmail.com
// id1	0
// long_description	Description test
// name	Yashpal
// phone	8699668365
// relation	Friend
// sports_id	46
// users_id	425983
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

