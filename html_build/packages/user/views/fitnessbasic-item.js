define(["vendor","views","utils","text!user/templates/fitnessbasic-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache;return i=o.extend({tagName:"li",className:"fitnessbasic",initialize:function(e){this.template=r},calculate:function(){if(this.unit_type=="time")var e="00:"+this.user_value+":00";else var e=this.user_value;return e},render:function(){var e={};e=this.model.toJSON(),e.view=this;var t=u.to_html(this.template,e);return this.$el.html(t),this}}),i});