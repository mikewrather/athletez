define(["facade","views","utils","sportorg/views/teamroster-item"],function(e,t,n,r){var i,s,o=e.$,u=e._,a=n.lib.Channel,f=t.CollectionView,l=t.SectionView;return s=f.extend(l.prototype),i=s.extend({__super__:f.prototype,id:"teamroster-list",name:"Team Roster List",tagName:"ul",_tagName:"li",_className:"teamroster",_view:r,initialize:function(e){f.prototype.initialize.call(this,e);if(!this.collection)throw new Error("TeamRosterListView expected options.collection.");u.bindAll(this),this.addSubscribers()}}),i});