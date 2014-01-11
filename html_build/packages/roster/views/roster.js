define(["require","text!roster/templates/roster.html","views","vendor","facade","utils","jqueryui","controller","roster/models/roster","roster/collections/roster","roster/views/image-list","component/fb"],function(e,t){var n,r=e("views"),i=e("facade"),s=e("utils"),o=r.SectionView,u=i.$,a=i._,f=s.debug,l=e("vendor"),c=l.Mustache,h=s.lib.Channel,p=e("component/fb"),d=e("roster/models/roster"),v=e("roster/views/image-list"),m=e("roster/collections/roster");return n=o.extend({template:t,events:{"click .add-to-roster-h":"addToRoster","mouseover a.tiles":"showText","mouseout a.tiles":"showicon","click .invite-team-player-h":"inviteFBFriend"},showText:function(e){u(e.target).parent().find("span").removeClass("hide")},showicon:function(e){u(e.target).parent().find("span").addClass("hide")},inviteFBFriend:function(e){var t=this,n={};n.subject_id=this.team_id,n.enttype_id=this.controllerObject.basics.get("payload").enttypes_id,routing.trigger("fbInvite",undefined,n)},initialize:function(e){var t=this;o.prototype.initialize.call(this,e),t.team_id=e.team_id,t.team_name=e.team_name,t.controllerObject=e.controllerObject,t.viewName=e.viewName||"Image List"+Math.random(),a.bindAll(this),t.getTeams()},getTeams:function(){var e=this;e.team_id&&(e.collection1=new m,e.collection1.id=e.team_id,e.collection1.fetch(),u.when(e.collection1.request).done(function(){e.setupTeamRosterListView()}))},setupTeamRosterListView:function(){var e,t="";e=new v({collection:this.collection1,name:this.viewName,dontrenderTemplate:!0,model:new d});if(this.checkForUser())try{var n=this.collection1.toArray();console.error(n);for(var r in n)if(n[r].attributes.payload.id==routing.loggedInUserId){t=!0;break}}catch(i){}this.$el.find(".roster-images-h").html(e.$el);if(!this.$el.find(".add-to-roster-h").length){var s='<li class="teams image add-tile-outer">				<div>				<a href="javascript: void(0);" class="add-to-roster-h link-disabled pull-left tiles" title="Add to roster"></a>				<span class="hide">I play for '+this.team_name+'</span></div>				<div>				<span class="hide">Know somebody who plays for '+this.team_name+'</span>				<a href="javascript: void(0);" class="fb-invite-tile-btn invite-team-player-h tiles pull-right" title="Add to fb"></a></div>				</li>';this.$el.find(".roster-images-h ul").prepend(s)}t==""&&this.$el.find(".add-to-roster-h").removeClass("link-disabled")},checkForUser:function(){return!a.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},addToRoster:function(e){if(!this.checkForUser()){routing.trigger("showSignup");return}var t=this,n=new d;n.url="/api/team/player/"+this.team_id,n.save(),u.when(n.request).done(function(){u(e.currentTarget).parent().hide(),t.getTeams()})},render:function(e,t,n){o.prototype.render.call(this,e,t,n),this.$el.find(".heading-h").html(this.team_name)}}),n});