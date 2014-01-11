({appDir:"./",baseUrl:"./",dir:"../html_build",optimize:"uglify",paths:{jquery:"vendor/jquery.1.10.2.min",json2:"vendor/json2",modernizr:"vendor/modernizr-2.6.2.min",mustache:"vendor/mustache",backbone:"vendor/backbone",underscore:"vendor/underscore",html5:"vendor/html5",zepto:"vendor/zepto",bootstrap:"vendor/plugins/bootstrap","jquery.pstrength":"vendor/plugins/jquery.pstrength-min.1.2",jqueryui:"vendor/plugins/jquery-ui-1.10.2.custom.min",jquerytimepicker:"vendor/plugins/jquery-date-time-picker-1.4","jquery.jrac":"vendor/plugins/jquery.jrac","iframe-transport":"vendor/plugins/jquery.iframe-transport",fileupload:"vendor/plugins/jquery.fileupload",browser:"vendor/jquery.browser","jquery.ui.widget":"vendor/plugins/jquery.ui.widget","jquery.slimscroll":"vendor/plugins/jquery.slimscroll.min","jquery.slimscroll.hor":"vendor/plugins/jquery.slimscroll.hor",plupload:"plupload/js/plupload.full",jwplayer:"vendor/plugins/jwplayer",custom:"vendor/custom",domready:"vendor/plugins/domReady",text:"vendor/plugins/text",touch:"vendor/plugins/touch",rotate:"vendor/plugins/jQueryRotate",async:"vendor/plugins/async",vendor:"vendor",facade:"facade",utils:"utils",syncs:"syncs",models:"models",views:"views",collections:"collections",controller:"controller",packages:"packages",common:"packages/common",user:"packages/user",media:"packages/media",site:"packages/site",sportorg:"packages/sportorg",location:"packages/location",sport:"packages/sport",votes:"packages/vote",roster:"packages/roster",schedules:"packages/game-schedules",pages:"pages",chrome:"pages/chrome",imageup:"pages/imageup",videopreview:"pages/videopreview",profile:"pages/profile",fbAccept:"/pages/fbaccept",game:"pages/game",fbinvite:"pages/fbinvite",team:"pages/team",registration:"pages/registration",signup:"pages/signup",login:"pages/login",home:"pages/home",profilesetting:"pages/profilesetting",userresume:"pages/userresume",usercontrol:"usercontrols/",browserpop:"usercontrols/detection",application:"application"},shim:{facade:{deps:["jquery"]},jqueryui:{deps:["jquery"]},browser:{deps:["jquery"]},underscore:{exports:"_",deps:["jquery"]},backbone:{deps:["underscore","jquery","json2","html5","jqueryui","custom","jquerytimepicker","browser"],exports:"Backbone"},browserpop:{deps:["jqueryui"]},"jquery.slimscroll":{deps:["jquery","jqueryui"]},bootstrap:{deps:["jquery","jqueryui"]},plupload:{deps:["jquery"]},jwplayer:{deps:["jquery"]},jquerytimepicker:{deps:["jquery","jqueryui"]}},priority:["jquery","text","modernizr","json2","vendor","utils","facade","syncs","models","views","collections","controller"],jquery:"1.10.2",modules:[{name:"utils",exclude:["jquery","vendor","facade"]},{name:"syncs",exclude:["jquery","vendor","facade","utils"]},{name:"models",exclude:["jquery","vendor","facade","utils","syncs"]},{name:"views",exclude:["jquery","vendor","facade","utils","syncs","models"]},{name:"collections",exclude:["jquery","vendor","facade","utils","syncs","models","views"]},{name:"chrome",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"imageup",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"videopreview",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"profile",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"game",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"team",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"registration",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"signup",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"home",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"profilesetting",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"userresume",exclude:["vendor","facade","utils","syncs","models","views","collections"]},{name:"login",exclude:["vendor","facade","utils","syncs","models","views","collections"]}]});