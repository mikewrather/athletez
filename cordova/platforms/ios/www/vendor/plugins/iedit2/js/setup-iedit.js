$.extend({getUrlVars:function(){var e={},t,n=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var r=0;r<n.length;r++)t=n[r].split("="),e[t[0]]=t[1];return e},getUrlVar:function(e){return $.getUrlVars()[e]}});var iEdit={_settings:{viewportWidth:!1,viewportHeight:!1,startX:0,startY:0,startZoom:100,title:!1,original:!1,edited:!1},setup:function(e){var t=this;t._settings={viewportWidth:parseInt(e.vh),viewportHeight:parseInt(e.vw),startX:parseInt(e.sx),startY:parseInt(e.sy),startZoom:parseInt(e.sz),title:e.t,original:e.o,edited:e.edit,imgID:e.imgID,libraryID:e.libraryID,imgTypeID:e.imgTypeID,std_id:e.std_id,st_id:e.st_id}},clean:function(e){var t=this;$(".display-main").empty(),$(".extra-tools").hide(),$("#page-title").empty(),$("#page-title").append(e)},launch:function(e){var t=this;t.clean("Edit Image"),e&&(t._settings.original=e,t._settings.edited=e);if(!t._settings.original)return alert("You must upload an image before you can edit."),t.nav.upload(),!1;$("#image-editor").iedit("start",t._settings),$(".extra-tools").show()},nav:{selected:function(e){$(".nav").find("a").removeClass("selected"),$(document).find("#"+e).addClass("selected")},upload:function(){var e=this;e.selected("upload-link"),iEdit.clean("Upload New Image"),$.get("upload.html",function(e){$(".display-main").html(e),$("#fileupload").fileupload({dataType:"json",autoUpload:"true",progressall:function(e,t){$("#upload-error").remove(),$(".fileupload-buttonbar").hide(),$("#dragtext").hide(),$("#progress").show();var n=parseInt(t.loaded/t.total*100,10);$("#progress .bar").css("width",n+"%")}}),$("#fileupload").bind("fileuploadalways",function(e,t){var n=$.parseJSON(t.jqXHR.responseText.payload);if(n==null)var n=t.result.payload;if(n!=null)if(typeof n.error!="undefined"){$("#progress").hide();var r='<div id="upload-error">There was an error during the upload. Please try again.</div>';$(".panzone").append(r)}else iEdit.nav.edit(n.url)})})},edit:function(e){var t=this;t.selected("edit-link"),iEdit.launch(e)},view:function(e){var t=this;t.selected("view-link"),iEdit.clean("View Image"),e&&(iEdit._settings.edited=e);if(!iEdit._settings.edited)return alert("You must upload an image and edit it before you can view."),iEdit.nav.upload(),!1;var n='<table cellspacing="0" cellpadding="0" class="image-display show"><tr><td class="displayzone"><div class="container"><img id="displayonly" src="'+iEdit._settings.edited+'">'+'<div class="nav"><a onclick="iEdit.nav.edit();">Make a Tweak</a><br /><a onclick="closeWindow();" href="javascript:void(0);">I\'m Finished Here</a> </div>'+"</div>"+"</td></tr>"+"</table>";$(document).find("div.display-main").html(n)}}},closeWindow=function(){$(window.parent.document).find(".modal-backdrop").remove(),$(window.parent.document).find("#change-userpic-modal").unbind().remove()},size=function(e){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t};