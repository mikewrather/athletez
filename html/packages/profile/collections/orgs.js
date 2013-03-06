// Profile Orgs Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileOrgList} constructor

define(['facade', 'collections', 'profile/models/org', 'utils'], 
function(facade, collections, ProfileOrgModel, utils) {

    var ProfileOrgList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileOrgList = BaseCollection.extend({

        // Reference to this collection's model.
        model: ProfileOrgModel,

        // Filter down the list of all org items that are finished.
        done: function() {
            return this.filter(function(org){ return org.get('done'); });
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.done());
        },

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function() {
            if (!this.models.length) return 1;
            return this.last().get('order') + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: function(org) {
            return org.get('order');
        },

        clearCompleted: function() {
            var completed = this.done();
            if (completed && completed.length) {
                _.each(completed, function(org){
                    org.clear(); 
                });
                this.remove(completed);
                this.trigger('clearCompleted', completed);
            }
        },

        toggleAllComplete: function(done) {
            this.each(function (org) { 
                org.set({'done': done});
                org.save(); 
            });
            this.trigger('toggleAllComplete', this);
        },

        fetch: function() {
            var collection = this;

            function callback (data) {
                collection.reset(data);
                collection.deferred.resolve();
            }
            Channel('orgs:fetch').publish(callback);
            return this.request = this.deferred.promise(); // yes, assignment
        }

    });

    return ProfileOrgList;
});
