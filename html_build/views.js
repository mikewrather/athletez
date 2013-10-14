define("views/base",["facade","utils"],function(e,t){var n,r=e.Backbone,i=e.$,s=e._,o=e.toHTML,u=e.Deferred,a=e.Callbacks,f=t.lib,l=t.debug;return n=r.View.extend({initialize:function(e){e&&this.setOptions(e),this.deferred=new u,this.callbacks=a("unique")},setOptions:function(e){e.destination&&(this.destination=e.destination),e.template&&(this.template=e.template)},render:function(e,t,n){var r;return s.isFunction(this.confirmElement)&&this.confirmElement(),t=t||this.dataDecorator,r=this.toHTML(t,n),e=this.domInsertionMethod(e),this.$el[e](r),this.resolve(),this.callbacks.fire(this.$el),this},resolve:function(){var e=this;e.deferred.state()!=="resolved"?this.callbacks.add(e.deferred.resolve):this.callbacks.has(e.deferred.resolve)&&this.callbacks.remove(e.deferred.resolve)},confirmElement:function(){s.isUndefined(this.el)&&(this.$el=i(this.options.el));if(s.isUndefined(this.$el))throw new Error("View has no this.el or this.options.el property defined.")},toHTML:function(e,t){var n,r,i;r=this.model?this.model.toJSON():null,e&&s.isFunction(e)&&(r=e.call(this,r)),this.template=this.template||this.options.template;if(!this.template||!r)throw new Error("BaseView method toHTML called, but this.template or data is not defined.");return n=o(this.template,r,t),n},domInsertionMethod:function(e){var t="html",n=["append","html","prepend","text"],r;return e!==t&&e&&s.isString(e)&&s.contains(n,e)&&(r=e),r||t},dataDecorator:function(e){return e},callbacks:null,deferred:null,isReady:function(){return this.deferred.state()==="resolved"},addChildView:function(e,t){var n,r;if(!e)throw r="baseView addChildView expects view object as first arg.",new Error(r);return t&&!s.isEmpty(t)?n=function(){return e.render(),e.$el.appendTo(t.$el),e}:n=function(){return e.render()},n},getOuterHtml:function(e){return e[0].outerHTML?e[0].outerHTML:i("<div/>").html(e.eq(0).clone()).html()},destroy:function(){var e;this.removeSubscribers&&this.removeSubscribers(),this.$el.remove(),this.destination&&i(this.destination).empty();for(e in this)delete this[e]},addSubscribers:function(){},removeSubscribers:function(){this.$el.off()},abortRequest:function(e){var t=this;try{if(i.isArray(e)){for(var n in e)t.abortRequest(e[n]);e=[]}else e!=undefined&&e!=null&&(e.readyState&&e.readyState>0&&e.readyState<4&&e.abort(),e={})}catch(r){console.error(r)}finally{return e||[]}}}),n}),define("views/collection",["facade","views/base","utils"],function(e,t,n){var r,i=e.$,s=e._,o=e.Backbone,u=n.debug;return r=t.extend({initialize:function(e){var n,r;if(!this.collection||!(this.collection instanceof o.Collection))throw r="CollectionView initialize: no collection provided.",new Error(r);t.prototype.initialize.call(this,e),this._view=this.options.view||this._view;if(!this._view)throw new Error("CollectionView initialize: no view provided.");this._tagName=this.options.tagName||this._tagName;if(!this._tagName)throw new Error("CollectionView initialize: no tag name provided.");this._className=this.options.className||this._className,this._decorator=this.options.decorator||this._decorator,this._id=this.options.id||this._id,this._temp=this.options._template||this._template,this.singleView=this.options.singleView||this.singleView,this._views=[],s(this).bindAll("add","remove","reset"),this.setupCollection()},setupCollection:function(){var e=this.options.collection||this.collection;e.on("reset",this.reset),e.on("add",this.add),e.on("remove",this.remove),!e.length&&!e.request?(e.request=e.fetch(),e.request.done(function(){e.each(e.add)})):e.each(this.add)},reset:function(){this._views=[]},addRecords:function(){alert("add records"),console.log(this._views);var e=this.collection;delete this._views,this._views=[],e.each(this.add)},add:function(e){var t;t=new this._view({tagName:this._tagName,model:e,teamView:this.singleView,template:this._temp,className:this._className,decorator:this._decorator}),this._views.push(t),this._rendered?this.listView?this.prepend?this.$el.find(this.listView).prepend(t.render().el):this.$el.find(this.listView).append(t.render().el):this.$el.append(t.render().el):this.$el.append(t.render().el)},remove:function(e){var t;t=s(this._views).select(function(t){return t.model===e})[0],this._views=s(this._views).without(t),this._rendered&&t.destroy()},render:function(){return this.confirmElement.call(this),this._rendered=!0,this.listView||this.$el.empty(),s(this._views).each(function(e){this.listView?this.prepend?this.$el.find(this.listView).prepend(e.render().el):this.$el.find(this.listView).append(e.render().el):this.$el.append(e.render().el),e.options.decorator&&s.isFunction(e.options.decorator)&&e.options.decorator(e)},this),this.resolve.call(this),this.callbacks.fire.call(this),this}}),r}),define("views/layout",["facade","views/base","utils"],function(e,t,n){var r,i=e.$,s=e._,o=n.lib,u=e.Backbone,a=o.Channel,f=n.debug,l=Array.prototype.slice;return f=n.debug,r=t.extend({scheme:null,schemeViewNames:null,initialize:function(e,t){e&&this.setOptions(e),t&&t.route&&this.addController(t)},addController:function(e){e.layout||(e.layout=this),e.data&&this.handleStateData(e.data),this.controller||(this.controller=e),s.each(this.schemeViewNames,function(t){t&&s.isString(t)&&s.isFunction(e.addStateChangeSubscriber)&&e.addStateChangeSubscriber(t)})},setOptions:function(e){var n;t.prototype.setOptions.apply(this,l.call(arguments));if(!this.template&&!s.isString(this.template)&&!this.destination)throw n="LayoutView expected template and destination options for initialization.",new Error(n);this.setSchemeOption(e),this.setDisplayWhenOption(e),this.setTransitionMethodOption(e)},setSchemeOption:function(e){var t,n;if(!e.scheme&&!s.isArray(e.scheme))throw t="LayoutView expected a scheme array for initialization.",new Error(t);this.scheme=e.scheme,n=[],s.each(this.scheme,function(e){n.push(e.name)}),this.schemeViewNames=n,i(this.destination).html(this.template)},setDisplayWhenOption:function(e){if(e.displayWhen){if(e.displayWhen!=="ready"&&e.displayWhen!=="resolved")throw msg="LayoutView option for displayWhen value must be 'resolved' or 'ready'",new Error(msg)}else e.displayWhen="resolved";f.log("LayoutView setDisplayWhenOption: "+e.displayWhen)},setTransitionMethodOption:function(e){var t;if(e.transitionMethod){if(e.transitionMethod!=="showHide")throw t="LayoutView option for transitionMethod is not valid, expected 'showHide'.",new Error(t)}else e.transitionMethod="showHide"},section:function(e){var t=s.find(this.scheme,function(t){return t.name===e});return t},render:function(e){var t=this.options;console.log("--------------->>>>   "+t.displayWhen),t.displayWhen&&(t.displayWhen==="ready"?this.displayWhenReady(e):t.displayWhen==="resolved"&&this.displayWhenResolved(e))},displayViews:function(){var e=this.scheme,t=this;s.each(e,function(e){t.section(e.name).display(!0)})},displayWhenResolved:function(e){var t=this,n=[];s.each(this.scheme,function(e){var t;if(!e.deferred)throw t="LayoutView displayWhenResolved expected ",t+=e.name,t+=" view to have a deferred property",new Error(t);n.push(e.deferred)}),i.when.apply(i,n).then(function(){t.displayViews(),e&&s.isFunction(e)&&e(),a("layout:ready").publish()},function(){var t;throw t="LayoutView render could not complete all of the scheme's views.",new Error(t)})},displayWhenReady:function(e){var t=this.scheme,n=this;t.length&&s.each(t,function(e){var t=n.section(e.name);t.isRendered()?t.display(!0):t.isNotRendered()&&(t.render.call(t),t.deferred.done(function(){t.display(!0)}))}),e&&s.isFunction(e)&&e()},transition:function(e,t){var n;if(!!s.contains(this.schemeViewNames,e)){if(!t||t&&(!t.state||!t.display))throw n="LayoutView transition for "+e,n+=" requires a SectionView with methods for state and display",new Error(n);this.section(e).display(!1),t.isNotRendered()?(t.render(),t.deferred.done(function(){t.display(!0)})):t.display(!0)}},clearLayoutScheme:function(){var e;for(var e in this.scheme)typeof this.scheme=="object"&&(this.scheme[e].destroy(),delete this.scheme[e]);this.scheme=null,this.schemeViewNames=null},remove:function(){this.clearLayoutScheme(),t.prototype.remove.call(this)},state:function(e,t){var n=this,r,i;return n.meta||(n.meta={}),e?s.isObject(e)&&s.each(e,function(e,i){if(s.contains(n.schemeViewNames,i)){r=n.section(i);try{r.state(e.state,t,r)}catch(o){f.log(o)}}else n.meta[i]=e}):(n.controller&&n.controller.route?i=n.controller.route:i=window.location.pathname,e={route:i},n.controller&&(e.meta=n.controller.meta),s.each(n.scheme,function(t){e[t.name]={state:t.state(),meta:t.meta()}})),e},displayChangeHandler:function(e,t){var n,r;if(!e||!t||e===t)throw new Error("SectionView stateChangeHandler expected lastState and state arguemnts to be different");if(e==="not-displayed"||e==="displayed"){if(t==="not-displayed"||t==="displayed")n=t.indexOf("not-",0)!==0,this.display(n)}else e==="not-rendered"&&(this.render(),t==="displayed"?this.display(!0):t==="not-displayed"&&this.display(!1))},handleStateData:function(e){var t=this;s.each(e,function(e,n,r){s.each(t.schemeViewNames,function(r,i,s){var o={};r===n&&(o[n]=e,t.state(o,t.displayChangeHandler))})})}}),r}),define("views/section",["facade","views/base","utils"],function(e,t,n){var r,i,s,o=e._,u=e.$,a=n.lib.Channel,f=n.debug;return s=["not-rendered","rendered","not-displayed","displayed"],r=function(){},r.prototype._viewState=s[0],r.prototype.state=function(e,t,n){var r=this._viewState,i;if(e){if(!o.isString(e)||!o.contains(s,e))throw new Error("Section state ("+e+") not allowed.");r!==e?((t||o.isFunction(t))&&t.call(n||this,r,e),this._viewState=e,a(this.name+":stateChanged").publish(r,e)):this._viewState||(this._viewState=e),i="view "+this.name+" ("+this.cid+")",i+=" state was: ["+r+"], state set to: ["+e+"]"}else e=this._viewState;return e},r.prototype.isRendered=function(){return this.state()==="rendered"},r.prototype.isNotRendered=function(){return this.state()==="not-rendered"},r.prototype.isDisplayed=function(){return this.state()==="displayed"},r.prototype.isNotDisplayed=function(){return this.state()==="not-displayed"},i=t.extend({__super__:t.prototype,initialize:function(e){var t;o.bindAll(this);if(!e||e&&!e.name&&!e.destination)throw t="Section initialize method requires an 'options' {object}",t+=" as argument, with 'name' and 'destination' {string} properties",new Error(t);this.destination=e.destination,this.name=e.name,this.state(e.state||"not-rendered"),this.__super__.initialize.call(this,e)},render:function(e,t,n){function i(){r.state("rendered")}var r=this;this.callbacks.add(i),this.__super__.render.call(this,e,t,n),this.afterRender&&this.afterRender()},display:function(e){var t=e,n,r;if(o.isUndefined(t)||!o.isBoolean(t))throw r="SectionView display method expects {boolean} argument.",new Error(r);if(this.state()==="not-rendered")throw r="SectionView ("+this.name+") cannot display, view state is 'not-rendered'.",new Error(r);n=u(this.destination),t&&(n.html(this.$el),this.state("displayed")),!t&&this.state()==="displayed"&&(n.html(""),this.state("not-displayed"))},meta:function(e){return e?(this._meta=this._meta||{},o.each(e,function(e,t){this._meta[t]=e})):e=this._meta,this._meta},setDropdownOptions:function(e,t,n,r,i){var s="";i?s+='<option value="">'+i+"</option>":s+='<option value="">Select</option>';if(e!=null&&e.length>0)for(var o in e)s+='<option value="'+e[o][n]+'">'+e[o][t]+"</option>";this.$el.find(r).html(s)},isValidAutoCompleteKey:function(e){if(e){var t=e.keyCode?e.keyCode:e.which;if(t>=59&&t<=90||t>=96&&t<=105||t==8||t==32||t==46)return!0}return!1},sort:function(e,t,n){e.sort(function(e,r){return n==1?e[t]<r[t]?1:r[t]<e[t]?-1:0:e[t]<r[t]?-1:r[t]<e[t]?1:0})},isEnterKey:function(e){if(e){var t=e.keyCode?e.keyCode:e.which;if(t==13)return!0}return!1},showLoader:function(e){var t=u(".loading-div");t.length?t.show():u(e.$el).append('<div class="loader loading-div"></div>')},hideLoader:function(){u(".loading-div").hide()}}),o.extend(i.prototype,r.prototype),i}),define("views",["views/base","views/collection","views/layout","views/section"],function(e,t,n,r){return{BaseView:e,CollectionView:t,LayoutView:n,SectionView:r}});