define(["models","facade"],function(e,t){var n,r=e.BaseModel,i=t.$,s=t._;return n=r.extend({url:function(){return base_url+"api/ent/follow/"+this.entity_id+"/"+this.subject_id}}),n});