define(["facade","sportorg/models/position"],function(e,t){var n,r=e._;return n=t.extend({idAttribute:"position_id",url:function(){return this.orgs_id==undefined,this.type=="save"?"/api/user/position/"+this.user_id+"?time="+(new Date).getTime():(+(new Date).getTime(),this.type=="delete"?"/api/user/position/"+this.user_id+"?user_id="+this.user_id+"?time="+(new Date).getTime():"/api/user/position/"+this.user_id+"?time="+(new Date).getTime())}}),n});