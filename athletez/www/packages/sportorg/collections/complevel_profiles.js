

define(['facade', 'collections', 'utils', 'sportorg/models/complevel_profile'],
	function(facade, collections, utils, model) {

		var ComplevelProfiles, BaseCollection = collections.BaseCollection;

		ComplevelProfiles = BaseCollection.extend({
			model: model,
			url: function() {
				console.log("called",this.model);
				return '/api/complevelprofile/search/';
			},

			fetchSuccess : function(collection, response) {
				console.log(this.model);

				collection.reset();

				var payload = response.payload;
				for (var key in payload) {
					var item = new this.model();
					item.id = Math.ceil(Math.random() * 100000);
					item.set('payload', payload[key]);
					item.set('desc', response.desc);
					item.set('exec_data', response.exec_data);
					collection.push(item);
				}

				collection.deferred.resolve(response);
				collection.processResult(collection);
			},
			processResult : function (collection) {

			},
			returnProcessedData : function(collection){

			},


			ParseForDropdown: function(){

				var _self = this;
				var json = _self.toJSON(), data = {};
				console.log(json);
				data = [];
				for(var i in json) {
					var name = [];
					for(var j in json[i].payload.levels) {
						name.push(json[i].payload.levels[j].name);
					}
					data.push({payload:{id: json[i].payload.id, name: name.join(", ")}});

				}
				console.log("data",data);

				return data;
			}

		});

		return ComplevelProfiles;
	});
