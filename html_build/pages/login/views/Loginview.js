define(["require","text!login/templates/logintemplate.html","backbone","underscore","signup","views","facade","utils"],function(e,t,n,r,i){var s,o=e("facade"),u=e("views"),a=e("utils"),f=a.lib.Channel,l=n.View;return SigninBasicView=l.extend({initialize:function(e){this.signcontroller=new i,this.template=r.template(t),this.$el=$(e.destination),this.render()},render:function(){this.$el.html(this.template),$("#errormsg, #preview").html(""),debug.log("Image upload basic view"),$("#Loginview").modal("show"),$("#Loginview").on("hide",function(){$("div#LoginPopup").empty()})},events:{"click a#signup":"signupUser","click .loginUser":"userLogin"},userLogin:function(e){e.preventDefault();var t=this.$(":input").serializeArray(),n=[];$.each(t,function(e,t){n[t.name]=t.value});var r=$.extend({},n);console.log(r,"new"),this.model.save(r,{success:function(e){location.href="#usersettings",$("#Loginview").modal("hide")},error:function(e){console.log(e),$(".errormsg").empty();var t=jQuery.parseJSON(e.request.responseText);console.log(t.desc),$(".errormsg").html(t.desc)}})},signupUser:function(e){e.preventDefault(),$("#Loginview").modal("hide"),routing.trigger("register-basic")}}),SigninBasicView});