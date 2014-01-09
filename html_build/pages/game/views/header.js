define(["require","text!game/templates/header.html","facade","views","game/models/score","game/models/basics","votes/models/vote","votes/models/follow","usercontrols/location/views/location","usercontrols/location/models/verify-adress","usercontrols/location/models/save","chrome/views/header","usercontrol/dropdown/view/dropdown","media/views/image-item"],function(e,t){var n,r=e("facade"),i=e("views"),s=e("game/models/score"),o=e("game/models/basics"),u=e("votes/models/vote"),a=e("votes/models/follow"),f=e("media/views/image-item"),l=e("usercontrols/location/views/location"),c=e("usercontrol/dropdown/view/dropdown"),h=e("usercontrols/location/models/verify-adress"),p=e("usercontrols/location/models/save"),d=i.SectionView;return n=d.extend({id:"main-header",template:t,events:{"click .edit-score-h":"editScore","blur .edit-score-input-h":"resumeEditScore","keyup .edit-score-input-h":"adjustFont","click .vote":"vote","click .follow":"follow","click .object-edit-h":"editObject","click .object-delete-h":"deleteObject","submit .update-date-time-h":"updateDateTime","click .game-edit-btn-h":"openEditPopup","click .verify-address-h":"verifyAddress","blur .address-h":"verifyAddress"},messages:{dataNotExist:"Data does not exist . ",selectDateAndTime:"Please select date and time",selectTeam:"Please select team",selectScore:"Please enter score",selectLocation:"Please select location",selectLocationType:"Please select location type",gameFound:"Sweet ! This Event Already Exists ! ",enterEventName:"Please enter event name",selectSport:"Please select sport",selectValidTime:"Please enter valid time in format hh:mm (12 hours)"},location:{lat:undefined,lon:undefined},initialize:function(e){d.prototype.initialize.call(this,e);var t=this.model.get("payload"),n;if(t.teams){if(t.teams.length)try{n=t.teams[0].org_name+" VS "+t.teams[1].org_name,n+=" "+t.shared.complevel}catch(r){n="Game Page"}}else n=t.event_name;n+=" | "+t.shared.sport+" | "+t.game_day,document.title=n,this.setDateFields()},setDateFields:function(){var e=this.model.get("payload"),t=e.game_time;console.log(t);if(t!=undefined)try{var n=t.split(" ");console.log(n),n.length&&(e.game_hour=n[0],e.game_ampm=n[1],console.log("full payload now",e),this.model.set("payload",e))}catch(r){}},adjustFont:function(e){var t=2.2,n=$(e.target).val().length-2,r=n>0?t-.4*n:t-0;r>0&&$(e.target).parents(".team-item").find(".game-score-el").css({"font-size":r+"em"})},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},openEditPopup:function(){if(!this.checkForUser()){routing.trigger("showSignup");return}$("#modalPopupGameEdit").modal(),this.location.lon=this.model.get("payload").location.lon,this.location.lat=this.model.get("payload").location.lat,this.showLocation()},showLocation:function(){routing.trigger("show_location",this.location.lat,this.location.lon,".view-map-h",function(){})},setLocation:function(e){var t=confirm("Are you sure want to set new address?");if(t&&this.locationId){var n=new p;n.id=this.game_id,n.set({locations_id:this.locationId,id:this.game_id}),n.save(),$.when(n.request).done(function(){routing.trigger("popup-close")})}},verifyAddress:function(){var e=this,t=e.$el.find(".address-h").val();e.adressModel=new h,e.adressModel.address=t,e.adressModel.url(),e.adressModel.set({address:t}),e.adressModel.showError=function(t,n){try{e.$el.find(".set-address-h").addClass("link-disabled"),e.$el.find(".address-error-status-h").removeClass("hide").html(n.responseJSON.exec_data.error_array[0].error)}catch(r){}e.$el.find(".address-h").addClass("address-field-error").removeClass("address-verified")},e.adressModel.save({dataType:"json"}),e.$el.find(".address-h").removeClass("address-verified"),$.when(e.adressModel.request).done(function(){console.log(e.adressModel.toJSON()),e.locationId=e.adressModel.get("payload").id,e.locationId&&(e.$el.find(".address-error-status-h").addClass("hide"),e.$el.find(".address-h").removeClass("address-field-error").addClass("address-verified"),e.location.lon=e.adressModel.get("payload").lon,e.location.lat=e.adressModel.get("payload").lat,e.showLocation(),e.$el.find(".set-address-h").removeClass("link-disabled"))})},editObject:function(){alert("Coming soon")},deleteObject:function(){alert("Coming soon")},gameEditBtn:function(){this.$el.find(".update-date-time-h").removeClass("hide")},tags:{rgxTime:/^(0?[1-9]|1[012])(:[0-5]\d)$/,rgxTimeWhole:/^(0?[1-9]|1[012])$/},formatDate:function(e,t,n){var r=$.datepicker.formatDate("yy-mm-dd",e);try{var i=t.split(":");return console.log(i),i.length==1&&(t+=":00"),t+=" "+n,r+=" "+t,r}catch(s){return!1}},updateDateTime:function(e){e.preventDefault();var t=!0,n=this,r=$(this.el).find(".txt-game-date_h").datepicker("getDate"),i=$(this.el).find(".txtTime").val(),s=$(this.el).find("#hdn_time-period_h").val(),t=!0;if(!r||!i)$(n.destination).find(".section-game-date_h").find(".field-message_h").html("Please Se").fadeIn(),t=!1;else{var o=i.match(n.tags.rgxTime)||i.match(n.tags.rgxTimeWhole);console.log("orginal date",r),console.log("orginal time",i),console.log("ampm",s),o?($(n.el).find(".section-game-date_h").find(".field-message_h").html("").fadeOut(),r=this.formatDate(r,i,s),r||(t=!1)):(console.log("NOT VALID"),$(n.el).find(".section-game-date_h").find(".field-message_h").html(n.messages.selectValidTime).fadeIn(),t=!1)}console.log("new date",r);var u=$(n.el).find("#event_name").val(),a=this,f=new p;f.id=this.model.id,console.log(f,u),f.set({game_datetime:r,locations_id:this.locationId,id:this.model.id,event_name:u}),f.save(),$.when(f.request).done(function(){a.updateHeaderData(f.id)})},updateHeaderData:function(e){var t=this;t.model.id=e,t.model.fetch(),$.when(t.model.request).done(function(){t.setDateFields(),console.error(t.model.toJSON()),$("#modalPopupGameEdit").modal("hide"),t.render()})},cancelDateTimeBtn:function(){this.$el.find(".update-date-time-h").addClass("hide")},afterRender:function(){this.$el.find(".edit-score-input-h").trigger("keyup"),this.$el.find(".image-outer-h").mouseover(function(){$(this).find(".action-block").css({opacity:90})}).mouseout(function(){$(this).find(".action-block").css({opacity:0})}),this.$el.find(".date-time-h").datetimepicker({timeFormat:"hh:mm:ss",dateFormat:"yy-mm-dd",showTimezone:!0,changeMonth:!0,changeYear:!0})},vote:function(e){e.preventDefault(),console.log(this.model);var t=new u;t.userId=this.model.id,t.entity_id=this.model.get("payload").enttypes_id,t.setData(),t.save()},follow:function(e){e.preventDefault(),console.log(e.target);var t=new a;t.userId=this.model.id,t.entity_id=this.model.get("payload").enttypes_id,t.save()},editScore:function(e){if(!this.checkForUser()){routing.trigger("showSignup");return}$(e.currentTarget).hide(),$(e.currentTarget).parents(".score-box-h").find(".edit-score-input-h").attr("type","text").focus()},checkForUser:function(){return!_.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},resumeEditScore:function(e){var t=new s;t.teams_id=$(e.currentTarget).data("id"),t.score=$(e.target).val(),t.gameId=this.model.id,t.set({id:$(e.target).data("id"),games_teams_link_id:$(e.target).data("id"),score:$(e.target).val()}),t.save(),this.$el.find(".edit-score-input-h").attr("type","hidden"),this.$el.find(".edit-score-h").show(),$.when(t.request).done(function(){$(e.currentTarget).parents(".score-box-h").find(".edit-score-h span").html(t.get("score"))})},childViews:{},render:function(e,t,n){d.prototype.render.call(this,e,t,n),$(this.el).find(".txt-game-date_h").datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,changeYear:!0});var r=[{payload:{name:"AM",value:"AM"}},{payload:{name:"PM",value:"PM"}}],i={};i.records=r,i.recordId="name",i.recordValue="value";var s=this,o=new c({data:i,elementId:"hdn_time-period_h",destination:".spn-ddl-time-period_h",targetView:s,selectedValue:this.model.get("payload").game_ampm,callback:function(e){}});this.renderImage()},renderImage:function(){this.headerImage=new f({model:this.model}),this.headerImage.render(),this.$el.find(".image-outer-h").html(this.headerImage.$el)}}),n});