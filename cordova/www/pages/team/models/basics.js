define(["facade","sportorg/models/team"],function(e,t){var n,r=e._;return n=t.extend({url:function(){return testpath?testpath+"/team/basics/"+this.id:"/api/team/basics/"+this.id}}),n});