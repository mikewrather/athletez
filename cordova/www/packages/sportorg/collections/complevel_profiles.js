define(["facade","collections","utils","sportorg/models/complevel_profile"],function(e,t,n,r){var i,s=t.BaseCollection;return i=s.extend({model:r,url:function(){return console.log("called",this.model),"/api/complevelprofile/search/"},fetchSuccess:function(e,t){console.log(this.model),e.reset();var n=t.payload;for(var r in n){var i=new this.model;i.id=Math.ceil(Math.random()*1e5),i.set("payload",n[r]),i.set("desc",t.desc),i.set("exec_data",t.exec_data),e.push(i)}e.deferred.resolve(t),e.processResult(e)},processResult:function(e){},returnProcessedData:function(e){},ParseForDropdown:function(){var e=this,t=e.toJSON(),n={};console.log(t),n=[];for(var r in t){var i=[];for(var s in t[r].payload.levels)i.push(t[r].payload.levels[s].name);n.push({payload:{id:t[r].payload.id,name:i.join(", ")}})}return console.log("data",n),n}}),i});