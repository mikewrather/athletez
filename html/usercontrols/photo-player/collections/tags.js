// CommentsOn Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentOnList} constructor

define(['facade', 'collections', 'utils', 'usercontrol/photo-player/models/tags'], 
function(facade, collections, utils, model) {

    var TagsList, BaseCollection = collections.BaseCollection;

    TagsList = BaseCollection.extend({
        model: model,
        url: function() {
            if (testpath)
                return testpath + '/media/tags/' + this.id;
            return '/api/media/tags/'+this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;
            for (var key in payload) {
                var item = new model();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return TagsList;
});
