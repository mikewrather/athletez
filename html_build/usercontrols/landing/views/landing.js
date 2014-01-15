define(["require","text!usercontrols/landing/templates/landing.html","text!usercontrols/landing/landing.css","signup/models/registerbasic","signup/views/registerbasic","facade","views","utils","usercontrols/landing/models/fb-user","common/models/entparse","vendor"],function(e){var t=e("facade"),n=e("views"),r=n.SectionView,i=e("utils"),s=e("signup/models/registerbasic"),o=e("signup/views/registerbasic"),u=e("usercontrols/landing/models/fb-user"),a=e("common/models/entparse");Channel=i.lib.Channel,vendor=e("vendor"),Mustache=vendor.Mustache,$=t.$;var f=n.BaseView,l=t.Backbone,c,h=e("text!usercontrols/landing/templates/landing.html");return f.extend({template:h,events:{"click #browse":"closePopup","click #sign-in":"signIn"},cssArr:["usercontrols/landing/landing.css"],initialize:function(e){Channel("load:css").publish(this.cssArr);var t=this;t.data={},t.selectedOptions=[],t.setOptions(e);try{typeof e=="object"&&e.userId?(t.userId=e.userId,t.getUserData()):t.render()}catch(n){console.log(n)}},getUserData:function(){var e=this,t=new u;t.fbUserId=this.userId,t.fetch(),$.when(t.request).done(function(){var n=t.get("payload"),r=new a({mpay:n.invite_to_obj,display_width:1920,display_height:1024}),i=r.parsedData;e.data={firstname:n.fb_user_data.first_name,lastname:n.fb_user_data.last_name,label:i._noicon_text+" "+i._label};var s={};typeof (i.imgData=="object")&&(s.background_image=i.imgData.url),console.log(i),e.render(s)})},render:function(e){function s(){Channel("popup-finished-launch-"+e.id).unsubscribe(),routing.showLandingPage=!1,t.showReg()}var t=this,n=Mustache.to_html(t.template,t.data),e=e||{};e.width="100%",e.height="100%",e.title="&nbsp;",e.html=n,e.id="landing",e.fullPage=!0,e.addClass=["noBorder"];if(e.background_image==undefined){var r=Math.ceil(Math.random()*100),i=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];e.background_image="http://athletez.s3.amazonaws.com/resources/img/landing/"+i[r%i.length]}return console.error(e),routing.trigger("common-popup-open",e),this.$el=$("#landing .modal-body"),Channel("popup-finished-launch-"+e.id).subscribe(s),this},setOptions:function(e){for(var t in e)this[t]=e[t]},showReg:function(){this.regModel=new s,this.regView=new o({model:this.regModel,name:"Select Registration Type",destination:"#reg-landing",openAsaPage:!0,data:this.data,showOnLanding:!0})},signIn:function(e){this.regView.showLogin(e)},closePopup:function(){console.log("close popup"),routing.trigger("common-popup-close")}})});