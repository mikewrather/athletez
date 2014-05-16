// state.js Model
// ------------
// Requires define
// Return {state model} model constructor object

define( ["facade", "models/base"], function (facade, TeamModel) {

    var Model,
        _ = facade._;

    Model = TeamModel.extend({
    	idAttribute : 'team_id',
        url : function() {
			if (this.orgs_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			if(this.type=="add")
				return '/api/user/addteam/' + this.user_id ;
			if(this.type=="delete")
				return '/api/user/team/' + this.user_id;
			
		},
		
    });
    return Model;
});

