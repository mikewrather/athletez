// Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {SchooList} constructor

define(['facade', 'utils','sportorg/collections/orgs','sportorg/models/org'], 
function(facade, utils, SportorgOrgList, SportorgSportModel) {

    var ProfileOrgList;

    ProfileOrgList = SportorgOrgList.extend({
        

        
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
