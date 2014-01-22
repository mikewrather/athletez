// The Participants List
// --------------

define(['facade', 'views', 'utils', 'media/views/image-item', 'text!game/templates/participats-list.html', 'game/models/addparticipate', 'common/models/add', 'component/fb'], function(facade, views, utils, ItemView, templateList, Participate, addModel) {

	var ImageListView, ImageListAbstract, $ = facade.$, _ = facade._, vendor = require("vendor"), Channel = utils.lib.Channel, FBComponent = require('component/fb'), CollectionView = views.CollectionView, SectionView = views.SectionView, Mustache = vendor.Mustache;

	ParticipantsView = CollectionView.extend(SectionView.prototype);

	return ParticipantsView.extend({
		__super__ : CollectionView.prototype,
		template : templateList,
		// Tag for the child views
		_tagName : "li",
		_className : "image",
		page : 0,
		page_limit : 8,
		listView : ".image-list",
		// Store constructor for the child views
		_view : ItemView,
		events : {
			'click .see-more-h' : 'seeMore',
			"mouseover a.tiles" : "showText",
			"mouseout a.tiles" : "showicon",
			"click .invite-to-fb-h" : "inviteFBFriend"
		},

		// show text
		showText : function(e) {
			$(e.target).parent().find("span").removeClass("hide");
		},

		// shoe icon
		showicon : function(e) {
			$(e.target).parent().find("span").addClass("hide");
		},

		inviteFBFriend : function(e) {
			var _self = this, options = {};
			var addToList = function() {
				options.subject_id = _self.game_id;
				options.enttype_id = _self.controllerObject.basics.get("payload").enttypes_id;
				routing.trigger('fbInvite', undefined, options);
			};

			if (!_self.checkForUser()) {
				routing.trigger('showSignup', function(callback) {
					addToList(function() {
						if (callback)
							callback();
					});
				});
			} else {
				addToList();
			}
		},

		renderTemplate : function() {
			var markup = Mustache.to_html(this.template, {
				target : this.target_id
			});
			this.$el.html(markup);
			return this;
		},

		afterRender : function() {
			var _self = this;
			$ele = this.$el.find(".character-limit-h");
			$ele.each(function() {
				_self.adJustFontDynamically($(this));
			});
		},

		addParticipant : function() {
			var participants = new Participate(), _self = this;

			var addToList = function() {
				participants.set({
					games_id : _self.game_id,
					sports_id : _self.sports_id
				});
				participants.save();
				$.when(participants.request).done(function() {
					var payload = participants.toJSON(), newAddModel = new addModel();
					newAddModel.processItemFromResponse(payload.payload.usl.user);
					_self.$el.find(".add-to-event").addClass("link-disabled");
					_self.collection.add(newAddModel);
				});
			};

			if (!_self.checkForUser()) {
				routing.trigger('showSignup', function(callback) {
					addToList(function() {
						if (callback)
							callback();
					});
				});
			} else {
				addToList();
			}

		},

		initialize : function(options) {
			console.error(options);
			var _self = this;
			$(document).off("click", ".add-to-event");
			$(document).on("click", ".add-to-event", function() {
				if (!_self.checkForUser()) {
					routing.trigger('showSignup');
					return;
				}
				_self.addParticipant();
			});
			$(".participants-heading-h").removeClass("hide");
			if (options.name)
				this.name = options.name;
			else
				this.name = "image list";

			if (options.collecton)
				this.collection = options.collection;
			this.controllerObject = options.controllerObject;
			this.controller = options.controller;
			this.sports_id = options.sports_id;
			this.game_id = this.collection.id;
			this.mainView = this;
			options.mainView = this;
			this.renderTemplate();

			var json = this.collection.toArray(), a = json[0].get("payload"), b = [], found = false;
			for (var i in a) {
				if (routing.loggedInUserId == a[i].id) {
					found = true;
				}
				b.push({
					payload : a[i]
				});
			}
			this.collection.reset(b);
			this.target_id = options.target_id;
			this.target_url = options.target_url;
			this.sport_id = options.sport_id;
			// render template
			console.error(options);
			var _self = this;
			_self.allData = this.collection.toArray();
			_self.seeMore();

			CollectionView.prototype.initialize.call(this, options);
			if (!this.collection) {
				throw new Error("ImageListView expected options.collection.");
			}

			_.bindAll(this);
			this.addSubscribers();
			this.setupAddView();
			setTimeout(function() {
				if (!$("#add-participants-icons").length) {
					var html = '<li id="add-participants-icons" class="add-tile-outer">\
					<div class="add-icons-outer"><div>\
					<a href="javascript: void(0);" class="add-to-event link-disabled pull-left tiles" title="Add to event"></a>\
					<span class="hide character-limit-h">I\'m Attending this event</span></div>\
					<div>\
					<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a>\
					<span class="hide character-limit-h">Know somebody who\'s gonna be here?</span></div>\
					</div></li>';
					_self.$el.find(_self.listView).prepend(html);

					if (!found)
						_self.$el.find(_self.listView).find(".add-to-event").removeClass("link-disabled");

				}
			}, 0);

		},

		showAddButton : function() {
			this.$el.find(".add-to-event").removeClass("link-disabled");
		},

		seeMore : function(e) {
			var len = this.allData.length, start = this.page * this.page_limit, end = start + this.page_limit;
			if (len <= end) {
				this.$el.find('.see-more-h').hide();
			}

			if (e)
				this.collection.add(this.allData.slice(start, end));
			else
				this.collection.reset(this.allData.slice(start, end));
			this.page++;
			if (e) {
				if (this.addSubscribers)
					this.addSubscribers();
				if (this.setupAddView)
					this.setupAddView();
			}
		},

		checkForUser : function() {
			if (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},

		// Child views...
		childViews : {},

		// Event handlers...

		// Add Views
		setupAddView : function() {
			var listView, _self = this, addView = new AddImageView({
				collection : this.collection
			}), renderAddView = this.addChildView(addView);

			this.childViews.form = addView;
			this.callbacks.add(function() {
				renderAddView();
			});

			function callback(data) {
				addView.model = data;
				addView.render();
				$(this.listView).append(addView.el);
			}


			Channel('addimage:fetch').subscribe(callback);
		},

		filterWithImageType : function(type) {
			var c = this.collection;
			$.each(c.models, function(i, field) {
				if (field.selectImageType)
					field.selectImageType(type);
			});
			return c;
		}
	});

	return ImageListView;
});

