define(["facade","collections","user/models/common","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel,i=s.extend({model:n,fetchSuccess:function(e,t){e.reset();var r=t.payload;for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t)}});return i});