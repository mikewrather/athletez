// commenton-form.js Model
// ------------
// Requires define
// Return {CommentOnFormModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var TagModel,
        _ = facade._;

    TagModel = BaseModel.extend({
        
       
   url: function() {
            return '/api/user/basics/' + this.id;
        },
    });


    return TagModel;
});