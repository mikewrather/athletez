define(["facade","collections","sportorg/models/sport","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel;return i=s.extend({model:n,url:function(){return testpath?testpath+"/sport_search":(this.state_name==undefined,"/api/sport/search/?sport_name="+this.sport_name+"&gender="+this.gender)},fetchSuccess:function(e,t){e.reset();var r=t.payload;for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t),e.processResult(e)},processResult:function(e){},returnProcessedData:function(e){}}),i});