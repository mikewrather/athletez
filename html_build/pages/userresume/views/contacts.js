define(["require","text!userresume/templates/contact.html","facade","views","utils","vendor","userresume/collections/contacts"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("userresume/collections/contacts"),h=s.extend({template:t,events:{},controls:{},messages:{dataNotExistContacts:"No Contacts."},initialize:function(e){s.prototype.initialize.call(this,e),n=this,n.setOptions(e),this.init()},render:function(){s.prototype.render.call(this)},setOptions:function(e){this.user_id=e.user_id},init:function(){n.setupView()},setupView:function(){n.setUpMainView(),n.setUpListView()},setUpMainView:function(){},setUpListView:function(){var e={user_id:n.user_id},r=new c(e);r.user_id=n.user_id,r.fetch(),l.when(r.request).done(function(){if(r.isError())return;n.contacts=r.parseAsRequired();if(n.contacts.length>0){var e=f.to_html(t,{data:n.contacts});l(n.el).find(n.el).html(e)}else n.$el(n.controls.ContainerGpa).html(n.messages.dataNotExistContacts)})}});return h});