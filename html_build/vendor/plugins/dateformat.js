/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

define([],function(){var e=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,n=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,r=/[^-+\dA-Z]/g,i=function(e,t){e=String(e),t=t||2;while(e.length<t)e="0"+e;return e};return function(s,o,u){var a=e;arguments.length==1&&Object.prototype.toString.call(s)=="[object String]"&&!/\d/.test(s)&&(o=s,s=undefined),s=s?new Date(s):new Date,isNaN(s)&&console.error(this),o=String(a.masks[o]||o||a.masks["default"]),o.slice(0,4)=="UTC:"&&(o=o.slice(4),u=!0);var f=u?"getUTC":"get",l=s[f+"Date"](),c=s[f+"Day"](),h=s[f+"Month"](),p=s[f+"FullYear"](),d=s[f+"Hours"](),v=s[f+"Minutes"](),m=s[f+"Seconds"](),g=s[f+"Milliseconds"](),y=u?0:s.getTimezoneOffset(),b={d:l,dd:i(l),ddd:a.i18n.dayNames[c],dddd:a.i18n.dayNames[c+7],m:h+1,mm:i(h+1),mmm:a.i18n.monthNames[h],mmmm:a.i18n.monthNames[h+12],yy:String(p).slice(2),yyyy:p,h:d%12||12,hh:i(d%12||12),H:d,HH:i(d),M:v,MM:i(v),s:m,ss:i(m),l:i(g,3),L:i(g>99?Math.round(g/10):g),t:d<12?"a":"p",tt:d<12?"am":"pm",T:d<12?"A":"P",TT:d<12?"AM":"PM",Z:u?"UTC":(String(s).match(n)||[""]).pop().replace(r,""),o:(y>0?"-":"+")+i(Math.floor(Math.abs(y)/60)*100+Math.abs(y)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!=10)*l%10]};return o.replace(t,function(e){return e in b?b[e]:e.slice(1,e.length-1)})}}();return e.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},e.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},e});