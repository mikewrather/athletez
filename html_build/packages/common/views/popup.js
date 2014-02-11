define(["require","text!packages/common/templates/popup.html","facade","views","utils","vendor"],function(e){var t=e("facade"),n=e("views"),r=n.SectionView,i=e("utils"),s=i.lib.Channel,o=e("vendor"),u=t._,a=t.$,f=n.BaseView,l=t.Backbone,c,h=e("text!packages/common/templates/popup.html");return f.extend({options:{},forceFullScreen:!1,initialize:function(e){this.processOptions(e)},processOptions:function(e){e.id?this.options.id=e.id:this.options.id="modal-popup-"+Math.floor(Math.random()*Math.random()*50*Math.random()*50),this.options.addClass=e.addClass||[],e.fullPage&&this.options.addClass.push("full-page-modal"),this.options.title=e.title||"",this.options.width=e.width||"50%",this.options.height=e.height||"50%",this.options.popup_content=e.html||"<div></div>",this.forceFullScreen=document.documentElement.clientWidth<parseInt(this.options.width)?!0:!1,this.forceFullScreen&&(this.options.addClass.push("noBorder"),this.options.width="100%",this.options.height="100%"),this.render();var t=this,n=0,r=setTimeout(function(){n++,a("#"+t.options.id).length?(clearInterval(r),routing.popups===undefined&&(routing.popups=[]),routing.popups.push(a("#"+t.options.id)),t.processDimensions(),t.processStyle(),t.bindClose()):n>=20&&clearInterval(r)},200);s("popup-finished-launch-"+this.options.id).publish()},bindClose:function(){var e=this;routing.off("common-popup-close"),routing.on("common-popup-close",function(e){if(routing.popups.length){var t=routing.popups.shift();t.modal("hide").remove()}a(".common-modal").length||a(".modal-backdrop").fadeOut().remove()}),a("#"+this.options.id).find(".close").on("click",function(e){routing.trigger("common-popup-close")}),a(".modal-backdrop").off("click"),a(".modal-backdrop").on("click",function(e){routing.trigger("common-popup-close")})},processDimensions:function(){var e=this.options;if(e.width){a("#"+e.id).css({width:this.forceFullScreen?"100%":e.width});var t=parseInt(a("#"+e.id).css("borderLeftWidth"),10)+parseInt(a("#"+e.id).css("borderRightWidth"),10)+parseInt(a("#"+e.id).css("padding-left"),10)+parseInt(a("#"+e.id).css("padding-right"),10);console.log(t);var n;if(e.width.indexOf("%")>0){var r=parseInt(e.width,10);n=window.innerWidth*(r/100)+t}else n=parseInt(e.width,10)+t;if(e.width!="100%"){console.log(a(window).width(),n);var i=a(window).width()/2-n/2+"px"}else var i="0%";a("#"+e.id).css({left:i})}if(e.height){a("#"+e.id).css({height:this.forceFullScreen?"100%":e.height});var s=parseInt(a("#"+e.id).css("borderTopWidth"),10)+parseInt(a("#"+e.id).css("borderBottomWidth"),10)+parseInt(a("#"+e.id).css("padding-top"),10)+parseInt(a("#"+e.id).css("padding-bottom"),10),o;if(e.height.indexOf("%")>0){var r=parseInt(e.height,10);o=window.innerHeight*(r/100)+s}else o=parseInt(e.height,10)+s;if(e.height!="100%")var u=(a(window).height()-e.height.replace("px",""))/2-30+"px";else var u="0%";var f=a(window).height();a("#"+e.id).css({top:u,"margin-top":"0%"})}},render:function(){var e=u.template(h,{popup:this.options});a("body").append(e)},processStyle:function(){var e=this;this.options.addClass!=undefined&&this.options.addClass.length&&u.each(this.options.addClass,function(t){console.log(t),a("#"+e.options.id).addClass(t)}),this.options.background_image&&(console.log(this.options.background_image),a("#"+this.options.id).css({background:"url("+this.options.background_image+") no-repeat center center fixed #FFF","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover"})),a("#"+this.options.id).css({margin:"0px"}),a("#"+this.options.id+" .close").attr("data-id",this.options.id),a("#"+this.options.id).find(".modal-header-h").html(this.options.title),a("#"+this.options.id).find(".modal-header").show(),a("#"+this.options.id).modal("show")}})});