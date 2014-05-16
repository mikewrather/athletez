//Sports list
//url - api/sport/listall

define(
		[ 'require', 'sport/models/sport', 'facade', 'collections',
				'utils' ],
		function(require, SportListModel) {
			var SportList, 
				utils = require('utils'), 
				facade = require('facade'), 
				collections = require('collections'), 
				debug = utils.debug, 
				BaseCollection = collections.BaseCollection, 
				_ = facade._;

			SportList = BaseCollection.extend({

				model : SportListModel,
				
				url : function() {
					var base = '/api/sport/listall?';
					var name = this.name || 'boys';
					var tail = '';
					switch(name) {
						case 'boys':
							tail = 'male=1';
							break;
						case 'both':
							tail = 'male=1&';
						case 'girls':
							tail = tail + 'female=1';
					}
					return base+tail;
				},
				
				initialize : function(models, options) {
					this.url = options.url || this.url;
					this.name = options.name;
					BaseCollection.prototype.initialize.call(this, models, options);
				},

				fetchSuccess : function(collection, response) {
					collection.reset();
					var payload = response.payload;
					if (payload != null) {
						for (i = 0; i < payload.length; i++) {
							var item = new SportListModel();
							item.id = Math.ceil(Math.random() * 100000);
							item.set('payload', payload[i]);
							item.set('desc', response.desc);
							item.set('exec_data', response.exec_data);
							collection.push(item);
						}
					}
					collection.deferred.resolve(response);
				}

			});
			
			return SportList;
		});