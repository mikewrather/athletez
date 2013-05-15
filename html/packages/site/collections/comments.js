// Site Comments Data
// ----------

// Package Site
// Requires define
// Returns {SiteCommentList} constructor

define(['facade', 'collections', 'site/models/comment', 'utils'], 
function(facade, collections, SiteCommentModel, utils) {

    var SiteCommentList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SiteCommentList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SiteCommentModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;
            for (var key in payload) {
                var item = new SiteCommentModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SiteCommentList;
});