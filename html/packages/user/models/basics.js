// basics.js Model
// ------------
// Requires define
// Return {UserBasicsModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var UserBasicsModel,
        _ = facade._;

    UserBasicsModel = BaseModel.extend({
        url: function() {
            if ('undefined' == typeof this.id) {
                //if (testpath)
                //    return testpath + '/user/basics/';
                return '/api/user/basics/';
            } else {
                //if (testpath)
                //    return testpath + '/user/basics/' + this.id;
                return '/api/user/basics/' + this.id;
            }            
        }        
    });

    return UserBasicsModel;
});

