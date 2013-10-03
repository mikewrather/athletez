define(["facade","utils/debug"],function(e,t){function f(t,n){var s=!0;return r.each(i.keys(n),function(r,i){var o=n,u,a=t,f;u=e.type(o[i]),f=e.type(a[i]);if(u!==f)return s=!1,!1}),s}var n=function(){},r=e.$,i=e._,s=e.Backbone,o=e.inArray,u=e.Callbacks,a={};return n.prototype.duckTypeCheck=function(t,n){var r=!1,s,o;return!i.isUndefined(t)&&!i.isUndefined(n)&&(s=i.keys(t),o=i.keys(n),i.intersection(s,o).length>=o.length&&(r=!0,r&&e.type&&(r=f(t,n)))),r},n.prototype.topic=i.extend({},s.Events),n.prototype.Channel=function(e,t){var n,i,s=e&&a[e],f,l=["once","memory","unique","stopOnFalse"],c;if(!s){if(t&&typeof t=="string"){flag=t.split(" "),r.each(flag,function(){c=!0;if(!o(this,l))return c=!1,c});if(t==="nomemory")n=u();else{if(!c)throw f="Channel options expeced one or more of the following strings: ",f+="'once', 'memory', 'unique', 'stopOnFalse'",new Error(f);n=u(t)}}else n=u("memory");s={publish:n.fire,subscribe:n.add,unsubscribe:n.remove,disable:n.disable},e&&(a[e]=s)}return s},n.prototype.loadCss=function(e){var n=document.createElement("link");if(!(i.isObject(e)&&e.href||i.isString(e)))throw new Error("loadCss expects a url string or object (with href property) as an argument.");n.rel=e.rel||"stylesheet",n.href=e.href||e,n.type=e.type||"text/css",n.media=e.media||"screen",n.charset="utf-8",e.title&&(n.title=e.title),t.log("loadCss url: "+e||e.href),document.getElementsByTagName("head")[0].appendChild(n)},n.prototype.formatCase=function(e,t){switch(t){case"upper":e=e.toUpperCase().replace(/\s/g,"-");break;case"lower":e=e.toLowerCase().replace(/\s/g,"-");break;case"camel":e=e.split(" ");for(var n=0;n<e.length;n++)n>0?e[n]=e[n].toLowerCase().charAt(0).toUpperCase()+e[n].toLowerCase().substr(1):e[n]=e[n].toLowerCase();e=e.join("");break;default:}return e},n.prototype.formatMoney=function(e,t,n,r){var i=[],s=e||this,o=isNaN(t)?2:Math.abs(t),u=n||".",a=typeof r=="undefined"?",":r,f=s<0?"-":"",l=parseInt(s=Math.abs(s).toFixed(o),10)+"",c=(c=l.length)>3?c%3:0;return i.push(f),i.push(c?l.substr(0,c)+a:""),i.push(l.substr(c).replace(/(\d{3})(?=\d)/g,"$1"+a)),i.push(o?u+Math.abs(s-l).toFixed(o).slice(2):""),i.join("")},new n});