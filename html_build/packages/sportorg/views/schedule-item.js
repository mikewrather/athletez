define(["vendor","views","utils","text!sportorg/templates/schedule-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache;return i=o.extend({tagName:"li",className:"schedule",initialize:function(e){this.template=r},render:function(){var e=u.to_html(this.template,this.model.toJSON());return this.$el.html(e),this}}),i});