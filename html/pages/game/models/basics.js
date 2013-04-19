// basics.js Model
// ------------
// Requires define
// Return {GameBasicsModel} model constructor object

define( ["facade", "sportorg/models/game"], function (facade, SportorgGameModel) {

    var GameBasicsModel,
        _ = facade._;

    GameBasicsModel = SportorgGameModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/basics/' + this.id;
            return '/api/game/basics?game_id=' + this.id;
        }
        
    });

    return GameBasicsModel;
});

