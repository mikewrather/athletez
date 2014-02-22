define(["require","text!profilesetting/templates/basic_info_header.html","text!profilesetting/templates/basic_info_header_edit.html","text!profilesetting/templates/basic_info_header_completed.html","profilesetting/models/basic_info","facade","views","utils","vendor","usercontrols/imagecropper/imagecropper","component/forms"],function(e,t,n,r){var i,s=e("facade"),o=e("views"),u=e("profilesetting/models/basic_info"),a=o.SectionView,f=e("utils"),l=f.lib.Channel,c=e("vendor"),h=c.Mustache,p=s.$,d=e("usercontrols/imagecropper/imagecropper"),v=e("component/forms");return i=a.extend({id:"basic_info",template:t,events:{"click .btn-prof-setting-h":"initialize","click #edit_profile_info":"editProfile","click #change_user_pic":"changeUserpic","click #save_user_data":"saveProfileBasics"},initialize:function(e){e.name&&a.prototype.initialize.call(this,e),this.initBasicView()},render:function(){a.prototype.render.call(this)},generateForm:function(){var e=this,t=new v({name:{form_values:{post_to_server:!0,serverKey:"name",serverDbField:"name",value:e.basicInfoModel.get("payload").name},type:"Text",attr:{placeholder:"Name","class":""},label:"Name"},Height:{form_values:{post_to_server:!0,serverKey:"height_in",serverDbField:"height",value:e.basicInfoModel.get("payload").height_in},type:"Text",attr:{placeholder:"Height","class":""},label:"Height (in)"},Weight:{form_values:{post_to_server:!0,serverKey:"weight_lb",serverDbField:"weight",value:e.basicInfoModel.get("payload").weight_lb},type:"Text",attr:{placeholder:"Weight","class":""},label:"Weight (lbs)"},Password:{form_values:{post_to_server:!0,serverKey:"password",serverDbField:"password"},type:"Password",attr:{placeholder:"New Passord","class":""},label:"New"},Again:{form_values:{post_to_server:!0,serverKey:"re_password",serverDbField:"re_password"},type:"Password",attr:{placeholder:"New Password Again"},label:"Again"},submit:{type:"Submit",fieldClass:"button-field",form_values:{post_to_server:!1},attr:{value:"Save","class":"resume_button"},showLable:!1,onSubmit:function(t){var r=n.commit();if(r)for(var i in r);else{if(e.formValues)var s=e.formValues.getFormValues();else var s=n.getValue();var s=e.formValues.getFormValues();e.saveProfileBasics(s)}}}},p("#user_profile_data")),n=t.form;this.formValues=t.formValues},initBasicView:function(){var e=this;this.basicInfoModel=new u,this.basicInfoModel.fetch(),p.when(this.basicInfoModel.request).done(function(){e.basicInfoModel.set("id",e.basicInfoModel.get("payload").id),e.setupBasicView(),e.generateForm()})},setupBasicView:function(){console.log("called");var e=this,t=h.to_html(e.template,this.basicInfoModel.toJSON());p("#section-basics-prof-setting").html(t),p("#change_user_pic").bind("click",function(){e.changeUserpic()}),p("#edit_profile_info").bind("click",function(){e.editProfile()}),p("#save_user_data").bind("click",function(){e.saveProfileBasics()})},setOptions:function(e){if(!this.model)throw new Error("HeaderView expects option with model property.")},editProfile:function(){p("#user_profile_data").html(""),this.generateForm()},saveProfileBasics:function(e){var t=this,n={};e?n=e:p("div#user_profile_data").find("input").each(function(){n[p(this).attr("model-property")]=p(this).val()}),this.basicInfoModel.save(n,{success:function(){var e=h.to_html(r,t.basicInfoModel.toJSON());p("div#user_profile_data").html(e),p("#edit_profile_info").bind("click",function(){t.editProfile()})},error:function(e,n){var r=JSON.parse(n.responseText),i=r.exec_data.error_array;t.formValues.showServersErrors(i)}})},changeUserpic:function(){var e=this.basicInfoModel.get("payload");l("userpic-changed").subscribe(function(){t.initBasicView()});var t=this,n=new d({image_o:e.user_picture_obj.pre_crop_url,image_e:e.user_picture_obj.image_path})}}),i});