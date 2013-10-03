define(["require","text!game/templates/header.html","facade","views","game/models/score","game/models/basics","votes/models/vote","votes/models/follow","usercontrols/location/views/location"],function(e,t){var n,r=e("facade"),i=e("views"),s=e("game/models/score"),o=e("game/models/basics"),u=e("votes/models/vote"),a=e("votes/models/follow"),f=e("usercontrols/location/views/location"),l=i.SectionView;return n=l.extend({id:"main-header",template:t,events:{"click .edit-score-h":"editScore","blur .edit-score-input-h":"resumeEditScore","click .vote":"vote","click .follow":"follow","click .object-edit-h":"editObject","click .object-delete-h":"deleteObject","click .game-edit-btn-h":"gameEditBtn","submit .update-date-time-h":"updateDateTime","click .cancel-time-edit-h":"cancelDateTimeBtn","click .address-info-h":"openLocationPopup"},initialize:function(e){l.prototype.initialize.call(this,e)},openLocationPopup:function(){console.log(this.model);var e={latitude:this.model.get("payload").location.lat,longitude:this.model.get("payload").location.lon};routing.trigger("location_popup_open",f,e)},editObject:function(){alert("Coming soon")},deleteObject:function(){alert("Coming soon")},gameEditBtn:function(){this.$el.find(".update-date-time-h").removeClass("hide")},updateDateTime:function(e){console.log(this.model),e.preventDefault(),this.$el.find(".update-date-time-h").addClass("hide");var t=this,n=this.$el.find(".date-time-h").val(),r=new o;r.id=this.model.id,r.set({game_datetime:n,id1:r.id}),r.save(),$.when(r.request).done(function(){t.updateHeaderData(r.id)})},updateHeaderData:function(e){var t=this;t.model.id=e,t.model.fetch(),$.when(t.model.request).done(function(){t.render()})},cancelDateTimeBtn:function(){this.$el.find(".update-date-time-h").addClass("hide")},afterRender:function(){this.$el.find(".image-outer-h").mouseover(function(){$(this).find(".action-block").css({opacity:90})}).mouseout(function(){$(this).find(".action-block").css({opacity:0})}),this.$el.find(".date-time-h").datetimepicker({timeFormat:"hh:mm:ss",dateFormat:"yy-mm-dd",showTimezone:!0,changeMonth:!0,changeYear:!0})},vote:function(e){e.preventDefault(),console.log(this.model);var t=new u;t.userId=this.model.id,t.entity_id=this.model.get("payload").enttypes_id,t.setData(),t.save()},follow:function(e){e.preventDefault(),console.log(e.target);var t=new a;t.userId=this.model.id,t.entity_id=this.model.get("payload").enttypes_id,t.save()},editScore:function(e){$(e.currentTarget).hide(),$(e.currentTarget).parents(".score-box-h").find(".edit-score-input-h").attr("type","text").focus()},resumeEditScore:function(e){var t=new s;t.teams_id=$(e.currentTarget).data("id"),t.score=$(e.target).val(),t.gameId=this.model.id,t.set({id:$(e.target).data("id"),teams_id:$(e.target).data("id"),score:$(e.target).val()}),t.save(),this.$el.find(".edit-score-input-h").attr("type","hidden"),this.$el.find(".edit-score-h").show(),$.when(t.request).done(function(){})},childViews:{},render:function(e,t,n){l.prototype.render.call(this,e,t,n)}}),n});