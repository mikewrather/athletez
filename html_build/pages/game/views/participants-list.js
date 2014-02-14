define(["facade","views","utils","media/views/image-item","text!game/templates/participats-list.html","sportorg/models/uslgamelink","common/models/add","component/fb","component/forms"],function(e,t,n,r,i,s,o){var u,a,f=e.$,l=e._,c=require("vendor"),h=n.lib.Channel,p=require("component/fb"),d=t.CollectionView,v=t.SectionView,m=require("component/forms"),g=c.Mustache,y=d.extend(v.prototype);return y.extend({__super__:d.prototype,template:i,_tagName:"li",_className:"image",page:0,page_limit:8,listView:".image-list",_view:r,events:{"click .see-more-h":"seeMore","mouseover a.tiles":"showText","mouseout a.tiles":"showicon","click .invite-to-fb-h":"inviteFBFriend"},showText:function(e){f(e.target).parent().find("span").removeClass("hide")},showicon:function(e){f(e.target).parent().find("span").addClass("hide")},inviteFBFriend:function(e){var t=this,n={},r=function(){n.subject_id=t.game_id,n.enttype_id=t.controllerObject.basics.get("payload").enttypes_id,routing.trigger("fbInvite",undefined,n)};t.checkForUser()?r():routing.trigger("showSignup",function(e){r(function(){e&&e()})})},renderTemplate:function(){var e=g.to_html(this.template,{target:this.target_id});return this.$el.html(e),this},afterRender:function(){var e=this,t=setInterval(function(){$ele=e.$el.find(".character-limit-h"),$ele.length&&(clearInterval(t),$ele.each(function(){e.adJustFontDynamically(f(this))}))},100);this.$el.find(".edit-h").on("click",this.editResults)},editResults:function(e){e.preventDefault(),e.stopPropagation();if(f(e.target)[0].tagName=="SPAN")var t=f(e.target).parent().attr("subject-id");else var t=f(e.target).attr("subject-id");if(!this.checkForUser())routing.trigger("showSignup",function(e){addToList(function(){e&&e()})});else{var n={height:"500px",width:"500px",html:'<div id="addParticipantForm"></div>',title:"Edit My Times"};routing.trigger("common-popup-open",n),this.drawAddParticipantForm(t)}},addParticipant:function(){if(!this.checkForUser())routing.trigger("showSignup",function(e){addToList(function(){e&&e()})});else{var e={height:"500px",width:"500px",html:'<div id="addParticipantForm"></div>',title:"Add Me to This Event"};routing.trigger("common-popup-open",e),this.drawAddParticipantForm()}},drawAddParticipantForm:function(e){var t=this,n=!1,r=new s,i=function(){var e=new m({result_time:{form_values:{defaultValue:n?r.get("payload").result_time:"",post_to_server:!0,serverDbField:"result_time",serverKey:"result_time"},type:"Text",fieldClass:"",attr:{placeholder:"00:00:00","class":"txt-result-time"},showLable:!0,label:"Result Time"},bibnumber:{form_values:{defaultValue:n?r.get("payload").bib_number:"",post_to_server:!0,serverDbField:"bib_number",serverKey:"bib_number"},type:"Text",fieldClass:"",attr:{placeholder:"0","class":"txt-bib-number"},showLable:!0,label:"Bib Number"},games_id:{form_values:{serverKey:"games_id",serverDbField:"games_id",post_to_server:!0,value:t.game_id},type:"Hidden"},sports_id:{form_values:{serverKey:"sports_id",serverDbField:"sports_id",post_to_server:!0,value:t.sport_id},type:"Hidden"},submit:{type:"Submit",fieldClass:"button-field",attr:{value:"Save Changes"},showLable:!1,onSubmit:function(e){var s=i.commit();if(s)for(var u in s){var a=f("*[name="+u+"]"),l=a.position();a.parents(".common-modal #modalBody").animate({scrollTop:l.top},"500",function(){a.addClass("focus-error-animation"),setTimeout(function(){a.removeClass("focus-error-animation")},2e3)});break}else{if(t.formValues)var c=t.formValues.getFormValues();else var c=i.getValue();var c=t.formValues.getFormValues();r.set({games_id:c.games_id,sports_id:c.sports_id,result_time:c.result_time,bib_number:c.bib_number}),r.save(),f.when(r.request).done(function(){var e=r.toJSON(),i=new o;i.processItemFromResponse(e.payload.usl.user),routing.trigger("common-popup-close"),t.$el.find(".add-to-event").addClass("link-disabled"),n||t.collection.add(i)}),f.when(r.request).fail(function(e){var n=JSON.parse(e.responseText),r=n.exec_data.error_array;t.formValues.showServersErrors(r)})}}},button:{type:"Button",fieldClass:"button-field",attr:{value:"Cancel","class":"cancel-btn"},onClick:function(){routing.trigger("common-popup-close")},showLable:!1}},f("#addParticipantForm")),i=e.form;t.formValues=e.formValues};e?(r.set("id",e),r.fetch(),f.when(r.request).done(function(){n=!0,i()})):i()},initialize:function(e){console.error(e);var t=this;f(document).off("click",".add-to-event"),f(document).on("click",".add-to-event",function(){if(!t.checkForUser()){routing.trigger("showSignup");return}t.addParticipant()}),f(".participants-heading-h").removeClass("hide"),e.name?this.name=e.name:this.name="image list",e.collecton&&(this.collection=e.collection),this.controllerObject=e.controllerObject,this.controller=e.controller,this.sports_id=e.sports_id,this.game_id=this.collection.id,this.mainView=this,e.mainView=this,this.renderTemplate();var n=this.collection.toArray(),r=n[0].get("payload"),i=[],s=!1;for(var o in r)routing.loggedInUserId==r[o].id&&(s=!0),i.push({payload:r[o]});this.collection.reset(i),this.target_id=e.target_id,this.target_url=e.target_url,this.sport_id=e.sport_id,console.error(e);var t=this;t.allData=this.collection.toArray(),t.seeMore(),d.prototype.initialize.call(this,e);if(!this.collection)throw new Error("ImageListView expected options.collection.");l.bindAll(this),this.addSubscribers(),this.setupAddView(),setTimeout(function(){if(!f("#add-participants-icons").length){var e='<li id="add-participants-icons" class="add-tile-outer">					<div class="add-icons-outer"><div>					<a href="javascript: void(0);" class="add-to-event link-disabled pull-left tiles" title="Add to event"></a>					<span class="hide character-limit-h">I\'m Attending this event</span></div>					<div>					<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a>					<span class="hide character-limit-h">Know somebody who\'s gonna be here?</span></div>					</div></li>';t.$el.find(t.listView).prepend(e),s||t.$el.find(t.listView).find(".add-to-event").removeClass("link-disabled")}},0)},showAddButton:function(){this.$el.find(".add-to-event").removeClass("link-disabled")},seeMore:function(e){var t=this.allData.length,n=this.page*this.page_limit,r=n+this.page_limit;t<=r&&this.$el.find(".see-more-h").hide(),e?this.collection.add(this.allData.slice(n,r)):this.collection.reset(this.allData.slice(n,r)),this.page++,e&&(this.addSubscribers&&this.addSubscribers(),this.setupAddView&&this.setupAddView())},checkForUser:function(){return!l.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},childViews:{},setupAddView:function(){function i(e){n.model=e,n.render(),f(this.listView).append(n.el)}var e,t=this,n=new AddImageView({collection:this.collection}),r=this.addChildView(n);this.childViews.form=n,this.callbacks.add(function(){r()}),h("addimage:fetch").subscribe(i)},filterWithImageType:function(e){var t=this.collection;return f.each(t.models,function(t,n){n.selectImageType&&n.selectImageType(e)}),t}})});