// User Fitness Basics Data
// ----------

// Package User
// Requires define
// Returns {UserFitnessBasicList} constructor

define(['facade', 'collections', 'user/models/fitnessbasic', 'utils'], 
function(facade, collections, UserFitnessBasicModel, utils) {

    var UserFitnessBasicList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserFitnessBasicList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserFitnessBasicModel,
        
        url: function() {
            if (testpath)
                return '/test/user/fitnessbasics/' + this.id;            
            return '/api/user/fitnessbasics?user_id=' + this.id;                        
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userFitnessBasic = new UserFitnessBasicModel();
                userFitnessBasic.set('payload', payload[i]);
                userFitnessBasic.set('desc', response.desc);
                userFitnessBasic.set('exec_data', response.exec_data);
                collection.push(userFitnessBasic);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserFitnessBasicList;
});
