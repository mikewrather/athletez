// User Sports Data
// ----------

// Package User
// Requires define
// Returns {UserSportList} constructor

define(['facade', 'collections', 'user/models/sport', 'utils'], 
function(facade, collections, UserSportModel, utils) {

    var UserSportList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserSportList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserSportModel,
        
        url: function() {
            if (testpath)
                return testpath + '/user/sports/' + this.id;
            return '/api/user/sports?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userSport = new UserSportModel();
                userSport.set('payload', payload[i]);
                userSport.set('desc', response.desc);
                userSport.set('exec_data', response.exec_data);
                collection.push(userSport);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserSportList;
});
