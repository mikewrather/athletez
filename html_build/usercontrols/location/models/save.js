define(["facade","models/base"],function(e,t){var n=e._;return t.extend({url:function(){return testpath?testpath+"/game/basics/"+this.id:"/api/game/basics/"+this.id}})});