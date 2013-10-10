	define( ["models/base"], function (BaseModel) {


	var LoginModel;

    LoginModel = BaseModel.extend({

        defaults: {
                        
        },
       url:'/api/user/logout',
       
       payload:{} 
        
    });

    return LoginModel;

});
   