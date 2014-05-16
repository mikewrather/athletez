// The Participants List
// --------------

define(['facade',
	'views',
	'utils',
	'media/views/image-item',
	'text!game/templates/participats-list.html',
	'sportorg/models/uslgamelink',
	'common/models/add',
	'component/fb',
	"component/forms",
	'common/views/add-description'],
	function(
		facade,
		views,
		utils,
		ItemView,
		templateList,
		Participate,
		addModel) {

	var ImageListView,
		ImageListAbstract,
		$ = facade.$,
		_ = facade._,
		vendor = require("vendor"),
		Channel = utils.lib.Channel,
		FBComponent = require('component/fb'),
		CollectionView = views.CollectionView,
		SectionView = views.SectionView,
		FormComponent = require('component/forms'),
		Mustache = vendor.Mustache,
		AddDescription = require('common/views/add-description'),
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
			"click .invite-to-fb-h" : "inviteFBFriend",
	//		"click .delete-from-game" : "removeParticipant",
	//		"click .edit-h" : "editResults"
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
			console.log(markup)
			this.$el.html(markup);
			return this;
		},

		afterRender : function() {
			var _self = this, t = setInterval(function() {
				$ele = _self.$el.find(".character-limit-h");
				if ($ele.length) {
					clearInterval(t);
					$ele.each(function() {
						_self.adJustFontDynamically($(this));
					});
				}
			}, 100);

			this.$el.find('.edit-h').on('click',this.editResults);

		},

		editResults: function(e){
			e.preventDefault();
			e.stopPropagation();
			if($(e.target)[0].tagName == 'SPAN')
			{
				var usl_id = $(e.target).parent().attr('subject-id');
			}
			else{
				var usl_id = $(e.target).attr('subject-id');
			}

			if (!this.checkForUser()) {
				routing.trigger('showSignup', function(callback) {
					addToList(function() {
						if (callback)
							callback();
					});
				});
			} else {
				var options = {
					height : "500px",
					width : "500px",
					html : '<div id="addParticipantForm"></div>',
					title : "Edit My Times"
				};
				routing.trigger('common-popup-open', options);
				this.drawAddParticipantForm(usl_id);
			}

		},
		addParticipant : function() {


			if (!this.checkForUser()) {
				routing.trigger('showSignup', function(callback) {
					addToList(function() {
						if (callback)
							callback();
					});
				});
			} else {
				var options = {
					height : "500px",
					width : "500px",
					html : '<div id="addParticipantForm"></div>',
					title : "Add Me to This Event"
				};
				routing.trigger('common-popup-open', options);
				this.drawAddParticipantForm();
			}

		},
		drawAddParticipantForm: function(usl_id){

			var _self = this,
				is_update = false;

			var participants = new Participate();

			var drawForm = function(){

				var formData = new FormComponent({

					'result_time' : {
						form_values: {
							defaultValue : is_update ? participants.get('payload').result_time : "",
							post_to_server	: true,
							serverDbField: 'result_time',
							serverKey: "result_time"
						},

						type : 'Text',
						fieldClass: "",
						attr : {
							'placeholder' : '00:00:00',
							'class' : "txt-result-time"
						},

						showLable : true,
						label: "Result Time"

					},
					'bibnumber' : {
						form_values: {
							defaultValue : is_update ? participants.get('payload').bib_number : "",
							post_to_server	: true,
							serverDbField: 'bib_number',
							serverKey: "bib_number"
						},

						type : 'Text',
						fieldClass: "",
						attr : {
							'placeholder' : '0',
							'class' : "txt-bib-number"
						},

						showLable : true,
						label: "Bib Number"

					},
					'games_id'	: {
						form_values: {
							serverKey:'games_id',
							serverDbField: 'games_id',
							post_to_server	: true,
							value: _self.game_id
						},
						type: "Hidden"
					},
					'sports_id'	: {
						form_values: {
							serverKey:'sports_id',
							serverDbField: 'sports_id',
							post_to_server	: true,
							value: _self.sport_id
						},
						type: "Hidden"
					},
					'submit' : {
						type : 'Submit',
						fieldClass: "button-field",
						attr : {
							'value' : 'Save Changes'
						},
						showLable : false,
						onSubmit : function(e) {
							var errors = form.commit();
							if (errors) {
								// auto scroll to focus element which has error
								for (var i in errors) {
									var $ob = $("*[name=" + i + "]"), $pos = $ob.position();
									$ob.parents(".common-modal #modalBody").animate({
										scrollTop : $pos.top
									}, '500', function() {
										$ob.addClass('focus-error-animation');
										setTimeout(function() {
											$ob.removeClass('focus-error-animation');
										}, 2000);
									});
									break;
								}
							} else {
								if(_self.formValues) {
									var formData = _self.formValues.getFormValues();
								} else {
									var formData = form.getValue();
								}

								var formData = _self.formValues.getFormValues();

								participants.set({
									games_id : formData.games_id,
									sports_id : formData.sports_id,
									result_time : formData.result_time,
									bib_number : formData.bib_number

								});
								participants.save();

								$.when(participants.request).done(function() {
									var payload = participants.toJSON(), newAddModel = new addModel();
									newAddModel.processItemFromResponse(payload.payload.usl.user);
									routing.trigger('common-popup-close');
									_self.$el.find(".add-to-event").addClass("link-disabled");
									if (!is_update) {
										_self.collection.add(newAddModel);
										if(_self.collection.length==1){
											if(_self.controllerObject && _self.controllerObject.reloadParticipants && _.isFunction(_self.controllerObject.reloadParticipants)){
												_self.controllerObject.reloadParticipants();
											}
										}
									}
								});

								$.when(participants.request).fail(function(res) {
									var response = JSON.parse(res.responseText);
									var errorArray = response.exec_data.error_array;
									_self.formValues.showServersErrors(errorArray);

								});
							}
						}
					},
					'button' : {
						type : 'Button',
						fieldClass: "button-field",
						attr : {
							'value' : 'Cancel',
							'class' : 'cancel-btn'
						},
						onClick : function() {
							routing.trigger('common-popup-close');
						},
						showLable : false
					}
				}, $('#addParticipantForm'));

				var form = formData.form;
				_self.formValues = formData.formValues;
			};

			if(usl_id) {
				participants.set('id',usl_id);
				participants.fetch();
				$.when(participants.request).done(function(){
					is_update = true;
					drawForm();
				});
			}
			else drawForm();
		},
		initialize : function(options) {
			var _self = this;

			routing.off("add-to-event");
			routing.on("add-to-event", function() {
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

			if(!this.collection.limit) {
				_self.allData = this.collection.toArray();
				var len = _self.allData.length;
				_self.start = 0;
				_self.end = _self.page_limit;
				_self.page_limit = 8;
			}

			var len = _self.collection.length;
			if(!len || len < _self.collection.limit) {
				_self.$el.find('.see-more-h').hide();
			}

			console.log("PL",len,_self.collection);

			// show empty box
			if(!len) {

				var model = facade.Backbone.Model.extend({});
				new AddDescription({
					page: "participants",
					target: this.$el,
					model: new model,
					teamName: this.teamName,
					name: "view - " + Math.random()
				});
			} else {
				var json = this.collection.toArray(), found = false;
				for (var i in json) {
					if (routing.loggedInUserId == json[i].id) {
						found = true;
					}
				}
			}


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
				//if (!$("#add-participants-icons").length) {
				//	var html = '<li id="add-participants-icons" class="add-tile-outer">\
				//	<div class="add-icons-outer"><div>\
				//	<a href="javascript: void(0);" class="add-to-event link-disabled pull-left tiles" title="Add to event"></a>\
				//	<span class="hide character-limit-h">I\'m Attending this event</span></div>\
				//	<div>\
				//	<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a>\
				//	<span class="hide character-limit-h">Know somebody who\'s gonna be here?</span></div>\
				//	</div></li>';
					//_self.$el.find(_self.listView).prepend(html);

				//	if (!found)
				//		_self.$el.find(_self.listView).find(".add-to-event").removeClass("link-disabled");

				//}
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

