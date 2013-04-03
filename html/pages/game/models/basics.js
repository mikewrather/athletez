// basics.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "sportorg/models/game"], function (facade, SportorgGameModel) {

    var BasicsModel,
        _ = facade._;

    BasicsModel = SportorgGameModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/basics/' + this.id;
            return '/api/game/basics?game_id=' + this.id;
        }
        
    });

    return BasicsModel;
});

