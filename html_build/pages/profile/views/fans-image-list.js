define(["facade","utils","media/views/image-list","component/fb","votes/models/follow"],function(e,t,n){var r,i=require("component/fb"),s=require("votes/models/follow");return r=n.extend({imagetype:"large_thumb",setupAddView:function(){},events:{"click .invite-to-fb-h":"inviteFBFriend","mouseover a.tiles":"showText","mouseout a.tiles":"showicon","click .add-to-fans-h":"addToFanList"},showText:function(e){$(e.target).parent().find("span").removeClass("hide")},showicon:function(e){$(e.target).parent().find("span").addClass("hide")},inviteFBFriend:function(e){var t=this,n={};n.subject_id=this.target_id,n.enttype_id=this.controllerObject.basics.get("payload").enttypes_id,routing.trigger("fbInvite",undefined,n)},addToFanList:function(e){e.preventDefault(),console.error(this.mainModel);var t=this,n=function(n){var r=new s;r.subject_id=t.collection.id,r.entity_id=t.controllerObject.basics.get("payload").enttypes_id,r.save(),$.when(r.request).done(function(){typeof r.get("payload").follower=="object"&&typeof r.get("payload").subject=="object"&&r.get("payload").id>0&&($(e.target).addClass("link-disabled"),t.controllerObject&&t.controllerObject.reloadFans&&t.controllerObject.reloadFans()),n&&n()})};t.checkForUser()?n():routing.trigger("showSignup",function(e){n(function(){e&&e()})})},addButtons:function(){var e=this;setTimeout(function(){if(!$("#add-fans-icons").length){var t='<li id="add-fans-icons" class="add-tile-outer">					<div>					<a href="javascript: void(0);" class="add-to-fans-h add-to-fans pull-left tiles"></a>					<span class="hide">Add me to list</span></div>					<div>					<span class="hide">Invite friends to join</span>					<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a></div>					</li>';e.$el.find(e.listView).prepend(t)}var n=e.collection.toJSON();for(var r in n)routing.loggedInUserId==n[r].payload.id&&e.$el.find(".add-to-fans-h").addClass("link-disabled")},0)}}),r});