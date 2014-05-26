!function(e,t){function n(){i.READY||(i.event.determineEventTypes(),i.utils.each(i.gestures,function(e){i.detection.register(e)}),i.event.onTouch(i.DOCUMENT,i.EVENT_MOVE,i.detection.detect),i.event.onTouch(i.DOCUMENT,i.EVENT_END,i.detection.detect),i.READY=!0)}function r(e,n){e.event.bindDom=function(e,r,i){n(e).on(r,function(e){var n=e.originalEvent||e;n.pageX===t&&(n.pageX=e.pageX,n.pageY=e.pageY),n.target||(n.target=e.target),n.which===t&&(n.which=n.button),n.preventDefault||(n.preventDefault=e.preventDefault),n.stopPropagation||(n.stopPropagation=e.stopPropagation),i.call(this,n)})},e.Instance.prototype.on=function(e,t){return n(this.element).on(e,t)},e.Instance.prototype.off=function(e,t){return n(this.element).off(e,t)},e.Instance.prototype.trigger=function(e,t){var r=n(this.element);return r.has(t.target).length&&(r=n(t.target)),r.trigger({type:e,gesture:t})},n.fn.hammer=function(t){return this.each(function(){var r=n(this),i=r.data("hammer");i?i&&t&&e.utils.extend(i.options,t):r.data("hammer",new e(this,t||{}))})}}var i=function(e,t){return new i.Instance(e,t||{})};i.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.HAS_POINTEREVENTS=e.navigator.pointerEnabled||e.navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in e,i.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&e.navigator.userAgent.match(i.MOBILE_REGEX),i.EVENT_TYPES={},i.DIRECTION_DOWN="down",i.DIRECTION_LEFT="left",i.DIRECTION_UP="up",i.DIRECTION_RIGHT="right",i.POINTER_MOUSE="mouse",i.POINTER_TOUCH="touch",i.POINTER_PEN="pen",i.UPDATE_VELOCITY_INTERVAL=16,i.EVENT_START="start",i.EVENT_MOVE="move",i.EVENT_END="end",i.DOCUMENT=e.document,i.plugins=i.plugins||{},i.gestures=i.gestures||{},i.READY=!1,i.utils={extend:function(e,n,r){for(var i in n)e[i]!==t&&r||(e[i]=n[i]);return e},each:function(e,n,r){var i,s;if("forEach"in e)e.forEach(n,r);else if(e.length!==t){for(i=-1;s=e[++i];)if(n.call(r,s,i,e)===!1)return}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){var t=[],n=[];return i.utils.each(e,function(e){t.push("undefined"!=typeof e.clientX?e.clientX:e.pageX),n.push("undefined"!=typeof e.clientY?e.clientY:e.pageY)}),{pageX:(Math.min.apply(Math,t)+Math.max.apply(Math,t))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.pageY-e.pageY,r=t.pageX-e.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(e,t){var n=Math.abs(e.pageX-t.pageX),r=Math.abs(e.pageY-t.pageY);return n>=r?e.pageX-t.pageX>0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT:e.pageY-t.pageY>0?i.DIRECTION_UP:i.DIRECTION_DOWN},getDistance:function(e,t){var n=t.pageX-e.pageX,r=t.pageY-e.pageY;return Math.sqrt(n*n+r*r)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(e){return e==i.DIRECTION_UP||e==i.DIRECTION_DOWN},toggleDefaultBehavior:function(e,t,n){t&&e&&e.style&&(i.utils.each(["webkit","moz","Moz","ms","o",""],function(r){i.utils.each(t,function(t,i){r&&(i=r+i.substring(0,1).toUpperCase()+i.substring(1)),i in e.style&&(e.style[i]=!n&&t)})}),"none"==t.userSelect&&(e.onselectstart=!n&&function(){return!1}),"none"==t.userDrag&&(e.ondragstart=!n&&function(){return!1}))}},i.Instance=function(e,t){var r=this;return n(),this.element=e,this.enabled=!0,this.options=i.utils.extend(i.utils.extend({},i.defaults),t||{}),this.options.stop_browser_behavior&&i.utils.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!1),this.eventStartHandler=i.event.onTouch(e,i.EVENT_START,function(e){r.enabled&&i.detection.startDetect(r,e)}),this.eventHandlers=[],this},i.Instance.prototype={on:function(e,t){var n=e.split(" ");return i.utils.each(n,function(e){this.element.addEventListener(e,t,!1),this.eventHandlers.push({gesture:e,handler:t})},this),this},off:function(e,t){var n,r,s=e.split(" ");return i.utils.each(s,function(e){for(this.element.removeEventListener(e,t,!1),n=-1;r=this.eventHandlers[++n];)r.gesture===e&&r.handler===t&&this.eventHandlers.splice(n,1)},this),this},trigger:function(e,t){t||(t={});var n=i.DOCUMENT.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t;var r=this.element;return i.utils.hasParent(t.target,r)&&(r=t.target),r.dispatchEvent(n),this},enable:function(e){return this.enabled=e,this},dispose:function(){var e,t;for(this.options.stop_browser_behavior&&i.utils.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!0),e=-1;t=this.eventHandlers[++e];)this.element.removeEventListener(t.gesture,t.handler,!1);return this.eventHandlers=[],i.event.unbindDom(this.element,i.EVENT_TYPES[i.EVENT_START],this.eventStartHandler),null}};var s=null,o=!1,u=!1;i.event={bindDom:function(e,t,n){var r=t.split(" ");i.utils.each(r,function(t){e.addEventListener(t,n,!1)})},unbindDom:function(e,t,n){var r=t.split(" ");i.utils.each(r,function(t){e.removeEventListener(t,n,!1)})},onTouch:function(e,t,n){var r=this,a=function(a){var l=a.type.toLowerCase();if(!l.match(/mouse/)||!u){l.match(/touch/)||l.match(/pointerdown/)||l.match(/mouse/)&&1===a.which?o=!0:l.match(/mouse/)&&!a.which&&(o=!1),l.match(/touch|pointer/)&&(u=!0);var p=0;o&&(i.HAS_POINTEREVENTS&&t!=i.EVENT_END?p=i.PointerEvent.updatePointer(t,a):l.match(/touch/)?p=a.touches.length:u||(p=l.match(/up/)?0:1),p>0&&t==i.EVENT_END?t=i.EVENT_MOVE:p||(t=i.EVENT_END),(p||null===s)&&(s=a),n.call(i.detection,r.collectEventData(e,t,r.getTouchList(s,t),a)),i.HAS_POINTEREVENTS&&t==i.EVENT_END&&(p=i.PointerEvent.updatePointer(t,a))),p||(s=null,o=!1,u=!1,i.PointerEvent.reset())}};return this.bindDom(e,i.EVENT_TYPES[t],a),a},determineEventTypes:function(){var e;e=i.HAS_POINTEREVENTS?i.PointerEvent.getEvents():i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],i.EVENT_TYPES[i.EVENT_START]=e[0],i.EVENT_TYPES[i.EVENT_MOVE]=e[1],i.EVENT_TYPES[i.EVENT_END]=e[2]},getTouchList:function(e){return i.HAS_POINTEREVENTS?i.PointerEvent.getTouchList():e.touches?e.touches:(e.identifier=1,[e])},collectEventData:function(e,t,n,r){var s=i.POINTER_TOUCH;return(r.type.match(/mouse/)||i.PointerEvent.matchType(i.POINTER_MOUSE,r))&&(s=i.POINTER_MOUSE),{center:i.utils.getCenter(n),timeStamp:(new Date).getTime(),target:r.target,touches:n,eventType:t,pointerType:s,srcEvent:r,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return i.detection.stopDetect()}}}},i.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];return i.utils.each(e.pointers,function(e){t.push(e)}),t},updatePointer:function(e,t){return e==i.EVENT_END?delete this.pointers[t.pointerId]:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t),Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var n=t.pointerType,r={};return r[i.POINTER_MOUSE]=n===t.MSPOINTER_TYPE_MOUSE||n===i.POINTER_MOUSE,r[i.POINTER_TOUCH]=n===t.MSPOINTER_TYPE_TOUCH||n===i.POINTER_TOUCH,r[i.POINTER_PEN]=n===t.MSPOINTER_TYPE_PEN||n===i.POINTER_PEN,r[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(e,t){this.current||(this.stopped=!1,this.current={inst:e,startEvent:i.utils.extend({},t),lastEvent:!1,lastVEvent:!1,velocity:!1,name:""},this.detect(t))},detect:function(e){if(this.current&&!this.stopped){e=this.extendEventData(e);var t=this.current.inst.options;return i.utils.each(this.gestures,function(n){return this.stopped||t[n.name]===!1||n.handler.call(n,e,this.current.inst)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=e),e.eventType==i.EVENT_END&&!e.touches.length-1&&this.stopDetect(),e}},stopDetect:function(){this.previous=i.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(e){var t=this.current.startEvent,n=this.current.lastVEvent;!t||e.touches.length==t.touches.length&&e.touches!==t.touches||(t.touches=[],i.utils.each(e.touches,function(e){t.touches.push(i.utils.extend({},e))}));var r,s,o=e.timeStamp-t.timeStamp,u=e.center.pageX-t.center.pageX,a=e.center.pageY-t.center.pageY,f=this.current.velocity;return n!==!1&&e.timeStamp-n.timeStamp>i.UPDATE_VELOCITY_INTERVAL?(f=i.utils.getVelocity(e.timeStamp-n.timeStamp,e.center.pageX-n.center.pageX,e.center.pageY-n.center.pageY),this.current.lastVEvent=e,f.x>0&&f.y>0&&(this.current.velocity=f)):this.current.velocity===!1&&(f=i.utils.getVelocity(o,u,a),this.current.velocity=f,this.current.lastVEvent=e),e.eventType==i.EVENT_END?(r=this.current.lastEvent&&this.current.lastEvent.interimAngle,s=this.current.lastEvent&&this.current.lastEvent.interimDirection):(r=this.current.lastEvent&&i.utils.getAngle(this.current.lastEvent.center,e.center),s=this.current.lastEvent&&i.utils.getDirection(this.current.lastEvent.center,e.center)),i.utils.extend(e,{deltaTime:o,deltaX:u,deltaY:a,velocityX:f.x,velocityY:f.y,distance:i.utils.getDistance(t.center,e.center),angle:i.utils.getAngle(t.center,e.center),interimAngle:r,direction:i.utils.getDirection(t.center,e.center),interimDirection:s,scale:i.utils.getScale(t.touches,e.touches),rotation:i.utils.getRotation(t.touches,e.touches),startEvent:t}),e},register:function(e){var n=e.defaults||{};return n[e.name]===t&&(n[e.name]=!0),i.utils.extend(i.defaults,n,!0),e.index=e.index||1e3,this.gestures.push(e),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}},i.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(e,t){if(i.detection.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void (this.triggered=!1);if(!(t.options.drag_max_touches>0&&e.touches.length>t.options.drag_max_touches))switch(e.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:if(e.distance<t.options.drag_min_distance&&i.detection.current.name!=this.name)return;if(i.detection.current.name!=this.name&&(i.detection.current.name=this.name,t.options.correct_for_drag_min_distance&&e.distance>0)){var n=Math.abs(t.options.drag_min_distance/e.distance);i.detection.current.startEvent.center.pageX+=e.deltaX*n,i.detection.current.startEvent.center.pageY+=e.deltaY*n,e=i.detection.extendEventData(e)}(i.detection.current.lastEvent.drag_locked_to_axis||t.options.drag_lock_to_axis&&t.options.drag_lock_min_distance<=e.distance)&&(e.drag_locked_to_axis=!0);var r=i.detection.current.lastEvent.direction;e.drag_locked_to_axis&&r!==e.direction&&(e.direction=i.utils.isVertical(r)?e.deltaY<0?i.DIRECTION_UP:i.DIRECTION_DOWN:e.deltaX<0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT),this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),t.trigger(this.name+e.direction,e);var s=i.utils.isVertical(e.direction);(t.options.drag_block_vertical&&s||t.options.drag_block_horizontal&&!s)&&e.preventDefault();break;case i.EVENT_END:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}},i.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(e,t){switch(e.eventType){case i.EVENT_START:clearTimeout(this.timer),i.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==i.detection.current.name&&t.trigger("hold",e)},t.options.hold_timeout);break;case i.EVENT_MOVE:e.distance>t.options.hold_threshold&&clearTimeout(this.timer);break;case i.EVENT_END:clearTimeout(this.timer)}}},i.gestures.Release={name:"release",index:1/0,handler:function(e,t){e.eventType==i.EVENT_END&&t.trigger(this.name,e)}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(e,t){if(e.eventType==i.EVENT_END){if(e.touches.length<t.options.swipe_min_touches||e.touches.length>t.options.swipe_max_touches)return;(e.velocityX>t.options.swipe_velocity||e.velocityY>t.options.swipe_velocity)&&(t.trigger(this.name,e),t.trigger(this.name+e.direction,e))}}},i.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},has_moved:!1,handler:function(e,t){var n,r,s;e.eventType==i.EVENT_START?this.has_moved=!1:e.eventType!=i.EVENT_MOVE||this.moved?e.eventType==i.EVENT_END&&"touchcancel"!=e.srcEvent.type&&e.deltaTime<t.options.tap_max_touchtime&&!this.has_moved&&(n=i.detection.previous,r=n&&e.timeStamp-n.lastEvent.timeStamp,s=!1,n&&"tap"==n.name&&r&&r<t.options.doubletap_interval&&e.distance<t.options.doubletap_distance&&(t.trigger("doubletap",e),s=!0),(!s||t.options.tap_always)&&(i.detection.current.name="tap",t.trigger(i.detection.current.name,e))):this.has_moved=e.distance>t.options.tap_max_distance}},i.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(e,t){return t.options.prevent_mouseevents&&e.pointerType==i.POINTER_MOUSE?void e.stopDetect():(t.options.prevent_default&&e.preventDefault(),void (e.eventType==i.EVENT_START&&t.trigger(this.name,e)))}},i.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1,transform_within_instance:!1},triggered:!1,handler:function(e,t){if(i.detection.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void (this.triggered=!1);if(!(e.touches.length<2)){if(t.options.transform_always_block&&e.preventDefault(),t.options.transform_within_instance)for(var n=-1;e.touches[++n];)if(!i.utils.hasParent(e.touches[n].target,t.element))return;switch(e.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:var r=Math.abs(1-e.scale),s=Math.abs(e.rotation);if(r<t.options.transform_min_scale&&s<t.options.transform_min_rotation)return;i.detection.current.name=this.name,this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),s>t.options.transform_min_rotation&&t.trigger("rotate",e),r>t.options.transform_min_scale&&(t.trigger("pinch",e),t.trigger("pinch"+(e.scale<1?"in":"out"),e));break;case i.EVENT_END:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}}},e.Hammer=i,"object"==typeof module&&module.exports&&(module.exports=i),"function"==typeof define&&define.amd?define(["jquery"],function(t){return r(e.Hammer,t)}):r(e.Hammer,e.jQuery||e.Zepto)}(window);