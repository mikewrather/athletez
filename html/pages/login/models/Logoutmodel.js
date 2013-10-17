	define( ["models/base"], function (BaseModel) {


	var LoginModel;

    LoginModel = BaseModel.extend({

        defaults: {
                        
        },
       url:'/api/user/logout?time='+new Date().getTime(),
       
       payload:{} 
        
    });

    return LoginModel;

});
   