define(["require","text!usercontrol/landing/templates/landing.html","text!usercontrol/landing/landing.css","signup/models/registerbasic","signup/views/registerbasic","facade","views","utils","usercontrol/landing/models/fb-user","common/models/entparse","vendor","packages/invite/views/invite"],function(e){var t=e("facade"),n=e("views"),r=n.SectionView,i=e("utils"),s=e("signup/models/registerbasic"),o=e("signup/views/registerbasic"),u=e("usercontrol/landing/models/fb-user"),a=e("common/models/entparse"),f=e("packages/invite/views/invite"),l=i.lib.Channel,c=e("vendor"),h=c.Mustache,p=t.$,d=t._,v=n.BaseView,m=t.Backbone,g,y=e("text!usercontrol/landing/templates/landing.html");return v.extend({template:y,events:{"click #browse":"closePopup","click #sign-in":"signIn","click #browse":"scrollToContent"},cssArr:[base_url+"usercontrols/landing/landing.css"],initialize:function(e){console.log("LANDING PAGE",e),l("load:css").publish(this.cssArr);var t=this;t.data={},t.selectedOptions=[],t.setOptions(e),t.setDefaults();try{typeof e=="object"&&!d.isUndefined(e.invite_model)?(this.invite_model=e.invite_model,console.log(this.invite_model),t.getUserData(this.invite_model)):t.render()}catch(n){console.error(n)}},checkForUser:function(){return d.isUndefined(this.invite_model)?!d.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1:(console.log("INVITE MODEL",this.invite_model,this.invite_model.get("payload").force_login),!d.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn||this.invite_model.get("payload").force_login==="true"||this.invite_model.get("payload").force_login===!0?!0:!1)},setDefaults:function(){this.data={headline:"",text:"And we mean all athletes.  It's simple: create a profile, connect with your team, share your games, post your highlights, get discovered."}},getUserData:function(e){var t=this;console.log(e);var n=e.get("payload");console.log(n);var r=new a({mpay:n.invite_to_obj,display_width:1920,display_height:1024}),i=r.parsedData;!d.isUndefined(n.fb_user_data)&&!d.isUndefined(n.fb_user_data.first_name)&&(this.data.headline="Hey "+n.fb_user_data.first_name,this.data.email=n.invite_email?n.invite_email:null),t.data.text=n.users_obj.name+" invited you to "+n.invite_type+" "+i._label+".  ",this.checkForUser()||(t.data.text+="Sign up now to get started!");var s={};typeof (i.imgData=="object")&&(s.background_image=i.imgData.url),console.log(i),t.render(s)},render:function(e){var t=this,n=h.to_html(t.template,t.data);this.$el=p(".register-wrapper-h"),console.log(n),this.$el.length||(p("body header").after('<div class="register-wrapper-h"></div>'),this.$el=p(".register-wrapper-h"),console.log(this.$el)),routing.off("hide-landing"),routing.on("hide-landing",t.hideLanding);var e=e||{};return e.width="100%",e.height="100%",e.title="&nbsp;",e.html=n,e.id="landing",e.fullPage=!0,e.addClass=["noBorder"],e.background_image==undefined&&(e.background_image="http://athletez.s3.amazonaws.com/resources/img/landing/7.jpg"),t.background_pic=new Image,t.background_pic.src=e.background_image,t.background_pic.onload=function(){console.log("IMAGE DATA",this,t.background_pic.height,t.background_pic.width),t.$el.html(n),t.$el.css({background:"url("+e.background_image+") no-repeat","background-size":"cover","background-position-y":"20%"}),routing.mobile&&t.$el.css({"background-position":"74% 0"}),routing.off("center-landing-image"),routing.on("center-landing-image",function(){t.centerBackgroundVertically()}),t.checkForUser()?t.showInvite():t.showReg()},this},centerBackgroundVertically:function(){var e=this;setTimeout(function(){var t=e.$el.height(),n=e.$el.width(),r=e.background_pic.height,i=e.background_pic.width,s=n/i,o=s*r,u=o-t;if(u>0){var a=u/2;e.$el.css({"background-position-y":"-"+a+"px"})}console.log(t,n,r,i,s,o,u)},0)},scrollToContent:function(e){p("html, body").animate({scrollTop:p("#main").offset().top},700)},setOptions:function(e){for(var t in e)this[t]=e[t]},showReg:function(){var e=this;this.regModel=new s,this.regView=new o({model:this.regModel,name:"Select Registration Type",destination:"#reg-landing",openAsaPage:!0,data:this.data,invite_hash:this.invite_model&&d.isObject(this.invite_model)?this.invite_model.get("payload").sechash:!1,showOnLanding:!0,fb_invite:this.userId!==undefined?this.userId:!1})},hideLanding:function(){p("div.register-wrapper-h").slideUp("slow")},showInvite:function(){var e=new f({model:this.invite_model,el:p("#reg-landing")})},signIn:function(e){this.regView.showLogin(e)},closePopup:function(){console.log("close popup"),routing.trigger("common-popup-close")}})});