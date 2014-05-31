// header.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base",'utils'], function (BaseModel,Utils) {

    var HeaderModel,
	    Store = Utils.storage,
	    Cookie = Utils.docCookies;


    HeaderModel = BaseModel.extend({

        defaults: {

	        authorized: false,
            
            branding: {
                alt: "Athletez Logo",
                src: "http://cdn.athletez.com/resources/img/athletez_logo_small.png"
            },            
            
            search: {
                placeholder: "Search"
            },
            
            login_url: "#user/login",
            login_label: "SIGN IN",

			logout_url: "#logout",
            logout_label: "Log Out",

            signup_social_label: "Sign up for Free",
            signup_facebook_label: "Facebook",
            signup_email_label: "Email",
            signup_facebook_link: "/",
            signup_email_link: '/'
            
        },

	    initialize: function(){
		    BaseModel.prototype.initialize.call(this);
			var chkcookie = Cookie.getItem('authautologin');
		    if(!chkcookie){
			//    var chkstore = new Store("authautologin","localStorage"),
			 //       cookieValue = _.isObject(chkstore.find({id:"cookieValue"})) ? chkstore.find({id:"cookieValue"}).value : false;
			//	if(cookieValue) {
			//		Cookie.setItem("authautologin",cookieValue);
			//		this.ls_auth = cookieValue;
			//	}
		    }
	    },
        
        url: function() {
            var baseurl = '/authcheck?time='+new Date().getTime();
	        if(!_.isUndefined(this.ls_auth)) baseurl += "&ls_auth=" + this.ls_auth;
	        return baseurl;
        },
	    saveCookie: function () {
		    var appStates = new Store("user","localStorage");
		    appStates.create(this);
		}

    });

    return HeaderModel;
});

