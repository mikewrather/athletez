define(["facade","models/base"],function(e,t){var n,r=e._;return n=t.extend({defaults:r.extend({},(new t).attributes,{payload:{image_id:0,image_path:null,image_title:null,num_votes:0},desc:"Image information",exec_data:{exec_time:0,exec_error:!1}})}),n});