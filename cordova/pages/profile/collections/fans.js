define(["facade","media/collections/images","utils"],function(e,t,n){var r;return r=t.extend({url:function(){return testpath?testpath+"/user/followers/"+this.id+"/"+this.sport_id:"/api/user/followers/"+this.id+"?sport_id="+this.sport_id}}),r});