// CommentOn Form View
// ---------
// Input form to create Profile comments

// Page Profile
// Requires define
// Returns {CommentOnFormView} constructor

define(['require', 'text!usercontrols/photo-player/templates/comment-form.html', 'usercontrols/photo-player/models/commentonform', 'site/views/comment-form', 'models/base', 'views', 'chrome/views/header'], function(require, commentFormTemplate, commentFormModel, BaseCommentFormView, BaseModel) {

	var CommentOnFormView;
	var views = require('views'), header = require('chrome/views/header'), BaseView = views.BaseView;

	CommentOnFormView = BaseView.extend({
		initialize : function(options) {
			console.error(options);
			_.bindAll(this);
			this.setOptions();
			BaseView.prototype.initialize.call(this, options);
		},
		el : ".comment-input-outer-h",
		template : commentFormTemplate,

		events : {
			"click #comment-submit" : "submitHandler",
			'click .add-comment-h' : 'showCommentBox',
			'keypress .photoplayer-comment-box' : "addComment"
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			if (!this.collection) {
				throw new Error("comment form view expected options.collection.");
			}

			if (!this.model) {
				console.log("this.collection.id =", this.collection.id);
				this.model = new commentFormModel({
					id : this.collection.id
				});

				console.log(this.model.toJSON());
				this.model.fetch();
			}
		},

		checkForUser : function() {
			if (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},

		getCaret : function(el) {
			if (el.selectionStart) {
				return el.selectionStart;
			} else if (document.selection) {
				el.focus();

				var r = document.selection.createRange();
				if (r == null) {
					return 0;
				}

				var re = el.createTextRange(), rc = re.duplicate();
				re.moveToBookmark(r.getBookmark());
				rc.setEndPoint('EndToStart', re);

				return rc.text.length;
			}
			return 0;
		},

		addComment : function(e) {
			
			
			console.error(e);
			
			if (e.keyCode == 13 && e.shiftKey) {
				var content = $(e.currentTarget).val();
				var caret = this.getCaret(e);
				content = content.substring(0, caret) + "\n" + content.substring(caret, content.length);
				e.stopPropagation();
			} else if (e.which === 13 && !e.shiftKey) {
				e.preventDefault();
				this.submitHandler(e);
			}
		},

		submitHandler : function(e) {
			e.preventDefault();
			if (!this.checkForUser()) {
				routing.trigger('showSignup');
				return;
			}
			this.createOnEnter(e);
		},

		showCommentBox : function() {
			var $formDiv = this.$el.find('.add-comment-form-h');
			if ($formDiv.hasClass('hide'))
				$formDiv.removeClass('hide');
			else
				$formDiv.addClass('hide');
		},

		refreshComments : function(e) {
			//console.log("yyyy=", this.collection);
			this.$("#new-comment").val("");
		},

		// If you hit return in the main input field, create new **CommentForm** model,
		// persisting it to *localStorage*.
		createOnEnter : function(e) {
			var comment = this.$el.find("#new-comment").val();
			var self = this;
			self.$('.submit-result').stop().fadeOut();
			if (comment != '') {
				date = new Date();
				var payload = new Array;
				payload['comment'] = comment;
				payload['comment_date'] = date.toDateString();
				payload['subject_type_id'] = this.collection.subject_entity_type;
				payload['subject_id'] = $(".large-image-h").attr("data-id");

				var saveInfo = new BaseModel(payload);
				saveInfo.url = function() {
					debug.log(self);

					if (!_.isUndefined(self.collection.savePath))
						return 'api' + self.collection.savePath;

					if (testpath)
						return testpath + '/user/comment/add';
					return '/api/media/addcomment/' + payload['subject_id'] + "?comment=" + payload['comment'];
				};

				saveInfo.saveSuccess = function(model, response) {
					BaseModel.prototype.saveSuccess.call(this, model, response);
					var exec_data = model.get('exec_data');
					var payload = model.get('payload');
					var desc = model.get('desc');
					if (!exec_data['exec_error']) {
						$('.global-alert').addClass('alert-info').html(desc).stop().fadeIn();
					} else {
						$('.global-alert').addClass('alert-error').html(desc).stop().fadeIn();
					}
					//set the value to fit the page variable.
					payload.poster = payload.name;
					payload.poster_picture = payload.user_picture;
					payload.poster_email = payload.email;
					console.log('thisresponse = ', response);
					//this.model = model;

					self.collection.push(model);
					console.log("latest collectionsx", self.collection);
					self.refreshComments();
					routing.on('profilecommentonlist:refresh', self.collection);
				};
				saveInfo.save();
			}
		},

		render : function() {
			BaseView.prototype.render.call(this);
			this.input = this.$("#new-comment");
			console.log("run here now", this.el);
			return this;
		}
	});

	return CommentOnFormView;
});
