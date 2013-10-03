define(["require","text!team/templates/menu.html","text!team/templates/sport-select.html","team/models/basics","facade","views","utils","vendor","team/collections/sports","team/views/sport-list","usercontrol/dropdown/view/dropdown","team/collections/seasonteams","team/collections/complevels"],function(e,t,n){var r=e("facade"),s=e("views"),o=e("team/models/basics"),u=s.SectionView,a=e("team/views/sport-list"),f=e("team/collections/sports"),l=e("usercontrol/dropdown/view/dropdown"),c=e("team/collections/seasonteams"),h=e("team/collections/complevels"),p=e("utils"),d=p.lib.Channel,v=e("vendor"),m=v.Mustache,g=r.$,y=r._;return u.extend({template:t,selectSportTemplate:n,events:{},initialize:function(e){this.headerView=e.headerView,u.prototype.initialize.call(this,e),this.initSportList()},selectSport:function(e){self.select_sport=self.$("#select-sport");var t=this.select_sport.val()},updateHeaderData:function(e){this.model.id!=e&&this.headerView.updateHeaderData(e)},getTeam:function(){var e=this;this.season=new c,this.season.id=this.model.get("payload").org_sport_link_obj.orgs_id,this.season.sport_id=g("#sports-h").val(),this.season.complevel_id=g("#season-h").val(),this.season.fetch(),g.when(this.season.request).done(function(){var t={};t.records=e.season.toJSON(),t.recordId="id",t.recordValue="team_name";var n=new l({data:t,title:"Team",elementId:"team-h",destination:".team-h",targetView:e,callback:function(t){e.updateHeaderData(g("#team-h").val()),e.showAllTeamData()}})})},showAllTeamData:function(){routing.trigger("refresh-teampage",g("#sports-h").val(),g("#team-h").val(),this.season.id)},getComplevels:function(){var e=this;this.complevel=new h,this.complevel.id=this.model.get("payload").org_sport_link_obj.orgs_id,this.complevel.sport_id=g("#sports-h").val(),this.complevel.fetch(),g.when(this.complevel.request).done(function(){var t={};t.records=e.complevel.toJSON(),t.recordId="complevel_id",t.recordValue="complevel_name";var n=new l({data:t,title:"Season",elementId:"season-h",destination:".season-h",selectedValue:e.model.get("payload").complevels_obj.complevel_profiles_id,targetView:e,callback:function(t){console.error("comp level call"),e.getTeam()}})})},initSportList:function(){console.error(this.model.toJSON());var e=this;this.sports=new f,this.sports.id=this.model.get("payload").org_sport_link_obj.orgs_id,this.sports.fetch(),g.when(this.sports.request).done(function(){var t={};t.records=e.sports.toJSON(),t.recordId="sport_id",t.recordValue="sport_name";var n=new l({data:t,elementId:"sports-h",title:"Sport",selectedValue:e.model.get("payload").org_sport_link_obj.sports_id,destination:".sports-h",targetView:e,callback:function(t){e.getComplevels()}})})},insertOption:function(e,t){var n="",r=t.length;for(var i=0;i<r;i++)n+='<option value="'+t[i].payload.sport_id+'">'+t[i].payload.sport_name+"</option>";e.html(n)},setupSportListView:function(){function r(){t.render(),e.$el.find("#sports-info").html(t.el);var n={payload:[]},r=t.collection;if(r.length){for(i=0;i<r.length;i++)n.payload[i]=r.at(i).get("payload");var s=m.to_html(e.selectSportTemplate,n);e.$el.find("#sports-info").prepend(s)}else e.$el.find("#sports-info").html("")}var e=this,t=new a({collection:this.sports}),n=this.addChildView(t);this.childViews.sportListView=t,this.callbacks.add(function(){n()}),d("teamsports:fetch").subscribe(r)},setOptions:function(e){if(!this.model)throw new Error("HeaderView expects option with model property.")},childViews:{},render:function(e,t,n){u.prototype.render.call(this,e,t,n)}})});