define(["require","text!usercontrols/addgame/templates/layout.html","facade","views","utils","vendor","sportorg/collections/sports_listall","location/collections/states","usercontrols/addgame/collections/teams","location/collections/cities","usercontrols/addgame/collections/teams_user","usercontrols/addgame/collections/teams","usercontrols/addgame/collections/games_search","usercontrols/addgame/models/team","usercontrols/addgame/models/team_add","usercontrols/addgame/models/game","usercontrols/addgame/models/uslgamelink","usercontrol/dropdown/view/dropdown","usercontrol/location/views/get-view-location"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("usercontrols/tag/models/basic_info"),h=e("sportorg/collections/sports_listall"),p=e("location/collections/states"),d=e("location/collections/cities"),v=e("usercontrols/addgame/collections/teams_user"),m=e("usercontrols/addgame/collections/teams"),g=e("usercontrols/addgame/models/team"),y=e("usercontrols/addgame/models/team_add"),b=e("usercontrols/addgame/models/game"),w=e("usercontrols/addgame/collections/games_search"),E=e("usercontrol/dropdown/view/dropdown"),S=e("usercontrol/location/views/get-view-location"),x=e("usercontrols/addgame/models/uslgamelink"),T=s.extend({template:t,gameData:{},teams:[],events:{"change .ddl-game-sports_h":"changeSport","keyup .txt-game-state_h":"keyupState","blur .txt-game-state_h":"changeState","keyup .txt-game-city_h":"keyupCity","blur .txt-game-city_h":"changeCity","keyup .txt-game-team_h":"keyupTeam","blur .txt-game-team_h":"changeTeam","keyup .txt-individual-game_h":"keyupIndividualGame","blur .txt-individual-game_h":"changeindividualGame","change .ddl-game-userteams_h":"changeUserTeam","click .btn-new-team-game_h":"showAddTeam","click .btn-ddl-team-game_h":"showDdlTeam","click .rdo-game-location_h":"showLocation","click .btn-game-Finish_h":"finishGame","change .txt-game-date_h":"CheckTeamControlsVisibility","click .btn-game-individual-Create_h":"createIndividualEvent","click .btn-game-individual-Finish_h":"goThereIndividualGame"},controls:{sectionAddSports:".section-Add-Sports_h",sectionDate:".section-game-date_h",txtGameDate:".txt-game-date_h",txtGameTime:".txt-game-time_h",spnTimePeriod:".spn-ddl-time-period_h",ddlTimePeriod:".ddl-time-period_h",spnSports:".span-ddl-sports_h",ddlSports:".ddl-game-sports_h",sectionTeams:".section-game-teams_h",ddlUserTeams:".ddl-game-userteams_h",spanddlteam:".span_ddl_team_h",spanddlteamtwo:".span_ddl_team_two_h",spanddlteamone:".span_ddl_team_one_h",btnNewTeam:".btn-new-team-game_h",btnDdlTem:".btn-ddl-team-game_h",sectionNewTeam:".section-new-team_h",txtState:".txt-game-state_h",txtCity:".txt-game-city_h",txtTeam:".txt-game-team_h",txtScore:".txt-score-team_h",btnFinish:".btn-game-Finish_h",sectionTeamOne:".team-one_h",sectionTeamTwo:".team-two_h",sectionScore:".section-score_h",sectionRadio:".section-game-radio_h",rdoTeamOne:".rdo-game-location-one-home_h",rdoTeamTwo:".rdo-game-location-two-home_h",rdoLocation:".rdo-game-location_h",sectionMainLocation:".section-main-location_h",sectionLocation:".div-game-location_h",txtLocationId:".txt-game-location-id_h",sectionIndividual:".section-individual-game_h",txtIndividualGame:".txt-individual-game_h",btnIndividualFinish:".btn-game-individual-Finish_h",txtIndividualLocation:".txt-individual-location_h",btnIndividualGameCreate:".btn-game-individual-Create_h",fieldMessage:".field-message_h",secSports:".section-game-sports_h",hdnSportsIdData:"hdn_sport_id",hdnSportsId:"#hdn_sport_id",hdnTimePeriodData:"hdn_time-period_h",hdnTimePeriod:"#hdn_time-period_h",indicator:".indicator_h"},attributes:{stateId:"stateid",schoolId:"schoolid",teamId:"teamid",playersId:"playerid",cityId:"cityid",sportId:"sportid",locationId:"locationid",gameId:"gameid"},inlineTemplates:{},messages:{dataNotExist:"Data does not exist . ",selectDateAndTime:"Please select date and time",selectTeam:"Please select team",selectScore:"Please enter score",selectLocation:"Please select location",selectLocationType:"Please select location type",gameFound:"Sweet ! This Event Already Exists ! ",enterEventName:"Please enter event name",selectSport:"Please select sport",selectValidTime:"Please enter valid time in format hh:mm (12 hours)"},tags:{individual:"individual",team:"team",rgxTime:/^(0?[1-9]|1[012])(:[0-5]\d)$/,rgxTimeWhole:/^(0?[1-9]|1[012])$/},initialize:function(e){s.prototype.initialize.call(this,e),n=this,n.setOptions(e),this.init()},render:function(){s.prototype.render.call(this),l(n.el).find(n.controls.txtGameDate).datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,changeYear:!0});var e=[{payload:{name:"AM",value:"AM"}},{payload:{name:"PM",value:"PM"}}],t={};t.records=e,t.recordId="name",t.recordValue="value";var r=new E({data:t,elementId:n.controls.hdnTimePeriodData,destination:n.controls.spnTimePeriod,targetView:n,selectedValue:"AM",callback:function(e){}})},afterRender:function(){var e=this,t=new S({callback:function(t){var n=t!=""?!0:!1;e.$el.find(".btn-game-Finish_h").attr("disable",n),e.$el.find(".txt-game-location-id_h").val(t)}});this.$el.find(".location-view-h").html(t.el)},setOptions:function(e){this.user_id=e.user_id;if(!e.channel)throw new Error("call back channel is must for this");this.channel=e.channel,this.sports_id=e.sports_id||null,this.team_id=e.teams_id||null},init:function(){n.setupView()},setupView:function(){n.setUpMainView();if(n.team_id){var e=new g;e.id=n.team_id,e.fetchSuccess=function(t,r){var i=e.parseAsRequired(r);n.team=i,console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"),console.log("self.team",n.team),n.sports_id=i.sports_id||null,n.fillSports()},e.fetch()}else n.fillSports()},setUpMainView:function(){var e=f.to_html(n.template,{});l(n.el).html(e)},fillSports:function(){var e=new h;e.processResult=function(t){var r=e.ParseForDropdown();n.SetupSportsView(r)},e.fetch()},SetupSportsView:function(e){n.sports=e;var t={};t.records=n.sports,t.recordId="id",t.recordValue="custom_name";var r=new E({data:t,title:"Select Sport",elementId:n.controls.hdnSportsIdData,destination:n.controls.spnSports,targetView:n,selectedValue:n.sports_id||null,callback:function(e){n.changeSport(e)}})},changeSport:function(e){if(e&&e!=0){l(n.destination).find(n.controls.sectionTeams).show(),l(n.destination).find(n.controls.btnFinish).fadeIn(),l(n.destination).find("input").attr(n.attributes.sportId,e);var t=n.getTeamType(e);t&&n.fillTeams(e)}else l(n.destination).find(n.controls.btnFinish).fadeOut(),l(n.destination).find(n.controls.sectionTeams).fadeOut(),l(n.destination).find("input").removeAttr(n.attributes.stateId);n.CheckTeamControlsVisibility()},setFirstTeam:function(e){console.log("setFirstTeam");var t=!1;if(n.team_id){for(var r in n.teams)n.teams[r].payload.id==n.team_id&&(t=!0);if(!t)if(n.team)n.setSelectedTeam(n.team);else{var i=new g;i.id=n.team_id,i.fetchSuccess=function(e,t){var r=i.parseAsRequired(t);n.team=r,n.setSelectedTeam(r)},i.fetch()}n.CheckTeamControlsVisibility()}},setSelectedTeam:function(e){console.log("setSelectedTeam");if(e){console.log("data",e);var t=e.team_name,r=e.team_id;l(n.destination).find(n.controls.sectionTeamOne).find("input").attr(n.attributes.teamId,r),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.spanddlteamone).hide(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).hide(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).val(t).show(),l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.indicator).addClass("valid").removeClass("invalid").show()}},fillTeams:function(e){var t=new v;t.user_id=n.user_id,t.sports_id=e,t.processResult=function(e){var r={team_name:"Team Not Found",id:-1},i=t.AppendItem(r);n.setUpUserTeams(i)};var r=t.fetch()},setUpUserTeams:function(e){n.teams=e||[],n.setFirstTeam(n.team_id);var t={};t.records=n.teams,t.recordId="id",t.recordValue="team_name";var r=new E({data:t,elementId:"hdn_team_id",targetView:n,destination:n.controls.spanddlteamone,selectedValue:n.team_id||null,callback:function(e){n.changeUserTeamOne(e)}})},changeUserTeamOne:function(e){console.log("result1",e),e=="-1"?l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).trigger("click"):(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.btnNewTeam).show(),l(n.destination).find(n.controls.sectionTeamOne).find("input").attr(n.attributes.teamId,e),l(n.destination).find(n.controls.sectionTeamOne).find("input:checked").removeAttr("checked"),n.showLocation())},changeUserTeamTwo:function(e){console.log("result",e),e=="-1"?l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.btnNewTeam).trigger("click"):(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.btnNewTeam).show(),l(n.destination).find(n.controls.sectionTeamTwo).find("input").attr(n.attributes.teamId,e),l(n.destination).find(n.controls.sectionTeamTwo).find("input:checked").removeAttr("checked"),n.showLocation())},showAddTeam:function(e){l(e.target).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.spanddlteam).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).show(),l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},showDdlTeam:function(e){l(e.target).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).val("").hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide(),l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.ddlUserTeams).val("").show(),l(e.target).parents(n.controls.sectionTeams).find("input:checked").removeAttr("checked"),n.showLocation()},keyupState:function(e){var t=l(e.target).val(),r=[];if(t!="")if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.stateId),n.CheckTeamControlsVisibility();var i=new p;i.state_name=l(e.target).val(),console.log("State Request Abort Request Function AddGame/Main.js"),n.stateFetchRequest=n.stateFetchRequest||[],n.stateFetchRequest.push(n.cityFetchRequest||[]),n.stateFetchRequest.push(n.teamFetchRequest||[]),n.stateFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.stateFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.states=[];for(var s in t)n.states.push(t[s].payload);n.states.forEach(function(e,t){r.push(e.name)});try{l(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else n.changeState(e)},changeState:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.stateId);var r=!1;n.states_id="",n.states&&n.states.forEach(function(i,s){i["name"]==t&&(r=!0,n.states_id=i.id,l(e.target).attr(n.attributes.stateId,n.states_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).attr(n.attributes.stateId,n.states_id).fadeIn(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).attr(n.attributes.stateId,n.states_id).fadeOut(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide())}),r||(n.states_id=0,l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtTeam).removeAttr(n.attributes.stateId).fadeOut(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).hide(),l(e.target).parents(n.controls.sectionTeams).find(n.controls.txtCity).removeAttr(n.attributes.stateId).fadeOut()),n.CheckTeamControlsVisibility()},keyupCity:function(e){var t=l(e.target).val(),r=[];if(t.length>2)if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.cityId),n.CheckTeamControlsVisibility();var i=new d;i.states_id=n.states_id,i.city_name=l(e.target).val(),n.cityFetchRequest=n.cityFetchRequest||[],n.cityFetchRequest.push(n.teamFetchRequest||[]),n.cityFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.cityFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.cities=[];for(var s in t)n.cities.push(t[s]);n.cities.forEach(function(e,t){r.push(e.city)});try{n.$(e.target).autocomplete("destroy")}catch(o){}n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.changeCity(e)},changeCity:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.cityId);var r=!1;n.city_id="",n.cities&&n.cities.forEach(function(i,s){i["city"]==t&&(r=!0,n.city_id=i.id,l(e.target).attr(n.attributes.cityId,n.city_id))}),r||(n.city_id=0),n.CheckTeamControlsVisibility()},keyupTeam:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show(),n.CheckTeamControlsVisibility();var s=new m;s.states_id=l(e.target).attr(n.attributes.stateId),s.city_id=l(e.target).attr(n.attributes.cityId),s.sports_id=l(e.target).attr(n.attributes.sportId),s.team_name=t,n.TeamFetchRequest=n.abortRequest(n.TeamFetchRequest);var o=s.fetch();n.TeamFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.teams=[];for(var i in t)n.teams.push(t[i].payload);n.teams.forEach(function(e,t){r.push(e.team_name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show(),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeTeam(e)},changeTeam:function(e){var t=l(e.target).val(),r=!1;n.team_id=0,n.teams&&n.teams.forEach(function(i,s){var o=i.team_name;o==t&&(r=!0,n.team_id=i.id,l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,n.team_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).removeClass("invalid").addClass("valid").show())});if(n.team){var i=n.team.team_name,s=n.team.team_id;i==t&&(r=!0,n.team_id=s,l(e.target).parents(n.controls.sectionTeams).find("input").attr(n.attributes.teamId,n.team_id),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).removeClass("invalid").addClass("valid").show())}r||(l(e.target).parents(n.controls.sectionTeams).find("input").removeAttr(n.attributes.teamId),l(e.target).parents(n.controls.sectionTeams).find(n.controls.indicator).addClass("invalid").removeClass("valid").show()),n.CheckTeamControlsVisibility()},keyupIndividualGame:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility();var s=new w;s.game_name=t,n.individualGameFetchRequest=n.abortRequest(n.individualGameFetchRequest);var o=s.fetch();n.individualGameFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.eventNotFound(e):n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.individualGames=[];for(var i in t)n.individualGames.push(t[i].payload);n.individualGames.forEach(function(e,t){var n=e.event_name+" "+e.game_name;r.push(n)});try{n.$(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.gameId),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeIndividualGame(e)},changeIndividualGame:function(e,t){var r=l(e.target).val(),i=!1;n.individual_game_id=0,n.individualGames&&n.individualGames.forEach(function(t,s){var o=t.event_name+" "+t.game_name;o==r&&(i=!0,n.individual_game_id=t.id,l(e.target).attr(n.attributes.gameId,n.individual_game_id))}),i?n.eventFound(e):n.eventNotFound(e),n.CheckTeamControlsVisibility()},eventNotFound:function(e){l(n.destination).find(n.controls.txtIndividualLocation).show(),l(n.destination).find(n.controls.btnIndividualGameCreate).show(),l(n.destination).find(n.controls.btnIndividualFinish).hide(),l(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),l(e.target).removeAttr(n.attributes.gameId)},eventFound:function(e){l(n.destination).find(n.controls.txtIndividualLocation).hide(),l(n.destination).find(n.controls.btnIndividualGameCreate).hide(),l(n.destination).find(n.controls.btnIndividualFinish).show(),l(e.target).parent().find(n.controls.fieldMessage).html(n.messages.gameFound).fadeIn()},createIndividualEvent:function(e){var t=!0,r="",i=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),s=l(n.destination).find(n.controls.txtGameTime).val(),o=l(n.destination).find(n.controls.hdnTimePeriod).val(),a=n.location_id||l(n.controls.txtIndividualLocation).val()||0,f=l(n.destination).find(n.controls.txtIndividualGame).val(),c=l(n.destination).find(n.controls.hdnSportsId).val();c||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),t=!1);if(!i||!s)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),t=!1;else{var h=s.match(n.tags.rgxTime)||s.match(n.tags.rgxTimeWhole);console.log("orginal date",i),console.log("orginal time",s),console.log("timeZone",o);if(!h)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectValidTime).fadeIn(),t=!1;else{l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html("").fadeOut();try{var p=s.split(":");p&&(console.log(p),o!="PM"&&p[0]!="12"&&i.setHours(p[0]),p.length>1&&i.setMinutes(p[1]),o=="PM"&&i.addHours(12))}catch(d){}}console.log("new date",i)}a||(r+=n.messages.selectLocation,t=!1),l.trim(f)==""&&(r+="<br/>"+n.messages.enterEventName,t=!1);if(t){var v=i;l(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut();var m={game_datetime:v,locations_id:a,event_name:f,sports_id:c},g=new b(m);g.save({}),l.when(g.request).done(function(e){n.game_id=e.payload.id,n.gameData={game_datetime:v,games_id:n.game_id,event_name:f,locations_id:a,sports_id:c},u(n.channel).publish(n.gameData)})}else l(e.target).parent().find(n.controls.fieldMessage).html(r).fadeIn()},goThereIndividualGame:function(e){var t=l(n.destination).find(n.controls.hdnSportsId).val(),r={users_id:n.user_id,sports_id:t,games_id:n.individual_game_id},i=new x(r);i.save(),l.when(i.request).done(function(e){n.goThereSuccess(e)})},goThereSuccess:function(e){if(e&&e.payload!=null){var t=e.payload.game;t&&(n.gameData={type:n.tags.individual,game_datetime:t.gameDay,event_name:t.event_name,game_location:t.game_location,games_id:t.id,sports_id:e.payload.usl?e.payload.usl.sports_id:null},u(n.channel).publish(n.gameData))}},CheckTeamControlsVisibility:function(){var e=l(n.destination).find(n.controls.hdnSportsId).val();if(e&&e!=""&&e!=0){var t=n.getTeamType(e);if(!t)l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.sectionScore).hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionMainLocation).hide(),l(n.destination).find(n.controls.sectionIndividual).show();else{var r=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),i=new Date;r!=null&&i>=r?l(n.destination).find(n.controls.sectionScore).show():(l(n.destination).find(n.controls.sectionScore).hide(),l(n.destination).find(n.controls.txtScore).val("")),l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controlsbtnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).show(),l(n.destination).find(n.controls.btnFinish).show(),l(n.destination).find(n.controls.sectionMainLocation).show()}}else l(n.destination).find(n.controls.sectionIndividual).hide(),l(n.destination).find(n.controls.btnIndividualFinish).hide(),l(n.destination).find(n.controls.sectionTeams).hide(),l(n.destination).find(n.controls.btnFinish).hide(),l(n.destination).find(n.controls.sectionMainLocation).hide();e=l(n.destination).find(n.controls.txtTeam).attr(n.attributes.teamId),e&&e!=""&&e!=0?l(n.destination).find(n.controls.btnTeamDone).show():l(n.destination).find(n.controls.btnTeamDone).hide()},getTeamType:function(e){if(e&&e!=""&&e!=0){var t=!0;console.log("getteamtype",e);for(var r in n.sports)n.sports[r].payload.id==e&&(console.log("payload",n.sports[r].payload),n.sports[r].payload.team_type=="Individual"&&(t=!1));return t}return!1},showLocation:function(e){l(n.destination).find(n.controls.sectionMainLocation).show();var t=0,r=e?l(e.target).val():"away";if(r=="home")t=l(e.target).attr(n.attributes.teamId);else{var i=l(n.destination).find(n.controls.rdoLocation+":checked");i.each(function(){r=l(this).val(),r=="home"&&(t=l(this).attr(n.attributes.teamId))})}if(t){var s=new g;s.id=t,s.fetchSuccess=function(e,t){var r=s.parseAsRequired(t);n.setLocation(r)},s.fetch()}else l(n.destination).find(n.controls.txtLocationId).val("").fadeIn(),n.clearLocation()},setLocation:function(e){e.location_id?(n.location_id=e.location_id||0,l(n.destination).find(n.controls.txtLocationId).val("").fadeOut(),l(".address-h").val(e.location_name),l(".txt-game-location-id_h").val(e.location_id),l(".verify-address-h").trigger("click")):l(n.destination).find(n.controls.txtLocationId).val("").fadeIn()},clearLocation:function(){l(".address-h").val(""),l(".txt-game-location-id_h").val("")},finishGame:function(){l(n.destination).find(n.controls.fieldMessage).html("").hide();var e=!0,t=l(n.destination).find(n.controls.txtGameDate).datepicker("getDate"),r=l(n.destination).find(n.controls.txtGameTime).val(),i=l(n.destination).find(n.controls.hdnTimePeriod).val(),s=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtTeam).attr(n.attributes.teamId),o=l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.txtScore).val(),a=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtTeam).attr(n.attributes.teamId),f=l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.txtScore).val(),c=l(n.destination).find(n.controls.hdnSportsId).val(),h=n.location_id||l(n.controls.txtLocationId).val()||0;c||(l(n.destination).find(n.controls.secSports).find(n.controls.fieldMessage).html(n.messages.selectSport).fadeIn(),e=!1);if(!t||!r)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectDateAndTime).fadeIn(),e=!1;else{var p=r.match(n.tags.rgxTime)||r.match(n.tags.rgxTimeWhole);console.log("orginal date",t),console.log("orginal time",r),console.log("timeZone",i);if(!p)l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html(n.messages.selectValidTime).fadeIn(),e=!1;else{l(n.destination).find(n.controls.sectionDate).find(n.controls.fieldMessage).html("").fadeOut();try{var d=r.split(":");d&&(console.log(d),console.log(d[0]),i!="PM"&&d[0]!="12"&&t.setHours(d[0]),d.length>1&&t.setMinutes(d[1]),i=="PM"&&t.addHours(12))}catch(v){}}}console.log("new date",t),h||(l(n.destination).find(n.controls.sectionMainLocation).find(n.controls.fieldMessage).html(n.messages.selectLocation).fadeIn(),e=!1),s>0||(l(n.destination).find(n.controls.sectionTeamOne).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1);var m=n.getTeamType();if(m){var g=new Date;a>0||(l(n.destination).find(n.controls.sectionTeamTwo).find(n.controls.fieldMessage).html(n.messages.selectTeam).fadeIn(),e=!1)}if(e){var w=t,E={game_datetime:w,locations_id:h,teamOneId:s,teamTwoId:a,sports_id:c},S=new b(E);S.save({}),l.when(S.request).done(function(e){if(e!=null&&e.payload!=null){n.game_id=e.payload.id;var t=l(n.destination).find(n.controls.rdoTeamOne).is(":checked"),r={game_datetime:w,games_id:n.game_id,home_team:t||!1,locations_id:n.location_id,score:o},i=new y(r);i.teams_id=s,i.save();var h={game_datetime:w,games_id:n.game_id,home_team:t||!1,locations_id:n.location_id,score:f};t=l(n.destination).find(n.controls.rdoTeamTwo).is(":checked");var p=new y(h);p.teams_id=a,p.save(),n.gameData={type:n.tags.team,game_datetime:w,games_id:n.game_id,team_id_one:s,team_id_two:a,sports_id:c},u(n.channel).publish(n.gameData)}})}}});return T});