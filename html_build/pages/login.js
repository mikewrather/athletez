define(["require","text!login/templates/layout.html","facade","controller","models","views","utils","login/models/Loginmodel","login/views/Loginview"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=e("login/models/Loginmodel"),f=e("login/views/Loginview"),l=o.LayoutView,c=r.$,h=r._,p=u.debug,d=u.lib.Channel,v=["/pages/imageup/imageup.css"];return LoginController=i.extend({initialize:function(e){return d("load:css").publish(v),h.bindAll(this),this.handleOptions(e),this.init(),this},init:function(){this.refreshPage(),this.setupLayout(),this.createData(),this.refreshPage(),this.handleDeferreds()},setupLayout:function(){return this.scheme=[],c("div#LoginPopup").remove(),c("body").append('<div id="LoginPopup"></div>'),pageLayout=new l({scheme:this.scheme,destination:"#LoginPopup",template:t,displayWhen:"ready"}),this.layout=pageLayout,this.layout},createData:function(){this.login_type=new a},refreshPage:function(){this.loginView&&(c(this.loginView.destination).html(""),position=c.inArray(this.loginView,this.scheme),~position&&this.scheme.splice(position,1))},showPopup:function(){c("#imgUploadModal").modal("show"),c("#imgUploadModal").on("hidden",function(){}),c("#imgUploadModal").on("hide",function(){})},handleDeferreds:function(){var e=this;routing.off("Login"),routing.on("Login",function(){e.setupLoginView()})},setupLoginView:function(){this.loginView=new f({model:this.login_type,name:"Login View",destination:"#main-content-reg"}),this.scheme.push(this.selectTypeView),this.layout.render()}}),LoginController});