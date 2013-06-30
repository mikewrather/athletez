define(
		[ 'facade', 'collections', 'utils' ],
		function(facade, collections, utils) {

			var SearchCollection, $ = facade.$, _ = facade._, BaseCollection = collections.BaseCollection, debug = utils.debug;

			SearchCollection = BaseCollection.extend({

				initialize : function(models, options) {
					debug.log("SearchCollection initialize...");
					//debug.log(options);
					if (_.isUndefined(options) || _.isUndefined(options.url)) {
						this.url = 'api/user/search'
					}
				},
				
				parse : function(response) {
					return response.payload;
				}
			});

			return SearchCollection;
		});