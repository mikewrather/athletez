define(["facade","models/base"],function(e,t){var n,r=e._;return n=t.extend({defaults:r.extend({},(new t).attributes,{payload:{id:0,name:null,location:null,picture:null,sport:null,complevel:null,season:null,year:null,mascot:null,unique_ident:null,statvals:[{statval:null,statdate:null,statteam:null,stat_context:null}]},desc:"Team information",exec_data:{exec_time:0,exec_error:!1}}),url:function(){return"/api/team/basics/"+this.id},parseAsRequired:function(e){return e}}),n});