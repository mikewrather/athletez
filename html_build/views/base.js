define(["facade","utils"],function(e,t){var n,r=e.Backbone,i=e.$,s=e._,o=e.toHTML,u=e.Deferred,a=e.Callbacks,f=t.lib,l=t.debug;return n=r.View.extend({initialize:function(e){e&&this.setOptions(e),this.deferred=new u,this.callbacks=a("unique")},setOptions:function(e){e.destination&&(this.destination=e.destination),e.template&&(this.template=e.template)},render:function(e,t,n){var r;return s.isFunction(this.confirmElement)&&this.confirmElement(),t=t||this.dataDecorator,r=this.toHTML(t,n),e=this.domInsertionMethod(e),this.$el[e](r),this.resolve(),this.callbacks.fire(this.$el),this},resolve:function(){var e=this;e.deferred.state()!=="resolved"?this.callbacks.add(e.deferred.resolve):this.callbacks.has(e.deferred.resolve)&&this.callbacks.remove(e.deferred.resolve)},confirmElement:function(){s.isUndefined(this.el)&&(this.$el=i(this.options.el));if(s.isUndefined(this.$el))throw new Error("View has no this.el or this.options.el property defined.")},toHTML:function(e,t){var n,r,i;r=this.model?this.model.toJSON():null,e&&s.isFunction(e)&&(r=e.call(this,r)),this.template=this.template||this.options.template;if(!this.template||!r)throw new Error("BaseView method toHTML called, but this.template or data is not defined.");return n=o(this.template,r,t),n},domInsertionMethod:function(e){var t="html",n=["append","html","prepend","text"],r;return e!==t&&e&&s.isString(e)&&s.contains(n,e)&&(r=e),r||t},dataDecorator:function(e){return e},callbacks:null,deferred:null,isReady:function(){return this.deferred.state()==="resolved"},addChildView:function(e,t){var n,r;if(!e)throw r="baseView addChildView expects view object as first arg.",new Error(r);return t&&!s.isEmpty(t)?n=function(){return e.render(),e.$el.appendTo(t.$el),e}:n=function(){return e.render()},n},getOuterHtml:function(e){return e[0].outerHTML?e[0].outerHTML:i("<div/>").html(e.eq(0).clone()).html()},destroy:function(){var e;this.removeSubscribers&&this.removeSubscribers(),this.$el.remove(),this.destination&&i(this.destination).empty();for(e in this)delete this[e]},addSubscribers:function(){},removeSubscribers:function(){this.$el.off()},abortRequest:function(e){var t=this;try{if(i.isArray(e)){for(var n in e)t.abortRequest(e[n]);e=[]}else e!=undefined&&e!=null&&(e.readyState&&e.readyState>0&&e.readyState<4&&e.abort(),e={})}catch(r){}}}),n});