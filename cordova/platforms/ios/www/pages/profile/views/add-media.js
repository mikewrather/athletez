define(["require","text!media/templates/add-media.html","application","profile/models/addmedia","facade","views"],function(e,t,n){var r,i=e("facade"),s=e("views"),o=s.SectionView,u=i._;return r=o.extend({id:"add-media",tagName:"div",template:t,events:{"click #addPhoto":"openAddImagePopup","click #addVideo":"openAddvideoPopup","click #addGame":"openAddGamePopup","mouseover a":"showText","mouseout a":"showicon"},setOptions:function(e){if(!this.model)throw new Error("ProfileAddMediaView expects option with model property.");this.model.userid=e.userid},showText:function(e){$(e.target).parent().find("span").removeClass("hide")},afterRender:function(){var e=this;$ele=this.$el.find(".character-limit-h"),$ele.each(function(){e.adJustFontDynamically($(this))})},showicon:function(e){$(e.target).parent().find("span").addClass("hide")},openAddGamePopup:function(){ga("send","event","Open-Add-Popup","Game","User opened game adder",this.model.userid),routing.trigger("add-game",this.model.userid)},openAddImagePopup:function(e){ga("send","event","Open-Add-Popup","Image","User opened image uploader",this.model.userid);var t=$(".selected-sport-h").data("id"),n="/api/user/addimage/"+this.model.userid,n="/api/user/addimage/"+this.model.userid,r={sports_id:t};routing.trigger("add-image",n,r)},openAddvideoPopup:function(e){ga("send","event","Open-Add-Popup","Video","User opened video uploader",this.model.userid);var t="/api/user/addvideo/"+this.model.userid;Channel("add-video").publish(t)}}),r});