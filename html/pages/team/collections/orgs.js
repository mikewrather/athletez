// Orgs Data
// ----------

// Package Team
// Requires define
// Returns {TeamOrgList} constructor

define(['facade', 'sportorg/collections/orgs', 'utils'], 
function(facade, SportorgOrgList, utils) {
	
    var TeamOrgList;

    TeamOrgList = SportorgOrgList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/org/team/' + this.id + '/' + this.sport_id;
            return '/api/org/teams/'+ this.id +'?id1=' + this.id + '&sport_id=' + this.sport_id;
        }
        
        

    });

   return TeamOrgList;
});
