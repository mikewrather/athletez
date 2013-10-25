define(["vendor","views","utils","text!media/templates/image-item.html","votes/models/vote","votes/models/follow","utils/storage","chrome/views/header","common/models/delete"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache,a=require("votes/models/vote"),f=require("utils/storage"),l=require("votes/models/follow"),c=require("common/models/delete"),h=require("chrome/views/header");return i=o.extend({tagName:"li",className:"image",events:{"click .vote-h":"vote","click .follow-h":"follow","click .edit-h":"edit","click .delete-h":"delete"},initialize:function(e){this.template=r},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},render:function(){function b(e){console.log(s(this),e)}console.log("in render");var e=this,t=this.model.attributes.payload,n={_enttypes_id:t.enttypes_id,_id:t.id,_has_voted:t.has_voted,_is_following:t.is_following,_can_follow:t.can_follow},r=!1,i=null,o=function(e){return e=e.toLowerCase(),e.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()})},a=!1;switch(t.enttypes_id){case"23":typeof t.standard_thumb=="object"?(i=t.standard_thumb,n._thumbnail=i.url):n._thumbnail=t.thumbs,a=!0,n._enttypes_id=typeof (t.media=="object")?t.media.enttypes_id:0,n._id=typeof (t.media=="object")?t.media.id:0,n._label=t.media.name,n._link="javascript: void(0);",n._has_link=!1,t.media.hasOwnProperty("is_owner")&&(r=t.media.is_owner);break;case"21":n._enttypes_id=typeof (t.media_obj=="object")?t.media_obj.enttypes_id:0,n._id=typeof (t.media_obj=="object")?t.media_obj.id:0,typeof t.types=="object"&&(typeof t.types.standard_thumb=="object"?(i=t.types.standard_thumb,n._thumbnail=i.url):typeof t.types.large_thumb=="object"?(i=t.types.large_thumb,n._thumbnail=i.url):typeof t.types.original=="object"&&(i=t.types.original,n._thumbnail=i.url)),n._label=_.isUndefined(t.media_obj.users_obj.label)?"":t.media_obj.users_obj.label,typeof t.media_obj.sports_obj=="object"&&(n._sublabel=o(t.media_obj.sports_obj.sport_name)),n._link="javascript: void(0);",n._has_link=!1,t.media_obj.hasOwnProperty("is_owner")&&(r=t.media_obj.is_owner);break;case"1":typeof t.user_picture_obj=="object"&&typeof t.user_picture_obj.types=="object"&&(typeof t.user_picture_obj.types.standard_thumb=="object"?(i=t.user_picture_obj.types.standard_thumb,n._thumbnail=i.url):typeof t.user_picture_obj.types.large_thumb=="object"?(i=t.user_picture_obj.types.large_thumb,n._thumbnail=i.url):typeof t.user_picture_obj.types.original=="object"&&(i=t.user_picture_obj.types.original,n._thumbnail=i.url)),n._label=t.label,n._sublabel="Votes: "+t.num_votes+", Followers: "+t.num_followers,n._link="/#profile/"+t.id,n._has_link=!0,t.hasOwnProperty("is_owner")&&(r=t.is_owner);break;case"8":n._detailclass="game",i=t.game_picture!==null?t.game_picture.types.standard_thumb:{height:440,width:440,url:"http://cdn.athletez.com/resources/icons/game/square_game.png"},n._thumbnail=i.url,n._label=t.game_day,n._link="/#game/"+t.id,n._has_link=!0;var f="",l=t.teams;if(l!=null)var c=l.length;for(var h=0;h<c;h++)f+="<span>",f+=o(t.teams[h].team_name),f+="</span>",h+1<t.teams.length&&(f+=" VS. ");t.hasOwnProperty("is_owner")&&(r=t.is_owner),n._sublabel=f}n.show_edit=r==1?!0:undefined;var p=u.to_html(this.template,n);this.$el.html(p);var d="120px",v="92px";this.$el.find(".image-outer-h").mouseout(function(){s(this).find(".action-block").css({opacity:0}),s(this).find(".detail-view").css({bottom:"-"+v}),s(this).find(".detail-view.game").css({bottom:"-"+d})});if(i!="undefined"&&i!=null){var m=i.width/220,g=i.height/220;i.width=parseInt(i.width),i.height=parseInt(i.height);var y=i.width>i.height?-(i.width/g-220)/2:-(i.height/m-220)/2;y>0&&(y=0),i.width>i.height?this.$el.find("img.list-thumbnail").css({"max-width":i.width/g,left:y}):this.$el.find("img.list-thumbnail").css({"max-height":i.height/m,top:y})}return a&&this.$el.append('<div class="circle open-photo-player-h"><div class="play"></div></div>'),this.$el.find(".image-outer-h").mouseover(function(){s(this).find(".detail-view").css({bottom:"0px"}),s(this).find(".action-block").css({opacity:90})}),this.$el.find(".circle").mouseover(function(){s(this).parent().find(".detail-view").css({bottom:"0px"}),s(this).parent().find(".action-block").css({opacity:90})}),this.$el.find(".vote-h").click(function(t){e.vote(t)}),this.$el.find(".follow-h").click(function(t){e.follow(t)}),this.$el.find(".edit-h").click(function(t){e.edit(t)}),this.$el.find(".delete-h").click(function(t){e["delete"](t)}),this},vote:function(e){e.preventDefault(),e.stopPropagation();if(!this.checkForUser()){routing.trigger("showSignup");return}var t=new a;t.userId=this.model.get("payload").id,t.entity_id=this.model.get("payload").enttypes_id,t.setData(),t.save(),s.when(t.request).done(function(){s(e.currentTarget).addClass("link-disabled")})},follow:function(e){e.preventDefault(),console.log(e.target),e.stopPropagation();if(!this.checkForUser()){try{this.signup.signupUser()}catch(e){}return}var t=new l;t.userId=this.model.get("payload").id,t.entity_id=this.model.get("payload").enttypes_id,t.save(),s.when(t.request).done(function(){typeof t.get("payload").follower=="object"&&typeof t.get("payload").subject=="object"&&t.get("payload").id>0?s(e.currentTarget).addClass("link-disabled"):console.log("FAIL")})},edit:function(e){e.stopPropagation(),e.preventDefault();var t=this,n=this.model.get("payload");switch(n.enttypes_id){case"23":break;case"21":break;case"1":window.location.hash="profile/"+n.id;break;case"8":window.location.hash="game/"+n.id}console.log(this.model)},"delete":function(e){e.stopPropagation(),e.preventDefault(),console.log(this.model);var t=this,n=new c;n.subject_id=s(e.currentTarget).attr("subject-id"),n.enttypes_id=s(e.currentTarget).attr("subject-type-id"),n.destroy(),s.when(n.request).done(function(){s(e.currentTarget).parents("li.image").addClass("remove-item")})}}),i});