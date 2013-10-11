	define( ["models/base"], function (BaseModel) {


	var LoginModel;

    LoginModel = BaseModel.extend({

        defaults: {
                        
        },
       url:'/user/logout',
       payload:{} 
        
    });

    return LoginModel;

});
   