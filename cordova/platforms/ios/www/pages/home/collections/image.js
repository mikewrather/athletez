define(["facade","collections","pages/home/models/image","utils","media/collections/images"],function(e,t,n,r,i){var s,o=t.BaseCollection,u=e._,a=r.lib.Channel;return s=i.extend({model:n,initialize:function(e,t){debug.log("HomeImageList initialize..."),this.cid=this.cid||u.uniqueId("c"),this.deferred=new $.Deferred,this.num=t.num,u.bindAll(this)},fetchSuccess:function(e,t){var r=u.first(t.payload,e.num);e.reset();for(var i in r){var s=new n;s.id=Math.ceil(Math.random()*1e5),s.set("payload",r[i]),s.set("desc",t.desc),s.set("exec_data",t.exec_data),s.selected_image!=undefined&&(r[i].image_path=s.selected_image),e.push(s)}e.deferred.resolve(t)}}),s});