// User Teams Data
// ----------

// Package User
// Requires define
// Returns {UserTeamList} constructor

define(['facade', 'collections', 'user/models/team', 'utils'], 
function(facade, collections, UserTeamModel, utils) {

    var UserTeamList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserTeamList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserTeamModel,
        
        url: function() {
            return '/api/user/teams/' + this.id + '/' + this.sport_id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userTeam = new UserTeamModel();
                userTeam.set('payload', payload[i]);
                userTeam.set('desc', response.desc);
                userTeam.set('exec_data', response.exec_data);
                collection.push(userTeam);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserTeamList;
});
