define(["require","text!usercontrols/photo-player/templates/player.html","text!usercontrols/photo-player/templates/image-thumbs.html","text!usercontrols/tag/templates/layout.html","facade","views","utils","vendor","votes/models/vote","jwplayer","jqueryui","jquery.slimscroll.hor","usercontrols/tag/models/basic_info","usercontrols/tag/views/main","media/models/tag","usercontrols/photo-player/models/tag-myself","component/fb","component/share"],function(e,t,n,r){var i,s=e("facade"),o=e("views"),u=o.SectionView,a=e("utils"),f=a.lib.Channel,l=e("vendor"),c=e("usercontrols/tag/views/main"),h=e("usercontrols/tag/models/basic_info"),p=l.Mustache,d=s.$,v=e("votes/models/vote"),m=e("media/models/tag"),g=e("usercontrols/photo-player/models/tag-myself");FbComponent=e("component/fb"),ShareComponent=e("component/share"),jwplayer.key="yXOw2TpDcCoCnbWyVSCoEYA4tepkpjiVEtLEfSBIfZQ=";var y=u.extend({template:t,thumbTemplate:n,events:{"click .back-arrow-h":"backButton","click .next-arrow-h":"nextButton","click .thumb-link-h":"changeImage","click .photo-player-vote-h":"vote","click .share-on-h":"shareOn","click .photo-player-tag-photo-h":"setUpTagPhotoView","click .photo-player-tag-myself-h":"TagMyself","click .toggle-thumbs-h":"toggleThumbsSection"},initialize:function(e){var t=this;this.collection=e.collection,this.setOptions(e),this.id=e.id,this.pageId=e.pageId,this.pageName=e.pageName,this.user_id=e.user_id,this.index=e.index,this.mediaId=e.mediaId,this.json=this.model.toJSON();var n=this.json.payload;for(var r in n)if(n[r].media_id==this.mediaId){this.index=r;break}u.prototype.initialize.call(this,e),this.setUpMainView(),this.render(),this.initThumbsSection(),this.loadImage(!0),this.updateAllImagesCount(),f("tag-image-success-photo").empty(),f("tag-image-success-photo").subscribe(this.tagFunction)},toggleThumbsSection:function(e){this.$el.find(".thumbs-outer").css("display")=="none"?(d(".loading_image, .photo-player-right-area, .bottom-line-container").addClass("minimizeOpacity"),d(".photo-player-mask-h").removeClass("hide"),this.$el.find(".thumbs-outer").slideDown()):(this.$el.find(".thumbs-outer").slideUp(),d(".photo-player-mask-h").addClass("hide"),d(".loading_image, .photo-player-right-area, .bottom-line-container").removeClass("minimizeOpacity"))},updateAllImagesCount:function(){this.$el.find(".total-image-count-h").text(this.json.payload.length)},vote:function(e){if(d(e.currentTarget).hasClass("voted"))return;var t=this,n=new v;n.userId=this.json.payload[this.index].id,n.entity_id=this.json.payload[this.index].enttypes_id,n.set({subject_type_id:n.entity_id,subject_id:n.userId}),n.save(),d.when(n.request).done(function(){t.$el.find(".photo-player-vote-h").addClass("voted");var e=t.$el.find(".votes-num-h"),n=e.text();n==""?e.html("(1)").show():e.html("("+(n+1)+")").show(),e.parents("li").addClass("link-disabled")})},shareOn:function(e){var t=d(e.currentTarget).data("share");t&&_.isFunction(this[t])&&this[t]()},getLink:function(e){var t;return this.pageName=="profile"?t="#!"+this.pageName+e.userId+e.sportId+e.mediaId:t="#!"+this.pageName+e.pageId+e.mediaId,console.log(t),t},twitter:function(){var e=this.getShareData(),t={link:this.getLink(e),name:e.User.name+" - "+e.Sport.sport_name,caption:"Athletez.com",image:e.record.image_path,description:"",title:"",type:"twitter"};new ShareComponent(t)},gplus:function(){var e=this.getShareData(),t={link:"?enttypes_id="+e.record.enttypes_id+"&id="+e.record.id,name:e.User.name+" - "+e.Sport.sport_name,caption:"Athletez.com",image:e.record.image_path,description:"",title:"",type:"gplus"};new ShareComponent(t)},tumbler:function(){var e=this.getShareData(),t={link:"?enttypes_id="+e.record.enttypes_id+"&id="+e.record.id,name:e.User.name+" - "+e.Sport.sport_name,caption:"Athletez.com",image:e.record.image_path,description:"",title:"",type:"tumbler"};new ShareComponent(t)},getShareData:function(){var e=this.json.payload[this.index];return{record:e,userId:this.user_id?"/"+this.user_id:"",pageId:this.pageId?"/"+this.pageId:"",User:this.getUserForMedia(),Sport:this.getSportForMedia(),sportId:e.media_obj.sports_id?"/sport/"+e.media_obj.sports_id:"",mediaId:e.media_id?"/media/"+e.media_id:""}},facebook:function(){var e=this.getShareData(),t=this.getLink(e),n=e.User.name+" - "+e.Sport.sport_name,r="Athletez.com",i=e.record.image_path,s="",o=new FbComponent;o.shareOnFacebook({method:"feed",name:n,link:t,picture:i,caption:r,description:s,success:function(){alert("Shared successfully.")},error:function(){alert("Not Shared successfully.")}})},getUserForMedia:function(){return this.json.payload[this.index].media_obj.users_obj},getSportForMedia:function(){return this.json.payload[this.index].media_obj.sports_obj},changeImage:function(e){var t=d(e.currentTarget);this.index=t.attr("data-index"),this.loadImage()},backButton:function(e){this.index>0&&(this.index--,this.loadImage())},nextButton:function(e){console.log("next"),this.index<this.json.payload.length&&(this.index++,this.loadImage())},changeThumbPosition:function(){var e=this.$el.find(".thumb-image-list-h"),t=this.$el.find(".selected-photo-thumb"),n=t.position(),r=e.position(),i=e.width(),s=0,o=this.$el.find(".thumbs-outer"),u=o.width();if(n.left<0)s=n.left+r.left;else if(n.left+t.width()>u)s=n.left-u,s+=r.left<0?-r.left:-r.left,s+=t.width()+20;else{var a=r.left<0?-r.left:r.left;s=+a-t.width()}s&&this.$el.find(".thumbs-outer").animate({scrollLeft:s+"px"},400)},initThumbsSection:function(){var e=this,t=this.json.payload.length,n={},r=null;n.data=[];for(var i=0;i<t;i++){var s=this.json.payload[i],o={_enttypes_id:s.enttypes_id,_id:s.id,_index:i};switch(s.enttypes_id){case"23":typeof s.standard_thumb=="object"?(r=s.standard_thumb,o._thumbnail=r.url):o._thumbnail=s.thumbs,o._label=s.media.name,o._link="javascript: void(0);",s.media.hasOwnProperty("is_owner")&&(show_edit=s.media.is_owner);break;case"21":o._label=s.media_obj.name,o._link="javascript: void(0);",typeof s.types=="object"&&(typeof s.types.standard_thumb=="object"?(r=s.types.standard_thumb,o._thumbnail=r.url):typeof s.types.small_thumb=="object"?(r=s.types.large_thumb,o._thumbnail=r.url):typeof s.types.large_thumb=="object"?(r=s.types.large_thumb,o._thumbnail=r.url):typeof s.types.original=="object"&&(r=s.types.original,o._thumbnail=r.url)),s.media_obj.hasOwnProperty("is_owner")&&(show_edit=s.media_obj.is_owner);break;case"1":typeof s.user_picture_obj=="object"&&typeof s.user_picture_obj.types=="object"&&(typeof s.user_picture_obj.types.standard_thumb=="object"?(r=s.user_picture_obj.types.standard_thumb,o._thumbnail=r.url):typeof s.user_picture_obj.types.large_thumb=="object"?(r=s.user_picture_obj.types.large_thumb,o._thumbnail=r.url):typeof s.user_picture_obj.types.original=="object"&&(r=s.user_picture_obj.types.original,o._thumbnail=r.url)),o._label=s.label,o._sublabel="Coming Soon",o._link="/#!profile/"+s.id,s.hasOwnProperty("is_owner")&&(show_edit=s.is_owner);break;case"8":o._detailclass="game",o._thumbnail=s.game_picture!==null?s.game_picture.types.small_thumb.url:"http://lorempixel.com/output/sports-q-c-440-440-4.jpg",r=s.game_picture!==null?s.game_picture.types.small_thumb:{height:440,width:440,url:"http://cdn.athletez.com/resources/icons/game/square_game.png"},o._label=s.game_day,o._link="/#!game/"+s.id;var u="",a=s.teams.length,f=function(e){return e=e.toLowerCase(),e.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()})};for(var i=0;i<a;i++)u+="<span>",u+=f(s.teams[i].team_name),u+="</span>",i+1<s.teams.length&&(u+=" VS. ");s.hasOwnProperty("is_owner")&&(show_edit=s.is_owner),o._sublabel=u}if(r!="undefined"&&r!=null){var l=r.width/110,c=r.height/110;r.width=parseInt(r.width),r.height=parseInt(r.height);var h=r.width>r.height?-(r.width/c-110)/2:-(r.height/l-110)/2;h>0&&(h=0),o.styles={},r.width>r.height?o.styles=[{property:"min-width",value:r.width/c+"px"},{property:"left",value:h+"px"}]:o.styles=[{property:"min-height",value:r.height/l+"px"},{property:"top",value:h+"px"}]}n.data.push(o)}this.id=o?o._id:undefined;var d=p.to_html(this.thumbTemplate,n);this.$el.find(".thumb-image-list-h").html(d)},thumbScroll:function(){},loadImage:function(e){var t=d("div#video_container"),n=d("div.loading_image");t.hasClass("hidden")||t.addClass("hidden"),n.hasClass("hidden")&&n.removeClass("hidden");var r=this,i=this.json.payload[r.index],s={_enttypes_id:i.enttypes_id,_id:i.id,_media_id:i.media_id,_currentIndex:r.index};i.has_voted?this.$el.find(".photo-player-vote-h").parent().addClass("link-disabled"):this.$el.find(".photo-player-vote-h").parent().removeClass("link-disabled"),i.num_votes?this.$el.find(".votes-num-h").html("("+i.num_votes+")").show():this.$el.find(".votes-num-h").hide(),console.error(i),r.$el.find(".current-image-number-count-h").text(parseInt(r.index)+1),r.index>=this.json.payload.length-1?this.$el.find(".next-arrow-h").addClass("disable-arrow-link"):this.$el.find(".next-arrow-h").removeClass("disable-arrow-link"),r.index==0?this.$el.find(".back-arrow-h").addClass("disable-arrow-link"):this.$el.find(".back-arrow-h").removeClass("disable-arrow-link");var o;switch(i.enttypes_id){case"23":this.setupVideo(i),s._thumbnail=i.thumbs,s._label=i.media.name,s._link="javascript: void(0);";break;case"21":typeof i.types=="object"&&i.types.large_format&&(o=i.types.large_format),s._label=i.media_obj.name,s._link="javascript: void(0);";break;case"1":typeof i.user_picture_obj=="object"&&(s._thumbnail=i.user_picture_obj.types.large_thumb.url),s._label=i.label,s._sublabel="Coming Soon",s._link="/#!profile/"+i.id,i.hasOwnProperty("is_owner")&&(show_edit=i.is_owner);break;case"8":s._detailclass="game",s._thumbnail=i.game_picture!==null?i.game_picture.types.large_thumb.url:"http://lorempixel.com/output/sports-q-c-440-440-4.jpg",s._label=i.game_day,s._link="/#!game/"+i.id;var u="",a=i.teams.length,f=function(e){return e=e.toLowerCase(),e.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()})};for(var l=0;l<a;l++)u+="<span>",u+=f(i.teams[l].team_name),u+="</span>",l+1<i.teams.length&&(u+=" VS. ");i.hasOwnProperty("is_owner")&&(show_edit=i.is_owner),s._sublabel=u}s&&s._label&&r.$el.find(".image-message-h").text(s._label);if(o!="undefined"&&o!=null){var c=this,h=this.$el.find("div.loading_image");h.css("opacity","0");function p(e){var t=e.data.self,n=e.data.image_object,r=parseInt(t.$el.height())*.8,i=parseInt(n.height)>=380?parseInt(n.height):380;if(n.width>n.height||n.width==n.height){var s=r<i?60:(r-i)/2;e.data.el.css({"max-width":"100%",top:s+"px"})}else if(r>i){var s=(r-i)/2;e.data.el.css({"max-height":r+"px",top:s+"px"})}else e.data.el.css({"max-height":r+"px",top:"0px"});e.data.el.css("opacity","100"),e.data.el.find(".large-image-h").off("load")}h.find(".large-image-h").attr("data-id",s._media_id),h.find(".large-image-h").attr("src",o.url).on("load",{el:h,self:this,image_object:o},p)}this.$el.find(".thumb-image-list-h li").removeClass("selected-photo-thumb"),this.$el.find(".thumb-link-h[data-index="+this.index+"]").parents("li").addClass("selected-photo-thumb");var v=i.media_obj&&i.media_obj.users_id?i.media_obj.users_id:undefined;routing.trigger("photo-player-section-reload",s._enttypes_id,s._media_id,v);if(this.loadFirstTime){var m=window.location.hash;m.match(/\/media\/(.*)[0-9]\//i)?m=m.replace(/\/media\/(.*)[0-9]\//i,"/media/"+s._media_id+"/"):m.match(/\/media\/(.*)[0-9]/i)?m=m.replace(/\/media\/(.*)[0-9]/i,"/media/"+s._media_id):m=m+"/media/"+s._media_id,routing.navigate(m,{trigger:!1})}else this.loadFirstTime=!0},setupVideo:function(e){function n(){var n=jwplayer(t.playerId),r=t.$el,i={},s=[];for(var o=0;o<e.video_type.length;o++){console.log(e.video_type[o]);var u;u={file:e.video_type[o].meta_details.url},s.push(u)}i.playlist=[{image:e.thumbs,mediaid:e.media.name,sources:s}],i.title=e.media.name,i.primary="html5",i.duration=e.video_type[0].meta_details.duration_in_ms*1e3,i.modes=[{type:"html5",src:"http://s3.amazonaws.com/mikewbucket/jw/jwplayer.html5.js"},{type:"flash",src:"http://s3.amazonaws.com/mikewbucket/jw/jwplayer.flash.swf"}],i.skin="http://s3.amazonaws.com/mikewbucket/jw/skins/glow.xml",i.height=r.height()*.8,i.width=r.width(),n.setup(i)}var t=this,r=setInterval(function(){var e=d("#jw_container");e.length||(d("div.image-bg div.loading_image").addClass("hidden"),d("div#video_container").removeClass("hidden")),t.playerId&&d("#"+t.playerId).remove(),t.playerId="jw-container-"+Math.floor(Math.random()*90+10);var i=d("<div></div>").attr("id",t.playerId);d("div#video_container").append(i).removeClass("hidden"),d("#"+t.playerId).css("z-index","9999"),console.log("Set CSS",d("#"+t.playerId).css("z-index","9999")),clearInterval(r),n()},500)},showImage:function(e){e.find("div.loading_image").css("opacity","100")},setOptions:function(e){this.userId=e.user_id||null,this.sportsId=e.sports_id||null,this.scheme=e.scheme,this.layout=e.layout},setUpMainView:function(){var e=this,t=p.to_html(e.template,{});d(e.$el).html(t)},setUpTagPhotoView:function(){var e=this,t=this.json.payload[this.index],n=null,i=null,s=null;t&&t.media_obj&&(i=t.media_obj.sports_id||null,s=t.media_obj.users_id||null,n=t.media_obj.is_owner||null),this.tagViewPhoto=new c({model:new h,template:r,name:"tag-image "+(new Date).toString(),destination:"#image-tagging-photo",user_id:s,sports_id:i,is_owner:n,channel:"tag-image-success-photo"}),e.scheme.push(this.tagViewPhoto),e.layout.render()},tagFunction:function(e){var t=this,n=e||{},r={media_id:this.json.payload[this.index].media_id,tag_array:JSON.stringify(n)},i=new m(r);i.save(),d.when(i.request).done(function(){t.setUpTagViewSection()})},setUpTagViewSection:function(){var e=this,t=this.json.payload[e.index],n={_enttypes_id:t.enttypes_id,_id:t.id,_media_id:t.media_id,_currentIndex:e.index,_uploader:t.media_obj.user_obj};routing.trigger("tags-fetch-new-form-data",n._enttypes_id,n._media_id,t)},TagMyself:function(e){var t=this,n={1:[this.getUserId()]},r={media_id:this.json.payload[this.index].media_id,tag_array:JSON.stringify(n)},i=new g(r);i.user_id=this.getUserId(),i.save(),d.when(i.request).done(function(){t.setUpTagViewSection(),d(e.target).parents("li").addClass("link-disabled")})},getUserId:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?routing.loggedInUserId:null}});return y});