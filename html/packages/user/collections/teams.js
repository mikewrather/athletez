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
            if (testpath)
                return testpath + '/user/teams/' + this.id + '/' + this.sport_id;
            return '/api/user/teams?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new UserTeamModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return UserTeamList;
});
