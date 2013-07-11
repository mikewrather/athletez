// state.js Model
// ------------
// Requires define
// Return {state model} model constructor object

define( ["facade", "models/base"], function (facade, TeamModel) {

    var Model,
        _ = facade._;

    Model = TeamModel.extend({
        url : function() {
			if (this.orgs_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			if(this.type=="add")
			return '/api/user/addteam/' + this.user_id ;
			
		//	return '/api/user/addteam/424490?id1=424490&orgs_id=7&sports_id=49&complevels_id=2&seasons_id=2&year=2013&apiaccess_id=125';
			
		//	return '/api/user/addteam/' + this.user_id + '?id1=' + this.user_id +'&orgs_id=' + this.orgs_id +'&sports_id=' + this.sports_id
			//				+'&complevels_id=' + this.complevels_id +'&seasons_id=' + this.seasons_id + '&year=' + this.year
				//			+ '&teams_id=' + this.teams_id
			//;
		},
		
    });
    return Model;
});

