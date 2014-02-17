// Sportorg Org Model
// -----------
// Requires define
// Return {SportorgOrgModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var SportorgOrgModel,
        _ = facade._,
	    Backbone = facade.Backbone;

    SportorgOrgModel = BaseModel.extend({

	    initialize: function(options){
		    if(options && options.id) this.id = options.id;
	    },
	    methodToURL: {
		    'read': function(model) {
			    console.log(model);
			    var retStr = '/api/org/basics/' + model.id;
			    return retStr;
		    },
		    'create': '/api/org/add/',
		    'update': function(model) {
			    var retStr = '/api/org/basics/';
			    if(model.id) retStr += model.id;
			    return retStr;
		    },
		    'delete': function(model){ return '/api/org/delete' + model.id; }
	    },

	    sync: function(method, model, options) {
		    options = options || {};

		    options.url = (typeof(model.methodToURL[method.toLowerCase()]) === 'function') ?
			    model.methodToURL[method.toLowerCase()](model) :
			    model.methodToURL[method.toLowerCase()];

		    return Backbone.sync.apply(this, arguments);
	    }

    });
   
    return SportorgOrgModel;

});
