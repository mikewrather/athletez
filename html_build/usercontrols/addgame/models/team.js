define(["facade","sportorg/models/team"],function(e,t){var n,r=e._;return n=t.extend({parseAsRequired:function(e){var t=this,n={};if(e!=null&&e.payload!=null){var r=e.payload,i={id:null,fulladdress:""};r&&r.org_sport_link_obj&&r.org_sport_link_obj.org&&r.org_sport_link_obj.org.locations&&(i=r.org_sport_link_obj.org.locations),n={team_id:r.id,team_name:r.team_name,location_id:i.id,location_name:i.full_address}}return n}}),n});