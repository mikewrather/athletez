define(["facade","views","utils","sport/views/sport-item","jqueryui","jquery.slimscroll"],function(e,t,n,r){var i,s,o=e.$,u=e._,a=n.lib.Channel,f=n.debug;return CollectionView=t.CollectionView,SectionView=t.SectionView,s=CollectionView.extend(SectionView.prototype),i=s.extend({__super__:CollectionView.prototype,className:"sport-list",name:"Sport List",tagName:"ul",_tagName:"li",_className:"sport",_view:r,initialize:function(e){s.prototype.initialize.call(this,e);if(!this.collection)throw new Error("SportListView expected options.collection.");u.bindAll(this),this.name=e.name||this.name,this._tagName=e._tagName||this._tagName,this.tagName=e.tagName||this.tagName,this._className=e._className||this._className,this._view=e._view||this._view,this.addSubscribers()},initScroll:function(){o("."+this.className).slimScroll({height:"200px"})},addSubscribers:function(){var e=this;a("layout:ready").subscribe(e.initScroll)},childViews:{}}),i});