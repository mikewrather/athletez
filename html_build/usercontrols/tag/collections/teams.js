define(["facade","collections","sportorg/collections/teams","utils"],function(e,t,n,r){var i,s=t.BaseCollection,o=e._,u=r.lib.Channel;return i=n.extend({url:function(){var e="";return this.team_name&&(e+="team_name="+this.team_name),this.team_name&&(e+="&searchtext="+this.team_name),this.states_id&&(e+="&states_id="+this.states_id),this.cities_id&&(e+="&cities_id="+this.cities_id),this.sports_id&&(e+="&sports_id="+this.sports_id),"/api/team/search?"+e}}),i});