define(["require","text!videopreview/templates/basic.html","facade","controller","models","views","utils","videopreview/models/base","videopreview/models/videoup","videopreview/views/uploader","videopreview/views/preview"],function(e,t,n,r,i,s,o,u,a,f,l){var c,h=s.LayoutView,p=n.$,d=n._,v=o.debug,m=o.lib.Channel,g=[base_url+"pages/imageup/imageup.css"];return c=r.extend({initialize:function(e){return m("load:css").publish(g),d.bindAll(this),this.handleOptions(e),this.init(e),this},init:function(e){this.url=e.url,this.attr=e.attr,v.log("VideoPreview Init"),this.setupLayout(),this.showVideoPreview()},setupLayout:function(){return this.scheme=[],p("div#modalPopup").remove(),p("body").append('<div id="modalPopup"></div>'),pageLayout=new h({scheme:this.scheme,destination:"#modalPopup",template:t,displayWhen:"ready"}),this.layout=pageLayout,console.log(this.layout),this.layout},showVideoPreview:function(e){var t=new a,n=this,r=new l({name:"Video Preview View",model:t,destination:".modal-body #preview"},this.attr);this.scheme.push(r);var i=new f({name:"Video Upload View",model:t,destination:"#main-content-img"},this.attr);this.scheme.push(i),this.layout.render(),this.afterRender(t)},afterRender:function(e){e.uploader=e.doUpload(this.url),e.uploader.bind("Init",function(e,t){p("#filelist").html("<div></div>")});try{e.uploader.init()}catch(t){alert(t)}e.uploader.bind("FilesAdded",function(t,n){maxCountError=!1,p.each(n,function(n,r){e.uploader.settings.max_file_count&&n>=e.uploader.settings.max_file_count?(maxCountError=!0,setTimeout(function(){t.removeFile(r)},50)):p("#filelist").append('<div id="'+r.id+'">'+r.name+" ("+plupload.formatSize(r.size)+") <b></b>"+"</div>"),maxCountError&&p("#resultdiv").html("You can only select one video at a time.").show()}),t.refresh()}),e.uploader.bind("UploadProgress",function(e,t){p("#"+t.id+" b").html(t.percent+"%")}),e.uploader.bind("Error",function(e,t){p("#filelist").append("<div>Error: "+t.code+", Message: "+t.message+(t.file?", File: "+t.file.name:"")+"</div>"),e.refresh()})},uploadVideo:function(e){alert("inside uploadvideo"),console.log("Called",e);var t=new a({file:e})}}),c});