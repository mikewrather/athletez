define(["vendor","views","utils","text!sportorg/templates/team-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache;return i=o.extend({tagName:"li",className:"team",events:{"mouseover .team-info-h":"showinfo","mouseout .team-info-h":"showinfo"},showinfo:function(e){e.preventDefault(),s(e.target).parents(".game-info").length||(s(e.target).find(".game-info").hasClass("hide")?s(e.target).find(".game-info").removeClass("hide"):s(".game-info").addClass("hide"))},initialize:function(e){this.teams_id=e.teams_id||null,console.log("Teams_id:",e),this.mpay=this.model.get("payload"),console.log("Team Item View",this.mpay),this.template=r},render:function(){var e=this.createOpponentString(),t=u.to_html(this.template,{id:this.mpay.id,summary:e});return this.$el.html(t),this},createOpponentString:function(){var e=this.mpay.game_day+" | ";return console.log("Game info",this.mpay),s.each(this.mpay.teams,function(){this.id>0&&this.id!=this.teams_id&&(e+=" VS. "+this.org_name)}),e}}),i});