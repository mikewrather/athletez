define(["vendor","views","utils","text!sportorg/templates/org-item.html"],function(e,t,n,r){var i,s=e.$,o=t.BaseView,u=e.Mustache;return i=o.extend({tagName:"li",className:"org",events:{"change #select-team":"selectTeam","click .team-info-h":"showinfo"},showinfo:function(e){e.preventDefault(),s(e.target).parents(".org-popup").length||(s(e.target).find(".org-popup").hasClass("hide")?(s(".org-popup").addClass("hide"),s(e.target).find(".org-popup").removeClass("hide")):s(".org-popup").addClass("hide"))},initialize:function(e){s("body").click(function(e){!s(e.target).hasClass("team-info-h")&&!s(e.target).hasClass("org-popup")&&s(e.target).parents(".org-popup").length===0&&s(".org-popup").addClass("hide")}),this.template=r},render:function(){var e=u.to_html(this.template,this.model.toJSON());return this.$el.html(e),this.select_team=this.$("#select-team"),this.selectTeam(),this},selectTeam:function(e){var t=this.select_team.val();this.$(".team-info").stop().slideUp(),this.$(".team-info-"+t).stop().slideDown()}}),i});