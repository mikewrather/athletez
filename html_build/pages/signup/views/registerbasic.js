define(["require","text!signup/templates/registration.html","chrome/views/header","backbone","underscore","registration","views","facade","utils"],function(e,t,n,r,i,s){var o,u=e("facade"),a=e("views"),f=e("utils"),l=f.lib.Channel,c=r.View;return o=c.extend({initialize:function(e){this.registrationController=new s({route:""}),this.template=i.template(t),this.$el=$(e.destination),$("#errormsg, #preview").html(""),c.prototype.initialize.call(this,e),debug.log("Image upload basic view"),$("#RegModal").modal("show"),$("#RegModal").on("hidden",function(){}),$("#RegModal").on("hide",function(){$("div#modalPopup").remove()}),this.render()},render:function(){this.$el.html(this.template)},events:{"click .regsubmit":"next","click #fbpane":"signupFacebook"},next:function(e){e.preventDefault();var t=this.$(":input").serializeArray(),n=!0;$.each(t,function(e,t){if(!t.value)return alert(t.name+" is blank"),n=!1,!1}),n&&routing.trigger("register-basic-final",t)},signupFacebook:function(e){function n(){FB.login(function(e){e.authResponse?l("registration-with-facebook").publish():alert("Cancelled")},{scope:"email, user_birthday, user_photos"})}function r(){t.registrationController||(t.registrationController=new s({route:""})),t.registrationController.refreshPage();var e,r="facebook-jssdk",i=document.getElementsByTagName("script")[0];if(document.getElementById(r)){n();return}e=document.createElement("script"),e.id=r,e.async=!0,e.src="//connect.facebook.net/en_US/all.js",i.parentNode.insertBefore(e,i)}e.preventDefault();var t=this;window.fbAsyncInit=function(){FB.init({appId:"239430712864961",status:!0,cookie:!0,xfbml:!0,oauth:!0}),FB.getLoginStatus(function(e){e.status==="connected"?FB.api("/me",function(e){console.log(e),l("registration-with-facebook").publish()}):e.status==="not_authorized"?(console.log("not_authorized"),n()):n()},{scope:"email, user_birthday, user_photos"})},r()}}),o});