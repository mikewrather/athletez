define("utils/ajax-options",[],function(){var e;return e={beforeSend:function(e){}},e}),define("utils/debug",["facade"],function(e){var t,n,r=e.$;return t={mode:function(){return typeof console!="undefined"&&console!==null},log:function(e){var t=this.mode();t&&console.log(e)}},n={mode:function(){return r("body").append('<div id="console"/>'),!0},msgs:[],log:function(e){var t=this.mode();t&&(this.msgs.push(e),r("#console").append("<p>"+e+"</p>"))}},window.HL&&window.HL.disableDebugMode&&(t.mode=function(){return!1}),t}),define("utils/cookies",[],function(){var e={getItem:function(e){var t;return!e||!this.hasItem(e)?null:(t=unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),"$1")),this.isExpired(t)?null:t)},setItem:function(e,t,n,r,i,s){if(!e||/^(?:expires|max\-age|path|domain|secure)$/.test(e))return;var o="";if(n)switch(typeof n){case"number":o="; max-age="+n;break;case"string":o="; expires="+n;break;case"object":n.hasOwnProperty("toGMTString")&&(o="; expires="+n.toGMTString())}document.cookie=escape(e)+"="+escape(t)+o+(i?"; domain="+i:"")+(r?"; path="+r:"")+(s?"; secure":"")},removeItem:function(e){if(!e||!this.hasItem(e))return;var t=new Date;t.setDate(t.getDate()-1),document.cookie=escape(e)+"=; expires="+t.toGMTString()+"; path=/"},hasItem:function(e){return(new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie)},isExpired:function(e){var t=JSON.parse(e);return t.expires?(new Date(t.expires)).valueOf()<Date.now().valueOf():!1}};return e}),define("utils/lib",["facade","utils/debug"],function(e,t){function f(t,n){var s=!0;return r.each(i.keys(n),function(r,i){var o=n,u,a=t,f;u=e.type(o[i]),f=e.type(a[i]);if(u!==f)return s=!1,!1}),s}var n=function(){},r=e.$,i=e._,s=e.Backbone,o=e.inArray,u=e.Callbacks,a={};return n.prototype.duckTypeCheck=function(t,n){var r=!1,s,o;return!i.isUndefined(t)&&!i.isUndefined(n)&&(s=i.keys(t),o=i.keys(n),i.intersection(s,o).length>=o.length&&(r=!0,r&&e.type&&(r=f(t,n)))),r},n.prototype.topic=i.extend({},s.Events),n.prototype.Channel=function(e,t){var n,i,s=e&&a[e],f,l=["once","memory","unique","stopOnFalse"],c;if(!s){if(t&&typeof t=="string"){flag=t.split(" "),r.each(flag,function(){c=!0;if(!o(this,l))return c=!1,c});if(t==="nomemory")n=u();else{if(!c)throw f="Channel options expeced one or more of the following strings: ",f+="'once', 'memory', 'unique', 'stopOnFalse'",new Error(f);n=u(t)}}else n=u("memory");s={publish:n.fire,subscribe:n.add,unsubscribe:n.remove,disable:n.disable},e&&(a[e]=s)}return s},n.prototype.loadCss=function(e){var n=document.createElement("link");if(!(i.isObject(e)&&e.href||i.isString(e)))throw new Error("loadCss expects a url string or object (with href property) as an argument.");n.rel=e.rel||"stylesheet",n.href=e.href||e,n.type=e.type||"text/css",n.media=e.media||"screen",n.charset="utf-8",e.title&&(n.title=e.title),t.log("loadCss url: "+e||e.href),document.getElementsByTagName("head")[0].appendChild(n)},n.prototype.formatCase=function(e,t){switch(t){case"upper":e=e.toUpperCase().replace(/\s/g,"-");break;case"lower":e=e.toLowerCase().replace(/\s/g,"-");break;case"camel":e=e.split(" ");for(var n=0;n<e.length;n++)n>0?e[n]=e[n].toLowerCase().charAt(0).toUpperCase()+e[n].toLowerCase().substr(1):e[n]=e[n].toLowerCase();e=e.join("");break;default:}return e},n.prototype.formatMoney=function(e,t,n,r){var i=[],s=e||this,o=isNaN(t)?2:Math.abs(t),u=n||".",a=typeof r=="undefined"?",":r,f=s<0?"-":"",l=parseInt(s=Math.abs(s).toFixed(o),10)+"",c=(c=l.length)>3?c%3:0;return i.push(f),i.push(c?l.substr(0,c)+a:""),i.push(l.substr(c).replace(/(\d{3})(?=\d)/g,"$1"+a)),i.push(o?u+Math.abs(s-l).toFixed(o).slice(2):""),i.join("")},new n}),define("utils/storage",["facade","utils/cookies","utils/debug"],function(e,t,n){function o(e){switch(e){case"cookie":t?e=t:n.log("cookie plugin not available.");break;case"localStorage":i.localstorage?e=localStorage:n.log("Modernizr.localstorage: "+i.localstorage);break;default:i.sessionstorage?e=sessionStorage:n.log("Modernizr.sessionstorage: "+i.sessionstorage)}return e}var r,i=e.Modernizr||window.Modernizr,s=e._;return r=function(e,t){var n;if(!e||!s.isString(e))throw new Error("Store expected {String} name argument.");this.setup(e,t),n=this.storage.getItem(this.name),this.data=n&&JSON.parse(n)||{}},r.prototype.storage=sessionStorage,r.prototype.setup=function(e,t){var r=["localStorage","sessionStorage","cookie"];this.name=e,s.contains(r,t)&&(this.storage=o(t)),this.storage||(this.storage=o("cookie"),n.log("Storage option: "+t+" not available, will try to use cookies."))},s.extend(r.prototype,{save:function(e){this.storage.setItem(this.name,JSON.stringify(this.data),e)},create:function(e){return e.id||e.set(e.idAttribute,guid()),this.data[e.id]=e,this.save(),e},read:function(e){return e.id?this.find(e):this.findAll()},update:function(e){return this.data[e.id]=e,this.save(),e},destroy:function(e){return delete this.data[e.id],delete this.storage.removeItem(this.name),this.save(),e},find:function(e){return this.data[e.id]},findAll:function(){return s.values(this.data)},_S4:function(){return((1+Math.random())*65536|0).toString(16).substring(1)},_guid:function(){var e=this;return e._S4()+e._S4()+"-"+e._S4()+"-"+e._S4()+"-"+e._S4()+"-"+e._S4()+e._S4()+e._S4()}}),r}),define("utils",["require","utils/ajax-options","utils/debug","utils/cookies","utils/lib","utils/storage"],function(e){return{ajaxOptions:e("utils/ajax-options"),debug:e("utils/debug"),docCookies:e("utils/cookies"),lib:e("utils/lib"),storage:e("utils/storage")}});