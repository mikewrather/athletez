define(["require","text!usercontrols/tag/templates/layout.html","facade","views","utils","vendor","usercontrols/tag/models/basic_info","sportorg/collections/sports_listall","location/collections/states","usercontrols/tag/collections/schools","usercontrols/tag/collections/teams","location/collections/cities","user/collections/users","usercontrols/tag/collections/games","usercontrols/tag/models/complevel","usercontrol/dropdown/view/dropdown"],function(e){var t=e("text!usercontrols/tag/templates/layout.html"),n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("usercontrols/tag/models/basic_info"),h=e("sportorg/collections/sports_listall"),p=e("location/collections/states"),d=e("location/collections/cities"),v=e("usercontrols/tag/collections/schools"),m=e("user/collections/users"),g=e("usercontrols/tag/collections/games"),y=e("usercontrols/tag/collections/teams"),b=e("usercontrols/tag/models/complevel"),w=e("usercontrol/dropdown/view/dropdown"),E=s.extend({template:t,tagData:{Game:{},Player:{},Team:{}},events:{"change .ddl-tag-sports_h":"changeSport","click .btn-tag-sport_h":"sportsDone","click .btn-tag-edit-sport_h":"editSport","click .link-tag-team_h":"showTeamSection","keyup .txt-tag-team-state_h":"keyupState","blur .txt-tag-team-state_h":"changeState","keyup .txt-tag-team-city_h":"keyupCity","blur .txt-tag-team-city_h":"changeCity","keyup .txt-tag-team-school_h":"keyupSchool","blur .txt-tag-team-school_h":"changeSchool","change .ddl-tag-team-level_h":"changeCompLevel","change .ddl-tag-team-season_h":"changeSeason","click .btn-tag-team-Done_h":"doneTagTeamTagging","click .link-tag-player_h":"showPlayer","click .btn-tag-add-player_h":"addPlayer","keyup .txt-tag-player-name_h":"keyUpPlayer","change .txt-tag-player-name_h":"setPlayerId","click .btn-tag-player-Done_h":"donePlayerTagging","click .link-tag-Game_h":"showGameSection","click .btn-tag-game-Done_h":"doneGameTagging","change .ddl-tag-game_h":"changeGame","click .btn-tag-Finish_h":"finishTagging"},controls:{secAddSports:".section-Add-Sports_h",divTagList:".div-tag-list_h",secSports:".section-sports_h",lblSportName:".lbl-tag-sport-name_h",btnEditSport:".btn-tag-edit-sport_h",btnSportsDone:".btn-tag-sport_h",ddlSports:".ddl-tag-sports_h",spnSports:".span-ddl-sports-tag_h",dropdownHeader:".dropdown-header-box",secTeam:".section-team_h",lblTeamName:".lbl-tag-team-name_h",secTagTeam:".section-tag-team_h",txtTeamState:".txt-tag-team-state_h",txtTeamCity:".txt-tag-team-city_h",txtTeamSchool:".txt-tag-team-school_h",ddlTeamLevel:".ddl-tag-team-level_h",ddlTeamSeason:".ddl-tag-team-season_h",btnTeamDone:".btn-tag-team-Done_h",secPlayer:".section-tag-player_h",secPlayerInput:".section-tag-player-input_h",txtPlayerName:".txt-tag-player-name_h",additionalPlayer:".additional_h",btnAddPlayer:".btn-tag-add-player_h",btnPlayerDone:".btn-tag-player-Done_h",sectionSelectedPlayers:".section-team-players_h",lblPlayerNames:".lbl-tag-players-name_h",secGame:".section-tag-game_h",ddlGame:".ddl-tag-game_h",btnGameDone:".btn-tag-game-Done_h",secFooterLinks:".section-link_h",lnkTeam:".link-tag-team_h",lnkPlayer:".link-tag-player_h",lnkGame:".link-tag-Game_h",sectionSelectedGames:".section-team-games_h",lblGameNames:".lbl-tag-games-name_h",spnGames:".span-ddl-games-tag_h",btnTeamFinish:".btn-tag-Finish_h",fieldMessage:".field-message",fieldError:".field-error",hdnSportsIdData:"hdn_sport_id",hdnSportsId:"#hdn_sport_id",hdnGamesIdData:"hdn_game_id",hdnGamesId:"#hdn_game_id"},attributes:{stateId:"stateid",schoolId:"schoolid",teamId:"teamid",playersId:"playerid",cityId:"cityid"},inlineTemplates:{sportOption:'{{#sports}}<option value="{{sport_id}}">{{sport_name}}</option>{{/sports}}',compLevelOption:'{{#levels}}<option value="{{complevel_id}}">{{complevel_name}}</option>{{/levels}}',seasonOption:'{{#seasons}}<option value="{{season_id}}">{{season_name}}</option>{{/seasons}}',addPlayerText:'</br><input type="text" class="txt-tag-player-name_h additional_h" placeholder="Enter Name" value="" />'},messages:{dataNotExist:"Data Does Not Exist . ",dataNotExistAwards:"Data Does Not Exists For Awards.",MandatoryFields:"Sports Id, Name , Year are mandatory.",selectOrganization:"Please Select High School Or Club & Season . ",selectTeamAndSports:"Please Select Both Sports And A Team . "},initialize:function(e){s.prototype.initialize.call(this,e),n=this,n.setOptions(e),this.init()},render:function(){s.prototype.render.call(this)},setOptions:function(e){this.user_id=e.user_id,e.is_owner==undefined||e.is_owner==null?this.is_owner=null:this.is_owner=e.is_owner;if(!e.channel)throw new Error("call back channel is must for this");this.channel=e.channel,this.sports_id=e.sports_id||null},init:function(){n.setupView()},setupView:function(){n.setUpMainView(),n.fillSports()},setUpMainView:function(){var e=f.to_html(n.template,{});l(n.el).html(e),console.log("isowner",n.is_owner)},fillSports:function(){if(!(n.sports&&n.sports.length>0)){var e=new h;e.processResult=function(t){var r=e.ParseForDropdown();n.SetupSportsView(r)},e.fetch()}},SetupSportsView:function(e){n.sports=e;var t={};t.records=n.sports,t.recordId="id",t.recordValue="custom_name";var r=new w({data:t,title:"Select Sport",elementId:n.controls.hdnSportsIdData,destination:n.controls.spnSports,targetView:n,selectedValue:n.sports_id||null,callback:function(e){n.changeSport(e)}});n.sports_id&&(n.sportsDone(),n.is_owner==0&&(console.log("insideoop"),l(n.destination).find(n.controls.btnEditSport).addClass("display_none_important")))},changeSport:function(e){e&&e!=0?l(n.destination).find(n.controls.btnSportsDone).fadeIn():l(n.destination).find(n.controls.btnSportsDone).fadeOut()},sportsDone:function(e){n.sportsId=l(n.destination).find(n.controls.hdnSportsId).val(),l(n.destination).find(n.controls.lblSportName).html(l(n.destination).find(n.controls.spnSports).find(n.controls.dropdownHeader).text()),l(n.destination).find(n.controls.secAddSports).fadeOut(),l(n.destination).find(n.controls.secSports).fadeIn(),l(n.destination).find(n.controls.secFooterLinks).fadeIn()},editSport:function(){this.tagData={Game:{},Player:{},Team:{}},l(n.destination).find(n.controls.secSports).fadeOut(),l(n.destination).find(n.controls.secAddSports).fadeIn(),l(n.destination).find(n.controls.secFooterLinks).fadeOut(),l(n.destination).find("*").show(),l(n.destination).find(".displayNone").hide(),l(n.destination).find("input").val(""),l(n.destination).find(n.controls.additionalPlayer).remove()},showTeamSection:function(e){l(n.destination).find(n.controls.secPlayer).fadeOut(),l(n.destination).find(n.controls.secGame).fadeOut(),l(n.destination).find(n.controls.secTagTeam).fadeIn(),l(n.destination).find(n.controls.secFooterLinks).fadeOut(),l(n.destination).find(n.controls.btnTeamFinish).fadeOut(),l(e.target).hide()},keyupState:function(e){var t=l(e.target).val(),r=[];if(t!="")if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.stateId),n.CheckTeamControlsVisibility();var i=new p;i.state_name=l(e.target).val(),n.stateFetchRequest=n.stateFetchRequest||[],n.stateFetchRequest.push(n.cityFetchRequest||[]),n.stateFetchRequest.push(n.teamFetchRequest||[]),l(e.target).addClass("ui-autocomplete-loading"),n.stateFetchRequest=n.abortRequest(n.stateFetchRequest);var s=i.fetch();n.stateFetchRequest.push(s),l.when(i.request).done(function(){if(i.isError())return;var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.states=[];for(var s in t)n.states.push(t[s].payload);n.states.forEach(function(e,t){r.push(e.name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.changeState(e)},changeState:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.stateId);var r=!1;n.states_id="",n.states&&n.states.forEach(function(i,s){i["name"]==t&&(r=!0,n.states_id=i.id,l(e.target).attr(n.attributes.stateId,n.states_id),l(e.target).parent().find(n.controls.txtTeamSchool).removeAttr("disabled").attr(n.attributes.stateId,n.states_id))}),r||(n.states_id=0,l(n.destination).find(n.controls.txtTeamSchool).attr("disabled","disabled").removeAttr(n.attributes.stateId).fadeOut()),n.CheckTeamControlsVisibility()},keyupCity:function(e){var t=l(e.target).val(),r=[];if(t.length>2)if(n.isValidAutoCompleteKey(e)==1){try{n.$(e.target).autocomplete("destroy")}catch(i){}l(e.target).removeAttr(n.attributes.cityId),n.CheckTeamControlsVisibility();var s=new d;s.states_id=n.states_id,s.city_name=l(e.target).val(),console.log("City Request Abort Request Function AddGame/Main.js"),n.cityFetchRequest=n.cityFetchRequest||[],n.cityFetchRequest.push(n.teamFetchRequest||[]),l(e.target).addClass("ui-autocomplete-loading"),n.cityFetchRequest=n.abortRequest(n.cityFetchRequest);var o=s.fetch();n.cityFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.cities=[];for(var i in t)n.cities.push(t[i]);n.cities.forEach(function(e,t){r.push(e.city)}),n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.changeCity(e)},changeCity:function(e){var t=l(e.target).val();l(e.target).removeAttr(n.attributes.cityId);var r=!1;n.city_id="",n.cities&&n.cities.forEach(function(i,s){i["city"]==t&&(r=!0,n.city_id=i.id,l(e.target).attr(n.attributes.cityId,n.city_id))}),r?l(n.destination).find(n.controls.txtTeamSchool).removeAttr("disabled"):(n.city_id=0,l(n.destination).find(n.controls.txtTeamSchool).attr("disabled","disabled").removeAttr(n.attributes.cityId).fadeOut()),n.CheckTeamControlsVisibility()},keyupSchool:function(e){var t=l(e.target).val(),r=[],i=n.isValidAutoCompleteKey(e);if(t!=""&&i==1&&t.length>2){n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),l(e.target).removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility();var s=new y;s.states_id=l(e.target).attr(n.attributes.stateId),s.sports_id=l(n.destination).find(n.controls.hdnSportsId).val(),s.team_name=t,l(e.target).addClass("ui-autocomplete-loading"),console.log("Team Request Abort Request Function"),n.TeamFetchRequest=n.abortRequest(n.TeamFetchRequest);var o=s.fetch();n.TeamFetchRequest.push(o),l.when(s.request).done(function(){if(s.isError())return;var t=s.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").stop().fadeOut(),n.teams=[];for(var i in t)n.teams.push(t[i].payload);n.teams.forEach(function(e,t){r.push(e.team_name)});try{l(e.target).autocomplete("destroy")}catch(o){}l(e.target).autocomplete({source:r}),l(e.target).trigger("keydown")})}else l(e.target).removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility(),n.isEnterKey(e)&&n.changeSchool(e)},changeSchool:function(e){var t=l(e.target).val(),r=!1;n.team_id=0,n.teams&&n.teams.forEach(function(i,s){var o=i.team_name;o==t&&(r=!0,n.team_id=i.id,l(e.target).attr(n.attributes.teamId,n.team_id))}),r||l(e.target).removeAttr(n.attributes.teamId),n.CheckTeamControlsVisibility()},CheckTeamControlsVisibility:function(){var e=l(n.destination).find(n.controls.txtTeamState).attr(n.attributes.stateId);e&&e!=""&&e!=0?l(n.destination).find(n.controls.txtTeamSchool).show():l(n.destination).find(n.controls.txtTeamSchool).val("").removeAttr(n.attributes.teamId).hide(),e=l(n.destination).find(n.controls.txtTeamSchool).attr(n.attributes.teamId),e&&e!=""&&e!=0?l(n.destination).find(n.controls.btnTeamDone).show():l(n.destination).find(n.controls.btnTeamDone).hide()},doneTagTeamTagging:function(e){var t=l(n.destination).find(n.controls.txtTeamSchool).attr(n.attributes.teamId);n.team_id=t;var r=l(n.destination).find(n.controls.ddlTeamSeason).val(),i=[];if(t&&t!=""&&t!=0&&t&&t!=""&&t!=0){var s=l(n.destination).find(n.controls.txtTeamSchool).val();i.push(t),l(n.destination).find(n.controls.lblTeamName).html(s),l(n.destination).find(n.controls.secTagTeam).fadeOut(),l(n.destination).find(n.controls.secTeam).fadeIn(),l(n.destination).find(n.controls.lnkPlayer).fadeIn(),l(n.destination).find(n.controls.lnkGame).fadeIn(),l(n.destination).find(n.controls.secFooterLinks).fadeIn()}else n.$(e.target).parents(n.controls.secTagTeam).find(n.controls.fieldMessage).html(n.messages.selectOrganization).stop().fadeIn();var o={5:i};u(n.channel).publish(o)},showPlayer:function(e){l(n.destination).find(n.controls.secTagTeam).fadeOut(),l(n.destination).find(n.controls.secGame).fadeOut(),l(n.destination).find(n.controls.secPlayer).fadeIn(),l(n.destination).find(n.controls.btnTeamFinish).fadeOut()},addPlayer:function(e){l(n.destination).find(n.controls.secPlayerInput).append(n.inlineTemplates.addPlayerText)},keyUpPlayer:function(e){var t=l(e.target).val(),r=[];if(t!="")if(n.isValidAutoCompleteKey(e)==1){l(e.target).removeAttr(n.attributes.playersId);var i=new m;i.user_name=t,i.states_id=n.states_id,i.sports_id=l(n.destination).find(n.controls.hdnSportsId).val(),l(e.target).addClass("ui-autocomplete-loading"),console.log("Player Request Abort Request Function"),n.PlayerFetchRequest=n.abortRequest(n.PlayerFetchRequest);var s=i.fetch();n.PlayerFetchRequest.push(s),l.when(i.request).done(function(){var t=i.toJSON();t==null||t.length<1?n.$(e.target).parent().find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn():n.$(e.target).parent().find(n.controls.fieldMessage).html("").fadeOut(),n.users=[];for(var s in t)n.users.push(t[s].payload);n.users.forEach(function(e,t){r.push(e.name)});try{n.$(e.target).autocomplete("destroy")}catch(o){}n.$(e.target).autocomplete({source:r}),n.$(e.target).trigger("keydown")})}else n.setPlayerId(e),n.isEnterKey(e)&&n.addPlayer(e);else l(e.target).removeAttr(n.attributes.playersId)},setPlayerId:function(e){if(n.users){var t=l(e.target).val().toLowerCase();for(var r in n.users)if(n.users[r].name.toLowerCase()==t){l(e.target).attr(n.attributes.playersId,n.users[r].id);return}}},donePlayerTagging:function(e){var t=[],r="",i=[];l(n.destination).find(n.controls.txtPlayerName).each(function(){var e=l(this).attr(n.attributes.playersId);e>0&&(t.push({name:l(this).val(),id:e}),r+=","+l(this).val(),i.push(e))});if(t.length>0){var s={players:t},o=l(n.destination).find(n.controls.sectionSelectedPlayers);l(o).find(n.controls.lblPlayerNames).html(r),l(o).fadeIn(),l(n.destination).find(n.controls.secPlayer).fadeOut(),l(n.destination).find(n.controls.btnTeamFinish).fadeIn();var a={1:i};u(n.channel).publish(a)}else{l(e.target).parents(n.controls.secGame).find(n.controls.fieldMessage).html(n.messages.selectPlayer).fadeIn();var o=l(n.destination).find(n.controls.sectionSelectedPlayers);l(o).find(n.controls.lblPlayerNames).html(""),l(o).fadeOut()}},showGameSection:function(e){n.bindGamesData(e),l(n.destination).find(n.controls.secTagTeam).fadeOut(),l(n.destination).find(n.controls.secPlayer).fadeOut(),l(n.destination).find(n.controls.secGame).fadeIn(),l(n.destination).find(n.controls.btnTeamFinish).fadeOut()},bindGamesData:function(e){var t=l(n.destination).find(n.controls.hdnSportsId).val();if(n.sportsId){var r=new g;r.states_id=n.states_id,r.sports_id=n.sportsId,r.teams_id=n.team_id,l(e.target).parents(n.controls.secGame).find(n.controls.fieldMessage).html("").fadeOut(),r.processResult=function(e){n.SetupGamesView(e)},console.log("Team Request Abort Request Function"),n.GameFetchRequest=n.abortRequest(n.GameFetchRequest);var i=r.fetch();n.GameFetchRequest.push(i)}else l(e.target).parents(n.controls.secGame).find(n.controls.fieldMessage).html(n.messages.selectTeamAndSports).fadeIn()},SetupGamesView:function(e){var t=e.toJSON();if(t==null||t.length<1){l(n.destination).find(n.controls.secGame).find(n.controls.fieldMessage).html(n.messages.dataNotExist).stop().fadeIn();return}n.games=t;var r={};r.records=n.games,r.recordId="id",r.recordValue="game_name";var i=new w({data:r,title:"Select Game",elementId:n.controls.hdnGamesIdData,destination:n.controls.spnGames,targetView:n,selectedValue:n.sports_id||null,callback:function(e){n.changeGame(e)}})},changeGame:function(e){var t=e;t&&t!=""&&t!=0?l(n.destination).find(n.controls.secGame).find(n.controls.btnGameDone).fadeIn():l(n.destination).find(n.controls.secGame).find(n.controls.btnGameDone).fadeOut()},doneGameTagging:function(e){var t=this,n=l(e.target).parents(t.controls.secGame).find(t.controls.hdnGamesId).val(),r="";if(n&&n!=""&&n!=0){r=l(e.target).parents(t.controls.secGame).find(t.controls.spnGames).find(t.controls.dropdownHeader).text();var i={game:{id:n,game_name:r}},s=[];s.push(n),t.tagData.Game=i;var o=l(t.destination).find(t.controls.sectionSelectedGames);l(o).find(t.controls.lblGameNames).html(r),l(o).fadeIn(),l(t.destination).find(t.controls.secGame).fadeOut(),l(t.destination).find(t.controls.btnTeamFinish).fadeIn();var a={8:s};u(t.channel).publish(a)}else{var o=l(t.destination).find(t.controls.sectionSelectedGames);l(o).find(t.controls.lblGameNames).html(""),l(o).fadeIn()}},finishTagging:function(){}});return E});