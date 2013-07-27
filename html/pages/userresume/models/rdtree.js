// basics_info.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "user/models/rdtree"], function (facade, RDtreeModel) {

    var Model,
        _ = facade._;

    Model = RDtreeModel.extend({
        
        idAttribute : 'id1',
        
		data : {
			user_id : this.user_id,
			resume_data_id : this.resume_data_id,
			user_value : this.user_value
		},
		
		processData : true,
		
		url : function() {
			if (this.action == "save")
				return 'api/resumedataval/add/' + this.treeId + '?id1=' + this.treeId;

			if (this.action == "update")
				return 'api/resumedataval/basics/' + this.treeId + '?id1=' + this.treeId;
				
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
			console.log("Show Error Message Rdtree.js Model",errors);
			$(this.target).parent().find(".success_h").html('').fadeOut();
			$(this.target).parent().find(".error_h").html(errors).fadeIn();
		},
    });
    return Model;
});

