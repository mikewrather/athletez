define(["vendor","views","utils","text!media/templates/image-item.html","votes/models/vote","votes/models/follow","utils/storage","chrome/views/header","common/models/delete","common/models/entparse"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache,a=require("votes/models/vote"),f=require("utils/storage"),l=require("votes/models/follow"),c=require("common/models/delete"),h=require("chrome/views/header"),p=require("common/models/entparse");return i=o.extend({tagName:"li",className:"image",events:{"click .vote-h":"vote","click .follow-h":"follow","click .edit-h":"edit","click .delete-h":"delete"},initialize:function(e){this.template=r;if(e.length)for(var t in e)this[t]=e[t];e.mainView&&(this.mainView=e.mainView)},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},render:function(){function f(e){console.log(s(this),e)}var e=this,t=this.model.get("payload"),n=new p({mpay:t}),r=n.parsedData;r._media_id=t.media_id;var i=u.to_html(this.template,r);this.$el.html(i);var o="120px",a="92px";return this.$el.find(".image-item-container").mouseout(function(){s(this).find(".action-block").css({opacity:0}),s(this).find(".detail-view").css({bottom:"-"+a}),s(this).find(".detail-view.game").css({bottom:"-"+o})}),$nopic_words_div=this.$el.find(".game-tile"),$nopic_words_div.length&&($num_words=$nopic_words_div.text().length,console.log($num_words),$num_words<3?$nopic_words_div.css({"font-size":"5em",top:"90px",left:"60px"}):$num_words<5?$nopic_words_div.css({"font-size":"4em",top:"90px",left:"40px"}):$num_words<25?$nopic_words_div.css("font-size","2em"):$num_words<30?$nopic_words_div.css({"font-size":"1.7em",top:"65px"}):$num_words<40?$nopic_words_div.css({"font-size":"1.5em",top:"50px"}):$nopic_words_div.css("font-size","1em")),r.imgData.maxwidth&&this.$el.find("img.list-thumbnail").css({"max-width":r.imgData.maxwidth,left:r.imgData.left}),r.imgData.maxheight&&this.$el.find("img.list-thumbnail").css({"max-height":r.imgData.maxheight,top:r.imgData.top}),r.show_play&&this.$el.append('<div class="circle open-photo-player-h"><div class="play"></div></div>'),this.$el.find(".image-item-container").mouseover(function(){s(this).find(".detail-view").css({bottom:"0px"}),s(this).find(".action-block").css({opacity:90})}),this.$el.find(".circle").mouseover(function(){s(this).parent().find(".detail-view").css({bottom:"0px"}),s(this).parent().find(".action-block").css({opacity:90})}),this.$el.find(".vote-h").click(function(t){e.vote(t)}),this.$el.find(".follow-h").click(function(t){e.follow(t)}),this.$el.find(".edit-h").click(function(t){e.edit(t)}),this.$el.find(".delete-h").click(function(t){e["delete"](t)}),this},vote:function(e){e.preventDefault(),e.stopPropagation();var t=this,n=function(n){var r=new a;r.subject_id=t.model.get("payload").id,r.entity_id=t.model.get("payload").enttypes_id,r.setData(),r.save(),s.when(r.request).done(function(){s(e.currentTarget).addClass("link-disabled"),n&&n()})};t.checkForUser()?n():routing.trigger("showSignup",function(e){n(function(){e&&e()})})},follow:function(e){e.preventDefault(),console.log(e.target),e.stopPropagation();var t=this,n=function(n){var r=new l;r.subject_id=t.model.get("payload").id,r.entity_id=t.model.get("payload").enttypes_id,r.save(),s.when(r.request).done(function(){typeof r.get("payload").follower=="object"&&typeof r.get("payload").subject=="object"&&r.get("payload").id>0&&s(e.currentTarget).addClass("link-disabled"),n&&n()})};t.checkForUser()?n():routing.trigger("showSignup",function(e){n(function(){e&&e()})})},edit:function(e){e.stopPropagation(),e.preventDefault();var t=this,n=this.model.get("payload");switch(n.enttypes_id){case"23":break;case"21":break;case"1":window.location.hash="profile/"+n.id;break;case"8":window.location.hash="game/"+n.id}console.log(this.model)},"delete":function(e){e.stopPropagation(),e.preventDefault(),deleteModel=new c,deleteModel.subject_id=s(e.currentTarget).attr("subject-id"),deleteModel.enttypes_id=s(e.currentTarget).attr("subject-type-id"),deleteModel.removeNode=s(e.currentTarget).parents("li.image"),deleteModel.destroyAndRemove(),this.mainView&&this.mainView.showAddButton&&_.isFunction(this.mainView.showAddButton)&&this.mainView.showAddButton()}}),i});