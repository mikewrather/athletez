define(["require","text!login/templates/logintemplate.html","backbone","underscore","views","facade","utils"],function(e,t,n,r){var i,s=e("facade"),o=e("views"),u=e("utils"),a=u.lib.Channel,f=n.View;return SigninBasicView=f.extend({initialize:function(e){this.template=r.template(t),this.$el=$("#main"),this.render()},render:function(){this.$el.html(this.template)},events:{"click a#signup":"signupUser"},signupUser:function(e){e.preventDefault(),routing.trigger("add-user")}}),SigninBasicView});