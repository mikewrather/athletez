define(["require","text!usercontrol/addgame/templates/orgchoose.html","usercontrol/addgame/models/org_addteam","facade","views","utils","vendor"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=e("usercontrol/addgame/models/org_addteam"),c=r.$,h=i.BaseView,p=r.Backbone,d;return p.View.extend({template:t,events:{"click li.add-team-to-org-h":"addTeamToOrg","click li.add-team-to-new-org-h":"addTeamToNewOrg"},initialize:function(e){d=this,console.log("ORG CHOOSE VIEW",e),d.setOptions(e),d.render()},addTeamToNewOrg:function(e){e.stopPropagation(),e.preventDefault(),this.createNewOrgCallback&&_.isFunction(this.createNewOrgCallback)&&this.createNewOrgCallback()&&this.destroy_view()},addTeamToOrg:function(e){e.stopPropagation(),e.preventDefault();var t=c(e.currentTarget).data("id"),n=this,r=new l({orgs_id:t,complevels_id:this.seasoninfo.complevels_id,seasons_id:this.seasoninfo.seasons_id,year:this.seasoninfo.year,sports_id:this.seasoninfo.sports_id});r.save(),c.when(r.request).done(function(e){n.newTeamAddedCallback&&_.isFunction(n.newTeamAddedCallback)&&n.newTeamAddedCallback(r)&&n.destroy_view()})},render:function(){var e=_.template(this.template,{data:this.data,seasoninfo:this.seasoninfo,user_text:this.user_text});this.$el.html(e)},setOptions:function(e){for(var t in e)this[t]=e[t]},destroy_view:function(){this.undelegateEvents(),this.$el.removeData().unbind(),this.remove(),p.View.prototype.remove.call(this)}})});