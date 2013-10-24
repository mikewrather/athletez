define(["facade","utils","collections","chrome","controller","profile","imageup","home","videopreview","game","team","registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","signup","login","usercontrols/photo-player/photo-player","usercontrols/add-club/add-club","utils/storage","usercontrols/location/views/view-location","signup/views/facebooksignup","usercontrols/addevent/addevent","chrome/views/header"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N){var C,k=n.ApplicationStates,L=e.$,A=e._,O=e.Backbone,M=t.lib.Channel,_=t.debug;return C=O.Router.extend({routes:{"":"defaultRoute",home:"showHome","home/":"showHome","home/:action":"initApp",profile:"showProfile","profile/":"showProfile","profile/:userid":"showProfile",usersettings:"showProfileSetting","usersettings/":"showProfileSetting",resume:"ShowUserResume","resume/":"ShowUserResume",game:"showGame","game/":"showGame","game/:id":"showGame",team:"showTeam","team/":"showTeam","team/:id":"showTeam",registration:"showRegistration","registration/":"showRegistration","registration/:action":"showRegistration",tag:"showTag","user/login":"showLogin",addgame:"showAddGame",fbconnect:"showFbreg",logout:"callLogout"},initialize:function(e){A.bindAll(this),this.addSubscribers(),i.prototype.appStates=new k,this.getPhrases()},getUserName:function(e){var t=new E("user","localStorage"),n;if(t.data)for(var r in t.data)if(r==e){n=t.data[r].user_name;break}return n?n:!1},intializeImageAndVideo:function(){this.imageUpListeners(),this.videoPreview(),this.showUsercreate(),this.showHomeRefresh(),this.showLogin(),this.triggerSignup()},cancelAjaxRequests:function(){if(typeof routing!="undefined"&&typeof routing.ajaxRequests!="undefined"&&routing.ajaxRequests.length)for(var e in routing.ajaxRequests)routing.ajaxRequests[e].abort()},initTriggers:function(){routing.off("photo-player-init"),routing.on("photo-player-init",function(e,t,n,r){var i=new b({index:e,userId:n,_collection:t,array:r})}),routing.off("add-school-init"),routing.on("add-school-init",function(e,t,n,r){var i=new w({type:n,callback:r})});var e=undefined;routing.off("show_location"),routing.on("show_location",function(t,n,r,i){e=i;var s={latitude:t,longitude:n},o=new S(s);L(r).html(o.$el)}),routing.off("popup-close"),routing.on("popup-close",function(){L("#modalPopup").modal("hide"),L(".model-popup-h").remove(),e&&e()})},initialiRoutesInit:function(e,t){var n=this,r=function(){L("#modalPopup, .modal-backdrop").unbind().remove()};this.hideSignup(),L("body").removeClass("homePage"),routing.off("app-inited"),routing.on("app-inited",function(t){r(),e(t)}),routing.off("popup-close"),routing.on("popup-close",function(e){e?(L(e.currentTarget).modal("hide"),L(e.currentTarget).unbind().remove()):(L("#modalPopup").modal("hide"),L("#modalPopup").unbind().remove())}),L(document).off("hidden.bs.modal","#modalPopup, #photoPlayerModal"),L(document).on("hidden.bs.modal","#modalPopup, #photoPlayerModal",function(e){routing.trigger("popup-close",e)}),routing.off("add-game"),routing.on("add-game",function(e,t,n,r,i){var s=new m({teams_id:t,sports_id:n,users_id:r,id:e,popup:!0,callback:i})}),routing.off("add-event"),routing.on("add-event",function(e,t,n,r){var i=new T({sports_id:t,users_id:n,popup:!0,callback:r})})},checkForUser:function(){return!A.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},defaultRoute:function(){this.initApp()},initApp:function(e){this.showHome(null)},getPhrases:function(){var e=new d;e.fetch()},showFbreg:function(){fbregistration=new x,fbregistration.signupFacebook()},gaPageView:function(e,t){ga("send","pageview",{page:e,title:t})},showHome:function(e){function n(e){L("body").addClass("homePage");var n="Athletez - We Are Athletez";t.currentController=new u({route:"",title:n,userId:e}),!e&&L("div.register-wrapper").length==0&&L("body header").after('<div class="register-wrapper"></div><div class="register-wrapper-h"></div>'),t.gaPageView("Home Page",n)}var t=this;this.cancelAjaxRequests(),this.loadStyles(),r(),this.initialiRoutesInit(n)},removeCurrent:function(){this.currentController&&console.log(this.currentController.layout)},showProfile:function(e){function n(n){M("refresh-profilepage").empty();var r=t.getUserName(n);t.currentController=new s({userId:typeof e!="undefined"?e:n,title:r}),t.gaPageView("Profile Page",r)}var t=this;this.cancelAjaxRequests(),t.loadStyles(),r(),this.initialiRoutesInit(n)},hideSignup:function(){L("div.register-wrapper").remove(),L("div.register-wrapper-h").remove()},notFound:function(e){alert("Page not found")},showTeam:function(e){function n(n){t.currentController=new l({teamId:e,title:"Team Page",userId:n}),t.gaPageView("Team Page","NA")}var t=this;this.cancelAjaxRequests(),this.loadStyles(),r();if(!e){this.notFound("team");return}t.removeCurrent(),this.initialiRoutesInit(n)},imageUpListeners:function(){function e(e,t,n){var r=new o({route:"",url:e,attr:t,data:n})}this.addImageTrigger(e)},addImageTrigger:function(e){routing.off("add-image"),routing.on("add-image",function(t,n,r){console.log(t,n,r);if(!this.checkForUser()){routing.trigger("showSignup");return}e(t,n,r)})},showProfileSetting:function(e){function n(n){self.currentController=new h({id:e==undefined?n:e,title:"Profile Settings"}),t.gaPageView("Profile Settings","NA")}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent();var t=this;this.initialiRoutesInit(n)},ShowUserResume:function(e){function t(t){self.currentController=new p({id:e==undefined?t:e}),self.gaPageView("User Resume Page","NA")}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},imageUp:function(){function e(e){var t=new o({route:"",url:this.posturl,attr:this.attribute})}this.cancelAjaxRequests(),this.loadStyles(),this.initialiRoutesInit(e)},triggerSignup:function(){this.signup=new N,routing.off("showSignup"),routing.on("showSignup",function(){try{this.signup.signupUser()}catch(e){try{console.log(e)}catch(e){console={},console.log=function(e){}}}})},videoPreview:function(){function t(t,n){if(!e.checkForUser()){routing.trigger("showSignup");return}var r=new a({url:t,attr:n})}this.cancelAjaxRequests(),this.loadStyles();var e=this;M("add-video").subscribe(t)},showGame:function(e){function n(n){self.currentController=new f({route:"",gameId:e,title:"Game Page",userId:n}),t.gaPageView("Game Page","NA")}this.cancelAjaxRequests(),this.loadStyles(),r();if(!e){this.notFound("team");return}this.removeCurrent();var t=this;this.initialiRoutesInit(n)},showRegistration:function(){function e(){self.currentController=new c({route:"",title:"Register"}),self.gaPageView("Registration Page","NA")}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(e)},showTag:function(e){function t(t){self.currentController=new v({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},showAddGame:function(e){function t(t){self.currentController=new m({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},RefreshHome:function(){r()},showHomeRefresh:function(){this.addHomeTrigger(this.initApp)},addHomeTrigger:function(e){routing.off("reload-home"),routing.on("reload-home",function(){e()})},showLogin:function(){},showUsercreate:function(){function e(){var e=new g({route:""})}this.addUserTrigger(e)},addUserTrigger:function(e){routing.off("add-user"),routing.on("add-user",function(){e()})},showRegistration:function(){function e(){var e=new c({route:"",title:"Register"})}this.cancelAjaxRequests(),this.loadStyles(),r(),this.initialiRoutesInit(e)},loadStyles:function(){M("load:css").publish([base_url+"css/bootstrap.css",base_url+"css/bootstrap-responsive.css",base_url+"css/app.css",base_url+"css/common.css",base_url+"css/jquery-ui-1.10.2.custom.css"])},addSubscribers:function(){M("load:css").subscribe(this.loadCss)},removeSubscribers:function(){M("load:css").unsubscribe(this.loadCss)},callLogout:function(){this.logout=new y,routing.trigger("Logout")},getStoredState:function(e,t){var n,r;return n=this.states.findByNameInStorage(e),A.isString(t)&&n&&n.data&&(r=n.data[t]),r||n},show:function(e){e=e||"body",L(e).removeClass("hide")},hide:function(e){e=e||"body",L(e).addClass("hide")},cssLoaded:[],loadCss:function(e){var n,r;if(!A.isArray(e))throw new Error("App method addCss expects an array");for(n=0;n<e.length;n++)r=e[n],A.isString(r)&&L.inArray(r,this.cssLoaded)<0&&(t.lib.loadCss(r),this.cssLoaded.push(r))}}),C});