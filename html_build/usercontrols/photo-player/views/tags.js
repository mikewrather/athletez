define(["facade","vendor","utils","views","text!usercontrol/photo-player/templates/tags.html","usercontrol/photo-player/views/tags-item","usercontrols/photo-player/models/tags","jquery.slimscroll"],function(e,t,n,r){var i,s=e._,o=r.CollectionView,u=r.SectionView,a=t.Mustache,f=n.lib.Channel,l=require("text!usercontrol/photo-player/templates/tags.html"),c=require("usercontrol/photo-player/views/tags-item"),h=require("usercontrols/photo-player/models/tags");return CommentListAbstract=o.extend(u.prototype),i=CommentListAbstract.extend({__super__:o.prototype,listView:"#tags-list",_tagName:"li",_className:"tags-li",page:1,page_limit:5,prepend:!1,_view:c,template:l,events:{"click .see-more-h":"seeMore","click .photo-player-detail-arrow":"toggleDetail"},toggleDetail:function(e){$(e.currentTarget).hasClass("down-arrow-photoplayer")?($(e.currentTarget).removeClass("down-arrow-photoplayer"),$(e.currentTarget).addClass("up-arrow-photoplayer"),this.$el.find("#tags-list").slideDown()):($(e.currentTarget).removeClass("up-arrow-photoplayer"),$(e.currentTarget).addClass("down-arrow-photoplayer"),this.$el.find("#tags-list").slideUp())},renderTemplate:function(){var e=a.to_html(this.template);return this.$el.html(e),this},initialize:function(e){this.renderTemplate(),console.log(e);var t=this;this.name=e.name,this.collection=e.collection,this.uploader_id=e.uploader,console.log(this.collection.toJSON()),t.allData=this.collection.toArray(),t.cleardata(),t.getprofile(),$(".photo-player-right-area").slimScroll({height:"100%"}),t.seeMore(),console.log(this.collection.toJSON()),o.prototype.initialize.call(this,e);if(!this.collection)throw new Error("CommentListView expected options.collection.");s.bindAll(this),this.addSubscribers()},seeMore:function(e){var t=this.allData.length,n=t<this.page_limit?t:this.page_limit,r=t-this.page*n,i=r+this.page_limit;r<=0&&this.$el.find(".see-more-h").hide(),this.prepend=!0,e?this.collection.add(this.allData.slice(r,i)):this.collection.reset(this.allData.slice(r,i)),this.page++,this.prepend=!1,e&&(this.addSubscribers&&this.addSubscribers(),this.setupBoardView&&this.setupBoardView(),this.setupAddView&&this.setupAddView())},getprofile:function(){var e="/api/user/basics/"+this.uploader_id;this.model.set("url",e);var t=new h({id:this.uploader_id});t.fetch({success:function(e){var t='<div class="user-photo-profile"><img src='+e.attributes.payload.user_picture_obj.image_path+' alt=""></div><div class="content-prof-sub"><span class="user-comment">Uploaded By&nbsp;</span><span class="user-comment">'+e.attributes.payload.label+"</span></div>";$(".prof-name-area").html(t)}})},cleardata:function(){$(".headerinfo").empty(),$(".teamName-area").empty(),$(".prof-name-area").empty()},childViews:{}}),i});