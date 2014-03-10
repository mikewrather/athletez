//Invite FB Friends Model

define([ 'models', 'facade' ], function(models, facade) {
	
	var BaseModel = models.BaseModel,
		$ = facade.$,
		_ = facade._,
		Backbone = facade.Backbone;

	return BaseModel.extend({
		idAttribute: 'id',

		methodToURL: {
			'read': function(model) {
				var url = base_url + 'api/invite/basics/';
				if(model.get('sechash')) url += '?sechash=' + model.get('sechash');
				return url;
			},
			'create': 'api/invite/accept',
			'update': function(model) {
				var url = base_url + 'api/invite/accept/';
				if(model.get('sechash')) url += '?sechash=' + model.get('sechash');
				return url;
			},
			'delete': function(model){ return ''; }
		},

		sync: function(method, model, options) {
			options = options || {};

			options.url = (typeof(model.methodToURL[method.toLowerCase()]) === 'function') ?
				model.methodToURL[method.toLowerCase()](model) :
				model.methodToURL[method.toLowerCase()];

			return Backbone.sync.apply(this, arguments);
		},

		loadInvitePage: function(){
			switch(this.get('payload').invite_to_obj.enttypes_id){
				case '1':
					routing.navigate("!profile/"+this.get('payload').invite_to_obj.id, {trigger: true, replace: true});
					break;
				case '5':
					routing.navigate("!team/"+this.get('payload').invite_to_obj.id, {trigger: true, replace: true});
					break;
				case '8':
					routing.navigate("!game/"+this.get('payload').invite_to_obj.id, {trigger: true, replace: true});
					break;
				default:
					self.showHomePage(userId);
					break;
			}
		}
	});
});