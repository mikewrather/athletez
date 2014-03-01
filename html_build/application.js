define(["facade","utils","collections","chrome","controller","profile","imageup","home","videopreview","game","team","registration","profilesetting","userresume","usercontrol/tag/tag","usercontrol/addgame/addgame","signup","login","usercontrol/photo-player/photo-player","usercontrol/add-club/add-club","utils/storage","usercontrol/location/views/view-location","signup/views/facebooksignup","usercontrol/addevent/addevent","chrome/views/header","browserpop/views/browser","usercontrol/landing/views/landing","pages/fbinvite","packages/common/views/popup"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T){var N,C=n.ApplicationStates,k=e.$,L=e._,A=e.Backbone,O=t.lib.Channel,M=require("pages/fbinvite"),_=require("browserpop/views/browser"),D=require("browserpop/views/browser"),P=require("usercontrol/landing/views/landing");return debug=t.debug,N=A.Router.extend({routes:{"":"defaultRoute",fbinvite:"fbinvite","!fbinvite":"fbinvite","fbinvite/":"fbinvite","!fbinvite/":"fbinvite","acceptfbinvite/:id":"aceptInvite","!acceptfbinvite/:id":"aceptInvite","acceptfbinvite/:id/":"aceptInvite","!acceptfbinvite/:id":"aceptInvite",profile:"showProfile","profile/":"showProfile",team:"showTeam","team/":"showTeam","team/:id":"showTeam","!team/:id":"showTeam",game:"showGame","game/":"showGame","game/:id":"showGame","!game/:id":"showGame",home:"showHome","home/":"showHome","!home/":"showHome","!home":"showHome","!home/search":"showHomePage","!home/search/":"showHomePage","!home/search/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","home/search":"showHomePage","home/search/":"showHomePage","home/search/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/":"showHomePage","home/search/:key/:value/:key/:value/:key/:value":"showHomePage","home/search/:key/:value":"showHomePage","home/search/:key/:value/:key/:value":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage","!home/search/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value/:key/:value":"showHomePage",":page/:id/:param/:id/":"showPage",":page/:id/:param/:id/:param/:id/":"showPage",":page/:id/:param/:id":"showPage",":page/:id/:param/:id/:param/:id":"showPage",":page/:param/:id/":"showOwnPage",":page/:param/:id/:param/:id/":"showOwnPage",":page/:param/:id":"showOwnPage",":page/:param/:id/:param/:id":"showOwnPage","profile/:userid":"showProfile","!profile/:userid":"showProfile","!profile/":"showProfile","!profile":"showProfile",usersettings:"showProfileSetting","usersettings/":"showProfileSetting","!usersettings":"showProfileSetting","!usersettings/":"showProfileSetting",resume:"ShowUserResume","resume/":"ShowUserResume","!registration":"showRegistration","registration/":"showRegistration","!registration/:action":"showRegistration","registration/:action":"showRegistration","user/login":"showLogin",addgame:"showAddGame",logout:"callLogout","*splat":"routeNotFound"},showHomePage:function(){var e=[],t=arguments.length;if(arguments&&t)for(var n=0;n<t;n++)n%2==0&&e.push({key:arguments[n],value:arguments[n+1]});this.showHome&&L.isFunction(this.showHome)&&this.showHome(undefined,e)},routeNotFound:function(){routing.navigate("home",{trigger:!0})},showPage:function(e,t,n,r,i,s){if(n=="media"||i=="media")this.mediaPopup=!0;e.indexOf("!")!="-1"&&(e=e.replace("!",""));var o="show"+e.charAt(0).toUpperCase()+e.slice(1),u=[];n&&u.push({key:n+"_id",value:r}),i&&u.push({key:i+"_id",value:s}),this[o]&&L.isFunction(this[o])&&this[o](t,u)},showOwnPage:function(e,t,n,r,i){if(t=="media"||r=="media")this.mediaPopup=!0;e.indexOf("!")!="-1"&&(e=e.replace("!",""));var s="show"+e.charAt(0).toUpperCase()+e.slice(1),o=[];t&&o.push({key:t+"_id",value:n}),r&&o.push({key:r+"_id",value:i}),this[s]&&L.isFunction(this[s])&&this[s](undefined,o)},initialize:function(e){L.bindAll(this),this.addSubscribers(),i.prototype.appStates=new C},detectBrowser:function(){var e=this,t=setInterval(function(){try{k.browser.android,clearInterval(t);var n=showMobileWindow=!1;if(k.browser.ipad||k.browser.iphone||k.browser.android)showMobileWindow=!0;!L.isUndefined(k.browser.msie)&&k.browser.msie&&parseInt(k.browser.version)<10&&(n=!0),!L.isUndefined(k.browser.version)&&k.browser.mozilla&&parseInt(k.browser.version)<25&&(n=!0),(n||showMobileWindow)&&e.showBrowserWindow()}catch(r){}},1e3)},showBrowserWindow:function(){var e=new _},showLandingInfo:function(){if(!routing.showLandingPage)return;var e=this;setTimeout(function(){if(!e.checkForUser())var t=new P},500)},aceptInvite:function(e){function n(n){k("body").addClass("fbaccept");var r="Athletez - We Are Athletes";setTimeout(function(){var t=new P({userId:e})},500),routing.showLandingPage=!1,!e&&k("div.register-wrapper-h").length==0&&k("body header").after('<div class="register-wrapper-h"></div>'),t.gaPageView("FB Accept - "+e,r),t.showHomePage(n)}var t=this;this.cancelAjaxRequests(),this.loadStyles(),r(),this.initialiRoutesInit(n)},getUserName:function(e){var t=new w("user","localStorage"),n;if(t.data)for(var r in t.data)if(r==e){n=t.data[r].user_name;break}return n?n:!1},intializeImageAndVideo:function(){this.imageUpListeners(),this.videoPreview(),this.showUsercreate(),this.showHomeRefresh(),this.showLogin(),this.triggerSignup()},cancelAjaxRequests:function(){if(typeof routing!="undefined"&&typeof routing.ajaxRequests!="undefined"&&routing.ajaxRequests.length)for(var e in routing.ajaxRequests)routing.ajaxRequests[e].abort()},initTriggers:function(){routing.off("photo-player-init"),routing.on("photo-player-init",function(e,t,n,r,i,s,o){var u=new y({index:e,userId:n,pageName:i,_collection:t,array:r,pageId:s,mediaId:o})}),routing.off("add-school-init"),routing.on("add-school-init",function(e,t,n,r,i,s){var o=new b({type:n,viewObj:r,callback:i,orgNameSoFar:s})});var e=undefined;routing.off("show_location"),routing.on("show_location",function(t,n,r,i){e=i;var s={latitude:t,longitude:n},o=new E(s);k(r).html(o.$el)}),routing.off("popup-close"),routing.on("popup-close",function(){k("#modalPopup").modal("hide"),k(".model-popup-h").remove(),e&&e()})},initialiRoutesInit:function(e,t){var n=this,r=function(){k(".modal:not(#Browser-detect)").remove(),routing.trigger("common-popup-close")};this.hideSignup(),k("body").removeClass("homePage"),routing.off("app-inited"),routing.on("app-inited",function(t){r(),e(t),n.mediaPopup||(n.showLandingInfo(),n.mediaPopup=!1)}),routing.off("fbInvite"),routing.on("fbInvite",function(e,t){console.log(t),n.showFBInviteOnPopup(e,t)}),routing.off("popup-close"),routing.on("popup-close",function(e){console.log(e),e?(k(e.currentTarget).modal("hide"),k(e.currentTarget).unbind().remove(),k(".modal-backdrop").unbind().fadeOut()):(k("#modalPopup").modal("hide"),k("#modalPopup").unbind().remove(),k(".modal-backdrop").unbind().fadeOut())}),routing.off("common-popup-open"),routing.on("common-popup-open",function(e){var t=require("packages/common/views/popup"),n=new t(e)}),k(document).off("hidden.bs.modal","#modalPopup, #photoPlayerModal"),k(document).on("hidden.bs.modal","#modalPopup, #photoPlayerModal",function(e){routing.trigger("popup-close",e)}),routing.off("add-game"),routing.on("add-game",function(e,t,n,r,i){var s=new v({teams_id:t,sports_id:n,user_id:r,id:e,popup:!0,callback:i})}),routing.off("add-event"),routing.on("add-event",function(e,t,n,r){var i=new x({sports_id:t,users_id:n,popup:!0,callback:r})}),routing.off("check-fb-login"),routing.on("check-fb-login",function(){fbregistration=new S,fbregistration.checkFbLogin("linkWithFB")}),routing.off("link-to-facebook"),routing.on("link-to-facebook",function(){ga("send","event","popup","open","FB Reg"),fbregistration=new S,fbregistration.signupFacebook("linkWithFB")}),this.detectBrowser()},checkForUser:function(){return!L.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},defaultRoute:function(){this.initApp()},initApp:function(e){ga("send","event","app","initialized","Browser Reload"),this.showHome(null)},getPhrases:function(){},showFbreg:function(){ga("send","event","popup","open","FB Reg"),fbregistration=new S,fbregistration.signupFacebook("linkWithFB")},gaPageView:function(e,t){ga("send","pageview",{page:e,title:t})},showHome:function(e,t){function i(e){k("body").addClass("homePage");var r="Athletez - We Are Athletes";n.currentController=new u({route:"",title:r,userId:e,params:t}),!e&&k("div.register-wrapper-h").length==0&&k("body header").after('</div><div class="register-wrapper-h"></div>'),n.gaPageView("Home Page",r)}var n=this;this.cancelAjaxRequests(),this.loadStyles(),r(),this.initialiRoutesInit(i)},showFBInviteOnPopup:function(e,t){var n="Athletez - We Are Athletes";self.currentController=new M({route:"",title:n,userId:e,options:t})},fbinvite:function(){function t(t){k("body").addClass("fbinvite");var n="Athletez - We Are Athletes";e.currentController=new M({route:"",title:n,userId:t}),!t&&k("div.register-wrapper-h").length==0&&k("body header").after('<div class="register-wrapper-h"></div>'),e.gaPageView("FB Invite",n)}var e=this;this.cancelAjaxRequests(),this.loadStyles(),r(),this.initialiRoutesInit(t)},removeCurrent:function(){this.currentController&&console.log(this.currentController.layout)},showProfileOurSport:function(e,t){this.showProfile(undefined,e,t)},showProfileOurSportAndPlayer:function(e,t,n,r){this.showProfile(undefined,e,t,n,r)},showUserProfileSport:function(e,t,n){this.showProfile(e,t,n)},showUserProfileSportAndMedia:function(e,t,n,r,i){this.showProfile(e,t,n,r,i)},showProfile:function(e,t){function i(r){O("refresh-profilepage").empty();var i=n.getUserName(r);n.currentController=new s({userId:typeof e!="undefined"?e:r,title:i,params:t}),n.gaPageView("Profile Page",i)}var n=this;this.cancelAjaxRequests(),n.loadStyles(),r(),this.initialiRoutesInit(i)},hideSignup:function(){k("div.register-wrapper-h").remove()},notFound:function(e){alert("Page not found")},showTeam:function(e,t){function i(r){n.currentController=new l({teamId:e,title:"Team Page",userId:r,params:t}),n.gaPageView("Team Page","NA")}var n=this;this.cancelAjaxRequests(),this.loadStyles(),r();if(!e){this.notFound("team");return}n.removeCurrent(),this.initialiRoutesInit(i)},imageUpListeners:function(){function e(e,t,n){var r=new o({route:"",url:e,attr:t,data:n})}this.addImageTrigger(e)},addImageTrigger:function(e){routing.off("add-image"),routing.on("add-image",function(t,n,r){this.checkForUser()?e(t,n,r):routing.trigger("showSignup",function(){e(t,n,r)})})},showProfileSetting:function(e){function n(n){self.currentController=new h({id:e==undefined?n:e,title:"Profile Settings"}),t.gaPageView("Profile Settings","NA")}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent();var t=this;this.initialiRoutesInit(n)},ShowUserResume:function(e){function n(n){t.currentController=new p({id:e==undefined?n:e}),t.gaPageView("User Resume Page","NA")}var t=this;this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(n)},imageUp:function(){function e(e){var t=new o({route:"",url:this.posturl,attr:this.attribute})}this.cancelAjaxRequests(),this.loadStyles(),this.initialiRoutesInit(e)},triggerSignup:function(){this.signup=new T,routing.off("showSignup"),routing.on("showSignup",function(e){this.signup.signupUser&&this.signup.signupUser(e)})},videoPreview:function(){function t(t,n){e.checkForUser()?new a({url:t,attr:n}):routing.trigger("showSignup",function(){new a({url:t,attr:n})})}this.cancelAjaxRequests(),this.loadStyles();var e=this;O("add-video").subscribe(t)},showGame:function(e,t){function i(r){self.currentController=new f({route:"",gameId:e,title:"Game Page",userId:r,params:t}),n.gaPageView("Game Page","NA")}this.cancelAjaxRequests(),this.loadStyles(),r();if(!e){this.notFound("team");return}this.removeCurrent();var n=this;this.initialiRoutesInit(i)},showRegistration:function(){ga("send","event","popup","Registration")},showTag:function(e){function t(t){self.currentController=new d({id:e==undefined?t:e})}this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},showAddGame:function(e){function t(t){self.currentController=new v({id:e==undefined?t:e})}ga("send","event","popup","Add Game","",e),this.cancelAjaxRequests(),this.loadStyles(),r(),this.removeCurrent(),this.initialiRoutesInit(t)},RefreshHome:function(){r()},showHomeRefresh:function(){this.addHomeTrigger(this.initApp)},addHomeTrigger:function(e){routing.off("reload-home"),routing.on("reload-home",function(){e()})},showLogin:function(){},showUsercreate:function(){function e(){}this.addUserTrigger(e)},addUserTrigger:function(e){routing.off("add-user"),routing.on("add-user",function(){e()})},loadStyles:function(){O("load:css").publish([base_url+"css/bootstrap.css",base_url+"css/bootstrap-responsive.css",base_url+"css/app.css",base_url+"css/common.css",base_url+"css/jquery-ui-1.10.2.custom.css",base_url+"css/form-fields.css"])},addSubscribers:function(){O("load:css").subscribe(this.loadCss)},removeSubscribers:function(){O("load:css").unsubscribe(this.loadCss)},callLogout:function(){ga("send","event","menu","Log Out","Action-Triggered",routing.userLoggedIn),this.logout=new g,routing.trigger("Logout")},getStoredState:function(e,t){var n,r;return n=this.states.findByNameInStorage(e),L.isString(t)&&n&&n.data&&(r=n.data[t]),r||n},show:function(e){e=e||"body",k(e).removeClass("hide")},hide:function(e){e=e||"body",k(e).addClass("hide")},cssLoaded:[],loadCss:function(e){var n,r;if(!L.isArray(e))throw new Error("App method addCss expects an array");for(n=0;n<e.length;n++)r=e[n],L.isString(r)&&k.inArray(r,this.cssLoaded)<0&&(t.lib.loadCss(r),this.cssLoaded.push(r))}}),N});