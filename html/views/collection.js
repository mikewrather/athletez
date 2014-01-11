// Collection View
// ---------------
// Manages rendering many views with a collection 
// See: <http://liquidmedia.ca/blog/2011/02/lib-js-part-3/>

// The CollectionView extends BaseView and is intended for rendering a collection.
// A item view is required for rendering withing each iteration over the models.

// Requires `define`
// Returns {CollectionView} constructor 
// - instances must have a collection property

define(['facade','views/base','utils'], function (facade, BaseView, utils) {

    var CollectionView,
        $ = facade.$,
        _ = facade._,
        Backbone = facade.Backbone,
        debug = utils.debug;

    // Constructor `{CollectionView}` extends the BaseView.prototype
    // object literal argument to extend is the prototype for the CollectionView Constructor
    CollectionView = BaseView.extend({
        // **Method:** `initialize`  
        // Param {Object} `options` must have a child view and tagname  
        // - options should have properties: `view`, `tagName` 
        initialize : function (options) {
            var collection, msg;

            if (!this.collection || !(this.collection instanceof Backbone.Collection)) {
                msg = "CollectionView initialize: no collection provided.";
                throw new Error(msg);
            }
            BaseView.prototype.initialize.call(this, options);
            this._view = this.options.view || this._view;
            if (!this._view) {
                throw new Error("CollectionView initialize: no view provided.");
            }
            this._tagName = this.options.tagName || this._tagName;
            if (!this._tagName) {
                throw new Error("CollectionView initialize: no tag name provided.");
            }
            
            this._className = this.options.className || this._className;
            this._decorator = this.options.decorator || this._decorator;
            this.mainView = options.mainView || this._mainView;
            
            console.error(this.mainView);
            
            this.FBoptions = this.FBoptions;
            this._id = this.options.id || this._id;
            this._temp = this.options._template || this._template;
            this.singleView = this.options.singleView || this.singleView;
            this.eventView = this.options.eventView || this.eventView;
            this._views = [];
            _(this).bindAll('add', 'remove', 'reset');
            this.setupCollection();
        },
        
        // **Method:** `setupCollection`  
        // bindings for adding and removing of models within the collection
        setupCollection: function () {
        	
            var _self = this, collection = this.options.collection || this.collection;
            collection.on('reset', this.reset);
	        collection.on('add', this.add);
            collection.on('remove', this.remove);
            if (!collection.length && !collection.request) {
                collection.request = collection.fetch();
                collection.request.done(function () {
            		_self.pageId = collection.id;
                    collection.each(collection.add);
                });
            } else {
            	_self.pageId = collection.id;
                collection.each(this.add);
            }
        },
        
        reset: function() {
        	this._views = [];
        },
        
        addRecords: function() {
        	 var collection =  this.collection;
        	 delete this._views;
        	 this._views = [];
        	//collection.request = collection.fetch();
            //collection.request.done(function () {
            	//console.log("-----------");
              collection.each(this.add);
            //});
        },

        // **Method:** `add`  
        // Param {Model} `model` object that extends Backbone.Model
        // Creates a new view for models added to the collection
        add : function(model) {
            var view;
            
            view = new this._view({
                "tagName": this._tagName,
                "model": model,
                "teamView": this.singleView,
                "eventView": this.eventView,
                "template": this._temp,
                "recordId": this.pageId,
                "className": this._className,
                "decorator": this._decorator,
                "FBoptions": this.FBoptions,
                "mainView": this.mainView
            });
            this._views.push(view);
            if (this._rendered) {
            	if(this.listView) {
            		if(this.prepend)
            			this.$el.find(this.listView).prepend(view.render().el);
            		else
	                	this.$el.find(this.listView).append(view.render().el);
                } else {
	                this.$el.append(view.render().el);
            	}
            } else {
	                this.$el.append(view.render().el);
            }
        },

        // **Method:** `remove`  
        // Param {Model} `model` object that extends Backbone.Model
        // removes view when model is removed from collection
        remove : function(model) {
            var viewToRemove;

            viewToRemove = _(this._views).select(function(cv) {
                return cv.model === model;
            })[0];
            this._views = _(this._views).without(viewToRemove);
            if (this._rendered) {
                viewToRemove.destroy(); // $(viewToRemove.el).off().remove();
            }
        },

        // **Method:** `render`  
        // Iterates over collection appending views to this.$el
        // When a {Function} decorator option is available manipulte views' this.$el
        render : function() {
            this.confirmElement.call(this);
            this._rendered = true;
            if(!this.listView)
 	           this.$el.empty();

            _(this._views).each(function(view) {
                if(this.listView)
                	if(this.prepend)
            			this.$el.find(this.listView).prepend(view.render().el);
            		else
	                	this.$el.find(this.listView).append(view.render().el);
                else
	                this.$el.append(view.render().el);
                if (view.options.decorator && _.isFunction(view.options.decorator)) {
                    view.options.decorator(view);
                }
            }, this);
            this.resolve.call(this);
            this.callbacks.fire.call(this);
            return this;
        }
    });

    return CollectionView;
});
