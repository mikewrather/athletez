define(["facade","utils","sportorg/collections/orgs","sportorg/models/org"],function(e,t,n,r){var i;return i=n.extend({url:function(){var e=this;return testpath?testpath+"/api/org/search/"+this.sport_id:"/api/org/search?states_id="+e.states_id+"&org_name="+e.org_name},fetchSuccess:function(e,t){e.reset();var n=t.payload;for(var i in n){var s=new r;s.id=Math.ceil(Math.random()*1e5),s.set("payload",n[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t)}}),i});