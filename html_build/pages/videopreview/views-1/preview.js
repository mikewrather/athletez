define(["vendor","views","utils","text!videopreview/templates/preview.html"],function(e,t,n){var r=require("text!videopreview/templates/preview.html"),i,s=e.$,o=t.SectionView;return i=o.extend({name:"Video Preview View",id:"videoPreviewWindow",template:r,data:r,initialize:function(e){o.prototype.initialize.call(this,e),Channel("select-video-preview-change").subscribe(this.changeVideo)},changeVideo:function(e){URL=window.URL||window.webkitURL;var t=URL.createObjectURL(e);document.querySelector(this.$el.selector+" video").src=t},displayMessage:function(e,t){var n=this.$el.find(".message");n.html(e),n.className=t?"error":"info"}}),i});