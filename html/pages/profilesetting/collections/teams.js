
 
// Orgs Data
// ----------

// Package Teams
// Requires define
// Returns {List} constructor

define(['facade', 'utils','sportorg/collections/teams','sportorg/models/team'], 
function(facade, utils, TeamsList, TeamModel) {

    var List;

    List = TeamsList.extend({
        
        url: function() {
        	var self = this;
            if (testpath)
                return testpath + ' /api/user/orgs/' + self.user_id + '?groupby=complevel ';
            return ' /api/user/orgs/' + self.user_id + '?groupby=complevel&sports_club=' + self.sports_club;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;            
            for (var key in payload) {
                var item = new TeamModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        },
        data : {
        	user_id : self.user_id,
        	sports_club : self.sports_club
        }
    });

    return List;
});
