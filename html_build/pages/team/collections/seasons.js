define(["facade","sportorg/collections/seasons","utils"],function(e,t,n){var r,i=n.lib.Channel;return r=t.extend({url:function(){return testpath?testpath+"/org/seasons/"+this.id+"/"+this.sport_id+"/"+this.complevel_id:"/api/org/seasons/"+this.id+"?sports_id="+this.sport_id+"&complevels_id="+this.complevel_id}}),r});