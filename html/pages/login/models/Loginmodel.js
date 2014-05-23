define( ["models/base"], function (BaseModel) {
	var LoginModel;

    LoginModel = BaseModel.extend({
       url:'api/user/login?time='+new Date().getTime()
    });

    return LoginModel;
});
   