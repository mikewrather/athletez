define(["require","text!media/templates/video-player.html","facade","views"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.BaseView,o=r._;return n=s.extend({tagName:"li",className:"video-player",template:t,setOptions:function(e){if(!this.model)throw new Error("VideoPlayerView expected options.model.")},render:function(){s.prototype.render.call(this)}}),n});