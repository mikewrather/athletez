define(["facade","collections","site/models/phrase","utils","controller"],function(e,t,n,r,i){var s,o=t.BaseCollection,u=t.ApplicationStates;return _=e._,Channel=r.lib.Channel,s=o.extend({model:n,url:function(){return base_url+"api/phrase/listall"},saveToLocalStorage:function(e){var t=i.prototype.appStates;t&&(t.add({name:"phrases",data:this.toJSON(),storage:"localStorage",expires:new Date(Date.now()+3154e5)}),t.save("phrases"))},fetchSuccess:function(e,t){e.reset();var r=t.payload;for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),e.push(s)}e.deferred.resolve(t),e.saveToLocalStorage(e)}}),s});