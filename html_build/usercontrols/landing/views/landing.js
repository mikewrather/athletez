define(["require","text!usercontrols/landing/templates/landing.html","text!usercontrols/landing/landing.css","signup/models/registerbasic","signup/views/registerbasic","facade","views","utils","vendor"],function(e){var t=e("facade"),n=e("views"),r=n.SectionView,i=e("utils"),s=e("signup/models/registerbasic"),o=e("signup/views/registerbasic"),u=i.lib.Channel,a=e("vendor"),f=a.Mustache,l=t.$,c=n.BaseView,h=t.Backbone,p,d=e("text!usercontrols/landing/templates/landing.html");return c.extend({template:d,events:{"click #browse":"closePopup","click #sign-in":"signIn"},cssArr:["usercontrols/landing/landing.css"],initialize:function(e){u("load:css").publish(this.cssArr),p=this,p.data={},p.selectedOptions=[],p.setOptions(e),p.render()},render:function(){function s(){u("popup-finished-launch-"+n.id).unsubscribe(),e.showReg()}var e=this,t=f.to_html(e.template,e.data),n={};n.width="100%",n.height="100%",n.title="&nbsp;",n.html=t,n.id="landing",n.addClass=["noBorder"];var r=Math.ceil(Math.random()*100),i=["1.jpg","2.jpg","3.jpg"];return console.log(r,r%i.length),n.background_image="http://cdn.athletez.com/resources/img/landing/"+i[r%i.length],console.error(n),routing.trigger("common-popup-open",n),this.$el=l("#landing .modal-body"),u("popup-finished-launch-"+n.id).subscribe(s),this},setOptions:function(e){for(var t in e)this[t]=e[t]},showReg:function(){this.regModel=new s,this.regView=new o({model:this.regModel,name:"Select Registration Type",destination:"#reg-landing",openAsaPage:!0,showOnLanding:!0})},signIn:function(e){this.regView.showLogin(e)},closePopup:function(){console.log("close popup"),routing.trigger("common-popup-close")}})});