// basics_info.js Model
// ------------
// Requires define
// Return {ContactsModel} model constructor object

define( ["facade", "user/models/common"], function (facade, ResumeModel) {

    var Model,
        _ = facade._;

    Model = ResumeModel.extend({
        
    });
    return Model;
});

