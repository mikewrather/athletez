define(["require","text!usercontrols/addgame/templates/layout.html","facade","views","utils","vendor","sportorg/collections/sports_listall","location/collections/states","usercontrols/addgame/collections/teams","location/collections/cities","usercontrols/addgame/collections/teams_user","usercontrols/addgame/collections/teams","usercontrols/addgame/collections/games_search","usercontrols/addgame/collections/orgs","usercontrols/addgame/models/team","usercontrols/addgame/models/team_add","usercontrols/addgame/models/game","usercontrols/addgame/models/uslgamelink","usercontrols/addgame/views/orgchoose","usercontrol/dropdown/view/dropdown","usercontrol/location/views/get-view-location","usercontrol/addgame/models/opponent","usercontrol/addgame/views/noteamfound","component/forms"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("usercontrols/tag/models/basic_info"),h=e("sportorg/collections/sports_listall"),p=e("location/collections/states"),d=e("location/collections/cities"),v=e("usercontrols/addgame/collections/teams_user"),m=e("usercontrols/addgame/collections/teams"),g=e("usercontrols/addgame/models/team"),y=e("usercontrols/addgame/models/team_add"),b=e("usercontrols/addgame/models/game"),w=e("usercontrols/addgame/collections/games_search"),E=e("usercontrol/dropdown/view/dropdown"),S=e("usercontrol/location/views/get-view-location"),x=e("component/forms"),T=e("usercontrol/addgame/models/opponent"),N=e("usercontrols/addgame/collections/orgs"),C=e("usercontrols/addgame/views/orgchoose"),k=e("usercontrol/addgame/views/noteamfound"),L=e("usercontrols/addgame/models/uslgamelink"),A=s.extend({template:t,gameData:{},teams:[],events:{"change .ddl-game-sports_h":"changeSport","keyup .txt-game-state_h":"keyupState","blur .txt-game-state_h":"changeState","keyup .txt-game-city_h":"keyupCity","blur .txt-game-city_h":"changeCity","keyup .txt-game-team_h":"keyupTeam","blur .txt-game-team_h":"changeTeam","keyup .txt-individual-game_h":"keyupIndividualGame","blur .txt-individual-game_h":"changeindividualGame","change .ddl-game-userteams_h":"changeUserTeam","click .btn-new-team-game_h":"showAddTeam","click .btn-ddl-team-game_h":"showDdlTeam","click .rdo-game-location_h":"showLocation","click .btn-game-Finish_h":"finishGame","change .txt-game-date_h":"CheckTeamControlsVisibility","click .btn-game-individual-Create_h":"createIndividualEvent","click .btn-game-individual-Finish_h":"goThereIndividualGame"},controls:{sectionAddSports:".section-Add-Sports_h",sectionDate:".section-game-date_h",txtGameDate:".txt-game-date_h",txtGameTime:".txt-game-time_h",spnTimePeriod:".spn-ddl-time-period_h",ddlTimePeriod:".ddl-time-period_h",spnSports:".span-ddl-sports_h",ddlSports:".ddl-game-sports_h",sectionTeams:".section-game-teams_h",ddlUserTeams:".ddl-game-userteams_h",spanddlteam:".span_ddl_team_h",spanddlteamtwo:".span_ddl_team_two_h",spanddlteamone:".span_ddl_team_one_h",btnNewTeam:".btn-new-team-game_h",btnDdlTem:".btn-ddl-team-game_h",sectionNewTeam:".section-new-team_h",txtState:".txt-game-state_h",txtCity:".txt-game-city_h",txtTeam:".txt-game-team_h",txtScore:".txt-score-team_h",btnFinish:".btn-game-Finish_h",sectionTeamOne:".team-one_h",sectionTeamTwo:".team-two_h",sectionScore:".section-score_h",sectionRadio:".section-game-radio_h",rdoTeamOne:".rdo-game-location-one-home_h",rdoTeamTwo:".rdo-game-location-two-home_h",rdoLocation:".rdo-game-location_h",sectionMainLocation:".section-main-location_h",sectionLocation:".div-game-location_h",txtLocationId:".txt-game-location-id_h",sectionIndividual:".section-individual-game_h",txtIndividualGame:".txt-individual-game_h",btnIndividualFinish:".btn-game-individual-Finish_h",txtIndividualLocation:".txt-individual-location_h",btnIndividualGameCreate:".btn-game-individual-Create_h",fieldMessage:".field-message_h",secSports:".section-game-sports_h",hdnSportsIdData:"hdn_sport_id",hdnSportsId:"#hdn_sport_id",hdnTimePeriodData:"hdn_time-period_h",hdnTimePeriod:"#hdn_time-period_h",indicator:".indicator_h"},attributes:{stateId:"stateid",schoolId:"schoolid",teamId:"teamid",playersId:"playerid",cityId:"cityid",sportId:"sportid",locationId:"locationid",gameId:"gameid"},inlineTemplates:{},messages:{dataNotExist:"Data does not exist . ",selectDateAndTime:"Please select date and time",selectTeam:"Please select team",selectScore:"Please enter score",selectLocation:"Please select location",selectLocationType:"Please select location type",gameFound:"Sweet ! This Event Already Exists ! ",enterEventName:"Please enter event name",selectSport:"Please select sport",selectValidTime:"Please enter valid time in format hh:mm (12 hours)"},tags:{individual:"individual",team:"team",rgxTime:/^(0?[1-9]|1[012])(:[0-5]\d)$/,rgxTimeWhole:/^(0?[1-9]|1[012])$/},initialize:function(e){s.prototype.initialize.call(this,e),n=this,this.teams_id=e.teams_id,n.setOptions(e),this.init()},render:function(){s.prototype.render.call(this);var e=this,t,r=new x({date:{tooltip:"Select the game's date.  If the game is in the past, you will be prompted to enter an optional score.",form_values:{post_to_server:!1,serverKey:"game_date",serverDbField:"gameDay",objectValuesToUpdate:["game_datetime"],getValue:function(){return this.$el.val()}},fieldClass:"date-picker-field",type:"Text",attr:{placeholder:"Enter Date","class":"txt-game-date_h txtDate"},showLable:!1,label:"Date",bindDatePicker:!0,changeEvent:function(){var e=new Date(this.getValue()),t=new Date;e!=null&&t>=e?l(".txt-score-team-h").removeClass("hidden"):l(".txt-score-team-h").addClass("hidden").val("")}},time:{tooltip:'e.g. "4" or "4:15"',form_values:{post_to_server:!1,serverDbField:"gameTime",serverKey:"game_time",objectValuesToUpdate:["game_datetime"]},type:"Text",fieldClass:"time-picker-field",attr:{placeholder:"Time","class":"txt-game-time_h hasDatepicker txtTime"},showLable:!1,label:"Time",validators:[{type:"required",message:"Please enter a time"},/^(0?[1-9]|1[012])(:[0-5]\d)?$/]},Day_light:{type:"DropDown",fieldClass:"ampm-field",form_values:{post_to_server:!1,serverKey:"game_ampm",objectValuesToUpdate:["game_datetime"],data:{records:[{payload:{name:"AM",value:"AM"}},{payload:{name:"PM",value:"PM"}}],recordId:"name",recordValue:"value",selectedValue:"PM"},elementId:e.controls.hdnTimePeriodData,callback:function(e){}},showLable:!1,label:""},game_datetime:{type:"Hidden",form_values:{serverDbField:"game_datetime",valueBindings:["date","time","Day_light"],serverKey:"game_datetime",post_to_server:!0}},Select_Team_1:{type:"AutoComplete",label:"Select Team 1",tooltip:"Select the first team competing in this event.",form_values:{keyNameInPayload:"team_name",showElements:["team_1"],serverKey:"teamOneId",serverDbField:"teams_id",defaultValue:"",field_width:"80%",request_fields:[{key:"states_id",value:e.states_id},{key:"sports_id",value:function(){return e.sports_id}},{key:"team_name",value:function(e){return e.$el.val()}}],source_collection:m,request_finished:function(){},automaticFetch:!0,automaticFetchFn:function(t){var r=new g;r.id=e.team_id,r.fetchSuccess=function(e,i){var s=r.parseAsRequired(i);n.complevels_id=s.complevels_id,n.states_id=s.states_id,n.sports_club=s.sports_club,n.seasons_id=s.seasons_id,n.year=s.year,n.teamOneModel=r,t.setValue(s.team_id,s.team_name),l(n.destination).find("input[name=team_1]").attr("teamId",s.team_id)},r.fetch()},callback:function(e,t){l("input[name=team_1]").attr("teamId",e),n.complevels_id=t.full_return.complevels_id,n.seasons_id=t.full_return.seasons_id,n.year=t.full_return.year,l(n.destination).find("input[name=team_1]").attr("teamId",e)},afterSetValue:function(e){e=="show"?l("input[name=team_1]").parents(".field-row").removeClass("hide"):l("input[name=team_1]").parents(".field-row").addClass("hide")}},validators:[{type:"required",message:"Please select Team 2."}]},score_1:{form_values:{serverKey:"",field_width:"70px"},type:"Text",attr:{placeholder:"Score","class":"txt-score-team-h hidden"},showLable:!1,label:"Score 1"},team_1:{tooltip:'Is this team the "Home" team or "Away" team?  Selecting this team as the Home team will automatically fill in the game\'s location.',form_values:{serverKey:"teamOne"},type:"Radio",options:["Home","Away"],attr:{team:"one"},hideElement:!0,showLable:!1,label:"Team 1",onClickFn:function(t){var r=t?l(t.target).val():"away",i=0;if(r=="Home")i=l(t.target).attr(n.attributes.teamId),console.log(l(n.destination).find('input[name="team_2"][value="Away"]')),l(n.destination).find('input[name="team_2"][value="Home"]').removeAttr("checked"),l(n.destination).find('input[name="team_2"][value="Away"]').attr("checked","checked").prop("checked",!0);else{i=!1;var s=l(n.destination).find("input[name=team_2]:checked");console.log(s),s.each(function(){r=l(this).val(),r==="Home"&&!i&&(i=l(this).attr(n.attributes.teamId))})}if(i){var o=new g;o.id=i,o.fetchSuccess=function(n,r){var i=o.parseAsRequired(r);e.location_id=i.location_id||0;var s=l(t.target).parents("form");s.find(".address-h").val(i.location_name).trigger("blur"),s.find(".verify-address-h").val(i.location_name).trigger("click")},o.fetch()}else l(t.target).parents("form").find(".address-h").html("").val("").trigger("blur")}},Select_Team_2:{tooltip:"Just start typing to find the opponent team.  If the team doesn't exist, you will be able to create it.",type:"AutoComplete",label:"Select Team 2",form_values:{keyNameInPayload:"team_name",serverKey:"teamTwoId",showElements:["team_2"],serverDbField:"teams_id",field_width:"80%",request_fields:[{key:"states_id",value:e.states_id},{key:"sports_id",value:function(){return e.sports_id}},{key:"complevels_id",value:function(){return e.complevels_id>0?e.complevels_id:!1}},{key:"seasons_id",value:function(){return e.seasons_id>0?e.seasons_id:!1}},{key:"year",value:function(){return e.year>0?e.year:!1}},{key:"team_name",value:function(e){return e.$el.val()}}],source_collection:m,request_finished:function(){},noResultsCallback:function(n){var r=this;_.isUndefined(t)||t.destroy_view(),t=new k({teamOneModel:e.teamOneModel,search_text:n,states_id:e.states_id,sports_club:e.sports_club,sports_id:e.sports_id,formval_this:r,destination:l('input[name="Select_Team_2"]').parent()})},callback:function(e){l("input[name=team_2]").attr("teamId",e)},afterSetValue:function(e){console.error(e),e=="show"?(l("input[name=team_2]").parents(".field-row").removeClass("hide"),l("input[name=score_2]").parents(".field-row").removeClass("hide")):(l("input[name=team_2]").parents(".field-row").addClass("hide"),l("input[name=score_2]").parents(".field-row").addClass("hide"))}},validators:[{type:"required",message:"Please select Team 2."}]},score_2:{form_values:{serverKey:"",field_width:"70px"},type:"Text",attr:{placeholder:"Score","class":"txt-score-team-h hidden"},showLable:!1,hideElement:!0,label:"Score 2"},team_2:{tooltip:'Is this team the "Home" team or "Away" team?  Selecting this team as the Home team will automatically fill in the game\'s location.',form_values:{serverKey:""},type:"Radio",options:["Home","Away"],showLable:!1,hideElement:!0,label:"Team 2",onClickFn:function(t){var r=t?l(t.target).val():"away",i=0;if(r=="Home")i=l(t.target).attr(n.attributes.teamId),l(n.destination).find('input[name="team_1"][value="Home"]').removeAttr("checked"),l(n.destination).find('input[name="team_1"][value="Away"]').attr("checked","checked").prop("checked",!0);else{var s=l(n.destination).find("input[name=team_1]:checked");s.each(function(){r=l(this).val(),r=="Home"&&(i=l(this).attr("teamId"))})}if(i){var o=new g;o.id=i,o.fetchSuccess=function(n,r){var i=o.parseAsRequired(r);e.location_id=i.location_id||0;var s=l(t.target).parents("form");s.find(".address-h").val(i.location_name).trigger("blur"),s.find(".verify-address-h").val(i.location_name).trigger("click")},o.fetch()}else l(t.target).parents("form").find(".address-h").html("").val("").trigger("blur")}},Location:{tooltip:"Enter the game location.  This can be an address, a city, or a state.",form_values:{serverKey:"locations_id",post_to_server:!0,serverDbField:"locations_id"},type:"Location",label:"Game Location",validators:[{type:"required",message:"Please select location."}]},users_id:{form_values:{serverKey:e.users_id,post_to_server:!0,value:e.user_id},type:"Hidden"},submit:{type:"Submit",fieldClass:"button-field",attr:{value:"Create"},showLable:!1,onSubmit:function(t){var n=i.commit();if(n)for(var r in n){var s=l("*[name="+r+"]"),o=s.position();s.parents(".common-modal #modalBody").animate({scrollTop:o.top},"500",function(){s.addClass("focus-error-animation"),setTimeout(function(){s.removeClass("focus-error-animation")},2e3)});break}else{if(e.formValues)var u=e.formValues.getFormValues();else var u=i.getValue();var u=e.formValues.getFormValues(),a=e,f={game_datetime:u.game_datetime,game_location:u.locations_id,teamOneId:u.teamOneId,teamTwoId:u.teamTwoId,sports_id:u.sports_id,users_id:a.user_id},c=new b(f);c.save({}),l.when(c.request).fail(function(t){var n=JSON.parse(t.responseText),r=n.exec_data.error_array;e.formValues.showServersErrors(r)}),l.when(c.request).done(function(e){if(e!=null&&e.payload!=null){a.game_id=e.payload.id;var t=l(a.destination).find("input[value=Home]").is(":checked"),n={game_datetime:u.game_datetime,games_id:a.game_id,home_team:t||!1,locations_id:u.locations_id,score:u.score_1,users_id:a.user_id},r=new y(n),i=!1,s=!1;r.teams_id=u.teamOneId,r.save();var o=function(){i&&s&&routing.trigger(a.channel,e)};l.when(r.request).done(function(){i=!0,o()});var f={game_datetime:u.game_datetime,games_id:a.game_id,home_team:t||!1,locations_id:u.locations_id,score:u.score_2,users_id:a.user_id};t=l(a.destination).find(a.controls.rdoTeamTwo).is(":checked");var c=new y(f);c.teams_id=u.teamTwoId,c.save(),a.gameData={type:a.tags.team,game_datetime:u.game_datetime,team_id_one:u.teamOneId,team_id_two:u.teamTwoId,sports_id:u.sports_id,games_id:a.game_id,users_id:a.user_id},l.when(c.request).done(function(){s=!0,o()})}})}}},button:{type:"Button",fieldClass:"button-field",attr:{value:"Cancel"},onClick:function(){routing.trigger("common-popup-close")},showLable:!1}},this.$el.find(".add-game-container-h")),i=r.form;this.formValues=r.formValues},afterRender:function(){var e=this,t=new S({callback:function(t){var n=t!=""?!0:!1;e.$el.find(".btn-game-Finish_h").attr("disable",n),e.$el.find(".txt-game-location-id_h").val(t)}});this.$el.find(".location-view-h").html(t.el)},setOptions:function(e){this.user_id=e.user_id;if(!e.channel)throw new Error("call back channel is must for this");this.channel=e.channel,this.sports_id=e.sports_id||null,this.team_id=e.teams_id||null},init:function(){n.setupView()},setupView:function(){n.setUpMainView();if(n.team_id){var e=new g;e.id=n.team_id,e.fetchSuccess=function(t,r){var i=e.parseAsRequired(r);n.team=i,n.sports_id=i.sports_id||null,n.fillSports()},e.fetch()}else n.fillSports()},setUpMainView:function(){var e=f.to_html(n.template,{});l(n.el).html(e)},fillSports:function(){var e=new h;e.processResult=function(t){var r=e.ParseForDropdown();n.SetupSportsView(r)},e.fetch()},SetupSportsView:function(e){n.sports=e;var t={};t.records=n.sports,t.recordId="id",t.recordValue="custom_name";var r=new E({data:t,title:"Select Sport",elementId:n.controls.hdnSportsIdData,destination:n.controls.spnSports,targetView:n,selectedValue:n.sports_id||null,callback:function(e){n.changeSport(e)}})},changeSport:function(e){if(e&&e!=0){l(n.destination).find(n.controls.sectionTeams).show(),l(n.destination).find(n.controls.btnFinish).fadeIn(),l(n.destination).find("input").attr(n.attributes.sportId,e);var t=n.getTeamType(e);t&&n.fillTeams(e)}else l(n.destination).find(n.controls.btnFinish).fadeOut(),l(n.destination).find(n.controls.sectionTeams).fadeOut(),l(n.destination).find("input").removeAttr(n.attributes.stateId);n.CheckTeamControlsVisibility()},setFirstTeam:function(e){console.log("setFirstTeam");var t=!1;if(n.team_id){for(var r in n.teams)n.teams[r].payload.id==n.team_id&&(t=!0);if(!t)if(n.team)n.setSelectedTeam(n.team);else{var i=new g;i.id=n.team_id,i.fetchSuccess=function(e,t){var r=i.parseAsRequired(t);n.team=r,n.setSelectedTeam(r)},i.fetch()}n.CheckTeamControlsVisibility()}},setSelectedTeam:function(e){console.log("setSelectedTeam");if(e){console.log("data",e);var t=e.team_name,r=e.team_id;l(n.destination).find(n.controls.sectionTeamOne).find("input").attr(n.attributes.teamId,r),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.spanddlteamone).hide(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).hide(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).val(t).show(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.indicator).addClass("valid").removeClass("invalid").show()}},fillTeams:function(e){var t=new v;t.user_id=n.user_id,t.sports_id=e,t.processResult=function(e){var r={team_name:"Team Not Found",id:-1},i=t.AppendItem(r);n.setUpUserTeams(i)};var r=t.fetch()},setUpUserTeams:function(e){n.teams=e||[],n.setFirstTeam(n.team_id);var t={};t.records=n.teams,t.recordId="id",t.recordValue="team_name";var r=new E({data:t,elementId:"hdn_team_id",targetView:n,destination:n.controls.spanddlteamone,selectedValue:n.team_id||null,callback:function(e){n.changeUserTeamOne(e)}})},changeUserTeamOne:function(e){console.log("result1",e),e=="-1"?l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).trigger("click"):(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).show(),l(n.destination).find(n.controls.sectionTeamOne).find("input").attr(n.attributes.teamId,e),l(n.destination).find(n.controls.sectionTeamOne).find("input:checked").removeAttr("checked"),n.showLocation())},changeUserTeamTwo:function(e){console.log("result",e),e=="-1"?l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.btnNewTeam).trigger("click"):(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.btnNewTeam).show(),l(n.destination).find(n.controls.sectionTeamTwo).find("input").attr(n.attributes.teamId,e),l(n.destination).find(n.controls.sectionTeamTwo).find("input:checked").removeAttr("checked"),n.showLocation())},showAddTeam:function(e){l(e.target).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.spanddlteam).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).show(),l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},showDdlTeam:function(e){l(e.target).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).val("").hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide(),l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.ddlUserTeams).val("").show(),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},keyupState:function(e){var t=l(e.target).val(),r=[];if(t!="")if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.stateId),n.CheckTeamControlsVisibility();var i=new p;i.state_name=l(e.target).val(),console.log("State Request Abort Request Function AddGame/Main.js"),n.stateFetchRequest=n.stateFetchRequest||[],n.stateFetchRequest.push(n.cityFetchRequest||[]),n.stateFetchRequest.push(n.teamFetchRequest||[]),l(e.target).addClass("ui-autocomplete-loading"),n.stateFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.stateFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.states=[];for(var s in t)n.states.push(t[s].payload);n.states.forEach(function(e,t){r.push(e.name)});try{l(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else n.changeState(e)},changeState:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.stateId);var r=!1;n.states_id="",n.states&&n.states.forEach(function(i,s){i["name"]==t&&(r=!0,n.states_id=i.id,l(e.target).attr(n.attributes.stateId,n.states_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).attr(n.attributes.stateId,n.states_id).fadeIn(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).attr(n.attributes.stateId,n.states_id).fadeOut(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide())}),r||(n.states_id=0,l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).removeAttr(n.attributes.stateId).fadeOut(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).removeAttr(n.attributes.stateId).fadeOut()),n.CheckTeamControlsVisibility()},keyupCity:function(e){var t=l(e.target).val(),r=[];if(t.length>2)if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.cityId),n.CheckTeamControlsVisibility();var i=new d;i.states_id=n.states_id,i.city_name=l(e.target).val(),n.cityFetchRequest=n.cityFetchRequest||[],n.cityFetchRequest.push(n.teamFetchRequest||[]),l(e.target).addClass("ui-autocomplete-loading"),n.cityFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.cityFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.cities=[];for(var s in t)n.cities.push(t[s]);n.cities.forEach(function(e,t){r.push(e.city)});try{n.$(e.target).autocomplete("destroy")}catch(o){}n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.changeCity(e)},changeCity:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.cityId);var r=!1;n.city_id="",n.cities&&n.cities.forEach(function(i,s){i["city"]==t&&(r=!0,n.city_id=i.id,l(e.target).attr(n.attributes.cityId,n.city_id))}),r||(n.city_id=0),n.CheckTeamControlsVisibility()},keyupTeam:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show(),n.CheckTeamControlsVisibility();var s=new m;s.states_id=l(e.target).attr(n.attributes.stateId),s.city_id=l(e.target).attr(n.attributes.cityId),s.sports_id=l(e.target).attr(n.attributes.sportId),s.team_name=t,l(e.target).addClass("ui-autocomplete-loading"),n.TeamFetchRequest=n.abortRequest(n.TeamFetchRequest);var o=s.fetch();n.TeamFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.teams=[];for(var i in t)n.teams.push(t[i].payload);n.teams.forEach(function(e,t){r.push(e.team_name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show(),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeTeam(e)},changeTeam:function(e){var t=l(e.target).val(),r=!1;n.team_id=0,n.teams&&n.teams.forEach(function(i,s){var o=i.team_name;o==t&&(r=!0,n.team_id=i.id,l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,n.team_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).removeClass("invalid").addClass("valid").show())});if(n.team){var i=n.team.team_name,s=n.team.team_id;i==t&&(r=!0,n.team_id=s,l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,n.team_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).removeClass("invalid").addClass("valid").show())}r||(l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show()),n.CheckTeamControlsVisibility()},keyupIndividualGame:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility();var s=new w;s.game_name=t,l(e.target).addClass("ui-autocomplete-loading"),n.individualGameFetchRequest=n.abortRequest(n.individualGameFetchRequest);var o=s.fetch();n.individualGameFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.eventNotFound(e):n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.individualGames=[];for(var i in t)n.individualGames.push(t[i].payload);n.individualGames.forEach(function(e,t){var n=e.event_name+" "+e.game_name;r.push(n)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeIndividualGame(e)},changeIndividualGame:function(e,t){var r=l(e.target).val(),i=!1;n.individual_game_id=0,n.individualGames&&n.individualGames.forEach(function(t,s){var o=t.event_name+" "+t.game_name;o==r&&(i=!0,n.individual_game_id=t.id,l(e.target).attr(n.attributes.gameId,n.individual_game_id))}),i?n.eventFound(e):n.eventNotFound(e),n.CheckTeamControlsVisibility()},eventNotFound:function(e){l(n.destination).find(n.controls.btnIndividualGameCreate).show(),l(n.destination).find(n.controls.btnIndividualFinish).hide(),l(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),l(e.target).removeAttr(n.attributes.gameId)},eventFound:function(e){l(n.destination).find(n.controls.btnIndividualGameCreate).hide(),l(n.destination).find(n.controls.btnIndividualFinish).show(),l(e.target).parent().find(n.controls.fieldMessage).html(n.messages.gameFound).fadeIn()},createIndividualEvent:function(e){var t=!0,r="",i=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),s=l(n.destination).find(n.controls.txtGameTime).val(),o=l(n.destination).find(n.controls.hdnTimePeriod).val(),u=n.location_id||l(n.controls.txtLocationId).val()||0,a=l(n.destination).find(n.controls.txtIndividualGame).val(),f=l(n.destination).find(n.controls.hdnSportsId).val();f||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),t=!1);if(!i||!s)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),this.focusOnErrorField(".section-Add-Sports_h"),t=!1;else{var c=s.match(n.tags.rgxTime)||s.match(n.tags.rgxTimeWhole);console.log("orginal date",i),console.log("orginal time",s),console.log("timeZone",o);if(!c)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectValidTime).fadeIn(),t=!1;else{l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html("").fadeOut();try{var h=s.split(":");h&&(console.log(h),o!="PM"&&h[0]!="12"&&i.setHours(h[0]),h.length>1&&i.setMinutes(h[1]),o=="PM"&&i.addHours(12))}catch(p){}}console.log("new date",i)}u||(r+=n.messages.selectLocation,t=!1),l.trim(a)==""&&(r+="<br/>"+n.messages.enterEventName,t=!1);if(t){var d=i;l(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut();var v={game_datetime:d,locations_id:u,event_name:a,sports_id:f,users_id:n.user_id},m=new b(v);m.save({}),l.when(m.request).done(function(e){n.game_id=e.payload.id,n.gameData={game_datetime:d,games_id:n.game_id,event_name:a,locations_id:u,sports_id:f,users_id:n.user_id},routing.trigger(n.channel,n.gameData)})}else l(e.target).parent().find(n.controls.fieldMessage).html(r).fadeIn()},goThereIndividualGame:function(e){var t=l(n.destination).find(n.controls.hdnSportsId).val(),r={users_id:n.user_id,sports_id:t,games_id:n.individual_game_id},i=new L(r);i.save(),l.when(i.request).done(function(e){n.goThereSuccess(e)})},goThereSuccess:function(e){if(e&&e.payload!=null){var t=e.payload.game;t&&(n.gameData={type:n.tags.individual,game_datetime:t.gameDay,event_name:t.event_name,game_location:t.game_location,games_id:t.id,sports_id:e.payload.usl?e.payload.usl.sports_id:null,users_id:n.user_id},routing.trigger(n.channel,e))}},CheckTeamControlsVisibility:function(){var e=l(n.destination).find(n.controls.hdnSportsId).val();if(e&&e!=""&&e!=0){var t=n.getTeamType(e);if(!t)l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.sectionScore).hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionIndividual).show();else{var r=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),i=new Date;r!=null&&i>=r?l(n.destination).find(n.controls.sectionScore).show():(l(n.destination).find(n.controls.sectionScore).hide(),l(n.destination).find(n.controls.txtScore).val("")),l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controlsbtnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).show(),l(n.destination).find(n.controls.btnFinish).show(),l(n.destination).find(n.controls.sectionMainLocation).show()}}else l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controls.btnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionMainLocation).hide();e=l(n.destination).find(n.controls.txtTeam).attr(n.attributes.teamId),e&&e!=""&&e!=0?l(n.destination).find(n.controls.btnTeamDone).show():l(n.destination).find(n.controls.btnTeamDone).hide()},getTeamType:function(e){if(e&&e!=""&&e!=0){var t=!0;console.log("getteamtype",e);for(var r in n.sports)n.sports[r].payload.id==e&&(console.log("payload",n.sports[r].payload),n.sports[r].payload.team_type=="Individual"&&(t=!1));return t}return!1},showLocation:function(e){l(n.destination).find(n.controls.sectionMainLocation).show();var t=0,r=e?l(e.target).val():"away";if(r=="home")t=l(e.target).attr(n.attributes.teamId);else{var i=l(n.destination).find(n.controls.rdoLocation+":checked");i.each(function(){r=l(this).val(),r=="home"&&(t=l(this).attr(n.attributes.teamId))})}if(t){var s=new g;s.id=t,s.fetchSuccess=function(e,t){var r=s.parseAsRequired(t);n.setLocation(r)},s.fetch()}else l(n.destination).find(n.controls.txtLocationId).val("").fadeIn(),n.clearLocation()},setLocation:function(e){e.location_id?(n.location_id=e.location_id||0,l(n.destination).find(n.controls.txtLocationId).val("").fadeOut(),l(".address-h").val(e.location_name),l(".txt-game-location-id_h").val(e.location_id),l(".verify-address-h").trigger("click")):l(n.destination).find(n.controls.txtLocationId).val("").fadeIn()},clearLocation:function(){l(".address-h").val(""),l(".txt-game-location-id_h").val("")},formatDate:function(e,t,n){var r=l.datepicker.formatDate("yy-mm-dd",e);try{var i=t.split(":");return console.log(i),i.length==1&&(t+=":00"),t+=" "+n,r+=" "+t,r}catch(s){return!1}},finishGame:function(){l(n.destination).find(n.controls.fieldMessage).html("").hide();var e=!0,t=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),r=l(n.destination).find(n.controls.txtGameTime).val(),i=l(n.destination).find(n.controls.hdnTimePeriod).val(),s=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).attr(n.attributes.teamId),o=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtScore).val(),u=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtTeam).attr(n.attributes.teamId),a=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtScore).val(),f=l(n.destination).find(n.controls.hdnSportsId).val(),c=n.location_id||l(n.controls.txtLocationId).val()||0;f||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),e=!1);if(!t||!r)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),e=!1;else{var h=r.match(n.tags.rgxTime)||r.match(n.tags.rgxTimeWhole);console.log("orginal date",t),console.log("orginal time",r),console.log("ampm",i),h?(l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html("").fadeOut(),t=this.formatDate(t,r,i),t||(e=!1)):(console.log("NOT VALID"),l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectValidTime).fadeIn(),e=!1)}console.log("new date",t),c||(l(n.destination).find(n.controls.sectionMainLocation).find(n.controls.fieldMessage).html(n.messages.selectLocation).fadeIn(),e=!1),s>0||(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1),u>0||(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1);if(e){var p=t,d={game_datetime:p,locations_id:c,teamOneId:s,teamTwoId:u,sports_id:f,users_id:n.user_id},v=new b(d);v.save({}),l.when(v.request).done(function(e){console.log(e);if(e!=null&&e.payload!=null){n.game_id=e.payload.id;var t=l(n.destination).find(n.controls.rdoTeamOne).is(":checked"),r={game_datetime:p,games_id:n.game_id,home_team:t||!1,locations_id:n.location_id,score:o,users_id:n.user_id},i=new y(r);i.teams_id=s,i.save();var c={game_datetime:p,games_id:n.game_id,home_team:t||!1,locations_id:n.location_id,score:a,users_id:n.user_id};t=l(n.destination).find(n.controls.rdoTeamTwo).is(":checked");var h=new y(c);h.teams_id=u,h.save(),n.gameData={type:n.tags.team,game_datetime:p,games_id:n.game_id,team_id_one:s,team_id_two:u,sports_id:f,users_id:n.user_id},routing.trigger(n.channel,e)}})}}});return A});