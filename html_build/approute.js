define(["underscore","backbone","jquery"],function(e,t,n){return t.Router.extend({initialize:function(){alert("initiated")},routes:{"user/:query":"showLogin"},showLogin:function(){alert("victory")}})});