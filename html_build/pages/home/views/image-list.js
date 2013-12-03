define(["facade","views","utils","media/views/image-item"],function(e,t,n,r){var i,s,o=e.$,u=e._,a=n.lib.Channel,f=t.CollectionView,l=t.SectionView;return s=f.extend(l.prototype),i=s.extend({__super__:f.prototype,id:"image-list",name:"Image List",tagName:"ul",_tagName:"li",_className:"image",events:{"click .open-photo-player-h":"initPhotoPlayer"},_view:r,initialize:function(e){var t=this;this.name=e.name||this.name,this.media_id=e.media_id,this.pageName=e.pageName,this.userId=e.user_id,f.prototype.initialize.call(this,e);if(!this.collection)throw new Error("ImageListView expected options.collection.");u.bindAll(this),this.addSubscribers(),t.media_id&&setTimeout(function(){var e=t.collection.toArray();if(e)for(var n in e)if(t.media_id==e[n].get("payload").media_id){routing.trigger("photo-player-init",n,t.collection,t.collection.id,undefined,t.pageName);break}},500)},initPhotoPlayer:function(e){e.preventDefault();var t=o(e.target).parents("li").index();routing.trigger("photo-player-init",t,this.collection,this.collection.id,undefined,this.pageName)},childViews:{}}),i});