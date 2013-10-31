
	define( ["models/base"], function (BaseModel) {


    return BaseModel.extend({
       defaults: {},
       email: undefined,
       url: function() {
       	return 'api/user/pw_reset?email='+encodeURIComponent(this.email);
       },
       payload:{}
    });

});
   