define(["vendor","views","text!chrome/templates/header.html","chrome/models/header","registration","login","signup","signup/views/shopopup","utils/storage"],function(e,t,n,r,i,s,o,u,a){var f,l=t.BaseView,c=e.$,h=e._,p=e.Mustache;return f=l.extend({tagName:"header",className:"container-fluid clearfix",initialize:function(e){this.template=n},model:new r,events:{"click .signup-facebook":"signupFacebook","click .signup-email":"signupUser","click .account clearfix a":"login","click #userlogin":"userLogin"},render:function(){var e=this;return this.model.fetchSuccess=this.model.fetchError=function(t,n){var r=p.to_html(e.template,t.toJSON());e.$el.html(r),console.log(t.toJSON());if(typeof t.get("user_photo")=="object"&&typeof t.get("user_photo").types=="object")if(typeof t.get("user_photo").types.small_thumb=="object")var i=t.get("user_photo").types.small_thumb.url;else if(typeof t.get("user_photo").types.large_thumb=="object")var i=t.get("user_photo").types.large_thumb.url;else if(typeof t.get("user_photo").types.original=="object")var i=t.get("user_photo").types.original.url;else var i="";e.$(".photo img").attr("src",i);var s=t.get("authorized");if(s){var o=t.get("id");e.model.saveCookie(),routing.userLoggedIn=!0,routing.trigger("app-inited",o)}else routing.userLoggedIn=!1,routing.trigger("app-inited")},this.model.fetch(),this},userLogin:function(e){e.preventDefault(),this.logincontroller=new LoginController,routing.trigger("Login")},signupFacebook:function(e){function t(){FB.login(function(e){e.authResponse?(this.signupc=new o({route:""}),Channel("registration-with-facebook").publish(),this.pop=new u):alert("Cancelled")},{scope:"email, user_birthday, user_photos"})}function n(){this.registrationController||(this.registrationController=new i({route:""})),this.registrationController.refreshPage();var e,n="facebook-jssdk",r=document.getElementsByTagName("script")[0];if(document.getElementById(n)){t();return}e=document.createElement("script"),e.id=n,e.async=!0,e.src="//connect.facebook.net/en_US/all.js",r.parentNode.insertBefore(e,r)}e.preventDefault(),window.fbAsyncInit=function(){FB.init({appId:"239430712864961",status:!0,cookie:!0,xfbml:!0,oauth:!0}),FB.getLoginStatus(function(e){e.status==="connected"?FB.api("/me",function(e){console.log(e),this.signupc=new o({route:""}),Channel("registration-with-facebook").publish(),this.pop=new u}):e.status==="not_authorized"?(console.log("not_authorized"),t()):t()},{scope:"email, user_birthday, user_photos"})},n()},signupUser:function(e){e.preventDefault(),this.signupc=new o({route:""}),routing.trigger("register-basic"),this.pop=new u}}),f});