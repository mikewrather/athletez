// Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileOrgList} constructor

define(['facade', 'sportorg/collections/orgs', 'utils'], 
function(facade, SportorgOrgList, utils) {
	
    var ProfileOrgList;

    ProfileOrgList = SportorgOrgList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/orgs/' + this.id + '/' + this.sport_id;
            return '/api/user/orgs/' + this.id + '?sport_id=' + this.sport_id;
        }
        
        

    });

    return ProfileOrgList;
});
