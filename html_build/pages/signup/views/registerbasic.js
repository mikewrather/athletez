define(["require","text!signup/templates/registration.html","backbone","underscore","registration","login","views","signup/views/facebooksignup","facade","utils","signup/views/registration-basics-final","signup/models/registration-basics-final"],function(e,t,n,r,i,s){var o,u=e("facade"),a=e("views"),f=e("signup/views/facebooksignup"),l=e("utils"),c=l.lib.Channel,h=e("signup/views/registration-basics-final"),p=e("signup/models/registration-basics-final"),d=n.View;return o=d.extend({initialize:function(e){e.openAsaPage&&(this.openAsaPage=e.openAsaPage),this.registrationController=new i({route:""}),this.template=r.template(t,{onlyRegister:this.openAsaPage?!0:!1}),this.$el=$(e.destination),console.log("REG BLOCK:",this.$el),$("#errormsg, #preview").html(""),d.prototype.initialize.call(this,e),debug.log("Image upload basic view"),this.openAsaPage||($("#RegModal").modal("show"),$("#RegModal").on("hidden",function(){}),$("#RegModal").on("hide",function(){$("div#modalPopup").remove()})),this.render()},render:function(){this.$el.html(this.template)},events:{"click .regsubmit":"next","click #fbpane":"signupFacebook","click #reglogin a":"showLogin"},next:function(e){e.preventDefault();var t=this.$(":input").serializeArray(),n=!0;$.each(t,function(e,t){if(!t.value)return alert(t.name+" is blank"),n=!1,!1});if(this.openAsaPage&&n){this.basic_type=new p;var r={model:this.basic_type,name:"Final registration",attr:{attr:t},openAsPopUp:!0};this.selectRegisterBasicFinalView=new h(r),$("#RegModal .modal-body").append(this.selectRegisterBasicFinalView.$el),$("#RegModal").modal("show")}else n&&routing.trigger("register-basic-final",t,page)},signupFacebook:function(e){e.preventDefault(),$("#RegModal").modal("hide"),headView=new f,headView.signupFacebook()},showLogin:function(e){e.preventDefault(),$("#RegModal").modal("hide"),this.logincontroller=new LoginController,routing.trigger("Login")}}),o});