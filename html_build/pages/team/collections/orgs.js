define(["facade","sportorg/collections/orgs","utils"],function(e,t,n){var r;return r=t.extend({url:function(){return testpath?testpath+"/team/games/"+this.id:"/api/team/games/"+this.id}}),r});