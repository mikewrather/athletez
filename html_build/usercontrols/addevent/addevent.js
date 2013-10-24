define(["require","text!usercontrols/addevent/templates/layout.html","facade","controller","models","views","user/models/basic_info","usercontrols/addevent/views/main"],function(e,t){var n,r=e("facade"),i=e("controller"),s=e("models"),o=e("views"),u=e("utils"),a=r.$,f=r._,l=u.debug,c=u.lib.Channel,h=o.LayoutView,p=e("user/models/basic_info"),d=e("usercontrols/addevent/views/main"),v=i.extend({cssArr:["/usercontrols/addevent/addevent.css"],events:{},initialize:function(e){return c("load:css").publish(this.cssArr),f.bindAll(this),e.id&&(this.id=e.id),e.sports_id&&(this.sports_id=e.sports_id),e.users_id&&(this.users_id=e.users_id),this.callback=e.callback,e.popup&&(this.popup=!0,this.modelHTML='<div id="modalPopup" class="modal hide fade model-popup-h add-game-modal"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>Add Event</h3></div><div class="modal-body page-content-h"></div></div>'),this.init(),this},init:function(){this.popup?this.setupPopupLayout().render():this.setupLayout().render(),this.setUpMainView(),this.handleDeferreds()},setupLayout:function(){if(this.layout)return this.layout;var e=new h({scheme:this.scheme,destination:"#main",template:"",displayWhen:"ready"});return this.layout=e,this.layout},setupPopupLayout:function(){var e;this.scheme=[],a(".model-popup-h").remove(),a("body").append(this.modelHTML);var e=new h({scheme:this.scheme,destination:"#modalPopup",template:"",displayWhen:"ready"});return this.layout=e,a("#modalPopup").modal(),this.layout},setUpMainView:function(){var e=this;routing.off("add-event-success"),routing.on("add-event-success",function(t){e.addTeamFunction(t)});var n=this;this.addGameView=new d({model:new p,template:t,name:"add-event-main",destination:this.popup?".page-content-h":"#main",user_id:n.id,channel:"add-event-success",sports_id:this.sports_id,teams_id:this.teams_id}),this.scheme.push(this.addGameView),this.layout.render(),a("#modalPopup .modal-body").slimScroll({height:"430px",railVisible:!0,allowPageScroll:!0,disableFadeOut:!0})},addTeamFunction:function(e){this.callback&&this.callback(e)}});return v});