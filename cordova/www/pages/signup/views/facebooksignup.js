define(["vendor","views","registration","signup","signup/views/shopopup","utils/storage","facebook","packages/invite/models/invite"],function(e,t,n,r,i,s){var o,u=t.BaseView,a=e.$,f=e._,l=e.Mustache,c,h=require("packages/invite/models/invite");return o=u.extend({initialize:function(e){e&&e.callback&&(this.callback=e.callback),e&&e.invite_hash&&(this.invite_hash=e.invite_hash),console.log(e),FB.init({appId:App.Settings.appId,status:!0,cookie:!0,xfbml:!0,oauth:!0})},signupFacebook:function(e,t){var r=this;this.linkWithFB=e&&e=="linkWithFB"?!0:!1,this.registrationController||(this.registrationController=new n({callback:r.calback})),this.loginfb(t)},getFBlogin:function(){var e=this;alert("getFBlogin"),FB.getLoginStatus(function(t){console.log(t),t.status==="connected"?this.actionFunction=function(){FB.api("/me",function(t){e.linkWithFB&&alert("Facebook Account linked Successfully."),routing.trigger("registration-with-facebook",e.callback)})}:t.status==="not_authorized"?(e.linkWithFB&&alert("There was a problem trying to establish a connection to Facebook."),console.log("not_authorized"),e.loginInfo||(e.loginInfo=e.loginfb())):e.loginInfo||(e.loginInfo=e.loginfb())},{scope:"email, user_birthday, user_photos"})},loginfb:function(e){var t=this;FB.login(function(n){console.log(n);if(n.authResponse){routing.trigger("hide-landing");if(t.invite_hash)var r=new h({sechash:t.invite_hash});e&&f.isFunction(e)?e():routing.trigger("registration-with-facebook",t.callback,r)}else alert("Facebook Login has been cancelled")},{scope:"email, user_birthday, user_photos"})},checkFBlogin:function(){var e=this;FB.getLoginStatus(function(t){t.status==="connected"&&FB.api("/me",function(t){routing.trigger("registration-with-facebook",e.callback)})},{scope:"email, user_birthday, user_photos"})}}),o});