define(["require","text!imageup/templates/uploader.html","facade","views","utils","vendor","imageup/models/basic","imageup/views/errors"],function(e,t){var n,r=e("facade"),i=e("views"),s=e("utils"),o=s.lib.Channel,u=e("vendor"),a=i.SectionView,f=e("imageup/models/basic"),l=e("imageup/views/errors"),c=r.$,h=r._,p=s.debug;return p.log("SectionView: ",a),n=a.extend({id:"imageuploadForm",events:{"click #imageup":"imageUploadClick","change #image_file":"imagePreview","dragover #imageholder":"drag","drop #imageholder":"drop"},template:t,data:t,initialize:function(e,t){c("#errormsg, #preview").html(""),a.prototype.initialize.call(this,e),p.log("Image upload basic view"),this.attr=t,this.files_drag=[],c("#imgUploadModal").modal("show"),c("#imgUploadModal").on("hidden",function(){routing.trigger("refresh-onImageUpload")}),c("#imgUploadModal").on("hide",function(){routing.trigger("refresh-onImageUpload")}),console.log(c(".modal-body").html())},drag:function(e){e.stopPropagation(),e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="copy"},drop:function(e){var t=this;e.stopPropagation(),e.preventDefault(),c("#errormsg").hide();var n=e.originalEvent.dataTransfer.files;this.files_drag=e.originalEvent.dataTransfer.files,n.length>0&&t.showLoader(t);var r=[],i=[],s=0;for(var o=0,u;u=n[o];o++){if(!u.type.match("image.*"))continue;var a=new FileReader;a.onload=function(e){return function(r){var o="preview_"+s;s++,i.push({preview_id:o,width:"150",height:"150",filesrc:r.target.result,title:escape(e.name)}),s==n.length&&(data={data:i},c("#image_file").attr("disabled","disabled"),routing.trigger("imageup-preview",data)),t.hideLoader()}}(u),a.readAsDataURL(u)}},imagePreview:function(e){var t=this;p.log("Image preview view"),c("#preview").hide(),c("#errormsg").hide();var n=c("#image_file")[0].files;console.log(n.length),n.length>0&&t.showLoader(t);var r=[],i=0,s,o=0;for(;s=n[i];i++){if(!s.type.match("image.*"))continue;var u=new FileReader;u.onload=function(e){return function(i){var s="preview_"+o;o++,r.push({preview_id:s,width:"150",height:"150",filesrc:i.target.result,title:escape(e.name)}),o==n.length&&(data={data:r},routing.trigger("imageup-preview",data),t.hideLoader())}}(s),u.readAsDataURL(s)}},imageUploadClick:function(e){e.preventDefault();var t=this;c("#errormsg").hide(),c("#imageup").attr("disabled","disabled"),c(".closepreview").attr("disabled","disabled"),c(".rotate").attr("disabled","disabled"),console.log(c("#image_file")[0].files.length),console.log(this.files_drag.length),console.log(c(".previewimg").length);if(c(".previewimg").length==0){var n={msg:"Image Field Empty",color:"alert-error"};routing.trigger("imageup-msg",n),c("#imageup").removeAttr("disabled")}else if(this.files_drag.length>=1){var r=this.files_drag.length;jQuery.each(this.files_drag,function(e,n){var i=new FormData;if(c("#preview_"+e+"group").length>0){i.append("image_file",n),c("#preview_"+e+"rotang").val()>0?i.append("rotate",c("#preview_"+e+"rotang").val()):i.append("rotate","false");for(var s in t.attr)i.append(s,t.attr[s]);var o={dataum:i,id:e,len:r};routing.trigger("imageup-add-image",o)}}),this.files_drag=[],c("#imageup").removeAttr("disabled")}else console.log(c("#image_file")[0].files.length+"=file prasobh"),jQuery.each(c("#image_file")[0].files,function(e,n){var r=new FormData;if(c("#preview_"+e+"group").length>0){r.append("image_file",n),c("#preview_"+e+"rotang").val()>0?r.append("rotate",c("#preview_"+e+"rotang").val()):r.append("rotate","false");for(var i in t.attr)r.append(i,t.attr[i]);var s={dataum:r,id:e,len:c("#image_file")[0].files.length};routing.trigger("imageup-add-image",s)}}),c("#imageup").removeAttr("disabled")}}),n});