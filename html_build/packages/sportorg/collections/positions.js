define(["facade","collections","sportorg/models/position","utils"],function(e,t,n,r){var s,o=t.BaseCollection,u=e._,a=r.lib.Channel;return s=o.extend({model:n,fetchSuccess:function(e,t){e.reset();var r=t.payload;if(r!=null){for(i=0;i<r.length;i++){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t)}}}),s});