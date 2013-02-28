// Todos List
// ----------

// Package Todos
// Requires define
// Returns {TodosList} constructor

define(['facade', 'collections', 'todos/models/item', 'utils'], function(facade, collections, TodoModel, utils) {

    var TodosList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    TodosList = BaseCollection.extend({

        // Reference to this collection's model.
        model: TodoModel,

        // Filter down the list of all todo items that are finished.
        done: function() {
            return this.filter(function(todo){ return todo.get('done'); });
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
        comparator: function(todo) {
            return todo.get('order');
        },

        clearCompleted: function() {
            var completed = this.done();
            if (completed && completed.length) {
                _.each(completed, function(todo){
                    todo.clear(); 
                });
                this.remove(completed);
                this.trigger('clearCompleted', completed);
            }
        },

        toggleAllComplete: function(done) {
            this.each(function (todo) { 
                todo.set({'done': done});
                todo.save(); 
            });
            this.trigger('toggleAllComplete', this);
        },

        fetch: function() {
            var collection = this;

            function callback (data) {
                collection.reset(data);
                collection.deferred.resolve();
            }
            Channel('todos:fetch').publish(callback);
            return this.request = this.deferred.promise(); // yes, assignment
        }

    });

    return TodosList;
});
