define(["vendor","facade","views","utils","sportorg/views/team-item","text!sportorg/templates/team-list.html"],function(e,t,n,r,i,s){var o,u,a=t.$,f=t._,l=r.lib.Channel,c=n.CollectionView,h=e.Mustache;return SectionView=n.SectionView,u=c.extend(SectionView.prototype),o=u.extend({__super__:c.prototype,name:"Team List",_tagName:"li",_className:"team",template:s,_view:i,listView:".team-list-h",initialize:function(e){this.renderTemplate(),c.prototype.initialize.call(this,e);if(!this.collection)throw new Error("TeamListView expected options.collection.");f.bindAll(this),this.addSubscribers()},renderTemplate:function(){var e={};e.data=this.collection.toJSON(),console.log("Schedule Data",e.data);var t=h.to_html(this.template,e);return this.$el.html(t),this}}),o});