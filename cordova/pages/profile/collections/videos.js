define(["facade","media/collections/videos","utils"],function(e,t,n){var r;return r=t.extend({url:function(){return testpath?testpath+"/user/videos/"+this.id+"/"+this.sport_id:"/api/user/videos/"+this.id+"?sport_id="+this.sport_id}}),r});