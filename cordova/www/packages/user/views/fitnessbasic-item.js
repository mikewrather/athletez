define(["vendor","views","utils","text!user/templates/fitnessbasic-item.html","user/models/fitness","vendor/plugins/qtip/qtip-wrapper","text!vendor/plugins/qtip/qtip.css"],function(e,t,n,r,i){var s,o=e.$,u=t.BaseView,a=e.Mustache;return s=u.extend({tagName:"li",className:"fitnessbasic",events:{},showInput:function(e){o(e.target).addClass("hide-force"),o(e.target).parents("span.stat-val-outer").find(".stats-input-h").removeClass("hide-force").focus()},hideInput:function(e){var t=o(e.target).data("id"),n=-1,r=this.model.get("payload").data;for(var s in r)if(r[s].id==t){n=s;break}if(n!=-1){var u=new i;u.set({user_id:routing.loggedInUserId,resume_data_id:o(e.currentTarget).data("resume-data-id"),user_value:o(e.target).val()}),u.save();var a=o(e.target).parents("span.stat-val-outer").find(".stats-val-h");a.html(o(e.target).val()),o.when(u.request).done(function(){a.html(u.get("payload").user_value!=""?u.get("payload").user_value:"--"),o(e.target).addClass("hide-force"),a.removeClass("hide-force")})}},initialize:function(e){this.template=r,this.recordId=e.recordId},calculate:function(){if(this.unit_type=="time")var e="00:"+this.user_value+":00";else var e=this.user_value;return e},bindToolTips:function(){var e=this;o.each(this.$el.find("img"),function(){var e=o(this);e.qtip2({position:{my:"bottom center",at:"top center"},style:{classes:"header-dropdown"}})})},render:function(){var e={},t=this;e=this.model.toJSON(),e.view=this,console.log("Fitness Data getting passed to template",e);var n=a.to_html(this.template,e);return this.$el.html(n),routing.loggedInUserId==this.recordId&&(this.$el.find(".stats-val-h").click(function(e){t.showInput(e)}),this.$el.find(".stats-input-h").blur(function(e){t.hideInput(e)})),this.bindToolTips(),this}}),s});