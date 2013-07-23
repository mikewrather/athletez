// basics_info.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "user/models/rdtree"], function (facade, RDtreeModel) {

    var Model,
        _ = facade._;

    Model = RDtreeModel.extend({
        
    });
    return Model;
});

