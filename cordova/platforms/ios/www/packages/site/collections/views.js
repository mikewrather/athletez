define(["facade","collections","site/models/view","utils"],function(e,t,n,r){var s,o=t.BaseCollection,u=e._,a=r.lib.Channel;return s=o.extend({model:n,url:function(){return testpath?testpath+"/site/views/"+this.id:"/api/site/views?user_id="+this.id},fetchSuccess:function(e,t){e.reset();var r=t.payload;for(i=0;i<r.length;i++){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t)}}),s});