define(["require","text!site/templates/comment-form.html","facade","views","site/models/comment"],function(e){var t,n=e("text!site/templates/comment-form.html"),r=e("facade"),i=e("views"),s=e("site/models/comment"),o=i.BaseView;return t=o.extend({tagName:"li",template:n,events:{"click #comment-submit":"submitHandler"},setOptions:function(e){if(!this.collection)throw new Error("CommentFormView expected options.collection.");!this.model},render:function(){console.log("RENDER CALLED!!!!"),o.prototype.render.call(this),this.input=this.$("#new-comment");var e=this.model.get("payload");console.log("return payloady",e);var t=this;if(e)var n=e.user_picture,r=e.email;return this},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},submitHandler:function(e){e.preventDefault();var t=this,n=function(n){t.createOnEnter(e)};t.checkForUser()?n():routing.trigger("showSignup",function(e){n(function(){})})},createOnEnter:function(e){var t=this.input.val();t!=""&&this.input.val("")}}),t});