define(["facade","views/base","utils"],function(e,t,n){var r,i=e.$,s=e._,o=e.Backbone,u=n.debug;return r=t.extend({initialize:function(e){var n,r;if(!this.collection||!(this.collection instanceof o.Collection))throw r="CollectionView initialize: no collection provided.",new Error(r);t.prototype.initialize.call(this,e),this._view=this.options.view||this._view;if(!this._view)throw new Error("CollectionView initialize: no view provided.");this._tagName=this.options.tagName||this._tagName;if(!this._tagName)throw new Error("CollectionView initialize: no tag name provided.");this._className=this.options.className||this._className,this._decorator=this.options.decorator||this._decorator,this._id=this.options.id||this._id,this._temp=this.options._template||this._template,this._views=[],s(this).bindAll("add","remove","reset"),this.setupCollection()},setupCollection:function(){var e=this.options.collection||this.collection;e.on("reset",this.reset),e.on("add",this.add),e.on("remove",this.remove),!e.length&&!e.request?(e.request=e.fetch(),e.request.done(function(){e.each(e.add)})):e.each(this.add)},reset:function(){this._views=[]},addRecords:function(){alert("add records"),console.log(this._views);var e=this.collection;delete this._views,this._views=[],e.each(this.add)},add:function(e){var t;t=new this._view({tagName:this._tagName,model:e,template:this._temp,className:this._className,decorator:this._decorator}),this._views.push(t),this._rendered?this.listView?this.prepend?this.$el.find(this.listView).prepend(t.render().el):this.$el.find(this.listView).append(t.render().el):this.$el.append(t.render().el):this.$el.append(t.render().el)},remove:function(e){var t;t=s(this._views).select(function(t){return t.model===e})[0],this._views=s(this._views).without(t),this._rendered&&t.destroy()},render:function(){return this.confirmElement.call(this),this._rendered=!0,this.listView||this.$el.empty(),s(this._views).each(function(e){this.listView?this.prepend?this.$el.find(this.listView).prepend(e.render().el):this.$el.find(this.listView).append(e.render().el):this.$el.append(e.render().el),e.options.decorator&&s.isFunction(e.options.decorator)&&e.options.decorator(e)},this),this.resolve.call(this),this.callbacks.fire.call(this),this}}),r});