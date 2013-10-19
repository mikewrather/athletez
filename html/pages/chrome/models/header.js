// header.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base",'utils/storage'], function (BaseModel,Store) {

    var HeaderModel;

    HeaderModel = BaseModel.extend({

        defaults: {
            
            branding: {
                alt: "athletez",
                src: "http://cdn.athletez.com/resources/img/athletez_logo_small.png"
            },            
            
            search: {
                placeholder: "Search"
            },
            
            login_url: "#user/login",
            login_label: "SIGN IN",
            
            //logout_url: "/user/logout",
			logout_url: "#logout",
            logout_label: "Log Out",
			
            fbreg_url: "#fbconnect",
            fbreg_label: "Facebook",
			
            signup_social_label: "Sign up for Free",
            signup_facebook_label: "Facebook",
            signup_email_label: "Email",
            signup_facebook_link: "/",
            signup_email_link: '/'
            
        },
        
        url: function() {
            if (testpath)
                return testpath + '/authcheck?time='+new Date().getTime();
            return '/authcheck?time='+new Date().getTime();
        },
	    saveCookie: function () {
		    var appStates = new Store("user","localStorage");
		    appStates.create(this);
		},

    });

    return HeaderModel;
});

