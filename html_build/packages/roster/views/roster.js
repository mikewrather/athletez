define(["require","text!roster/templates/roster.html","views","vendor","facade","utils","jqueryui","controller","roster/models/roster","roster/collections/roster","roster/views/image-list","component/fb","common/views/add-media-buttons","text!common/templates/add-roster-buttons.html"],function(e,t){var n,r=e("views"),i=e("facade"),s=e("utils"),o=r.SectionView,u=i.$,a=i._,f=s.debug,l=e("vendor"),c=l.Mustache,h=s.lib.Channel,p=e("component/fb"),d=e("roster/models/roster"),v=e("roster/views/image-list"),m=e("roster/collections/roster"),g=e("common/views/add-media-buttons"),y=e("text!common/templates/add-roster-buttons.html");return n=o.extend({template:t,events:{"click .add-to-roster-h":"addToRoster","mouseover a.tiles":"showText","mouseout a.tiles":"showicon","click .invite-team-player-h":"inviteFBFriend"},showText:function(e){u(e.target).parent().find("span").removeClass("hide")},showicon:function(e){u(e.target).parent().find("span").addClass("hide")},afterRender:function(){var e=this,t=setInterval(function(){$ele=e.$el.find(".character-limit-h"),$ele.length&&(clearInterval(t),$ele.each(function(){e.adJustFontDynamically(u(this))}))},100)},inviteFBFriend:function(e){var t=this,n={};n.subject_id=this.team_id,n.enttype_id=this.entityId,routing.trigger("fbInvite",undefined,n)},initialize:function(e){var t=this;e.mainView=this,this.mainView=this,o.prototype.initialize.call(this,e),console.log("roster view",e),t.team_id=e.team_id,t.teamName=e.teamName,t.entityId=e.entityId,t.team_name=e.team_name,t.controllerObject=e.controllerObject,t.viewName=e.viewName||"Image List"+Math.random(),a.bindAll(this),t.getTeams()},getTeams:function(){var e=this;e.team_id&&(e.collection1=new m,e.collection1.id=e.team_id,e.collection1.fetch(),u.when(e.collection1.request).done(function(){e.setupTeamRosterListView()}))},setupTeamRosterListView:function(){var e,t=!1;e=new v({collection:this.collection1,name:this.viewName,mainView:this,dontrenderTemplate:!0,model:new d,teamName:this.teamName});if(this.checkForUser())try{var n=this.collection1.toArray();for(var r in n)if(parseInt(n[r].attributes.payload.id)===parseInt(routing.loggedInUserId)){t=!0;break}}catch(i){}this.$el.find(".roster-images-h").html(e.$el),t&&this.$el.find(".roster-heading-h").find(".add-to-roster-list-h").addClass("link-disabled")},checkForUser:function(){return!a.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},addToRoster:function(e){var t=this,n=new d,r=function(r){n.url="/api/team/player/"+t.team_id,n.save(),u.when(n.request).done(function(){u(e.currentTarget).addClass("link-disabled"),t.getTeams(),r&&r()})};t.checkForUser()?r():routing.trigger("showSignup",function(e){r(function(){e&&e()})})},render:function(e,t,n){o.prototype.render.call(this,e,t,n);var r=new g({target:this.$el.find(".roster-heading-h"),heading:this.team_name,team_id:this.team_id,team_name:this.team_name,entityId:this.entityId,addToRoster:this.addToRoster,template:y,inviteData:{invite_type:"join",subject_id:this.team_id,enttypes_id:this.entityId}})}}),n});