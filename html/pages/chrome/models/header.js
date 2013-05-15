// header.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var HeaderModel;

    HeaderModel = BaseModel.extend({

        defaults: {
            
            branding: {
                alt: "NewSite",
                src: "/images/logo.png"
            },            
            
            search: {
                placeholder: "Search"
            },
            
            login_url: "/user/login",
            login_label: "Log In",
            
            logout_url: "/user/logout",
            logout_label: "Log Out",
            
            signup_social_label: "Sign up for Free",
            signup_facebook_label: "Facebook",
            signup_email_label: "Email",
            signup_facebook_link: "/",
            signup_email_link: '/'
            
        },
        
        url: function() {
            if (testpath)
                return testpath + '/authcheck';
            return '/authcheck';
        }

    });

    return HeaderModel;
});

