define(["facade","user/collections/relateds","utils"],function(e,t,n){var r;return r=t.extend({url:function(){return testpath?"/test/user/related/"+this.id+"/"+this.sport_id:"/api/user/related/"+this.id+"?sport_id="+this.sport_id}}),r});