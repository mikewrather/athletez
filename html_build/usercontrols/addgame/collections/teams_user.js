define(["facade","collections","sportorg/collections/games","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel;return i=n.extend({url:function(){return"/api/user/teams/"+this.user_id+"?sport_id="+this.sports_id},parseAsRequired:function(){var e=this,t=e.toJSON(),n=[];return t.length&&$.each(t,function(e,t){if(t!=null&&t.payload!=null){var r=t.payload,i={id:null,fulladdress:""};r&&r.org_sport_link_obj&&r.org_sport_link_obj.org&&r.org_sport_link_obj.org.locations&&(i=r.org_sport_link_obj.org.locations);var s={team_id:r.id,team_name:r.team_name,location_id:i.id,location_name:i.full_address};n.push(s)}}),n},AppendItem:function(e){var t=this,n=t.toJSON(),r={payload:e};return n.push(r),n}}),i});