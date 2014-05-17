define(["facade","views/base","utils"],function(e,t,n){var r,i,s,o=e._,u=e.$,a=n.lib.Channel,f=n.debug;return s=["not-rendered","rendered","not-displayed","displayed"],r=function(){},r.prototype._viewState=s[0],r.prototype.state=function(e,t,n){var r=this._viewState,i;if(e){if(!o.isString(e)||!o.contains(s,e))throw new Error("Section state ("+e+") not allowed.");r!==e?((t||o.isFunction(t))&&t.call(n||this,r,e),this._viewState=e,a(this.name+":stateChanged").publish(r,e)):this._viewState||(this._viewState=e),i="view "+this.name+" ("+this.cid+")",i+=" state was: ["+r+"], state set to: ["+e+"]"}else e=this._viewState;return e},r.prototype.isRendered=function(){return this.state()==="rendered"},r.prototype.isNotRendered=function(){return this.state()==="not-rendered"},r.prototype.isDisplayed=function(){return this.state()==="displayed"},r.prototype.isNotDisplayed=function(){return this.state()==="not-displayed"},i=t.extend({__super__:t.prototype,initialize:function(e){var t;o.bindAll(this);if(!e||e&&!e.name&&!e.destination)throw t="Section initialize method requires an 'options' {object}",t+=" as argument, with 'name' and 'destination' {string} properties",new Error(t);this.destination=e.destination,this.name=e.name,this.state(e.state||"not-rendered"),this.__super__.initialize.call(this,e)},checkForUser:function(){return!o.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},render:function(e,t,n){function i(){r.state("rendered")}var r=this;this.callbacks.add(i),this.__super__.render.call(this,e,t,n),this.afterRender&&this.afterRender()},display:function(e){var t=e,n,r;if(o.isUndefined(t)||!o.isBoolean(t))throw r="SectionView display method expects {boolean} argument.",new Error(r);if(this.state()==="not-rendered")throw r="SectionView ("+this.name+") cannot display, view state is 'not-rendered'.",new Error(r);n=u(this.destination),t&&(n.html(this.$el),this.state("displayed")),!t&&this.state()==="displayed"&&(n.html(""),this.state("not-displayed"))},meta:function(e){return e?(this._meta=this._meta||{},o.each(e,function(e,t){this._meta[t]=e})):e=this._meta,this._meta},setDropdownOptions:function(e,t,n,r,i){var s="";i?s+='<option value="">'+i+"</option>":s+='<option value="">Select</option>';if(e!=null&&e.length>0)for(var o in e)s+='<option value="'+e[o][n]+'">'+e[o][t]+"</option>";this.$el.find(r).html(s)},isValidAutoCompleteKey:function(e){if(e){var t=e.keyCode?e.keyCode:e.which;if(t>=59&&t<=90||t>=96&&t<=105||t==8||t==32||t==46)return!0}return!1},sort:function(e,t,n){e.sort(function(e,r){return n==1?e[t]<r[t]?1:r[t]<e[t]?-1:0:e[t]<r[t]?-1:r[t]<e[t]?1:0})},isEnterKey:function(e){if(e){var t=e.keyCode?e.keyCode:e.which;if(t==13)return!0}return!1},showLoader:function(e){var t=u(".loading-div");t.length?t.show():u(e.$el).append('<div class="loader loading-div"></div>')},hideLoader:function(){u(".loading-div").hide()}}),o.extend(i.prototype,r.prototype),i});