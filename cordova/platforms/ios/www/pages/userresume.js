define(["require","text!userresume/templates/layout.html","text!userresume/templates/sentresume.html","text!userresume/templates/basic_info_header.html","text!userresume/templates/rdtree.html","text!userresume/templates/academic.html","text!userresume/templates/awards.html","text!userresume/templates/contact.html","text!userresume/templates/references.html","facade","controller","models","views","utils","profilesetting/models/basic_info","userresume/models/resume","userresume/models/rdtree","userresume/models/gpa","userresume/models/award","userresume/models/contact","userresume/models/reference","profilesetting/views/basic_info","userresume/views/sentresumeview","userresume/views/rdtree","userresume/views/academic","userresume/views/awards","userresume/views/contacts","userresume/views/references"],function(e,t,n,r,i,s,o,u,a){var f,l=e("facade"),c=e("controller"),h=e("models"),p=e("views"),d=e("utils"),v=l.$,m=l._,g=d.debug,y=d.lib.Channel,b=p.LayoutView,w=e("profilesetting/models/basic_info"),E=e("userresume/models/resume"),S=e("userresume/models/rdtree"),x=e("userresume/models/gpa"),T=e("userresume/models/award"),N=e("userresume/models/contact"),C=e("userresume/models/reference"),k=e("profilesetting/views/basic_info"),L=e("userresume/views/sentresumeview"),A=e("userresume/views/rdtree"),O=e("userresume/views/academic"),M=e("userresume/views/awards"),_=e("userresume/views/contacts"),D=e("userresume/views/references"),f=c.extend({cssArr:[base_url+"pages/profilesetting/profilesettings.css"],events:{},initialize:function(e){return y("load:css").publish(this.cssArr),m.bindAll(this),this.scheme=[],e.id&&(this.id=e.id,this.init()),this},init:function(){this.setupLayout().render(),this.setupView(),this.handleDeferreds()},setupLayout:function(){var e;if(this.layout)return this.layout;var e=new b({scheme:this.scheme,destination:"#main",template:t,displayWhen:"ready"});return this.layout=e,this.layout},setupView:function(){var e=this;this.basicInfoModel=new w,this.basicInfoModel.id=e.id,this.basicInfoModel.fetch(),v.when(this.basicInfoModel.request).done(function(){var t=e.basicInfoModel.toJSON();e.gender=t.payload.gender,e.setUpBasicView(),e.setUpSentResumeView(),e.setUpRdTreeView()})},setUpBasicView:function(){var e=this;this.basicView=new k({model:new w,template:r,name:"basic-info",destination:"#section-basics-prof-setting",user_id:e.id,id:e.id}),this.scheme.push(this.basicView)},setUpSentResumeView:function(){var e=this;this.sentResumeView=new L({model:new E,template:n,name:"sent-resume",destination:"#section-sent-resume",user_id:e.id,id:e.id}),this.scheme.push(this.sentResumeView),this.layout.render()},setUpRdTreeView:function(){var e=this;this.rdTreeView=new A({model:new S,template:i,name:"rd-tree",destination:"#section-RD-Tree",user_id:e.id}),this.scheme.push(this.rdTreeView),this.layout.render()},setUpAcademicView:function(){var e=this;this.academicView=new O({model:new x,template:s,name:"resume-academic",destination:"#section-academic",user_id:e.id}),this.scheme.push(this.academicView),this.layout.render()},setUpAwardsView:function(){var e=this;this.awardsView=new M({model:new T,template:o,name:"resume-awards",destination:"#section-awards",user_id:e.id}),this.scheme.push(this.awardsView),this.layout.render()},setUpContactsView:function(){var e=this;this.contactsView=new _({model:new N,template:u,name:"resume-contacts",destination:"#section-contacts",user_id:e.id}),this.scheme.push(this.contactsView),this.layout.render()},setUpReferenceView:function(){var e=this;this.referenceView=new D({model:new C,template:a,name:"resume-references",destination:"#section-references",user_id:e.id}),this.scheme.push(this.referenceView),this.layout.render()}});return f});