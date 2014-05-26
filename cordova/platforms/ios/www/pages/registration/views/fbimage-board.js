define(["require","text!registration/templates/fbimage-board.html","facade","views","utils","jquery.jrac"],function(e,t){var n,r=e("facade"),i=e("views"),s=e("utils"),o=i.BaseView,u=r._,a=r.$,f=s.lib.Channel;return n=o.extend({tagName:"div",className:"image-board",template:t,setOptions:function(e){if(!this.model)throw new Error("ImageBoardView expected options.model.")},render:function(){console.log("fb image board render"),console.log("fb image board collection"),console.log(this.collection);var e=this;o.prototype.render.call(this)},selectArea:function(e,t){a("#x1").val(t.x1),a("#y1").val(t.y1),a("#x2").val(t.x2),a("#y2").val(t.y2),a("#w").val(t.width),a("#h").val(t.height)},initCropView:function(){a("#image-select").jrac({crop_width:150,crop_height:150,crop_aspect_ratio:"1:1",crop_x:100,crop_y:100,image_width:400,viewport_onload:function(){var e=this,t=e.$container.parent(".pane").find(".coords input:hidden"),n=["jrac_crop_x","jrac_crop_y","jrac_crop_width","jrac_crop_height","jrac_image_width","jrac_image_height"];for(var r=0;r<n.length;r++){var i=n[r];e.observator.register(i,t.eq(r)),t.eq(r).bind(i,function(e,t,n){a(this).val(n)}).change(i,function(t){var n=t.data;e.$image.scale_proportion_locked=e.$container.parent(".pane").find(".coords input:checkbox").is(":checked"),e.observator.set_property(n,a(this).val())})}e.$container.append('<div class="natual-size">Image natual size: '+e.$image.originalWidth+" x "+e.$image.originalHeight+"</div>")}}).bind("jrac_events",function(e,t){var n=a(this).parents(".pane").find(".coords input");n.css("background-color",t.observator.crop_consistent()?"chartreuse":"salmon")})},removeCropView:function(){a("#image-select").jrac("destroy"),a("#image-select").parent().find(".natual-size").remove()},getImageInfo:function(){var e=this.$(".coords :input").serializeArray(),t=this.model.get("payload");a.each(e,function(e,n){t[n.name]=n.value}),this.model.set("payload",t)}}),n});