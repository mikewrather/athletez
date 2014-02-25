// Sportorg Orgs Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgOrgList} constructor

define(['facade', 'collections', 'sportorg/models/org', 'utils'], 
function(facade, collections, SportorgOrgModel, utils) {

    var SportorgOrgList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgOrgList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgOrgModel,

	    url: function() {
		    var self = this;

		    /*self.sports_club is boolean bit ( 0 or 1 )
		     0 : Get Schools
		     1 : Get Clubs
		     */
		    var url = '/api/org/search?' +
			    'sports_club=' + encodeURIComponent(self.sports_club) +
			    '&states_id=' + encodeURIComponent(self.states_id) +
			    '&org_name=' + encodeURIComponent(self.org_name);

		    if(self.single_sport_id)
		        url += "&single_sport_id=" + self.single_sport_id;

		    return url;

	    },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            
            var payload = response.payload;            
            for (var key in payload) {
               var item = new SportorgOrgModel();
                item.id = Math.ceil(Math.random() * 100000);
                var subpayload = payload[key];
                var teamsObj = subpayload['teams'];
                var teams = [];
                for (var teamKey in teamsObj) {
                    var team = teamsObj[teamKey];
                    /*var schedulesObj = team['schedule'];
                    var schedules = [];
                    for (var scheduleKey in schedulesObj) {
                        var schedule = schedulesObj[scheduleKey];
                        schedules.push(schedule);
                    }
                    team['schedule'] = schedules;*/
                    teams.push(team);
                }
                subpayload['teams'] = teams;
               item.set('payload', payload[key]);
               item.set('desc', response.desc);
               item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            
            collection.deferred.resolve(response);            
        },
        isError : function(){
            //TODO: retun true in case of any error
        return false;   
        }

    });

    return SportorgOrgList;
});
