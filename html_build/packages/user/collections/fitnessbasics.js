define(["facade","collections","user/models/fitnessbasic","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel;return i=s.extend({model:n,fetchSuccess:function(e,t){e.reset();var r=t.payload;console.log("FITNESS BASICS:",r);for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),console.log(r[i]),console.log(r[i].data);var o=[];for(var u in r[i].data)console.log(r[i].data[u]),o.push(r[i].data[u]);o={data:o},console.log("GROUP:",o),s.set("payload",o),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t)}}),i});