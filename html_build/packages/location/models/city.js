define(["models","facade"],function(e,t){var n,r=e.BaseModel,s=t.$,o=t._;return n=r.extend({defaults:{name:null},initialize:function(e,t){this.id=this.id||o.uniqueId("m"),this.addSubscribers(),o.bindAll(this)},search:function(e){this.request&&this.request.abort(),this.request=s.ajax({url:"/api/location/search/?search_text="+e}).done(function(t,n,r){var s=[],u=t.payload;if(u!=null)for(i=0;i<(u.length>10?10:u.length);i++){var a={};a.label=u[i].str,a.id=u[i].type=="states_id"?"":u[i].id;var f=o.isUndefined(u[i].obj.states_obj)?!o.isUndefined(u[i].obj.city)&&!o.isUndefined(u[i].obj.city.states_obj)?u[i].obj.city.states_obj:{}:u[i].obj.states_obj;a.state_id=u[i].type=="states_id"?u[i].id:f.id,a.country_id=o.isUndefined(f.country)?"":f.country.id,s.push(a)}Channel("response :"+e).publish(s)})},addSubscribers:function(){var e=this;Channel("changeInput"+this.id).subscribe(e.search)}}),n});