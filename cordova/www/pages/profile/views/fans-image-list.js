define(["facade","utils","media/views/image-list","component/fb","votes/models/follow"],function(e,t,n){var r,i=require("component/fb"),s=require("votes/models/follow");return r=n.extend({imagetype:"large_thumb",currentSection:"fans",setupAddView:function(){},events:{"click .invite-to-fb-h":"inviteFBFriend","mouseover a.tiles":"showText","mouseout a.tiles":"showicon","click .add-to-fans-h":"addToFanList"},showText:function(e){$(e.target).parent().find("span").removeClass("hide")},showicon:function(e){$(e.target).parent().find("span").addClass("hide")},inviteFBFriend:function(e){var t=this,n={},r=function(){n.invite_type="follow",n.subject_id=t.target_id,n.enttype_id=t.controllerObject.basics.get("payload").enttypes_id,routing.trigger("fbInvite",undefined,n)};t.checkForUser()?r():routing.trigger("showSignup",function(e){r(function(){e&&e()})})},addToFanList:function(e){e.preventDefault();var t=this,n=function(n){var r=new s;r.subject_id=t.collection.id,r.entity_id=t.controllerObject.basics.get("payload").enttypes_id,r.save(),$.when(r.request).done(function(){typeof r.get("payload").follower=="object"&&typeof r.get("payload").subject=="object"&&r.get("payload").id>0&&($(e.target).addClass("link-disabled"),t.controllerObject&&t.controllerObject.reloadFans&&t.controllerObject.reloadFans()),n&&n()})};t.checkForUser()?n():routing.trigger("showSignup",function(e){n(function(){e&&e()})})},afterRender:function(){var e=this,t=setInterval(function(){$ele=e.$el.find(".character-limit-h"),$ele.length&&(clearInterval(t),$ele.each(function(){e.adJustFontDynamically($(this))}))},100)},addButtons:function(){}}),r});