define(["vendor","views","utils","text!team/templates/season-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache,a=n.lib.Channel,i=o.extend({tagName:"li",className:"complevel",initialize:function(e){function o(){a("refresh-teampage").publish(n,i,s)}this.template=r;var t=this;this.id=e.model.collection.id;var n=this.model.collection.sport_id,i=this.model.collection.complevel_id,s=this.model.get("payload").season_id;a("teamseasons:select"+n+"-"+i+"-"+s).subscribe(o)},render:function(){var e=u.to_html(this.template,this.model.toJSON());return this.$el.html(e),this}});return i});