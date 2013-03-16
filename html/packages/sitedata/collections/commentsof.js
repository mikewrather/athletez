// SiteData CommentsOf Data
// ----------

// Package SiteData
// Requires define
// Returns {SitedataCommentsOfList} constructor

define(['facade', 'collections', 'sitedata/models/commentof', 'utils'], 
function(facade, collections, SitedataCommentOfModel, utils) {

    var SitedataCommentOfList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SitedataCommentOfList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SitedataCommentOfModel,
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentsof/' + this.id;
            return base_url + '/api/user/commentsof?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SitedataCommentOfModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SitedataCommentOfList;
});
