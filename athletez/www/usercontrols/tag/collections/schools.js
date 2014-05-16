// Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {SchooList} constructor

define(['facade', 'utils','sportorg/collections/orgs','sportorg/models/org'], 
function(facade, utils, SportorgOrgList, SportorgSportModel) {

    var ProfileOrgList;

    ProfileOrgList = SportorgOrgList.extend({
        
        url: function() {
        	var self = this;
            if (testpath)
                return testpath + '/api/org/search/' + this.sport_id;
                
                /*self.sports_club is boolean bit ( 0 or 1 )
                 0 : Get Schools
                 1 : Get Clubs
                 */
            return '/api/org/search?states_id=' + self.states_id + '&org_name=' + self.org_name;
        },
        
        fetchSuccess : function(collection, response) {
			collection.reset();

			var payload = response.payload;
			for (var key in payload) {
				var item = new SportorgSportModel();
				item.id = Math.ceil(Math.random() * 100000);
				item.set('payload', payload[key]);
				item.set('desc', response.desc);
				item.set('exec_data', response.exec_data);
				collection.push(item);
			}

			collection.deferred.resolve(response);
		}
        
        

    });

    return ProfileOrgList;
});
