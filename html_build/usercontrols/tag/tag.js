define(["require","text!usercontrols/tag/templates/layout.html","facade","controller","models","views","usercontrols/tag/models/basic_info","usercontrols/tag/collections/sports","usercontrols/tag/views/main"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=r.$,f=r._,l=u.debug,c=u.lib.Channel,h=o.LayoutView,p=e("usercontrols/tag/models/basic_info"),d=e("usercontrols/tag/views/main"),n=i.extend({cssArr:["/usercontrols/tag/tag.css"],events:{},initialize:function(e){return c("load:css").publish(this.cssArr),f.bindAll(this),e.id&&(this.id=e.id),e.gender&&(this.gender=e.gender),this.init(),this},init:function(){this.setupLayout().render(),this.setUpMainView(),this.handleDeferreds()},setupLayout:function(){console.log("Set Up Layout Tag");if(this.layout)return this.layout;var e=new h({scheme:this.scheme,destination:"#main",template:"",displayWhen:"ready"});return this.layout=e,this.layout},setUpMainView:function(){console.log("Set Up Main View Tag"),c("tag-team-success").subscribe(this.tagFunction);var e=this;this.tagView=new d({model:new p,template:t,name:"tag-main",destination:"#main",user_id:e.id,channel:"tag-team-success"}),this.scheme.push(this.tagView),this.layout.render()},tagFunction:function(e){alert(JSON.stringify(e))}});return n});