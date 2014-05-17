/**
 * bl-jquery-image-center jQuery Plugin
 *
 * @copyright Boxlight Media Ltd. 2012
 * @license MIT License
 * @description Centers an image by moving, cropping and filling spaces inside it's parent container. Call
 * this on a set of images to have them fill their parent whilst maintaining aspect ratio
 * @author Robert Cambridge
 *
 * Usage: See documentation at http://boxlight.github.com/bl-jquery-image-center
 */

(function(e){e.fn.centerImage=function(t,n){n=n||function(){};var r=this,i=e(this).length;t=t=="inside";var s=function(n){var r=e(n),i=r.parent();i.css({overflow:"hidden",position:i.css("position")=="absolute"?"absolute":"relative"}),r.css({position:"static",width:"auto",height:"auto","max-width":"100%","max-height":"100%"});var s={w:i.width(),h:i.height(),r:i.width()/i.height()},n={w:r.width(),h:r.height(),r:r.width()/r.height()};r.css({"max-width":"none","max-height":"none",width:Math.round(s.r>n.r^t?"100%":s.h/n.h*n.w),height:Math.round(s.r<n.r^t?"100%":s.w/n.w*n.h)});var s={w:i.width(),h:i.height()},n={w:r.width(),h:r.height()};r.css({position:"absolute",left:Math.round((s.w-n.w)/2),top:Math.round((s.h-n.h)/3)}),o(n)},o=function(e){i--,n.apply(r,[e,i])};return r.each(function(t){this.complete||this.readyState==="complete"?function(e){setTimeout(function(){s(e)},1)}(this):function(t){e(t).one("load",function(){setTimeout(function(){s(t)},1)}).one("error",function(){o(t)}).end();if(navigator.userAgent.indexOf("Trident/5")>=0||navigator.userAgent.indexOf("Trident/6"))t.src=t.src}(this)})},e.fn.imageCenterResize=function(t){return e(this).centerImage("inside",t)},e.fn.imageCropFill=function(t){return e(this).centerImage("outside",t)}})(jQuery);