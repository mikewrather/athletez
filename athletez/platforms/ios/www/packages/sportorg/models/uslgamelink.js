// addimage.js Model
// ------------
// Requires define
// Return {GameAddImageModel} model constructor object

define( ["facade", "models/base"], function (facade, BaseModel) {

	var UslGameLink,
		_ = facade._,
		Backbone = facade.Backbone;

	UslGameLink = BaseModel.extend({

		initialize: function(options){
			if(options && options.id) this.id = options.id;
		},
		methodToURL: {
			'read': function(model) {
				console.log(model);
				var retStr = '/api/uslgamelink/basics/' + model.id;
				return retStr;
			},
			'create': '/api/uslgamelink/add/',
			'update': function(model) {
				var retStr = '/api/uslgamelink/add/';
				if(model.id) retStr += model.id;
				return retStr;
			},
			'delete': function(model){ return '/api/uslgamelink/delete' + model.id; }
		},

		sync: function(method, model, options) {
			options = options || {};

			options.url = (typeof(model.methodToURL[method.toLowerCase()]) === 'function') ?
				model.methodToURL[method.toLowerCase()](model) :
				model.methodToURL[method.toLowerCase()];

			return Backbone.sync.apply(this, arguments);
		}

	});

	return UslGameLink;
});

