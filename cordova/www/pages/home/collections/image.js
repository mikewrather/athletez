define(["facade","collections","pages/home/models/image","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel;return i=s.extend({model:n,initialize:function(e,t){debug.log("HomeImageList initialize..."),this.cid=this.cid||o.uniqueId("c"),this.deferred=new $.Deferred,this.num=t.num,o.bindAll(this)},fetchSuccess:function(e,t){var r=o.first(t.payload,e.num);e.reset();for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),s.selected_image!=undefined&&(r[i].image_path=s.selected_image),e.push(s)}e.deferred.resolve(t)}}),i});