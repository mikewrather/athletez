define(["facade","sportorg/models/team"],function(e,t){var n,r=e._,i=e.Backbone;return n=t.extend({parseAsRequired:function(e){var t=this,n={};if(e!=null&&e.payload!=null){var r=e.payload,i={id:null,fulladdress:""},s={id:null,sport_name:""};r&&r.org_sport_link_obj&&(r.org_sport_link_obj.org&&r.org_sport_link_obj.org.locations&&(i=r.org_sport_link_obj.org.locations),r.org_sport_link_obj.sport&&(s=r.org_sport_link_obj.sport)),console.log(r),n={team_id:r.id,team_name:r.team_name,location_id:i.id,location_name:i.full_address,sports_name:s.sport_name,sports_id:s.id,complevels_id:r.complevels_id,seasons_id:r.seasons_id,year:r.year,states_id:r.org_sport_link_obj.org.states_id,sports_club:r.org_sport_link_obj.org.sports_club,single_sport_id:r.org_sport_link_obj.org.single_sport_id}}return n}}),n});