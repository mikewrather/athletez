// main.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var MainModel;

    MainModel = BaseModel.extend({

        defaults: {
                        
        }
        
    });

    return MainModel;
});

