define(["require","text!usercontrols/photo-player/templates/comments.html","facade","controller","models","views","user/models/basic_info","usercontrols/photo-player/collections/comments","usercontrols/photo-player/views/main","usercontrols/photo-player/views/comments","usercontrols/photo-player/collections/tags","usercontrols/photo-player/views/tags"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=r.$,f=r._,l=u.debug,c=u.lib.Channel,h=o.LayoutView,p=r.Backbone,d=e("user/models/basic_info"),v=e("usercontrols/photo-player/collections/comments"),m=e("usercontrols/photo-player/collections/tags"),g=e("usercontrols/photo-player/views/main"),y=e("usercontrols/photo-player/views/comments"),b=e("usercontrols/photo-player/views/tags"),n=i.extend({cssArr:["/usercontrols/photo-player/photoPlayer.css"],events:{},initialize:function(e){console.log("init");var t=this;c("load:css").publish(this.cssArr),f.bindAll(this),e.id&&(this.id=e.id),e.index&&(this.index=e.index),e.userId&&(this.userId=e.userId),e._collection&&(this._collection=e._collection),this.modelHTML='<div id="modalPopup" class="modal photo-frame-model hide fade model-popup-h"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div><div class="modal-body page-content-h"><div class="photo-player-area-h photo-player"></div><div class="photo-player-right-area"><div class="tags-area-h"></div><div class="comment-area coment-area-h"></div><div class="comment-input-outer-h comment-input-outer" class="clearfix"></div></div></div></div>',routing.off("photo-player-section-reload"),routing.on("photo-player-section-reload",function(e,n){t.id=n,t.setUpCommentView(e,n),t.setUpTagView(e,n)}),routing.off("comments-fetch-new-form-data"),routing.on("comments-fetch-new-form-data",function(e,n){t.setUpCommentView(e,n),t.setUpTagView(e,n)}),this.setupLayout().render(),this.setUpMainView(),this.handleDeferreds()},handleDeferreds:function(){},setupLayout:function(){this.scheme=[],a(".model-popup-h").remove(),a("body").append(this.modelHTML);var e=new h({scheme:this.scheme,destination:"#modalPopup",template:"",displayWhen:"ready"});return this.layout=e,a("#modalPopup").modal(),this.layout},setUpMainView:function(){var e=this,t=p.Collection.extend(),n=new t;n.reset(e._collection);var r=new g({model:n,name:"photo player",destination:".photo-player-area-h",index:e.index});this.scheme.push(r),this.layout.render()},setUpTagView:function(e,t){var n=this.scheme.length;for(var r=0;r<n;r++)this.scheme[r].name==this.oldTagView&&this.scheme[r].remove();var i=this,s;i.oldTagView="tag section"+Math.random(),i.tags=new m,i.tags.id=t,i.tags.fetch(),a.when(i.tags.request).done(function(){console.error(i.tags.toJSON()),console.error(i.tags),s=new b({collection:i.tags,name:i.oldTagView,entity_type_id:e,destination:".tags-area-h"}),i.scheme.push(s),i.layout.render()})},setUpCommentView:function(e,n){var r=this.scheme.length;for(var i=0;i<r;i++)this.scheme[i].name==this.oldView&&this.scheme[i].remove(),console.error(this.scheme[i].name);var s=this,o;s.oldView="comment section"+Math.random(),a(".coment-area-h, .comment-input-outer-h").unbind().html(""),s.commentson=new v,s.commentson.subject_entity_type=e,s.commentson.id=n,s.commentson.fetch(),a.when(s.commentson.request).done(function(){console.error(s.commentson.toJSON()),o=new y({collection:s.commentson,userId:s.userId,name:s.oldView,_template:t,destination:".coment-area-h"}),s.scheme.push(o),s.layout.render()})},setUpOthersView:function(){}});return n});