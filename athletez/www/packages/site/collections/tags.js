// Site Tags Data
// ----------

// Package Site
// Requires define
// Returns {SiteTagList} constructor

define(['facade', 'collections', 'site/models/tag', 'utils'], 
function(facade, collections, SiteTagModel, utils) {

    var SiteTagList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SiteTagList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SiteTagModel,
        
        url: function() {
            if (testpath)
                return testpath + '/site/tags/' + this.id;
            return base_url + '/api/site/tags?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SiteTagModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SiteTagList;
});
