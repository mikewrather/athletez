define(["facade","models/base"],function(e,t){var n,r=e._;return n=t.extend({defaults:r.extend({},(new t).attributes,{payload:{id:0,subject:null,enttype:null,voter:null,voter_picture:null},desc:"Vote information",exec_data:{exec_time:0,exec_error:!1}})}),n});