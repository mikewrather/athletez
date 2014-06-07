// Site Views Data
// ----------

// Package Site
// Requires define
// Returns {SiteViewList} constructor

define(['facade', 'collections', 'site/models/view', 'utils'], 
function(facade, collections, SiteViewModel, utils) {

    var SiteViewList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SiteViewList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SiteViewModel,
        
        url: function() {
            if (testpath)
                return testpath + '/site/views/' + this.id;
            return '/api/site/views?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SiteViewModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SiteViewList;
});
