define(["require","text!imageup/templates/preview_template.html","text!usercontrols/tag/templates/layout.html","text!imageup/templates/select_all.html","facade","views","utils","vendor","usercontrols/tag/views/main"],function(e,t,n,r){var i,s=e("facade"),o=e("views"),u=e("utils"),a=u.lib.Channel,f=e("vendor"),l=o.SectionView,c=s.$,h=s._,p=e("usercontrols/tag/views/main"),d=u.debug;return i=l.extend({id:"imgpreview",template:t,events:{"click .rotate":"imageRotate","click .close":"closePreview","click .previewimgsrc":"selectImage","mouseover .previewimg":"showFooter","mouseout .previewimg":"hideFooter"},initialize:function(e){l.prototype.initialize.call(this,e),d.log("preview view"),this.degree=0,this.scheme=e.scheme,this.layout=e.layout},imageRotate:function(e){id=e.currentTarget.id,val=e.currentTarget.value,this.degree=c("#"+val+"rotang").val(),this.degree=parseInt(this.degree)+90,this.degree>=360&&(this.degree=0),c("#"+id).css({"-webkit-transform":"rotate("+this.degree+"deg)","-moz-transform":"rotate("+this.degree+"deg)","-ms-transform":"rotate("+this.degree+"deg)","-o-transform":"rotate("+this.degree+"deg)",transform:"rotate("+this.degree+"deg)",zoom:1}),c("#"+val+"rotang").val(this.degree)},closePreview:function(e){id=e.currentTarget.value+"group";var t=document.getElementById(id);t.parentNode.removeChild(t)},selectImage:function(e){var t=c(e.target).hasClass("previewimg"),n=t?c(e.target):c(e.target).parents(".previewimg");n.toggleClass("selected");var r=c(this.destination).find(".previewimg.selected");r.length<1?this.setUpSelectAllView():this.setUpTagView()},setUpSelectAllView:function(){c("#image-tagging").hide(),c("#select-allup").show()},setUpTagView:function(){c("#select-allup").hide(),c("#image-tagging").show()},showFooter:function(e){c(e.target).parents(".previewimg").find(".lnkFooter").show()},hideFooter:function(e){c(e.target).parents(".previewimg").find(".lnkFooter").hide()}}),i});