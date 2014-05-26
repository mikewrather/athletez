define(["require","text!profile/templates/header.html","text!profile/templates/sports.html","profile/models/basics","facade","views","utils","vendor","profile/collections/sports","profile/views/sport-list","utils/storage","media/views/image-item"],function(e,t,n){var r,s=e("facade"),o=e("views"),u=e("profile/models/basics"),a=o.SectionView,f=e("profile/views/sport-list"),l=e("profile/collections/sports"),c=e("utils"),h=c.lib.Channel,p=e("vendor"),d=p.Mustache,v=e("utils/storage"),m=e("media/views/image-item"),g=s.$;return r=a.extend({id:"main-header",template:t,selectSportTemplate:n,events:{"click .sports-icon-h":"selectSport"},initialize:function(e){a.prototype.initialize.call(this,e),this.sports_id=e.sports_id,this.initSportList()},initSportList:function(){var e=this;this.sports=new l,this.sports.id=this.model.id,this.sports.fetch(),this.model.get("payload").loggedInUser=this.checkForCurrentUser(),g.when(this.sports.request).done(function(){e.setupSportListView(),e.selectSport()})},checkForCurrentUser:function(){return routing.loggedInUserId==this.model.id?!0:!1},setupSportListView:function(){var e=this,t=new f({collection:this.sports}),n=this.addChildView(t);this.childViews.sportListView=t,this.callbacks.add(function(){n()}),e.$el.find("#sports-info").html(t.el);var r={payload:[]},s=t.collection;if(s.length){for(i=0;i<s.length;i++)r.payload[i]=s.at(i).get("payload");var o=d.to_html(e.selectSportTemplate,r);e.$el.find(".sports-h").html(o)}else this.model.get("payload").id!=routing.loggedInUserId?e.$el.find(".sports-h").html(this.model.get("payload").first_name+" has not entered any sports or teams."):e.$el.find(".sports-h").html('<a href="#!usersettings" title="edit sports" class="btn pull-right">Edit Sports</a>');t.render()},setOptions:function(e){if(!this.model)throw new Error("HeaderView expects option with model property.")},childViews:{},render:function(e,t,n){a.prototype.render.call(this,e,t,n),this.renderImage()},renderImage:function(){this.headerImage=new m({model:this.model}),this.headerImage.render(),this.$el.find(".image-outer-h").html(this.headerImage.$el)},getUserName:function(){return this.model.get("payload").label},selectSport:function(e){var t=e?g(e.target).data("id"):this.sports_id?this.sports_id:g(".sports-h img:first-child").data("id"),n=e?g(e.target).data("name"):g(".sports-h img:first-child").data("name");n?this.$el.find(".sports-name-h").html(n+" Profile"):this.$el.find(".sports-name-h").html("No Sport Selected"),ga("send","event","Profile-Action","Sport-Change",n,t),g(".sports-icon-h.selected-sport-h").each(function(){console.log(this);var e=String(g(this).attr("src")).split("_selected.png")[0];e=e.split(".png")[0]+".png",g(this).attr("src",e).removeClass("selected-sport-h")}),g(".sports-icon-h[data-id="+t+"]").addClass("selected-sport-h");var r=String(g(".sports-icon-h[data-id="+t+"]").attr("src")).split(".png")[0]+"_selected.png";g(".sports-icon-h[data-id="+t+"]").attr("src",r);var i=this.getUserName();t&&(i+=" | "+n,this.$(".sport-info").stop().slideUp(),this.$(".sport-info-"+t).stop().slideDown(),routing.trigger("showTwmList",t));if(t){var s=window.location.hash;s.match(/\/sport\/(.*)[0-9]\//i)?s=s.replace(/\/sport\/(.*)[0-9]\//i,"/sport/"+t+"/"):s.match(/\/sport\/(.*)[0-9]/i)?s=s.replace(/\/sport\/(.*)[0-9]/i,"/sport/"+t):s=s+"/sport/"+t,e?routing.navigate(s,{trigger:!1}):routing.navigate(s,{trigger:!1,replace:!0})}routing.mobile&&g("#games_div, #fans-div, #commenton-wrap, #main-content, .buttons-h, #comment_div").hide(),g(".green-left-heading").removeClass("down-arrow-heading"),document.title=i}}),r});