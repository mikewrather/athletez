// add.js Model
// ------------
// Requires define
// Return {AddressModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

    var _ = facade._;

    return BaseModel.extend({
        
      url: function() {
            if (testpath)
                return testpath + '/location/add?address=' + this.address;
            return '/api/org/add?name=' + this.name + '&complevel_profiles_id='+this.compLevel+"&location_id="+this.locationId+"&sports_club="+this.club;
        }
        
    });
});

