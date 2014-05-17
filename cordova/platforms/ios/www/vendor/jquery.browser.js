/*!
 * jQuery Browser Plugin v0.0.3
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function(e,t,n){var r,i;e.uaMatch=function(e){e=e.toLowerCase();var t=/(opr)[\/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=/(ipad)/.exec(e)||/(iphone)/.exec(e)||/(android)/.exec(e)||/(win)/.exec(e)||/(mac)/.exec(e)||/(linux)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0",platform:n[0]||""}},r=e.uaMatch(t.navigator.userAgent),i={},r.browser&&(i[r.browser]=!0,i.version=r.version),r.platform&&(i[r.platform]=!0),i.chrome||i.opr?i.webkit=!0:i.webkit&&(i.safari=!0),i.rv&&(i.msie=!0),i.opr&&(i.opera=!0),e.browser=i})(jQuery,window);