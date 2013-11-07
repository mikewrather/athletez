define(["facade","utils"],function(e,t){var n,r=e.Backbone,i=e.$,s=e._,o=t.lib,u=t.ajaxOptions,a=t.debug;return n=r.Collection.extend({initialize:function(e,t){a.log("BaseCollection initialize..."),this.cid=this.cid||s.uniqueId("c"),s.bindAll(this),this.deferred=new i.Deferred},request:null,_idAttr:"id",fetch:function(e){return e=e||{},this.targetElement&&this.targetElement!=""&&i(this.targetElement).addClass("region-loader"),e.success||(e.success=this.afterFetch),e.error||(e.error=this.fetchError),s.extend(e,u),this.request=r.Collection.prototype.fetch.call(this,e),this.request||(this.request=this.deferred.promise()),typeof routing!="undefined"&&typeof routing.ajaxRequests!="undefined"&&routing.ajaxRequests.push(this.request),this.request},afterFetch:function(e,t){this.targetElement&&i(this.targetElement).removeClass("region-loader"),this.fetchSuccess&&this.fetchSuccess(e,t)},isReady:function(){return this.request?this.request.state()==="resolved":this.deferred.state()==="resolved"},fetchSuccess:function(e,t){e.deferred.resolve(t),this.targetElement&&i(this.targetElement).removeClass("region-loader"),a.log("fetchSuccess resolved",t)},fetchError:function(e,t){a.log(t)},isError:function(){return!1}}),n});