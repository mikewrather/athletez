define("models/base",["facade","utils"],function(e,t){var n,r=e.Backbone,i=e.$,s=e._,o=t.lib,u=t.ajaxOptions,a=t.debug;return n=r.Model.extend({defaults:{},initialize:function(e,t){t&&(this.options=t,this.setOptions()),this.deferred=new i.Deferred},hideMessages:function(){i(".global-alert").stop().fadeOut().removeClass("alert-error").removeClass("alert-info"),i(".global-messages").stop().fadeOut(),i(".global-errors").stop().fadeOut(),i(".field-error").stop().fadeOut()},showSuccess:function(e,t){var n=this;e.hideMessages();var r=e.get("exec_data"),s=e.get("desc");r.exec_error?i(".global-alert").addClass("alert-error").html(s).stop().fadeIn():i(".global-alert").addClass("alert-info").html(s).stop().fadeIn();var o=r.error_array;if(o){var u="";for(var a=0;a<o.length;a++){var f=o[a];if(f["field"]!=""){var l=f.field,c=i("#"+l).parent().find(".field-error");c.length>0?c.html(f.error).stop().fadeIn():u+=f.error+"<br/>"}else u+=f.error+"<br/>"}u!=""&&n.showErrorMessage(u)}var h=r.message_array;if(h){var p="";for(var a=0;a<h.length;a++){var f=h[a];if(f["field"]!=""){var l=f.field,c=i("#"+l).parent().find(".field-message");c.length>0?c.html(f.message).stop().fadeIn():p+=f.message+"<br/>"}else p+=f.message+"<br/>"}p!=""&&n.showSuccessMessage(p)}},showError:function(e,t){var n=this;i(".global-messages").stop().fadeOut(),i(".global-errors").stop().fadeOut(),i(".field-error").stop().fadeOut();try{var r=i.parseJSON(t.responseText),s="",o="";r!=undefined?(s=r.exec_data,o=r.desc):s=t.exec_data,s.exec_error?i(".global-alert").addClass("alert-error").html("Hold on. There were problems. See sad faces above.").stop().fadeIn():i(".global-alert").addClass("alert-info").html(o).stop().fadeIn();var u=s.error_array;if(u){var a="";for(var f=0;f<u.length;f++){var l=u[f];if(l["field"]!=""){var c=l.field,h=i("#"+c).parent().find(".field-error");h.length>0?h.html(l.error).stop().fadeIn():a+=l.error+"<br/>"}else a+=l.error+"<br/>"}a!=""&&n.showErrorMessage(a)}var p=s.message_array;if(p){var d="";for(var f=0;f<p.length;f++){var l=p[f];if(l["field"]!=""){var c=l.field,h=i("#"+c).parent().find(".field-message");h.length>0?h.html(l.message).stop().fadeIn():d+=l.message+"<br/>"}else d+=l.message+"<br/>"}d!=""&&n.showSuccessMessage(d)}}catch(v){}},showSuccessMessage:function(e){i(".global-messages").html(e).stop().fadeIn()},showErrorMessage:function(e){i(".global-errors").html(e).stop().fadeIn()},request:null,fetch:function(e){return e=e||{},e.success||(e.success=this.fetchSuccess),e.error||(e.error=this.fetchError),s.extend(e,u),this.request=r.Model.prototype.fetch.call(this,e)},fetchSuccess:function(e,t){var n=this;e.deferred&&(e.request||(e.request=e.deferred.promise()),e.deferred.resolve()),e.hideMessages()},fetchError:function(e,t){e.deferred&&e.deferred.reject(),e.showError(e,t)},save:function(e,t){return t=t||{},t.success||(t.success=this.saveSuccess),t.error||(t.error=this.saveError),s.extend(t,u),this.request=r.Model.prototype.save.call(this,e,t)},saveSuccess:function(e,t){e.showSuccess(e,t)},saveError:function(e,t){e.showError(e,t)},isReady:function(){return this.request?this.request.state()==="resolved":this.deferred.state()==="resolved"},setOptions:function(){this.options&&this.options.urlRoot&&(this.urlRoot=this.options.urlRoot)},isError:function(){var e=this.get("exec_data");return e.exec_error},truncateString:o.truncateString}),n}),define("models/messaging",["models/base"],function(e){var t;return t=e.extend({defaults:{message:null,buttons:[{name:null,callback:Function.prototype}],state:"new"}}),t}),define("models/application-state",["facade","utils","syncs"],function(e,t,n){var r,i=e.Backbone,s=e._,o=t.storage,u=n.applicationStateSync,a=t.debug;return r=i.Model.extend({defaults:{name:null,data:null,storage:"sessionStorage"},initialize:function(e,t){a.log("ApplicationState initialize"),this.storage=new o(e.name,e.storage),this.sync=u,this.id=this.id||this.cid;var n=new Date(Date.now()+42e4);this.set("expires",n)},isExpired:function(){var e=this.get("expires"),t=(new Date(e)).valueOf()<Date.now().valueOf();return t},validate:function(e){function r(e){s.isString(e)&&n.push(e)}var t,n=[];r(this.validateNameProperty(e)),r(this.validateStorageProperty(e));if(n.length)return t="ApplicationStateModel failed validation: ",t+=n.join(" AND "),a.log(t),t},validateStorageProperty:function(e){var t,n=["localStorage","sessionStorage","cookie"],r=s.isArray(e)?e[0].storage:e.storage;if(!r||!s.contains(n,r))t="Only localStorage, sessionStorage, or cookie",t+=" are allowed as storage properties.";return t},validateNameProperty:function(e){var t,n=s.isArray(e)?e[0].name:e.name;if(!n||!s.isString(n))t="Name property is not a string";return t}}),r}),define("models",["models/base","models/messaging","models/application-state"],function(e,t,n){return{ApplicationStateModel:n,BaseModel:e,MessagingModel:t}});