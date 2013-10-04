define(["facade","utils","collections","chrome","controller","profile","imageup","home","videopreview","game","team","registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","login/model","login/view","signup","usercontrols/photo-player/photo-player","usercontrols/add-club/add-club"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E){var S,x=n.ApplicationStates,T=e.$,N=e._,C=e.Backbone,k=t.lib.Channel,L=t.debug;return S=C.Router.extend({routes:{"":"defaultRoute",home:"showHome","home/":"showHome","home/:action":"initApp",profile:"showProfile","profile/":"showProfile","profile/:userid":"showProfile",usersettings:"showProfileSetting","usersettings/":"showProfileSetting",resume:"ShowUserResume","resume/":"ShowUserResume",game:"showGame","game/":"showGame","game/:id":"showGame",team:"showTeam","team/":"showTeam","team/:id":"showTeam",registration:"showRegistration","registration/":"showRegistration","registration/:action":"showRegistration",tag:"showTag","user/login":"showLogin",addgame:"showAddGame"},initialize:function(e){N.bindAll(this),this.addSubscribers(),i.prototype.appStates=new x,this.getPhrases()},intializeImageAndVideo:function(){this.imageUpListeners(),this.videoPreview(),this.showUsercreate()},cancelAjaxRequests:function(){if(typeof routing!="undefined"&&typeof routing.ajaxRequests!="undefined"&&routing.ajaxRequests.length)for(var e in routing.ajaxRequests)routing.ajaxRequests[e].abort()},initTriggers:function(){routing.off("photo-player-init"),routing.on("photo-player-init",function(e,t,n,r){var i=new w({index:e,userId:n,_collection:t,array:r})}),routing.off("add-school-init"),routing.on("add-school-init",function(e,t,n){var r=new E({type:n})}),routing.off("location_popup_open"),routing.on("location_popup_open",function(e,t){var n='<div id="modalPopup" class="modal photo-frame-model hide fade model-popup-h"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div><div class="modal-body page-content-h"></div></div>';T(".model-popup-h").remove(),T("body").append(n);var r=new e(t);console.log(r),console.log(r.el),T(".modal-body").html(r.$el),T("#modalPopup").modal()}),routing.off("popup-close"),routing.on("popup-close",function(){T("#modalPopup").modal("hide"),T(".model-popup-h").remove()})},initialiRoutesInit:function(e){var t=this;routing.off("app-inited"),routing.on("app-inited",function(t){e(t)}),routing.off("add-game"),routing.on("add-game",function(e){var t=new m({id:e,popup:!0})})},defaultRoute:function(){this.initApp()},initApp:function(e){this.showHome(null)},getPhrases:function(){var e=new d;e.fetch()},showHome:function(e){function t(){var e=new u({route:"home"})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),t()},removeCurrent:function(){},showProfile:function(e){function n(n){t.currentController=new s({userId:typeof e!="undefined"?e:n})}var t=this;this.cancelAjaxRequests(),t.loadStyles(),T("body").empty(),r(),t.removeCurrent(),this.initialiRoutesInit(n)},notFound:function(e){alert("Page not found")},showTeam:function(e){function n(n){t.currentController=new l({route:"",teamId:e,userId:n})}var t=this;this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r();if(!e){this.notFound("team");return}t.removeCurrent(),this.initialiRoutesInit(n)},imageUpListeners:function(){function e(e,t){var n=new o({route:"",url:e,attr:t})}this.addImageTrigger(e)},addImageTrigger:function(e){routing.off("add-image"),routing.on("add-image",function(t,n){e(t,n)})},showProfileSetting:function(e){function t(t){self.currentController=new h({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},ShowUserResume:function(e){function t(t){self.currentController=new p({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},imageUp:function(){function e(e){var t=new o({route:"",url:this.posturl,attr:this.attribute})}this.cancelAjaxRequests(),this.loadStyles(),this.initialiRoutesInit(e)},videoPreview:function(){function e(e,t){var n=new a({url:e,attr:t})}this.cancelAjaxRequests(),this.loadStyles(),k("add-video").subscribe(e)},showGame:function(e){function t(t){self.currentController=new f({route:"",gameId:e,userId:t})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r();if(!e){this.notFound("team");return}this.removeCurrent(),this.initialiRoutesInit(t)},showRegistration:function(){function e(){self.currentController=new c({route:""})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.removeCurrent(),this.initialiRoutesInit(e)},showTag:function(e){function t(t){self.currentController=new v({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},showAddGame:function(e){function t(t){self.currentController=new m({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},showLogin:function(){T("body").empty(),r();var e=new g,t=new y({model:e})},showUsercreate:function(){function e(){var e=new b({route:""})}this.addUserTrigger(e)},addUserTrigger:function(e){routing.off("add-user"),routing.on("add-user",function(){e()})},showRegistration:function(){function e(){var e=new c({route:""})}this.cancelAjaxRequests(),this.loadStyles(),T("body").empty(),r(),this.initialiRoutesInit(e)},loadStyles:function(){k("load:css").publish([base_url+"css/bootstrap.css",base_url+"css/bootstrap-responsive.css",base_url+"css/app.css",base_url+"css/common.css",base_url+"css/jquery-ui-1.10.2.custom.css"])},addSubscribers:function(){k("load:css").subscribe(this.loadCss)},removeSubscribers:function(){k("load:css").unsubscribe(this.loadCss)},getStoredState:function(e,t){var n,r;return n=this.states.findByNameInStorage(e),N.isString(t)&&n&&n.data&&(r=n.data[t]),r||n},show:function(e){e=e||"body",T(e).removeClass("hide")},hide:function(e){e=e||"body",T(e).addClass("hide")},cssLoaded:[],loadCss:function(e){var n,r;if(!N.isArray(e))throw new Error("App method addCss expects an array");for(n=0;n<e.length;n++)r=e[n],N.isString(r)&&T.inArray(r,this.cssLoaded)<0&&(t.lib.loadCss(r),this.cssLoaded.push(r))}}),S});