define(["facade","views","utils","sportorg/views/competitorteam-item"],function(e,t,n,r){var i,s,o=e.$,u=e._,a=n.lib.Channel,f=t.CollectionView,l=t.SectionView;return s=f.extend(l.prototype),i=s.extend({__super__:f.prototype,id:"team-list",name:"Team List",tagName:"ul",_tagName:"li",_className:"team",_view:r,initialize:function(e){f.prototype.initialize.call(this,e);if(!this.collection)throw new Error("CompetitorTeamListView expected options.collection.");u.bindAll(this),this.addSubscribers()}}),i});