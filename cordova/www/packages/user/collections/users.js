define(["facade","collections","user/models/common","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel,i=s.extend({model:n,url:function(){var e="";return this.user_name&&(e+="searchtext="+this.user_name),this.sports_id&&(e+="&sports_id="+this.sports_id),this.states_id&&(e+="&states_id="+this.states_id),this.cities_id&&(e+="&cities_id="+this.cities_id),this.team_id&&(e+="&team_id="+this.cities_id),"/api/user/search?"+e},fetchSuccess:function(e,t){e.reset();var r=t.payload;for(var i in r){var s=r[i];s.sports_id=i;var o=new n;o.id=Math.ceil(Math.random()*1e5),o.set("payload",s),o.set("desc",t.desc),o.set("exec_data",t.exec_data),e.push(o)}e.deferred.resolve(t)}});return i});