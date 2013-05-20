// basics.js Model
// ------------
// Requires define
// Return {TeamBasicsModel} model constructor object

define( ["facade", "sportorg/models/team"], function (facade, SportorgTeamModel) {

    var TeamBasicsModel,
        _ = facade._;

    TeamBasicsModel = SportorgTeamModel.extend({
        
        url: function() {
	        if (testpath)
                return testpath + '/team/basics/' + this.id;
            return '/api/team/basics/' + this.id;
        }
        
    });

    return TeamBasicsModel;
});

