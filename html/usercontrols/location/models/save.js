// save.js Model
// ------------
// Requires define
// Return {AddressModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var _ = facade._;

    return BaseModel.extend({
      url: function() {
            if (testpath)
                return testpath + '/location/add?address=' + this.address;
            return '/api/location/add?address=' + this.address;
        }
        
    });
});
