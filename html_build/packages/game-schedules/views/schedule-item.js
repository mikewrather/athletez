define(["vendor","views","utils","text!schedules/templates/schedule-item.html","text!schedules/templates/schedule-single-item.html"],function(e,t,n,r,i){var s=e.$,o=t.BaseView,u=e.Mustache;return o.extend({tagName:"li",className:"org",events:{"change #select-team":"selectTeam"},initialize:function(e){e.teamView&&(this.teamView=e.teamView)},render:function(){if(this.teamView){this.mpay=this.model.get("payload"),this.template=i;var e=this.createOpponentString(),t=u.to_html(this.template,{id:this.mpay.id,summary:e})}else{this.template=r;var t=u.to_html(this.template,this.model.toJSON())}return this.$el.html(t),this.select_team=this.$("#select-team"),this.selectTeam(),this},createOpponentString:function(){var e=this.mpay.game_day+" | ";return console.log("Game info",this.mpay),s.each(this.mpay.teams,function(){this.id>0&&this.id!=this.teams_id&&(e+=" VS. "+this.org_name)}),e},selectTeam:function(e){var t=this.select_team.val();this.$(".team-info").stop().slideUp(),this.$(".team-info-"+t).stop().slideDown()}})});