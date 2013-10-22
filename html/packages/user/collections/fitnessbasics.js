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
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;            

	       // console.log("FITNESS BASICS:",payload);
	        for (var key in payload) {
                var item = new UserFitnessBasicModel();
                item.id = Math.ceil(Math.random() * 100000);

		        //console.log(payload[key]);
		        //console.log(payload[key].data);

		        var group = [];
		        for(var key2 in payload[key].data)
		        {
			     //   console.log(payload[key].data[key2]);
			        group.push(payload[key].data[key2]);
		        }
		        group = {'data':group};
		        //console.log("GROUP:",group);
                item.set('payload', group);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return UserFitnessBasicList;
});
