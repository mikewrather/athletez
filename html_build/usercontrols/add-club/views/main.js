define(["require","text!usercontrols/add-club/templates/layout.html","facade","views","utils","vendor","usercontrol/add-club/collections/complevel","usercontrols/add-club/collections/profile","sportorg/models/org","usercontrols/add-club/collections/sports","sportorg/collections/seasons","component/forms"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=e("sportorg/models/org"),h=e("usercontrols/add-club/collections/sports"),p=e("usercontrol/add-club/collections/complevel"),d=e("usercontrols/add-club/collections/profile"),v=e("component/forms"),m=s.extend({template:t,stateData:{},initialize:function(e){this.model=e.model,this.id=e.id,this.addType=e.addType,this.callback=e.callback,this.viewObj=e.viewObj,this.addressValid=!1,s.prototype.initialize.call(this,e),this.setUpMainView(),this.render()},setUpMainView:function(){var e=this,t={};t.type=e.addType;var n=f.to_html(e.template,t);l(e.$el).html(n)},afterRender:function(){this.showAddClubForm()},showAddClubForm:function(){var e=this,t=new v({org_name:{form_values:{post_to_server:!0,serverDbField:"org_name",serverKey:"org_name",objectValuesToUpdate:[]},type:"Text",attr:{placeholder:"Organization Name","class":""},showLable:!1,label:"Organization Name",validators:[{type:"required",message:"Please enter an organization name."}]},season_profile:{type:"DropDown",showLable:!0,label:"Which of these most closely matches the seasons that your organization competes?",form_values:{serverKey:"season_profiles_id",serverDbField:"season_profiles_id",post_to_server:!0,objectValuesToUpdate:[],source_collection:d,request_finished:function(){},data:{records:undefined,recordId:"id",recordValue:"name",selectedValue:e.sports_id},callback:function(e){}}},complevel_profile:{type:"DropDown",showLable:!0,label:"Which best describes the levels your organization has?",width:400,form_values:{serverKey:"complevel_profiles_id",post_to_server:!0,objectValuesToUpdate:[],source_collection:p,request_finished:function(){},data:{records:undefined,recordId:"id",recordValue:"name",selectedValue:e.sports_id},callback:function(e){}}},Sports:{type:e.addType=="school"?"Hidden":"DropDown",showLable:!0,label:"If this is a single-sport organization, choose the sport",form_values:{serverKey:"single_sport_id",post_to_server:!0,objectValuesToUpdate:[],source_collection:h,request_finished:function(){},data:{records:undefined,recordId:"id",recordValue:"custom_name",selectedValue:e.sports_id},callback:function(e){}}},Location:{form_values:{serverKey:"locations_id",post_to_server:!0,serverDbField:"locations_id"},type:"Location",label:"Organization Address",validators:[{type:"required",message:"Please select location."}]},users_id:{form_values:{serverKey:e.users_id,post_to_server:!0,value:e.user_id},type:"Hidden"},submit:{type:"Submit",fieldClass:"button-field",attr:{value:"Create"},showLable:!1,onSubmit:function(t){var r=n.commit();if(r)for(var i in r){var s=l("*[name="+i+"]"),o=s.position();s.parents(".common-modal #modalBody").animate({scrollTop:o.top},"500",function(){s.addClass("focus-error-animation"),setTimeout(function(){s.removeClass("focus-error-animation")},2e3)});break}else{var u=e.formValues.getFormValues(),a={complevel_profiles_id:u.complevel_profiles_id,name:u.org_name,location_id:u.locations_id,season_profiles_id:u.season_profiles_id,single_sport_id:u.single_sport_id,sports_club:e.addType=="school"?"0":"1"};console.log(a);var f=new c(a);f.save({}),l.when(f.request).done(function(){console.log(f.get("payload"));var t=f.get("payload");a.locationState=e.stateData,a.org_id=t.id,e.callback&&e.callback(a),alert("Your "+e.addType+" has been added to our database successfully.  Please continue the process by adding yourself to a specific season."),routing.trigger("common-popup-close")})}}},button:{type:"Button",fieldClass:"button-field",attr:{value:"Cancel"},onClick:function(){routing.trigger("common-popup-close")},showLable:!1}},this.$el.find(".add-club-school-outer")),n=t.form;this.formValues=t.formValues}});return m});