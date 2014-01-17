// Base View
// ---------
// A view object to construct a standard view with common properties and utilties
// The base view extends Backbone.View adding methods for resolving deferreds,
// rendering, decorating data just in time for rendering, adding child views to
// form a composite of views under one view object, add a destroy method.

// Example use for a composite view utilizing addChildView, setOptions & callbacks:
//
//     MyCompositeViewConstructor = BaseView.extend({
//
//         template: myHTMLTemplate,
//
//         initialize: function (options) {
//             _.bindAll(this);
//             this.setOptions();
//             BaseView.prototype.initialize.call(this, options);
//         },
//
//         dataDecorator: function (data) {
//             data.myExtraProperty = 'stuff I added just in time to render';
//             return data;
//         },
//
//         setOptions: function () {
//             var msg;
//             if (!this.options || !this.options.childView) {
//                 msg = "MyCompositeViewConstructor requires a options.childView object";
//                 throw new Error(msg);
//             }
//             this.addChildView();
//         },
//
//         addChildView: function () {
//             var childView = this.options.childView, renderChildView;
//
//             renderChildView = BaseView.prototype.addChildView(childView);
//             this.callbacks.add(renderChildView);
//         }
//     });

// Requires `define`
// Return `{BaseView}` constructor

define(['facade', 'utils'], function(facade, utils) {

	var BaseView, Backbone = facade.Backbone, $ = facade.$, _ = facade._, _toHTML = facade.toHTML, Deferred = facade.Deferred, Callbacks = facade.Callbacks, lib = utils.lib, debug = utils.debug;

	// Constructor `{BaseView}` extends Backbone.Model.prototype
	// object literal argument to extend is the prototype for the BaseView constructor
	BaseView = Backbone.View.extend({

		// **Method:** `initialize`
		// Param {Object} `options`
		initialize : function(options) {
			//console.log("base.js initialize");
			if (options) {
				this.setOptions(options);
			}
			this.deferred = new Deferred();
			this.callbacks = Callbacks('unique');
		},

		// **Method:** `setOptions`
		// Param {Object} `options`
		// handle options passed to initialize, e.g. required properties/errors
		setOptions : function(options) {
			if (options.destination) {
				this.destination = options.destination;
			}
			if (options.template) {
				this.template = options.template;
			}
		},

		// **Method:** `render`
		// Standarization of the task to render a view using a model & template
		// Options available:
		// - Method to add the resulting markiup to the dom
		// - Callback to mutate the model's data after model.toJSON() called
		//   - Merging data to template happens after dataDecorator is applied
		// - Callbacks object can be filled with ancillerary work following render
		//   - E.g. callbacks list can trigger rendering of child views
		// Param {String} `domInsertion` - gives option for adding result to dom
		// Param {Function} `dataDecorator` - accepts arg for {Object} `data`
		// Returns the same (mutated) {Object} `data`
		render : function(domInsertion, dataDecorator, partials) {
			//console.log("base render");
			var markup;

			if (_.isFunction(this.confirmElement)) {
				this.confirmElement();
			}
			dataDecorator = dataDecorator || this.dataDecorator;
			markup = this.toHTML(dataDecorator, partials);
			domInsertion = this.domInsertionMethod(domInsertion);
			this.$el[domInsertion](markup);
			this.resolve();
			this.callbacks.fire(this.$el);

			return this;
		},

		// adjust font and line height dynamically
		adJustFontDynamically : function(that, fontSize, lineHeight) {
			if (that) {
				var $that = $(that), defaultLineHeight = lineHeight || 20, defaultFont = fontSize || 1, l = parseInt($that.text().length) - 2, font = (l > 69) ? (defaultFont - (.1 * parseInt((l - 69) / 10))) : defaultFont, lineHeight = (l > 69) ? (defaultLineHeight - parseInt((l - 69) / 10)) : defaultLineHeight;
				$that.css({
					"font-size" : font + "em",
					"line-height" : lineHeight + "px"
				});
			}
		},

		// **Method:** `resolve`
		// Resolve the view's deferred object after all callbacks are fired once.
		resolve : function() {
			var view = this;
			//console.log("base.js resolve");
			if (view.deferred.state() !== 'resolved') {
				this.callbacks.add(view.deferred.resolve);
			} else {
				if (this.callbacks.has(view.deferred.resolve)) {
					this.callbacks.remove(view.deferred.resolve);
				}
			}
		},

		// **Method:** `confirmElement`
		// A view needs an `el` property and `$el` too; a helper to check that this.el is OK.
		confirmElement : function() {
			if (_.isUndefined(this.el)) {
				this.$el = $(this.options.el);
			}
			if (_.isUndefined(this.$el)) {
				throw new Error("View has no this.el or this.options.el property defined.");
			}
		},

		// **Method:** `toHTML`
		// A wrapper for the task of merging a Mustache.js template with preprocessing
		// Handles the merging of JSON data from model with a HTML template {{vars}}
		// Prior to merging the template the data can be changed with dataDecorator
		// Requires _toHTML an alias for the applications templating method
		// Param {Function} `dataDecorator` - accepts and returns a {Object} `data`
		// Param {Object} `partials` - see Mustache.js documentation.
		toHTML : function(dataDecorator, partials) {
			var markup, data, args;
			data = (this.model) ? this.model.toJSON() : null;
			if (dataDecorator && _.isFunction(dataDecorator)) {
				data = dataDecorator.call(this, data);
			}
			this.template = this.template || this.options.template;
			if (!this.template || !data) {
				//console.log("template = "+this.template  +" data = "+data);
				throw new Error("BaseView method toHTML called, but this.template or data is not defined.");
			} else {
				markup = _toHTML(this.template, data, partials);
			}
			return markup;
		},

		// **Method:** `domInsertionMethod` - used when rendering to add markup to dom
		// Default is `html` however this is configurable to support :
		//  - 'append', 'html', 'prepend', 'text'
		domInsertionMethod : function(domInsertionMethod) {
			var defaultMethod = 'html', domInsertionMethods = ['append', 'html', 'prepend', 'text'], domInsertion;

			if (domInsertionMethod !== defaultMethod) {
				if (domInsertionMethod && _.isString(domInsertionMethod)) {
					if (_.contains(domInsertionMethods, domInsertionMethod)) {
						domInsertion = domInsertionMethod;
					}
				}
			}

			return domInsertion || defaultMethod;
		},

		// **Method:** `dataDecorator`
		// No-op re-define as needed as hook to modify model data just before rendering
		dataDecorator : function(data) {
			return data;
		},

		// **Property:** {Object} `callbacks` - list of callbacks
		// Child views or render stages can be managed using jQuery Callbacks
		// this should be an Callbacks object for each instance, so the
		// initialize method sets the Callbacks object
		callbacks : null,

		// **Property:** {Object} `deferred` - implements a jQuery.Deferred interface
		// Initialization or other criteria to resolve whether view is ready
		// can be handled with jQuery Deferred, this should be an deferred
		// object for each instance, the initialize method sets the
		// deferred instance.
		deferred : null,

		// Primarily a tool for unit tests... Don't rely on calling this.isReady!!
		isReady : function() {
			return !!(this.deferred.state() === 'resolved');
		},

		// **Method:** `addChildView`
		// For a composite view this method can add multiple view objects
		// Setup child views which can be rendered or appended to another context
		addChildView : function(view, context) {
			var callbackFn, msg;
			if (!view) {
				msg = "baseView addChildView expects view object as first arg.";
				throw new Error(msg);
			}
			if (context && !_.isEmpty(context)) {
				callbackFn = function() {
					view.render();
					view.$el.appendTo(context.$el);
					return view;
				};
			} else {
				callbackFn = function() {
					return view.render();
				};
			}
			return callbackFn;
		},

		// **Method:** `getOuterHtml` - utility fn
		// Using outerHTML with any browser via jQuery fallback when not supported
		getOuterHtml : function(obj) {
			return (obj[0].outerHTML) ? obj[0].outerHTML : $('<div/>').html(obj.eq(0).clone()).html();
		},

		// **Method:** `destroy` - used to teardown a view object
		// Best practice to avoid memory leaks is to remove references between objects
		destroy : function() {
			var key;

			if (this.removeSubscribers) {
				this.removeSubscribers();
			}
			this.$el.remove();
			if (this.destination) {
				$(this.destination).empty();
			}
			for (key in this) {
				delete this[key];
			}
		},

		// **Method:** `addSubscribers`
		// No-op re-define as needed, for Channel pub/sub or other event bindings
		addSubscribers : function() {
		},

		// **Method:** `removeSubscribers`
		// Re-define as needed used by this.destroy() to remove pub/sub bindings
		removeSubscribers : function() {
			this.$el.off();
		},

		/*'Method'* 'abortRequest'/
		 * Parameters : 'request Array / bject',
		 * It will find if the coming parameter is an object or array then depending on it , it will iterate the object/array
		 * and stops the ajax request ,
		 * It will cancel request only for the ready state 1 to 3
		 * All the nested requests that is dependent requests passed will also be cancelled
		 * FOR EG: Any change is state should stop all requests for cities and futher cities should stop teams
		 * The required data for this would be in following format :
		 * [

		 {
		 "object":"{//Request 1 State}"
		 },
		 {
		 "object":"{//Request 2 State}"
		 },
		 {
		 "object":[
		 {
		 "object":"{//Request 1 City}"
		 },
		 {
		 "object":"{//Request 2 City}"
		 },
		 {
		 "object":[
		 {
		 "object":"{//Request 1 Team}"
		 },
		 {
		 "object":"{//Request 2 Team}"
		 }
		 ]
		 }
		 ]
		 }

		 ]
		 *
		 */
		abortRequest : function(requests) {
			var self = this;
			try {
				// Check if the parameter coming is an array of requests
				if ($.isArray(requests)) {

					for (var key in requests) {

						// Recursion to remove all dependent requests upto nested levels
						self.abortRequest(requests[key]);

						// if (requests[key].readyState > 0 && requests[key].readyState < 4) {
						// //		console.log("Abort Started");
						// requests[key].abort();
						// //		console.log("Abort Ended");
						// }
					}
					requests = [];

				}
				// Check if the parameter coming exists
				else if (requests != undefined && requests != null) {
					if (requests.readyState && requests.readyState > 0 && requests.readyState < 4) {
						requests.abort();
					}
					requests = {};

				}
			} catch(ex) {
				//console.error("An exception occured while aborting request as follows:")
				console.error(ex)
			} finally {
				return requests || [];

			}

		}
	});

	return BaseView;
});
