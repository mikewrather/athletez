// commenton-form.js Model
// ------------
// Requires define
// Return {CommentOnFormModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var TagModel,
        _ = facade._;

    TagModel = BaseModel.extend({
        
      url: function() {
            if (testpath)
                return testpath + '/media/addvote/' + this.id;
            return '/api/media/addvote/' + this.id;
        }
        
    });

    return TagModel;
});

