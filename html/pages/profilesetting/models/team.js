// state.js Model
// ------------
// Requires define
// Return {state model} model constructor object

define( ["facade", "sportorg/models/team"], function (facade, TeamModel) {

    var Model,
        _ = facade._;

    Model = TeamModel.extend({
        
    });
    return Model;
});

