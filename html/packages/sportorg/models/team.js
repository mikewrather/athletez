// Sportorg Team Model
// -----------
// Requires define
// Return {SportorgTeamModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

	var SportorgTeamModel,
		_ = facade._,
		Backbone = facade.Backbone;

	SportorgTeamModel = BaseModel.extend({

		defaults: _.extend({}, (new BaseModel).attributes, {

			"payload": {
				"name": null,
				"location": null,
				"picture": null,
				"sport": null,
				"complevel": null,
				"season": null,
				"year": null,
				"mascot": null,
				"unique_ident": null,
				"statvals": [
					{
						"statval": null,
						"statdate": null,
						"statteam": null,
						"stat_context": null
					}
				]
			},
			"desc": "Team information",
			"exec_data": {
				"exec_time": 0,
				"exec_error": false
			}
		}),

		url: function () {
			return "/api/team/basics/" + this.id;
		},
		/*Use this method to map only required data from response after SUCCESS function*/
		/*REFERENCE : Exact Implementation in usercontrols/addgame/models/team*/
       
       parseAsRequired : function(response) {
			
			return response;
		}
		

	});

	return SportorgTeamModel;
});
