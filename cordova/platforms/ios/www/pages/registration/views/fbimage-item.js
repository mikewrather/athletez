define(["vendor","views","utils","text!registration/templates/fbimage-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache;return i=o.extend({tagName:"li",className:"image",events:{click:"changeImage"},initialize:function(e){this.template=r},render:function(){var e=u.to_html(this.template,this.model.toJSON());return this.$el.html(e),this},changeImage:function(){Channel("changeimage"+this.model.collection.id).publish(this.model)}}),i});