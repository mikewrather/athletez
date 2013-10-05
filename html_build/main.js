require.config({baseUrl:"./",locale:"en-us",paths:{json2:"/vendor/json2",modernizr:"/vendor/modernizr-2.6.2.min",html5:"/vendor/html5",zepto:"/vendor/zepto",mustache:"/vendor/mustache",backbone:"/vendor/backbone",underscore:"/vendor/underscore",jquery:"/vendor/jquery-2.0.0.min",bootstrap:"/vendor/plugins/bootstrap","jquery.pstrength":"/vendor/plugins/jquery.pstrength-min.1.2",jqueryui:"/vendor/plugins/jquery-ui-1.10.2.custom.min",jquerytimepicker:"/vendor/plugins/jquery-date-time-picker-1.4","jquery.jrac":"/vendor/plugins/jquery.jrac","iframe-transport":"/vendor/plugins/jquery.iframe-transport",fileupload:"/vendor/plugins/jquery.fileupload","jquery.ui.widget":"/vendor/plugins/jquery.ui.widget","jquery.slimscroll":"/vendor/plugins/jquery.slimscroll.min",plupload:"/plupload/js/plupload.full",custom:"/vendor/custom",domready:"/vendor/plugins/domReady",text:"/vendor/plugins/text",touch:"/vendor/plugins/touch",rotate:"/vendor/plugins/jQueryRotate",async:"/vendor/plugins/async",vendor:"/vendor",facade:"/facade",utils:"/utils",syncs:"/syncs",models:"/models",views:"/views",collections:"/collections",controller:"/controller",packages:"/packages",user:"/packages/user",media:"/packages/media",site:"/packages/site",sportorg:"/packages/sportorg",location:"/packages/location",sport:"/packages/sport",votes:"/packages/vote",roster:"/packages/roster",pages:"/pages",chrome:"/pages/chrome",imageup:"/pages/imageup",videopreview:"/pages/videopreview",profile:"/pages/profile",game:"/pages/game",team:"/pages/team",registration:"/pages/registration",signup:"/pages/signup",login:"/pages/login",home:"/pages/home",profilesetting:"/pages/profilesetting",userresume:"/pages/userresume",usercontrol:"/usercontrols/",application:"/application"},shim:{underscore:{exports:"_"},backbone:{deps:["underscore","jquery","json2","html5","jqueryui","custom","jquerytimepicker"],exports:"Backbone"},bootstrap:{deps:["jquery"]},plupload:{deps:["jquery"]},jqueryui:{deps:["jquery"]},jquerytimepicker:{deps:["jquery","jqueryui"]}},priority:["text","modernizr","json2","vendor","utils","facade","syncs","models","views","collections","controller"],jquery:"1.9.0",waitSeconds:30}),define(["backbone","underscore","jquery","application"],function(e,t,n,r){n(function(){e.noConflict(),routing=new r,routing.ajaxRequests=[],routing.intializeImageAndVideo(),routing.initTriggers(),e.history.start({})})});