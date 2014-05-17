define(["require","text!profilesetting/templates/highschool.html","text!profilesetting/templates/club.html","text!profilesetting/templates/sportslevel.html","text!profilesetting/templates/level.html","facade","views","utils","vendor","profilesetting/collections/states","profilesetting/collections/schools","profilesetting/collections/sports","profilesetting/views/teams","profilesetting/models/complevel","profilesetting/views/seasons","profilesetting/views/positions","profilesetting/models/team","profilesetting/models/position"],function(e,t,n,r,i){var s,o,u=e("facade"),a=e("views"),f=a.SectionView,l=e("utils"),c=l.lib.Channel,h=e("vendor"),p=h.Mustache,d=u.$,v=e("profilesetting/collections/states"),m=e("profilesetting/collections/schools"),g=e("profilesetting/collections/sports"),y=e("profilesetting/models/complevel"),b=e("profilesetting/views/seasons"),w=e("profilesetting/views/positions"),E=e("profilesetting/views/teams"),S=e("profilesetting/models/team"),x=e("profilesetting/models/position");return o=f.extend({events:{"keyup #txt-school-state":"keyupState","blur #txt-school-state":"changeState","keyup #txt-school-school":"keyupSchool","blur #txt-school-school":"changeSchool","keyup #txt-club-state":"keyupState","blur #txt-club-state":"changeState","keyup #txt-club-club":"keyupSchool","blur #txt-club-club":"changeSchool","change .ddl-sports":"changeSports","change .ddl-complevel":"changeCompLevel","change .chkSeasons":"AddSportsItem","click .btn-add-level":"AddLevel","click .spn-position-title_h":"MarkPosition","click .btn-add-sports":"AddSports","click .btn-Remove-Sport":"RemoveSports","click #btn-Add-School":"SetUpAddSchool","click #btn-Add-club":"SetUpAddSchool","click .delete-team":"DeleteTeam","click .btn-Save-Positions":"SavePositions","click .btn-Close-Positions":"ClosePositions","click .btn-Finish-Sports":"FinishSports","click .edit-team":"EditTeam","click .btnOpenPositions":"displayPositionPopup","click .add-school-h":"openAddHighSchoolPopup","click .add-club-h":"openAddClubPopup","click .up-arrow-h":"levelUpArrow","click .down-arrow-h":"levelDownArrow"},messages:{dataNotExist:"You don't have any teams registered yet.  Why not do that now?",optionsMissing:"HeaderView expects option with model property.",selectSport:"Please select sport",selectState:"Please insert state",selectSchool:"Please insert School",SelectLevel:"Plesae Select Comp Level"},properties:{show_prev_year:30},states:[],schools:[],initialize:function(e){e.type&&e.type=="school"?(this.type="school",this.controls={txtStates:"#txt-school-state",txtSchools:"#txt-school-school",content:"#content-school-prof-setting",fieldMessage:".field-message",fieldError:".field-error",ddlSports:".ddl-sports",ddlComplevel:".ddl-complevel",modalPosition:".modal-positions",modalPositionBody:".modal-position-body",modalPositionsTitle:".spn-position-title_h",divSportsNameHeading:".spn-sport-name",divMainSportsSection:"#def-school-sports-section",divLevels:".div-sports-level",divSeasons:".div-seasons",divsportsLevel:".section-sportslevel",divSubLevels:".div-levels",divSchoolSportsSection:".school-sports-section",divSportsWrapper:".div-sports-wrapper",btnRemoveSports:".btn-Remove-Sport",divTeamListDetail:".section-team-list-detail",divAddSportSection:"#section-Add-Sports-school",btnAddSports:".btn-add-sports",btnClosePositions:".btn-Close-Positions",btnFinishSports:".btn-Finish-Sports",btnOpenPositions:".btnOpenPositions",chkSeasons:".chkSeasons",btnAddLevel:".btn-add-level"},this.template=t):(this.type="club",this.controls={txtStates:"#txt-club-state",txtSchools:"#txt-club-club",content:"#content-club-prof-setting",fieldMessage:".field-message",fieldError:".field-error",ddlSports:".ddl-sports",ddlComplevel:".ddl-complevel",modalPosition:".modal-positions",modalPositionBody:".modal-position-body",modalPositionsTitle:".spn-position-title_h",divSportsNameHeading:".spn-sport-name",divMainSportsSection:"#def-club-sports-section",divLevels:".div-sports-level",divSeasons:".div-seasons",divsportsLevel:".section-sportslevel",divSubLevels:".div-levels",divSchoolSportsSection:".school-sports-section",divSportsWrapper:".div-sports-wrapper",btnRemoveSports:".btn-Remove-Sport",divTeamListDetail:".section-team-list-detail-club",divAddSportSection:"#section-Add-Sports-club",btnAddSports:".btn-add-sports",btnClosePositions:".btn-Close-Positions",btnFinishSports:".btn-Finish-Sports",btnOpenPositions:".btnOpenPositions",chkSeasons:".chkSeasons",btnAddLevel:".btn-add-level"},this.template=n),f.prototype.initialize.call(this,e),_self=this,_self.setOptions(e),this.init()},openAddHighSchoolPopup:function(){var e=this;routing.trigger("add-school-init","","","school",e,function(t){console.log(t),e.$el.find(e.controls.txtSchools).val(t.name),e.$el.find(e.controls.txtStates).val(t.locationState.name),e.states_id="",e.orgs_id="",e.states_id=t.locationState.id,e.$(e.controls.txtSchools).removeAttr("disabled"),e.orgs_id=t.org_id,e.$el.find(e.controls.divMainSportsSection).find(e.controls.ddlSports).length<1&&e.fillSports(e.orgs_id,e.controls.divMainSportsSection),e.$el.find(".add-school-h").hide()})},init:function(){var e=this;e.setupView(),e.SetUpTeamsView()},render:function(){var e=this;f.prototype.render.call(this)},setupView:function(){},setOptions:function(e){this.user_id=e.user_id,this.gender=e.gender},keyupState:function(e){var t=this,n=d(e.target).val(),r=[],i=t.isValidAutoCompleteKey(e);if(n!="")if(i==1){t.$(e.target).parents(t.controls.divAddSportSection).find(t.controls.txtSchools).attr("disabled","disabled").val(""),t.RemoveSportsSection();var s=new v;s.state_name=n,console.log("State Request Abort Request Function AddGame/Main.js"),t.stateFetchRequest=t.stateFetchRequest||[],t.stateFetchRequest.push(t.cityFetchRequest||[]),t.stateFetchRequest.push(t.schoolFetchRequest||[]),t.stateFetchRequest=t.abortRequest(t.stateFetchRequest),d(e.target).addClass("ui-autocomplete-loading");var o=s.fetch();t.stateFetchRequest.push(o),d.when(s.request).done(function(){if(s.isError())return;var e=s.toJSON();e==null||e.length<1?t.$el.find(t.controls.txtStates).parent().find(t.controls.fieldMessage).html(t.messages.dataNotExist).stop().fadeIn():t.$el.find(t.controls.txtStates).parent().find(t.controls.fieldMessage).html("").fadeOut(),t.states=[];for(var n in e)t.states.push(e[n].payload);t.states.forEach(function(e,t){r.push(e.name+" ("+e.abbr+")")});try{t.$el.find(t.controls.txtStates).autocomplete("destroy")}catch(i){}t.$el.find(t.controls.txtStates).autocomplete({source:r}),t.$el.find(t.controls.txtStates).trigger("keydown")})}else t.changeState(e)},changeState:function(e){var t=this,n=d(e.target).val(),r=!1;t.states_id="",t.states.forEach(function(e,i){e["name"]+" ("+e["abbr"]+")"==n&&(r=!0,t.states_id=e.id,t.$(t.controls.txtSchools).removeAttr("disabled"))}),r||(t.states_id=0,t.$(t.controls.txtSchools).attr("disabled","disabled"))},keyupSchool:function(e){var t=this,n=d(e.target).val(),r=[],i=t.isValidAutoCompleteKey(e);if(n!=""&&i==1){t.RemoveSportsSection();var s=new m;s.sports_club=t.type=="school"?0:1,s.states_id=t.states_id,s.org_name=n,console.log("School Request Abort Request Function"),t.schoolFetchRequest=t.abortRequest(t.schoolFetchRequest),d(e.target).addClass("ui-autocomplete-loading"),d(e.target).removeAttr("data-id");var o=s.fetch();t.schoolFetchRequest.push(o),d.when(s.request).done(function(){if(s.isError())return;var n=s.toJSON();n==null||n.length<1?t.$el.find(t.controls.txtSchools).parent().find(t.controls.fieldMessage).html(t.messages.dataNotExist).stop().fadeIn():t.$el.find(t.controls.txtSchools).parent().find(t.controls.fieldMessage).html("").stop().fadeOut(),t.schools=[];for(var i in n)t.schools.push(n[i].payload);t.schools.forEach(function(e,t){r.push({id:e.id,value:e.org_name,city:e.city})});try{t.$el.find(t.controls.txtSchools).autocomplete("destroy")}catch(o){}d(e.target).autocomplete({source:r,select:function(t,n){console.error(t),setTimeout(function(){d(e.target).val(n.item.value),d(e.target).attr("data-id",n.item.id),d(e.target).trigger("blur")},100)}}).data("ui-autocomplete")._renderItem=function(e,t){return d("<li>").append("<a>"+t.value+"<br><span class='sub-label'>"+t.city+"</span></a>").appendTo(e)},d(e.target).trigger("keydown")})}else t.RemoveSportsSection(),t.changeSchool(e)},changeSchool:function(e){var t=this,n,r=t.schools.length,i=t.$(e.target).attr("data-id");t.orgs_id=0;for(n=0;n<r;n++)if(t.schools[n]["id"]==i){t.orgs_id=t.schools[n].org_id;var s=t.schools[n].single_sport_id;t.$el.find(t.controls.divMainSportsSection).find(t.controls.ddlSports).length<1&&t.fillSports(t.orgs_id,t.controls.divMainSportsSection,s);break}},openAddClubPopup:function(e){var t=d(e.target).parent().find("input#txt-club-club").val(),n=this;routing.trigger("add-school-init","","","club",n,function(e){console.log("RESULT",e),n.$el.find(n.controls.txtSchools).val(e.name),n.$el.find(n.controls.txtSchools).attr("data-id",e.org_id),n.$el.find(n.controls.txtStates).val(e.locationState.name),n.$el.find(n.controls.divSportsWrapper).css({"background-color":"rgb(255, 223, 223)"}),n.states_id="",n.orgs_id="",n.states_id=e.locationState.id,n.$(n.controls.txtSchools).removeAttr("disabled"),n.orgs_id=e.org_id,n.$el.find(n.controls.divMainSportsSection).find(n.controls.ddlSports).length<1&&n.fillSports(n.orgs_id,n.controls.divMainSportsSection,e.single_sport_id);var t=n.$el.parents().find(d("#btn-Add-club")),r=t.position();t.parents(document).animate({scrollTop:r.top},"1000"),n.$el.find(".add-club-h").hide()},t)},RemoveSportsSection:function(){var e=this;e.$el.find(e.controls.divMainSportsSection).html("")},fillSports:function(e,t,n){var r=this;if(r.sports&&r.sports.length>0)r.SetupSportsView(e,t,n);else{var i=new g;i.sport_type=this.type=="club"?0:1,i.sport_type_id=i.sport_type,i.male=1,i.female=0,r.gender=="male"?i.male=1:r.gender=="famale"&&(i.female=0),i.fetch(),d.when(i.request).done(function(){if(i.isError())return;var s=i.toJSON();(s==null||s.length<1)&&r.$el.find(r.controls.ddlSports).parent().find(r.controls.fieldMessage).html(r.messages.dataNotExist).stop().fadeIn(),r.sports=[];for(var o in s)r.sports.push(s[o].payload);r.sort(r.sports,"sport_name",!1),r.SetupSportsView(e,t,n)})}},changeSports:function(e){var t=this;console.log("SPORTS",t.sports);var n=d(e.target).val(),r=d(e.target).attr("orgsid");console.log("Event Target Sports List",d(e.target),n,r);if(n!=0&&n!=null&&n!=""&&r&&r!=0&&r!=null&&r!=""){t.sport_id=n;var i=t.$(e.target).parents(t.controls.divsportsLevel).find(t.controls.divLevels);console.log("CALLED",i),i.html(""),t.$(e.target).parents(t.controls.divsportsLevel).find(t.controls.btnAddLevel).attr("sportid",n),t.fillCompLevel(r,i,n)}else t.sport_id=0},SetupSportsView:function(e,t,n){var i=this,s=p.to_html(r,{sports:i.sports,orgsId:e});i.$(t).append(s),n&&i.$(t).find(".section-sportslevel .select-sports-outer-h").hide(),d(t).parents(i.controls.divSportsWrapper).find(i.controls.btnAddSports).attr("orgsid",e),n&&i.$(t).find(".ddl-sports").val(n).trigger("change"),d(t).parents(i.controls.divSportsWrapper).fadeIn()},findSportById:function(e){var t=this;if(!(t.sports&&t.sports.length<1))return 0;for(var n=0;n<t.sports.length;n++)if(t.sports[n].id==e)return t.sports[n]},fillCompLevel:function(e,t,n){var r=this;r.compLevel_id=undefined;if(e&&e>0){var i=new y;i.orgs_id=e,r.compFetchRequest=r.abortRequest(r.compFetchRequest);var s=i.fetch();r.compFetchRequest.push(s),d.when(i.request).done(function(){if(i.isError())return;var s=i.toJSON();r.compLevel=[];if(s!=null&&s.payload!=null||s.payload.complevels!=null&&s.payload.complevels.length){r.seasons=s.payload.seasons||[];for(var o in s.payload.complevels)r.compLevel.push(s.payload.complevels[o]);var u=r.findSportById(n);u||(u=n),r.SetUpCompLevelView(e,t,u)}})}else d(t).html("")},changeCompLevel:function(e){var t=this,n=d(e.target).val();t.compLevel_id=0;for(var r in t.compLevel)if(t.compLevel[r].complevel_id==n){t.compLevel_id=n,t.$(e.target).attr("disabled","disabled"),t.$(e.target).parents(t.controls.divSubLevels).find(t.controls.divSeasons).fadeIn();return}t.$(e.target).parents(t.controls.divSubLevels).find(t.controls.divSeasons).fadeOut()},SetUpCompLevelView:function(e,t,n){var r=this,s=n.sports_id;s||(s=n);var o=r.GetSeasonsData(r.seasons,e,s);console.log(o);var u=p.to_html(i,{levels:r.compLevel,Data:o,sport:n});r.$(t).append(u);var a=r.$(t).find(r.controls.modalPositionBody);r.fillPositions(s,a)},levelUpArrow:function(e){var t=this,n=d(e.currentTarget).parents(".complevels-wrapper"),r=n.find(".complevels-container").scrollTop(),i=n.find(".complevels-container").height();if(r>i)var s=r-i;else var s=0;n.find(".complevels-container").animate({scrollTop:s})},levelDownArrow:function(e){var t=this,n=d(e.currentTarget).parents(".complevels-wrapper"),r=n.find(".complevels-container").scrollTop(),i=r+n.find(".complevels-container").height();n.find(".complevels-container").animate({scrollTop:i})},GetSeasonsData:function(e,t,n){var r=this,i=[],s=(new Date).getFullYear();for(var o=r.properties.show_prev_year;o>=0;o--){var u={year:s,seasons:e,orgsId:t,sportsId:n};i.push(u),s--}return i},fillPositions:function(e,t){var n=this;console.log("fillpositions",e,t),e?(console.log("sport_id",e,"destination",t),this.positionView=new w({name:"settings-high-school-positions",destination:t,sport_id:e}),n.$el.find(n.controls.ddlSports).parent().find(n.controls.fieldError).html("").fadeOut()):n.$el.find(n.controls.ddlSports).parent().find(n.controls.fieldError).html(n.messages.selectSport).stop().fadeIn()},displayPositionPopup:function(e){var t=this;t.clickedPositionTarget=d(e.target);if(d(e.target).parent().find(t.controls.chkSeasons).is(":checked")){var n=d(e.target).attr("teamid");console.log(d(e.target).parents(t.controls.divSubLevels).find(t.controls.modalPositionsTitle));if(d(e.target).parents(t.controls.divSubLevels).find(t.controls.modalPositionsTitle).length>0){t.$(e.target).parents(t.controls.divSubLevels).find(t.controls.modalPositionsTitle).attr("teamid",n).removeClass("active");var r=d(e.target).attr("positions");console.log("ids",r);if(r){var i=r.split(",");d.each(i,function(n,r){t.$(e.target).parents(t.controls.divSubLevels).find("#pos-"+r).addClass("active")})}t.$(e.target).parents(t.controls.divSubLevels).find(t.controls.modalPosition).modal("show")}else alert("No Positions exists for the sport")}else alert("Select Season")},MarkPosition:function(e){var t=this,n=t.$(e.target),r=d(e.target).attr("teamid"),i=d(e.target).attr("positionId"),s={id1:t.user_id,user_id:t.user_id,positions_id:i,teams_id:r};if(n.hasClass("active")){s.position_id=i;var o=new x(s);o.user_id=t.user_id,o.type="delete",o.destroy({data:s}),d.when(o.request).done(function(){n.removeClass("active"),t.updatePositionButtonNumber(r,!1)})}else{var o=new x(s);o.user_id=t.user_id,o.type="save",o.save(),d.when(o.request).done(function(){n.addClass("active"),t.updatePositionButtonNumber(r,!0)})}},AddLevel:function(e){var t=this,n=t.$(e.target).parents(t.controls.divsportsLevel).find(t.controls.divLevels),r=d(e.target).attr("orgsid"),i=d(e.target).attr("sportid");r&&r!=0&&r!=null&&r!=""?(console.log("destination add level function",n),t.fillCompLevel(r,n,i)):console.error("Orgs Id is ",r)},AddSports:function(e){var t=this,n=t.$(e.target).attr("orgsid"),r=d(t.controls.divSportsWrapper+'[orgsId="'+n+'"] '+t.controls.divSchoolSportsSection);n&&n!=0&&n!=null&&n!=""&&(t.fillSports(n,r),d(r).parents(t.controls.divSportsWrapper).fadeIn())},RemoveSports:function(e){var t=this;t.$(e.target).parents(t.controls.divsportsLevel).remove()},SetUpTeamsView:function(){var e=this;console.log("Highschool teams view Set Up Teams View",e.type),this.teamsView=new E({user_id:e.user_id,destination:e.controls.divTeamListDetail,sports_club:e.type=="school"?0:1,org_type:e.type})},SetUpAddSchool:function(){var e=this;e.$el.find(e.controls.divAddSportSection).fadeIn()},AddSportsItem:function(e){var t=this;t.$el.find(t.controls.btnFinishSports).html("Finish");if(d(e.target).is(":checked")&&d(e.target).attr("seasonid")&&d(e.target).attr("year")){var n=d(e.target).attr("orgsid"),r=d(e.target).parents(t.controls.divSubLevels).find(t.controls.ddlComplevel).val();if(n&&n!=0&&n!=null&&n!=""&&r&&r!=0&&r!=null&&r!=""){var i={orgs_id:n,teams_id:0,id1:t.user_id,user_id:t.user_id,sports_id:d(e.target).attr("sportsid"),complevels_id:r,seasons_id:d(e.target).attr("seasonid"),year:d(e.target).attr("year")},s=new S(i);s.type="add",s.user_id=t.user_id,s.save(),d.when(s.request).done(function(){if(s.isError())return;var n=s.toJSON();if(n!=null&&n.payload!=null||n.payload.id!=null)d(e.target).attr("teamid",n.payload.id),console.log(n.payload.seasons_obj),t.insertPositionsButton(d(e.target),n.payload.seasons_obj,n.payload.year,n.payload.id)})}else{var o=d(e.target).parents(t.controls.divLevels).find(t.controls.ddlComplevel);d(o).parent().find(t.controls.fieldError).html(t.messages.SelectLevel).stop().fadeIn(),d(e.target).parent().find(t.controls.btnOpenPositions).attr("disabled","disabled")}}else!d(e.target).is(":checked")&&d(e.target).attr("teamid")&&t.DeleteTeam(e)},DeleteTeam:function(e){var t=this,n=d(e.target).attr("teamid");if(n){var r={};r.user_id=t.user_id,r.team_id=n;var i=new S(r);i.user_id=t.user_id,i.team_id=n,i.type="delete",i.destroy({data:{user_id:t.user_id,teams_id:n},processData:!0,success:function(){d(e.target).removeAttr("teamid"),d(e.target).parent().find(t.controls.btnOpenPositions).attr("disabled","disabled")}})}},FinishSports:function(){console.log("Current state of view",this);var e=this;e.ClearAddNewForm(),e.init()},ClearAddNewForm:function(){var e=this;e.RemoveSportsSection(),e.$(e.controls.txtStates).val(""),e.states_id=undefined,e.$(e.controls.txtSchools).attr("disabled","disabled").val(""),e.orgs_id=undefined,e.type=="club"?e.$el.find(".add-club-h").show():e.$el.find(".add-school-h").show(),e.$el.find(e.controls.divAddSportSection).fadeOut()},EditTeam:function(e){var t=this;console.log("Event",e.target);var n=d(e.target).attr("orgsId"),r=d(e.target).attr("sportId"),i=d(e.target).parent(),s='<div class="section-sportslevel"><div class="div-sports-level"></div>';s+='<a tabindex="0" orgsid="'+n+'" class="btn-add-level" href="javascript:void(0)">Add Level</a>',s+='<span class="floatRight"><a href="javascript:void(0)" class="common-btn common-btn-direction btn-Finish-Sports" tabindex="0">Finish</a> </span>',s+="</div>",d(i).html(s);var o=d(i).find(t.controls.divLevels);d.each(t.teamsView.Teams,function(e,i){n==i.payload.org_id&&d.each(i.payload.sports,function(e,i){if(i.sports_id==r){t.SetUpEditTeamView(n,o,r,i);return}})})},SetUpEditTeamView:function(e,t,n,r){var i=this;i.compLevel_id=undefined;if(e&&e>0){var s=new y;s.orgs_id=e,s.fetch(),console.log("Complevel Model Request Abort Request Function"),i.compLevelFetchRequest=i.abortRequest(i.compLevelFetchRequest),i.compLevelFetchRequest=s.fetch(),d.when(s.request).done(function(){if(s.isError())return;var n=s.toJSON();i.compLevel=[];if(n!=null&&n.payload!=null||n.payload.complevels!=null&&n.payload.complevels.length){i.seasons=n.payload.seasons||[];for(var o in n.payload.complevels)i.compLevel.push(n.payload.complevels[o]);d.each(r.complevels,function(n,s){i.SetUpCompLevelView(e,t,r);var o=i.$(t).find(i.controls.divSubLevels);if(o[n]){var u=i.$(o[n]).find(i.controls.ddlComplevel);d(u).val(s.complevels_id).attr("disabled","disabled"),d(o[n]).find(i.controls.divSeasons).fadeIn(),d.each(s.seasons,function(e,t){d(o[n]).find(".chkSeasons-"+t.seasons_id+"-"+t.year).attr("checked","checked").attr("teamid",t.team_id),i.insertPositionsButton(d(o[n]).find(".chkSeasons-"+t.seasons_id+"-"+t.year),t)})}})}}),i.$(t).parents(i.controls.divsportsLevel).find(i.controls.btnAddLevel).attr("sportid",n)}},insertPositionsButton:function(e,t,n,r){console.log(t),t.positions||(t.positions=[]),t.seasons_id||(t.seasons_id=t.season_id),t.year&&(n=t.year),t.team_id&&(r=t.team_id),console.log(_self.controls.btnOpenPositions+'[teamid="'+r+'"]',d(_self.controls.btnOpenPositions+'[teamid="'+r+'"]')),d(e).parent().find(_self.controls.btnOpenPositions+'[teamid="'+r+'"]').length?d(e).parent().find(_self.controls.btnOpenPositions+'[teamid="'+r+'"]').removeAttr("disabled","disabled"):d(e).parent().append('<a href="javascript:void(0)" id="season-positions-'+t.seasons_id+"-"+n+'" class="btnOpenPositions btn" >Positions ('+t.positions.length+")</a>"),d(e).parent().find(_self.controls.btnOpenPositions).attr("teamid",r),d(e).parent().find(_self.controls.btnOpenPositions).attr("data-number-positions",t.positions.length);var i="";t.positions&&d.each(t.positions,function(e,t){t&&(i+=t.id+",")}),d(e).parent().find(_self.controls.btnOpenPositions).attr("positions",i)},updatePositionButtonNumber:function(e,t){var n=d(_self.controls.btnOpenPositions+'[teamid="'+e+'"]'),r=n.data("number-positions"),i=t?r+1:r-1;n.data("number-positions",i).html("Positions ("+i+")")},ClosePositions:function(e){var t=this;if(t.clickedPositionTarget){var n=d(e.target).parents(t.controls.modalPosition).find(t.controls.modalPositionsTitle),r="";n.each(function(){d(this).hasClass("active")&&(r+=d(this).attr("positionid")+",")}),d(t.clickedPositionTarget).attr("positions",r),t.clickedPositionTarget=undefined}}}),o});