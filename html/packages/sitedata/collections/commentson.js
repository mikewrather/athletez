// Sitedata CommentsOn Data
// ----------

// Package Sitedata
// Requires define
// Returns {SitedataCommentsOnList} constructor

define(['facade', 'collections', 'sitedata/models/commenton', 'utils'], 
function(facade, collections, SitedataCommentOnModel, utils) {

    var SitedataCommentOnList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SitedataCommentOnList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SitedataCommentOnModel,
        
        url: function() {
            if (testpath)
                return testpath + '/sitedata/commentson/' + this.id;
            return base_url + '/api/sitedata/commentson?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SitedataCommentOnModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SitedataCommentOnList;
});
