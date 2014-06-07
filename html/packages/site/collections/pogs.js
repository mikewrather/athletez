// Site Pogs Data
// ----------

// Package Site
// Requires define
// Returns {SitePogList} constructor

define(['facade', 'collections', 'site/models/pog', 'utils'], 
function(facade, collections, SitePogModel, utils) {

    var SitePogList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SitePogList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SitePogModel,
        
        url: function() {
            if (testpath)
                return testpath + '/site/pogs/' + this.id;
            return '/api/site/pogs?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SitePogModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SitePogList;
});
