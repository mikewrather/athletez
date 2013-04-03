// basics.js Model
// ------------
// Requires define
// Return {BasicsModel} model constructor object

define( ["facade", "user/models/basics"], function (facade, UserBasicsModel) {

    var BasicsModel,
        _ = facade._;

    BasicsModel = UserBasicsModel.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/basics/' + this.id;
            return '/api/user/basics/?user_id=' + this.id;
        }
        
    });

    return BasicsModel;
});

