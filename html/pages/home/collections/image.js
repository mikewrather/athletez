// Home Images Data

define(
		[ 'facade', 'collections', 'pages/home/models/image', 'utils' ],
		function(facade, collections, HomeImageModel, utils) {

			var HomeImageList, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

			HomeImageList = BaseCollection.extend({

				// Reference to this collection's model.
				model : HomeImageModel,
				//url : '/api/user/search',

				initialize : function(models, options) {
					debug.log("HomeImageList initialize...");
					this.cid = this.cid || _.uniqueId('c');
					this.deferred = new $.Deferred();
					this.num = options.num;
				},
				// **Method:** `fetchSuccess` - resolve the deferred here in
				// success
				fetchSuccess : function(collection, response) {
					// debug.log('HomeList:' + collection.num);
					var payload = _.first(response.payload, collection.num);
					collection.reset();
					for ( var key in payload) {
						var item = new HomeImageModel();
						item.id = Math.ceil(Math.random() * 100000);

						// this gives a payload, desc, and exec_data to every
						// item in collection based on the main response
						item.set('payload', payload[key]);
						item.set('desc', response.desc);
						item.set('exec_data', response.exec_data);

						// console.log("Item: ",item);
						// console.log("This Payload:
						// ",payload[key].image_path);

						if (item.selected_image != undefined) {
							payload[key].image_path = item.selected_image;
						}

						collection.push(item);
					}

					collection.deferred.resolve(response);

				}

			});

			return HomeImageList;
		});
