define(["require","text!usercontrols/addgame/templates/layout.html","facade","views","utils","vendor","user/models/basic_info","sportorg/collections/sports_users","location/collections/states","usercontrols/addgame/collections/teams","location/collections/cities","usercontrols/addgame/collections/teams_user","usercontrols/addgame/collections/teams","usercontrols/addgame/collections/games_search","usercontrols/addgame/models/team","usercontrols/addgame/models/team_add","usercontrols/addgame/models/game"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("usercontrols/tag/models/basic_info"),h=e("sportorg/collections/sports_users"),p=e("location/collections/states"),d=e("location/collections/cities"),v=e("usercontrols/addgame/collections/teams_user"),m=e("usercontrols/addgame/collections/teams"),g=e("usercontrols/addgame/models/team"),y=e("usercontrols/addgame/models/team_add"),b=e("usercontrols/addgame/models/game"),w=e("usercontrols/addgame/collections/games_search"),E=s.extend({template:t,gameData:{},teams:[],events:{"change .ddl-game-sports_h":"changeSport","keyup .txt-game-state_h":"keyupState","blur .txt-game-state_h":"changeState","keyup .txt-game-city_h":"keyupCity","blur .txt-game-city_h":"changeCity","keyup .txt-game-team_h":"keyupTeam","blur .txt-game-team_h":"changeTeam","keyup .txt-individual-game_h":"keyupIndividualGame","blur .txt-individual-game_h":"changeindividualGame","change .ddl-game-userteams_h":"changeUserTeam","click .btn-new-team-game_h":"showAddTeam","click .rdo-game-location_h":"showLocation","click .btn-game-Finish_h":"finishGame","blur .txt-game-date_h":"CheckTeamControlsVisibility","click .btn-game-individual-Create_h":"createIndividualEvent"},controls:{sectionAddSports:".section-Add-Sports_h",sectionDate:".section-game-date_h",txtGameDate:".txt-game-date_h",txtGameTime:".txt-game-time_h",ddlTimePeriod:".ddl-time-period_h",ddlSports:".ddl-game-sports_h",sectionTeams:".section-game-teams_h",ddlUserTeams:".ddl-game-userteams_h",btnNewTeam:".btn-new-team-game_h",sectionNewTeam:".section-new-team_h",txtState:".txt-game-state_h",txtCity:".txt-game-city_h",txtTeam:".txt-game-team_h",txtScore:".txt-score-team_h",btnFinish:".btn-game-Finish_h",sectionTeamOne:".team-one_h",sectionTeamTwo:".team-two_h",sectionScore:".section-score_h",sectionRadio:".section-game-radio_h",rdoTeamOne:".rdo-game-location-one-home_h",rdoTeamTwo:".rdo-game-location-two-home_h",rdoLocation:".rdo-game-location_h",sectionMainLocation:".section-main-location_h",sectionLocation:".div-game-location_h",txtLocationId:".txt-game-location-id_h",sectionIndividual:".secction-individual-game_h",txtIndividualGame:".txt-individual-game_h",btnIndividualFinish:".btn-game-individual-Finish_h",txtIndividualLocation:".txt-individual-location_h",btnIndividualGameCreate:".btn-game-individual-Create_h",fieldMessage:".field-message",secSports:".section-game-sports_h"},attributes:{stateId:"stateid",schoolId:"schoolid",teamId:"teamid",playersId:"playerid",cityId:"cityid",sportId:"sportid",locationId:"locationid",gameId:"gameid"},inlineTemplates:{},messages:{dataNotExist:"Data Does Not Exist . ",selectDateAndTime:"Select Date And Time",selectTeam:"Select Team",selectScore:"Enter Score",selectLocation:"select location",selectLocationType:"select location type",gameFound:"Sweet ! This Event Already Exists ! ",enterEventName:"Enter event name",selectSport:"Select Sport"},initialize:function(e){s.prototype.initialize.call(this,e),n=this,n.setOptions(e),this.init()},render:function(){s.prototype.render.call(this),l(n.el).find(n.controls.txtGameDate).datetimepicker({timeFormat:"hh:mm tt",showTimezone:!0,changeMonth:!0,changeYear:!0})},setOptions:function(e){this.user_id=e.user_id;if(!e.channel)throw new Error("call back channel is must for this");this.channel=e.channel,this.sports_id=e.sports_id||null,this.team_id=e.teams_id||null},init:function(){n.setupView()},setupView:function(){n.setUpMainView(),n.fillSports()},setUpMainView:function(){var e=f.to_html(n.template,{});l(n.el).html(e)},fillSports:function(){if(n.sports&&n.sports.length>0)n.SetupSportsView(orgs_id,destination);else{var e=new h;e.user_id=n.user_id,e.processResult=function(t){var r=e.parseAsRequired();n.SetupSportsView(r)},e.fetch()}},SetupSportsView:function(e){if(e==null||e.length<1){l(n.destination).find(n.controls.ddlSports).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn();return}n.sports=e,n.sort(n.sports,"sport_name",!1),n.setDropdownOptions(n.sports,"sport_name","sport_id",l(n.destination).find(n.controls.ddlSports),"Select Sport");if(n.sports_id)for(var t in n.sports)n.sports[t].sport_id==n.sports_id&&(l(n.destination).find(n.controls.ddlSports).val(n.sports_id),l(n.destination).find(n.controls.ddlSports).trigger("change"),n.CheckTeamControlsVisibility())},changeSport:function(e){l(e.target).val()&&l(e.target).val()!=0?(l(e.target).parents(n.destination).find(n.controls.sectionTeams).show(),l(e.target).parents(n.destination).find(n.controls.btnFinish).fadeIn(),l(n.destination).find("input").attr(n.attributes.sportId,l(e.target).val()),n.fillTeams(l(e.target).val())):(l(e.target).parents(n.destination).find(n.controls.btnFinish).fadeOut(),l(e.target).parents(n.destination).find(n.controls.sectionTeams).fadeOut(),l(n.destination).find("input").removeAttr(n.attributes.stateId)),n.CheckTeamControlsVisibility()},setFirstTeam:function(){var e=!1;if(n.team_id){for(var t in n.teams)n.teams[t].team_id==n.team_id&&(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.ddlUserTeams).val(n.teams[t].team_id),e=!0);if(!e){var r=new g;r.id=n.team_id,r.fetchSuccess=function(e,t){var i=r.parseAsRequired(t);n.setSelectedTeam(i)},r.fetch()}n.CheckTeamControlsVisibility()}},setSelectedTeam:function(e){if(e){var t=e.team_name,r=e.id;l(n.destination).find(n.controls.sectionTeamOne).find("input").attr(n.attributes.teamId,r),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).val(t).show()}},fillTeams:function(e){var t=new v;t.user_id=n.user_id,t.sports_id=e,t.processResult=function(e){var r=t.parseAsRequired();n.setUpUserTeams(r)};var r=t.fetch()},setUpUserTeams:function(e){if(e==null){l(n.destination).find(n.controls.ddlUserTeams).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn();return}n.teams=e,n.sort(n.teams,"team_name",!1),n.setDropdownOptions(n.teams,"team_name","team_id",l(n.destination).find(n.controls.ddlUserTeams),"Select Team"),n.setFirstTeam()},changeUserTeam:function(e){l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).hide(),l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,l(e.target).val()),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},showAddTeam:function(e){l(e.target).parents(n.controls.sectionTeams).find(n.controls.ddlUserTeams).val(""),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).show(),l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},keyupState:function(e){var t=l(e.target).val(),r=[];if(t!="")if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.stateId),n.CheckTeamControlsVisibility();var i=new p;i.state_name=l(e.target).val(),console.log("State Request Abort Request Function AddGame/Main.js"),n.stateFetchRequest=n.stateFetchRequest||[],n.stateFetchRequest.push(n.cityFetchRequest||[]),n.stateFetchRequest.push(n.teamFetchRequest||[]),n.stateFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.stateFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.states=[];for(var s in t)n.states.push(t[s].payload);n.states.forEach(function(e,t){r.push(e.name)});try{l(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else n.changeState(e)},changeState:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.stateId);var r=!1;n.states_id="",n.states&&n.states.forEach(function(i,s){i["name"]==t&&(r=!0,n.states_id=i.id,l(e.target).attr(n.attributes.stateId,n.states_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).attr(n.attributes.stateId,n.states_id).fadeIn(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).attr(n.attributes.stateId,n.states_id).fadeOut())}),r||(n.states_id=0,l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).removeAttr(n.attributes.stateId).fadeOut(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).removeAttr(n.attributes.stateId).fadeOut()),n.CheckTeamControlsVisibility()},keyupCity:function(e){var t=l(e.target).val(),r=[];if(t.length>2)if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.cityId),n.CheckTeamControlsVisibility();var i=new d;i.states_id=n.states_id,i.city_name=l(e.target).val(),n.cityFetchRequest=n.cityFetchRequest||[],n.cityFetchRequest.push(n.teamFetchRequest||[]),n.cityFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.cityFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.cities=[];for(var s in t)n.cities.push(t[s]);n.cities.forEach(function(e,t){r.push(e.city)});try{n.$(e.target).autocomplete("destroy")}catch(o){}n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.changeCity(e)},changeCity:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.cityId);var r=!1;n.city_id="",n.cities&&n.cities.forEach(function(i,s){i["city"]==t&&(r=!0,n.city_id=i.id,l(e.target).attr(n.attributes.cityId,n.city_id))}),r||(n.city_id=0,l(n.destination).find(n.controls.txtTeam).removeAttr(n.attributes.cityId).fadeOut()),n.CheckTeamControlsVisibility()},keyupTeam:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility();var s=new m;s.states_id=l(e.target).attr(n.attributes.stateId),s.city_id=l(e.target).attr(n.attributes.cityId),s.sports_id=l(e.target).attr(n.attributes.sportId),s.team_name=t,n.TeamFetchRequest=n.abortRequest(n.TeamFetchRequest);var o=s.fetch();n.TeamFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.teams=[];for(var i in t)n.teams.push(t[i].payload);n.teams.forEach(function(e,t){r.push(e.team_name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeTeam(e)},changeTeam:function(e){var t=l(e.target).val(),r=!1;n.team_id=0,n.teams&&n.teams.forEach(function(i,s){var o=i.team_name;o==t&&(r=!0,n.team_id=i.id,l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,n.team_id))}),r||l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility()},keyupIndividualGame:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility();var s=new w;s.game_name=t,n.individualGameFetchRequest=n.abortRequest(n.individualGameFetchRequest);var o=s.fetch();n.individualGameFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.eventNotFound(e):n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.individualGames=[];for(var i in t)n.individualGames.push(t[i].payload);n.individualGames.forEach(function(e,t){r.push(e.game_name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeIndividualGame(e)},changeIndividualGame:function(e){var t=l(e.target).val(),r=!1;n.individual_game_id=0,n.individualGames&&n.individualGames.forEach(function(i,s){var o=i.game_name;o==t&&(r=!0,n.individual_game_id=i.id,l(e.target).attr(n.attributes.gameId,n.individual_game_id))}),r?n.eventFound(e):n.eventNotFound(e),n.CheckTeamControlsVisibility()},eventNotFound:function(e){l(n.destination).find(n.controls.txtIndividualLocation).show(),l(n.destination).find(n.controls.btnIndividualGameCreate).show(),l(n.destination).find(n.controls.btnIndividualFinish).hide(),l(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),l(e.target).removeAttr(n.attributes.gameId)},eventFound:function(e){l(n.destination).find(n.controls.txtIndividualLocation).hide(),l(n.destination).find(n.controls.btnIndividualGameCreate).hide(),l(n.destination).find(n.controls.btnIndividualFinish).show(),l(e.target).parent().find(n.controls.fieldMessage).html(n.messages.gameFound).fadeIn()},createIndividualEvent:function(e){var t=!0,r="",i=l(n.destination).find(n.controls.txtGameDate).datetimepicker("getDate"),s=n.location_id||l(n.controls.txtIndividualLocation).val()||0,o=l(n.destination).find(n.controls.txtIndividualGame).val(),a=l(n.destination).find(n.controls.ddlSports).val();a||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),t=!1),console.log("create"),i||(l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),t=!1),s||(r+=n.messages.selectLocation,t=!1),l.trim(o)==""&&(r+=n.messages.enterEventName,t=!1);if(t){l(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut();var f={game_datetime:i,locations_id:s,event_name:o,sports_id:a};console.log("payload",f);var c=new b(f);c.save({}),l.when(c.request).done(function(e){n.game_id=e.payload.id,n.gameData={game_datetime:i,games_id:n.game_id,event_name:o,locations_id:s,sports_id:a},u(n.channel).publish(n.gameData)})}else l(e.target).parent().find(n.controls.fieldMessage).html(r).fadeIn()},CheckTeamControlsVisibility:function(){var e=l(n.destination).find(n.controls.ddlSports).val();if(e&&e!=""&&e!=0){var t=n.getTeamType();if(!t)l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.sectionScore).html("").hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionMainLocation).hide(),l(n.destination).find(n.controls.sectionIndividual).show(),l(n.destination).find(n.controlsbtnIndividualFinish).show();else{var r=l(n.destination).find(n.controls.txtGameDate).datetimepicker("getDate"),i=new Date;r!=null&&i>=r?l(n.destination).find(n.controls.sectionScore).show():(l(n.destination).find(n.controls.sectionScore).hide(),l(n.destination).find(n.controls.txtScore).val("")),l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controlsbtnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).show(),l(n.destination).find(n.controls.btnFinish).show(),l(n.destination).find(n.controls.sectionMainLocation).show()}}else l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controlsbtnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionMainLocation).hide();e=l(n.destination).find(n.controls.txtTeam).attr(n.attributes.teamId),e&&e!=""&&e!=0?l(n.destination).find(n.controls.btnTeamDone).show():l(n.destination).find(n.controls.btnTeamDone).hide()},getTeamType:function(){var e=l(n.destination).find(n.controls.ddlSports).val();if(e&&e!=""&&e!=0){var t=!0;for(var r in n.sports)n.sports[r].sport_id==e&&n.sports[r].team_type=="individual"&&(t=!1);return t}return!1},showLocation:function(e){l(n.destination).find(n.controls.sectionMainLocation).show();var t=0,r=e?l(e.target).val():"away";if(r=="home")t=l(e.target).attr(n.attributes.teamId);else{var i=l(n.destination).find(n.controls.rdoLocation+":checked");i.each(function(){r=l(this).val(),r=="home"&&(t=l(this).attr(n.attributes.teamId))})}if(t){var s=new g;s.id=t,s.fetchSuccess=function(e,t){var r=s.parseAsRequired(t);n.setLocation(r)},s.fetch()}else l(n.destination).find(n.controls.txtLocationId).html("").fadeIn(),n.clearLocation()},setLocation:function(e){e.location_id?(n.location_id=e.location_id||0,l(n.destination).find(n.controls.txtLocationId).val("").fadeOut(),l(n.destination).find(n.controls.sectionLocation).html(e.location_name).attr(n.attributes.locationId,e.location_id)):l(n.destination).find(n.controls.txtLocationId).val("").fadeIn()},clearLocation:function(){l(n.destination).find(n.controls.sectionLocation).html("").removeAttr(n.attributes.locationId)},finishGame:function(){l(n.destination).find(n.controls.fieldMessage).html("").hide();var e=!0,t=l(n.destination).find(n.controls.txtGameDate).datetimepicker("getDate"),r=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).attr(n.attributes.teamId),i=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtScore).val(),s=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtTeam).attr(n.attributes.teamId),o=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtScore).val(),a=l(n.destination).find(n.controls.ddlSports).val(),f=n.location_id||l(n.controls.txtLocationId).val()||0;a||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),e=!1),t||(l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),e=!1),f||(l(n.destination).find(n.controls.sectionMainLocation).find(n.controls.fieldMessage).html(n.messages.selectLocation).fadeIn(),e=!1),r>0||(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1);var c=n.getTeamType();if(c){var h=new Date;s>0||(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1),i==""&&t!=null&&h>t&&(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.fieldMessage).html(n.messages.selectScore).fadeIn(),e=!1),o==""&&t!=null&&h>t&&(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.fieldMessage).html(n.messages.selectScore).fadeIn(),e=!1)}if(e){var p={game_datetime:t,locations_id:f,teamOneId:r,teamTwoId:s,sports_id:a},d=new b(p);d.save({}),l.when(d.request).done(function(e){if(e!=null&&e.payload!=null){n.game_id=e.payload.id;var f=l(n.destination).find(n.controls.rdoTeamOne).is(":checked"),c={game_datetime:t,games_id:n.game_id,home_team:f||!1,locations_id:n.location_id,score:i},h=new y(c);h.teams_id=r,h.save();var p={game_datetime:t,games_id:n.game_id,home_team:f||!1,locations_id:n.location_id,score:o};f=l(n.destination).find(n.controls.rdoTeamTwo).is(":checked");var d=new y(p);d.teams_id=s,d.save(),n.gameData={game_datetime:t,games_id:n.game_id,team_id_one:r,team_id_two:s,sports_id:a},u(n.channel).publish(n.gameData)}})}}});return E});