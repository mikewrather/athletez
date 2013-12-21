define(["require","text!roster/templates/roster.html","views","vendor","facade","utils","jqueryui","controller","roster/models/roster","roster/collections/roster","roster/views/image-list"],function(e,t){var n,r=e("views"),i=e("facade"),s=e("utils"),o=r.SectionView,u=i.$,a=i._,f=s.debug,l=e("vendor"),c=l.Mustache,h=s.lib.Channel,p=e("roster/models/roster"),d=e("roster/views/image-list"),v=e("roster/collections/roster");return n=o.extend({template:t,events:{"click .add-to-roster-h":"addToRoster"},initialize:function(e){var t=this;o.prototype.initialize.call(this,e),t.team_id=e.team_id,t.team_name=e.team_name,t.viewName=e.viewName||"Image List"+Math.random(),a.bindAll(this),t.getTeams()},getTeams:function(){var e=this;e.team_id&&(e.collection1=new v,e.collection1.id=e.team_id,e.collection1.fetch(),u.when(e.collection1.request).done(function(){e.setupTeamRosterListView()}))},setupTeamRosterListView:function(){var e,t="";e=new d({collection:this.collection1,name:this.viewName,dontrenderTemplate:!0,model:new p});if(this.checkForUser())try{var n=this.collection1.toArray();console.error(n);for(var r in n)if(n[r].attributes.payload.id==routing.loggedInUserId){t=!0;break}}catch(i){}this.$el.find(".roster-images-h").html(e.$el),this.$el.find(".add-to-roster-h").length||this.$el.find(".roster-images-h ul").prepend('<li class="teams hide image"><a href="javascript: void(0);" class="add-to-roster-h" title="Add to roster"></a></li>'),t==""&&this.$el.find(".add-to-roster-h").parent().removeClass("hide")},checkForUser:function(){return!a.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},addToRoster:function(e){if(!this.checkForUser()){routing.trigger("showSignup");return}var t=this,n=new p;n.url="/api/team/player/"+this.team_id,n.save(),u.when(n.request).done(function(){u(e.currentTarget).parent().hide(),t.getTeams()})},render:function(e,t,n){o.prototype.render.call(this,e,t,n),this.$el.find(".heading-h").html(this.team_name)}}),n});