
 
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
            return ' /api/user/orgs/' + self.user_id + '?groupby=complevel ';
        }
    });

    return List;
});
