define(["vendor","views","utils","text!schedules/templates/schedule-item.html","text!schedules/templates/schedule-single-item.html","text!schedules/templates/schedule-event-item.html"],function(e,t,n,r,i,s){var o=e.$,u=t.BaseView,a=e.Mustache;return u.extend({tagName:"li",className:"org",events:{"change #select-team":"selectTeam"},initialize:function(e){console.log(e),e.model&&e.model.collection&&(this.teams_id=e.model.collection.id),e.teamView&&(this.teamView=e.teamView),e.eventView&&(this.eventView=e.eventView)},render:function(){if(this.teamView){this.mpay=this.model.get("payload"),this.template=i;var e=a.to_html(this.template,{payload:this.mpay,teams_id:this.teams_id});o(this.el).attr("data-team-id",this.teams_id)}else if(this.eventView&&this.eventView!=""){delete this.teams_id;if(this.model.get("payload")!==null&&this.model.get("payload").result_time==="0h 0m 0s"){var t=this.model.get("payload");t.result_time=null,this.model.set("payload",t)}console.log("schedule item event",this.model.toJSON()),this.template=s;var e=a.to_html(this.template,this.model.toJSON())}else{delete this.teams_id,this.template=r;var e=a.to_html(this.template,this.model.toJSON())}return this.$el.html(e),this.select_team=this.$("#select-team"),console.log(this.select_team),this.selectTeam(),this.setWins(),this},setWins:function(){var e=this.teams_id!=undefined?this.teams_id:o(this.el).find("div.org-name a.add-game-h").attr("data-team-id"),t=this,n=o(this.el).attr("data-team-id")?o(this.el):o(this.el).find("ul li");n.each(function(t){e=o(this).find("a.team-info-h").attr("data-team-id");var n=o(this).find('span.team-name[data-team-id="'+e+'"]');o(this).find('span.team-name[data-team-id="'+e+'"][data-winner="true"]').length&&o(this).find("a.team-info-h").addClass("win").removeClass("background-blue"),o(this).find('span.team-name[data-winner="true"]').length||o(this).find("a.team-info-h").addClass("noscore").removeClass("background-blue"),o(this).find('span.team-name[data-team-id="'+e+'"]').hide()})},selectTeam:function(e){var t=this.select_team.val();this.$(".team-info").stop().slideUp(),this.$(".team-info-"+t).stop().slideDown(),console.log(t)}})});