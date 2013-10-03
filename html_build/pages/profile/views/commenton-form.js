define(["require","text!site/templates/comment-form.html","profile/models/commentonform","site/views/comment-form","models/base","views"],function(e,t,n,r,i){var s,o=e("views"),u=o.BaseView;return s=u.extend({initialize:function(e){console.error(e),_.bindAll(this),this.setOptions(),u.prototype.initialize.call(this,e)},el:"#comment_div",template:t,events:{"click #comment-submit":"submitHandler","click .add-comment-h":"showCommentBox"},setOptions:function(e){if(!this.collection)throw new Error("ProfileCommentOnFormView expected options.collection.");this.model||(console.log("this.collection.id =",this.collection.id),this.model=new n({id:this.collection.id}),console.log(this.model.toJSON()),this.model.fetch())},submitHandler:function(e){e.preventDefault(),this.createOnEnter(e)},showCommentBox:function(e){var t=this.$el.find(".add-comment-form-h");t.hasClass("hide")?($(e.target).html("Hide"),t.removeClass("hide")):($(e.target).html("Comment"),t.addClass("hide"))},refreshComments:function(e){this.$("#new-comment").val("")},createOnEnter:function(e){var t=this.$el.find("#new-comment").val(),n=this;n.$(".submit-result").stop().fadeOut();if(t!=""){date=new Date;var r=new Array;r.comment=t,r.comment_date=date.toDateString(),r.subject_type_id=this.collection.subject_entity_type,r.subject_id=this.model.get("id");var s=new i(r);s.url=function(){return debug.log(n),_.isUndefined(n.collection.savePath)?testpath?testpath+"/user/comment/add":"/api/comment/add/":"api"+n.collection.savePath},s.saveSuccess=function(e,t){i.prototype.saveSuccess.call(this,e,t);var r=e.get("exec_data"),s=e.get("payload"),o=e.get("desc");r.exec_error?$(".global-alert").addClass("alert-error").html(o).stop().fadeIn():$(".global-alert").addClass("alert-info").html(o).stop().fadeIn(),s.poster=s.name,s.poster_picture=s.user_picture,s.poster_email=s.email,console.log("thisresponse = ",t),n.collection.push(e),console.log("latest collectionsx",n.collection),n.refreshComments(),routing.on("profilecommentonlist:refresh",n.collection)},s.save()}},render:function(){return u.prototype.render.call(this),this.input=this.$("#new-comment"),console.log("run here now",this.el),this}}),s});