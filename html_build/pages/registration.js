define(["require","text!signup/templates/layout.html","text!registration/templates/layout.html","facade","controller","models","views","utils","registration/models/select_type","registration/models/register_facebook","registration/models/register_email","registration/models/upload_image","registration/models/select_org","registration/views/select_type","registration/views/register_facebook","registration/views/register_email","registration/views/upload_image","registration/views/select_org","signup/views/shopopup"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=e("registration/models/select_type"),f=e("registration/models/register_facebook"),l=e("registration/models/register_email"),c=e("registration/models/upload_image"),h=e("registration/models/select_org"),p=e("registration/views/select_type"),d=e("registration/views/register_facebook"),v=e("registration/views/register_email"),m=e("registration/views/upload_image"),g=e("registration/views/select_org"),y=o.LayoutView,b=r.$,w=r._,E=u.debug,S=u.storage,x=u.lib.Channel,T=[base_url+"pages/registration/registration.css",base_url+"pages/signup/css/signupstyle.css",base_url+"css/style.jrac.css"];return n=i.extend({initialize:function(e){return x("load:css").publish(T),this.callback=e.callback,w.bindAll(this),this.handleOptions(e),this.init(),this},init:function(){ga("send","event","Signup","Header","Loading reg header"),this.setupLayout().render(),this.refreshPage(),this.createData(),this.handleDeferreds()},createData:function(){this.select_type=new a},handleDeferreds:function(){function t(){e.initRegisterFacebook()}function n(){e.initRegisterEmail()}function r(){e.uploadImage()}function i(t){e.selectOrg(t)}var e=this;routing.off("registration-with-facebook"),routing.on("registration-with-facebook",function(t,n){e.initRegisterFacebook(t,n)}),x("registration-select-org").subscribe(i)},refreshPage:function(){var e;this.selectTypeView&&(b(this.selectTypeView.destination).html(""),e=b.inArray(this.selectTypeView,this.scheme),~e&&this.scheme.splice(e,1)),this.registerFacebookView&&(b(this.registerFacebookView.destination).html(""),e=b.inArray(this.registerFacebookView,this.scheme),~e&&this.scheme.splice(e,1)),this.registerEmailView&&(b(this.registerEmailView.destination).html(""),e=b.inArray(this.registerEmailView,this.scheme),~e&&this.scheme.splice(e,1)),this.selectOrgView&&(b(this.selectOrgView.destination).html(""),e=b.inArray(this.selectOrgView,this.scheme),~e&&this.scheme.splice(e,1))},setupSelectTypeView:function(){this.selectTypeView=new p({model:this.select_type,name:"Select Registration Type",destination:"#main-content"}),this.scheme.push(this.selectTypeView),this.layout.render()},initRegisterFacebook:function(e,t){var n=this;this.refreshPage(),this.register_facebook=new f,this.register_facebook.bind("request",n.handleProgress,this),this.register_facebook.fetch(),b.when(this.register_facebook.request).done(function(r){var i={id:"cookieValue",value:r.payload.token},s=new S("authautologin","localStorage");s.create(i);var o={id:"cookieValue",value:r.payload.session},u=new S("session","localStorage");u.create(o),console.log(r,n.register_facebook.request),!w.isUndefined(t)&&w.isObject(t)&&t.save(),console.log(r.payload.identity_exists,"payload"),r.payload.identity_exists==1?location.reload():n.setupRegisterFacebookView(e)}).fail(function(e){n.setupRegisterFacebookView()})},handleProgress:function(e){},setupRegisterFacebookView:function(e,t){this.registerFacebookView=new d({model:this.register_facebook,name:"Registration with Facebook",destination:"#main-contentreg",callback:e,inviteModel:t}),this.scheme.push(this.registerFacebookView),this.layout.render()},initRegisterEmail:function(){var e=this;this.refreshPage(),this.register_email=new l,e.setupRegisterEmailView()},setupRegisterEmailView:function(){this.registerEmailView=new v({model:this.register_email,name:"Registration with Email Address",destination:"#main-content"}),this.scheme.push(this.registerEmailView),this.layout.render()},uploadImage:function(){var e=this;this.refreshPage(),this.upload_image=new c,this.setupUploadImageView()},setupUploadImageView:function(){this.uploadImageView=new m({model:this.upload_image,name:"Registration Upload Image",destination:"#main-content"}),this.scheme.push(this.uploadImageView),this.layout.render()},selectOrg:function(e){var t=this;this.refreshPage(),this.select_org=new h,this.select_org.id=e.id,this.select_org.fetch(),b.when(this.select_org.request).done(function(){t.setupSelectOrgView()})},setupSelectOrgView:function(){this.selectOrgView=new g({model:this.select_org,name:"Registration Select Org",destination:"#main-content"}),this.scheme.push(this.selectOrgView),this.layout.render()},setupLayout:function(){return this.scheme=[],b("#regModelPopup").length||b("body").append('<div id="regModelPopup"></div>'),pageLayout=new y({scheme:this.scheme,destination:"#setupLayout",template:t,displayWhen:"ready"}),this.layout=pageLayout,this.layout}}),n});