define(["require","text!votes/templates/vote.html","views","vendor","facade","utils","jqueryui","controller","votes/models/vote","votes/models/follow"],function(e,t){var n,r=e("views"),i=e("facade"),s=e("utils"),o=r.SectionView,u=i.$,a=i._,f=s.debug,l=e("vendor"),c=l.Mustache,h=s.lib.Channel,p=e("votes/models/vote"),d=e("votes/models/follow");return n=o.extend({template:t,events:{"click .team-action-h":"vote","click .follow-action-h":"follow"},vote:function(){this.voteModelOb.save()},follow:function(){this.followModelOb.save()},initialize:function(e){var t=this;console.log(e),a.bindAll(this),o.prototype.initialize.call(this,e);var n=this.model.get("payload");console.log(n),this.voteModelOb=new p,this.voteModelOb.userId=e.userId,this.voteModelOb.entity_id=n.enttypes_id,this.voteModelOb.setData(),this.followModelOb=new d,this.followModelOb.userId=e.userId,this.followModelOb.entity_id=n.enttypes_id},render:function(e,t,n){o.prototype.render.call(this,e,t,n)}}),n});