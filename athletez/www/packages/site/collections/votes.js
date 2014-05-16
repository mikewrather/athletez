// Site Votes Data
// ----------

// Package Site
// Requires define
// Returns {SiteVoteList} constructor

define(['facade', 'collections', 'site/models/vote', 'utils'], 
function(facade, collections, SiteVoteModel, utils) {

    var SiteVoteList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SiteVoteList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SiteVoteModel,
        
        url: function() {
            if (testpath)
                return testpath + '/site/votes/' + this.id;
            return base_url + '/api/site/votes?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SiteVoteModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SiteVoteList;
});
