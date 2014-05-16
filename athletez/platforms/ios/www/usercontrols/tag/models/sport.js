// Sportorg Sport Model
// -----------
// Requires define
// Return {SportorgSportModel} object as constructor  

define(["facade", "sportorg/models/sport"], function (facade, SportBaseModel) {

	var SportorgSportModel,
		_ = facade._;

	SportorgSportModel = SportBaseModel.extend({

		url:function(){
			return "/api/sport/basics/" + this.id;
		}
	});

	return SportorgSportModel;
});
