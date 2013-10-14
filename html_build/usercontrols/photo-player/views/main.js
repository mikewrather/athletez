define(["require","text!usercontrols/photo-player/templates/player.html","text!usercontrols/photo-player/templates/image-thumbs.html","facade","views","utils","vendor","votes/models/vote","jwplayer","jqueryui","jquery.slimscroll.hor"],function(e,t,n){var r,i=e("facade"),s=e("views"),o=s.SectionView,u=e("utils"),a=u.lib.Channel,f=e("vendor"),l=f.Mustache,c=i.$,h=e("votes/models/vote");return console.log("jwplayer",jwplayer),jwplayer.key="yXOw2TpDcCoCnbWyVSCoEYA4tepkpjiVEtLEfSBIfZQ=",PhotoPlayerView=o.extend({template:t,thumbTemplate:n,events:{"click .back-arrow-h":"backButton","click .next-arrow-h":"nextButton","click .thumb-link-h":"changeImage","click .photo-player-vote-h":"vote"},initialize:function(e){this.collection=e.collection,this.id=e.id,this.index=e.index,o.prototype.initialize.call(this,e),this.setUpMainView(),this.json=this.model.toJSON(),this.render(),this.initThumbsSection(),this.loadImage(!0)},vote:function(e){if(c(e.currentTarget).hasClass("voted"))return;var t=ths,n=new h;n.userId=this.json[this.index].payload.id,n.entity_id=this.json[this.index].payload.enttypes_id,n.set({subject_type_id:n.entity_id,subject_id:n.userId}),n.save(),c.when(n.request).done(function(){t.$el.find(".photo-player-vote-h").addClass("voted")})},changeImage:function(e){var t=c(e.currentTarget);this.index=t.attr("data-index"),this.loadImage()},backButton:function(e){this.index>0&&(this.index--,this.loadImage(),this.changeThumbPosition())},nextButton:function(e){this.index<this.json.length&&(this.index++,this.loadImage(),this.changeThumbPosition())},changeThumbPosition:function(){var e=this.$el.find(".thumb-image-list-h"),t=this.$el.find(".selected-photo-thumb"),n=t.position(),r=e.position(),i=e.width(),s=0,o=this.$el.find(".thumbs-outer"),u=o.width();if(n.left+t.width()>u)s=n.left-u,s+=r.left<0?-r.left:-r.left,s+=t.width()+20;else{var a=r.left<0?-r.left:r.left;s=+a-t.width()}s&&this.$el.find(".thumbs-outer").animate({scrollLeft:s+"px"},400)},initThumbsSection:function(){var e=this,t=this.json.length,n={},r=null;n.data=[];for(var i=0;i<t;i++){var s=this.json[i].payload,o={_enttypes_id:s.enttypes_id,_id:s.id,_index:i};switch(s.enttypes_id){case"23":typeof s.standard_thumb=="object"?(r=s.standard_thumb,o._thumbnail=r.url):o._thumbnail=s.thumbs,o._label=s.media.name,o._link="javascript: void(0);",s.media.hasOwnProperty("is_owner")&&(show_edit=s.media.is_owner);break;case"21":o._label=s.media_obj.name,o._link="javascript: void(0);",typeof s.types=="object"&&(typeof s.types.standard_thumb=="object"?(r=s.types.standard_thumb,o._thumbnail=r.url):typeof s.types.small_thumb=="object"?(r=s.types.large_thumb,o._thumbnail=r.url):typeof s.types.large_thumb=="object"?(r=s.types.large_thumb,o._thumbnail=r.url):typeof s.types.original=="object"&&(r=s.types.original,o._thumbnail=r.url)),s.media_obj.hasOwnProperty("is_owner")&&(show_edit=s.media_obj.is_owner);break;case"1":typeof s.user_picture_obj=="object"&&typeof s.user_picture_obj.types=="object"&&(typeof s.user_picture_obj.types.standard_thumb=="object"?(r=s.user_picture_obj.types.standard_thumb,o._thumbnail=r.url):typeof s.user_picture_obj.types.large_thumb=="object"?(r=s.user_picture_obj.types.large_thumb,o._thumbnail=r.url):typeof s.user_picture_obj.types.original=="object"&&(r=s.user_picture_obj.types.original,o._thumbnail=r.url)),o._label=s.label,o._sublabel="Coming Soon",o._link="/#profile/"+s.id,s.hasOwnProperty("is_owner")&&(show_edit=s.is_owner);break;case"8":o._detailclass="game",o._thumbnail=s.game_picture!==null?s.game_picture.types.small_thumb.url:"http://lorempixel.com/output/sports-q-c-440-440-4.jpg",r=s.game_picture!==null?s.game_picture.types.small_thumb:{height:440,width:440,url:"http://cdn.athletez.com/resources/icons/game/square_game.png"},o._label=s.game_day,o._link="/#game/"+s.id;var u="",a=s.teams.length,f=function(e){return e=e.toLowerCase(),e.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()})};for(var i=0;i<a;i++)u+="<span>",u+=f(s.teams[i].team_name),u+="</span>",i+1<s.teams.length&&(u+=" VS. ");s.hasOwnProperty("is_owner")&&(show_edit=s.is_owner),o._sublabel=u}if(r!="undefined"&&r!=null){var c=r.width/110,h=r.height/110;r.width=parseInt(r.width),r.height=parseInt(r.height);var p=r.width>r.height?-(r.width/h-110)/2:-(r.height/c-110)/2;p>0&&(p=0),o.styles={},r.width>r.height?o.styles=[{property:"min-width",value:r.width/h+"px"},{property:"left",value:p+"px"}]:o.styles=[{property:"min-height",value:r.height/c+"px"},{property:"top",value:p+"px"}]}n.data.push(o)}this.id=o._id;var d=l.to_html(this.thumbTemplate,n);this.$el.find(".thumb-image-list-h").html(d),setTimeout(function(){e.changeThumbPosition()},1e3),this.thumbScroll()},thumbScroll:function(){this.$el.find(".thumbs-outer").slimscrollHorizontal({height:"110px",width:"100%",alwaysVisible:!1,start:"left",position:"bottom",wheelStep:10,barZ:9999,wrapperPos:"absolute",wrapperBottom:"0px",opacity:.7,color:"#9cca3c"})},loadImage:function(e){c("div#video_container").hasClass("hidden")||c("div#video_container").addClass("hidden"),c("div.loading_image").hasClass("hidden")&&c("div.loading_image").removeClass("hidden");var t=this,n=this.json[t.index].payload,r={_enttypes_id:n.enttypes_id,_id:n.id,_media_id:n.media_id,_currentIndex:t.index};t.index>=this.json.length-1?this.$el.find(".next-arrow-h").addClass("disable-arrow-link"):this.$el.find(".next-arrow-h").removeClass("disable-arrow-link"),t.index==0?this.$el.find(".back-arrow-h").addClass("disable-arrow-link"):this.$el.find(".back-arrow-h").removeClass("disable-arrow-link");var i;switch(n.enttypes_id){case"23":this.setupVideo(n),r._thumbnail=n.thumbs,r._label=n.media.name,r._link="javascript: void(0);";break;case"21":typeof n.types=="object"&&n.types.large_format&&(i=n.types.large_format),r._label=n.media_obj.name,r._link="javascript: void(0);";break;case"1":typeof n.user_picture_obj=="object"&&(r._thumbnail=n.user_picture_obj.types.large_thumb.url),r._label=n.label,r._sublabel="Coming Soon",r._link="/#profile/"+n.id,n.hasOwnProperty("is_owner")&&(show_edit=n.is_owner);break;case"8":r._detailclass="game",r._thumbnail=n.game_picture!==null?n.game_picture.types.large_thumb.url:"http://lorempixel.com/output/sports-q-c-440-440-4.jpg",r._label=n.game_day,r._link="/#game/"+n.id;var s="",o=n.teams.length,u=function(e){return e=e.toLowerCase(),e.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()})};for(var a=0;a<o;a++)s+="<span>",s+=u(n.teams[a].team_name),s+="</span>",a+1<n.teams.length&&(s+=" VS. ");n.hasOwnProperty("is_owner")&&(show_edit=n.is_owner),r._sublabel=s}if(i!="undefined"&&i!=null){var f=this,l=this.$el.find("div.loading_image");l.css("opacity","0");function h(e){var t=e.data.self,n=e.data.image_object,r=parseInt(t.$el.height())*.8,i=parseInt(n.height)>=380?parseInt(n.height):380;if(n.width>n.height||n.width==n.height){var s=r<i?10:(r-i)/2;e.data.el.css({"max-width":"100%",top:s+"px"})}else if(r>i){var s=(r-i)/2;e.data.el.css({"max-height":r+"px",top:s+"px"})}else e.data.el.css({"max-height":r+"px",top:"0px"});e.data.el.css("opacity","100"),e.data.el.find(".large-image-h").off("load")}l.find(".large-image-h").attr("src",i.url).on("load",{el:l,self:this,image_object:i},h)}this.$el.find(".thumb-image-list-h li").removeClass("selected-photo-thumb"),this.$el.find(".thumb-link-h[data-index="+this.index+"]").parents("li").addClass("selected-photo-thumb"),routing.trigger("photo-player-section-reload",r._enttypes_id,r._media_id)},setupVideo:function(e){function n(){var n=jwplayer("jw_container"),r=t.$el,i={},s=[];for(var o=0;o<e.video_type.length;o++){console.log(e.video_type[o]);var u;u={file:e.video_type[o].meta_details.url},s.push(u)}i.playlist=[{image:e.thumbs,mediaid:e.media.name,sources:s}],i.title=e.media.name,i.primary="html5",i.duration=e.video_type[0].meta_details.duration_in_ms*1e3,i.modes=[{type:"html5",src:"http://s3.amazonaws.com/mikewbucket/jw/jwplayer.html5.js"},{type:"flash",src:"http://s3.amazonaws.com/mikewbucket/jw/jwplayer.flash.swf"}],i.skin="http://s3.amazonaws.com/mikewbucket/jw/skins/glow.xml",i.height=r.height()*.8,i.width=r.width(),console.log(i),n.setup(i)}var t=this,r=setInterval(function(){var e=c("#jw_container");if(e.length>0)clearInterval(r),n();else{console.log("adding video thing"),c("div.image-bg div.loading_image").addClass("hidden"),c("div#video_container").removeClass("hidden");var t=c("<div></div>").attr("id","jw_container");c("div#video_container").append(t).removeClass("hidden")}},500)},showImage:function(e){e.find("div.loading_image").css("opacity","100")},setOptions:function(e){},setUpMainView:function(){var e=this,t=l.to_html(e.template,{});c(e.$el).html(t)}}),PhotoPlayerView});