define(["facade","utils","media/views/video-list","game/views/add-video"],function(e,t,n,r){var i,s=t.lib.Channel;return i=n.extend({setupAddView:function(){function i(n){t.model=n,t.render(),e.$el.append(t.el)}var e=this,t=new r({collection:this.collection}),n=this.addChildView(t);this.childViews.form=t,this.callbacks.add(function(){n()}),s("gameaddvideo:fetch").subscribe(i)}}),i});