define(["models/base","utils/storage"],function(e,t){var n;return n=e.extend({defaults:{branding:{alt:"Athletez Logo",src:"http://cdn.athletez.com/resources/img/athletez_logo_small.png"},search:{placeholder:"Search"},login_url:"#user/login",login_label:"SIGN IN",logout_url:"#logout",logout_label:"Log Out",fbreg_url:"#fbconnect",fbreg_label:"Facebook",signup_social_label:"Sign up for Free",signup_facebook_label:"Facebook",signup_email_label:"Email",signup_facebook_link:"/",signup_email_link:"/"},url:function(){return testpath?testpath+"/authcheck?time="+(new Date).getTime():"/authcheck?time="+(new Date).getTime()},saveCookie:function(){var e=new t("user","localStorage");e.create(this)}}),n});