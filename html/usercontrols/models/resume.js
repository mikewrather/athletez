// basics_info.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "user/models/resume"], function (facade, ResumeModel) {

    var Model,
        _ = facade._;

    Model = ResumeModel.extend({
        
    });
    return Model;
});

