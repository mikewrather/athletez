
	define( ["models/base"], function (BaseModel) {


	var LoginModel;

    LoginModel = BaseModel.extend({

        defaults: {
                        
        },
       url:'api/user/login?time='+new Date().getTime(),

       payload:{} 
        
    });

    return LoginModel;

});
   