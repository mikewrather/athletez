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
			return 'api/resumedataval/add/';
		}

    });
    return Model;
});

