// state.js Model
// ------------
// Requires define
// Return {state model} model constructor object

define( ["facade", "location/models/state"], function (facade, StateModel) {

    var LocationStateModel,
        _ = facade._;

    LocationStateModel = StateModel.extend({
        
    });
    return LocationStateModel;
});

