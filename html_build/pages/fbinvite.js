define(["require","text!fbinvite/templates/layout.html","facade","controller","models","views","utils","fbinvite/views/image-list","fbinvite/collections/fbinvite","media/models/image","signup/views/facebooksignup"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=o.LayoutView,f=r.$,l=r._,c=u.debug,h=u.lib.Channel,p=["/pages/registration/registration.css","/pages/signup/css/signupstyle.css","/css/style.jrac.css","pages/fbinvite/fbinvite.css"],d=e("fbinvite/views/image-list"),v=e("media/models/image"),m=e("fbinvite/collections/fbinvite"),g=e("signup/views/facebooksignup");return i.extend({initialize:function(e){return this.popup=e.popup?!0:!1,this.options=e.options,h("load:css").publish(p),l.bindAll(this),this.ajaxCalls=[],this.handleOptions(e),this.init(),this},init:function(){ga("send","event","FB Invite","Header","Loading reg header"),this.modelHTML='<div id="fbInvite" class="modal hide fade model-popup-h"><div class="closer"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">	&times;</button></div><div id="search-area" class=""><input type="search" class="search-friends-h" placeholder="Search your friends" /></div><div id="modalBody" class="modal-body page-content-h"></div></div>',this.setupLayout().render(),this.execRender()},execRender:function(){this.refreshPage(),this.createData(),this.handleDeferreds()},createData:function(){var e=this;this.images=new m,this.images.targetElement="#image-wrap-h",this.ajaxCalls.push(this.images.fetch({error:function(t,n){ga("send","event","popup","open","FB Auth Token Renew");if(confirm("Your Facebook Authentication has timed out.  Want to try and renew it?")){var r=new g;r.signupFacebook("linkWithFB",e.execRender)}else f("#fbInvite .close").trigger("click")}}))},handleDeferreds:function(){var e=this;f.when(this.images.request).done(function(){e.images.allRecords=e.images.toJSON(),e.setupFriendsList(),f(".search-friends-h").keyup(function(){var t=f(this).val(),n,r=new RegExp(t,"i"),i=e.images.allRecords.length,s=[];for(var n=0;n<i;n++)r.test(e.images.allRecords[n].payload.name)&&s.push(e.images.allRecords[n]),e.images.models[n]&&e.images.models[n].destroy();s.length&&(e.images.reset(s),e.setupFriendsList())})})},refreshPage:function(){var e;this.selectOrgView&&(f(this.selectOrgView.destination).html(""),e=f.inArray(this.selectOrgView,this.scheme),~e&&this.scheme.splice(e,1))},setupFriendsList:function(){var e=this,t;this.imageListView&&(f(this.imageListView.destination).html(""),t=f.inArray(this.imageListView,this.scheme),~t&&this.scheme.splice(t,1)),this.imageListView=new d({collection:this.images,destination:"#image-wrap-h",target_id:this.id,user_id:this.id,FBOptions:this.options,name:"images View 2"}),this.scheme.push(this.imageListView),this.layout.render()},setupLayout:function(){this.scheme=[],f("#fbInvite").modal("hide"),f(".model-popup-h").remove(),f("body").append(this.modelHTML);var e=new a({scheme:this.scheme,destination:"#modalBody",template:t,displayWhen:"ready"});return this.layout=e,f("#fbInvite").modal("show"),this.layout}})});