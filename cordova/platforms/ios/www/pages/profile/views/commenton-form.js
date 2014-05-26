define(["require","text!site/templates/comment-form.html","profile/models/commentonform","site/views/comment-form","models/base","views","vendor/plugins/dateformat"],function(e,t,n,r,i){var s,o=e("views"),u=e("vendor/plugins/dateformat"),a=o.BaseView;return s=a.extend({initialize:function(e){console.error(e),_.bindAll(this),this.setOptions(),a.prototype.initialize.call(this,e)},el:"#comment_div",template:t,events:{"click #comment-submit":"submitHandler","click .add-comment-h":"showCommentBox"},setOptions:function(e){if(!this.collection)throw new Error("ProfileCommentOnFormView expected options.collection.");this.model||(console.log("this.collection.id =",this.collection.id),this.model=new n({id:this.collection.id}),console.log(this.model.toJSON()),this.model.fetch())},submitHandler:function(e){e.preventDefault();if(!this.checkForUser()){routing.trigger("showSignup");return}this.createOnEnter(e)},showCommentBox:function(e){var t=this.$el.find(".add-comment-form-h");t.hasClass("hide")?($(e.target).html("Hide"),t.removeClass("hide")):($(e.target).html("Comment"),t.addClass("hide"))},refreshComments:function(e){this.$("#new-comment").val("")},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},dateFormat:function(e){return e=new Date(e),u(e,"mmm d, h:MM TT")},createOnEnter:function(e){var t=this.$el.find("#new-comment").val(),n=this;n.$(".submit-result").stop().fadeOut();if(t!=""){date=new Date;var r=new Array;r.comment=t,r.subject_type_id=this.collection.subject_entity_type,r.subject_id=this.model.get("id");var s=new i(r);s.url=function(){return _.isUndefined(n.collection.savePath)?testpath?testpath+"/user/comment/add":"/api/comment/add/":"api"+n.collection.savePath},s.saveSuccess=function(e,t){i.prototype.saveSuccess.call(this,e,t);var r=e.get("exec_data"),s=e.get("payload"),o=e.get("desc");r.exec_error?$(".global-alert").addClass("alert-error").html(o).stop().fadeIn():$(".global-alert").addClass("alert-info").html(o).stop().fadeIn(),console.error(s),s.poster=s.name,s.poster_picture=s.user_picture;var u=n.dateFormat(date);s.comment_date=u,s.timePosted=u,s.poster_email=s.email,console.error(e),n.collection.push(e),n.refreshComments(),routing.on("profilecommentonlist:refresh",n.collection)},s.save()}},render:function(){return a.prototype.render.call(this),this.input=this.$("#new-comment"),this.collection.length||(routing.mobile?$(".mobile-link.add-comment-h").trigger("click"):$(".desktop-link.add-comment-h").trigger("click")),console.log("run here now",this.el),this}}),s});