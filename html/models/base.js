// Base Model  
// -------------

// Requires `define`  
// Return {BaseModel} object as constructor

define(['facade', 'utils'], function (facade, utils) {

	var BaseModel,
		Backbone = facade.Backbone,
		$ = facade.$,
		_ = facade._,
		lib = utils.lib,
		ajaxOptions = utils.ajaxOptions,
		debug = utils.debug;

	// Constructor `{BaseModel}` extends Backbone.Model.prototype
	// object literal argument to extend is the prototype for the BaseModel constructor
	BaseModel = Backbone.Model.extend({

		defaults: {

		},

		// Param {Object} `attributes` set on model when creating an instance
		// Param {Object} `options`
		initialize: function (attributes, options) {
			// debug.log("BaseModel init called");

			if (options) {
				this.options = options;
				this.setOptions();
			}
			this.deferred = new $.Deferred();
			// Backbone.Model.prototype.initialize.call(this, arguments);

		},

		showSuccess: function (model, response) {
			debug.log("ShowSuccess called in base.js");
			$('.global-alert').stop().fadeOut().removeClass('alert-error').removeClass('alert-info');
			$('.global-messages').stop().fadeOut();
			$('.global-errors').stop().fadeOut();
			$('.field-error').stop().fadeOut();

			var exec_data = model.get('exec_data');
			var desc = model.get('desc');
			if (!exec_data['exec_error']) {
				//$('.global-alert').addClass('alert-info').html(desc).stop().fadeIn();
			} else {
				//$('.global-alert').addClass('alert-error').html(desc).stop().fadeIn();
			}
			var errorsArr = exec_data['error_array'];
			if (errorsArr) {
				var errors = '';
				for (var i = 0; i < errorsArr.length; i++) {
					var item = errorsArr[i];
					if (item['field'] != '') {
						var field = item['field'];
						$('#' + field).parent().find('.field-error').html(item['error']).stop().fadeIn();
					} else {
						errors += item['error'] + '<br/>';
					}
				}
				if (errors != '')
					$('.global-errors').html(messages).stop().fadeIn();
			}

			var messagesArr = exec_data['message_array'];
			if (messagesArr) {
				var messages = '';
				for (var i = 0; i < messagesArr.length; i++) {
					var item = messagesArr[i];
					if (item['field'] != '') {
						var field = item['field'];
						$('#' + field).parent().find('.field-message').html(item['message']).stop().fadeIn();
					} else {
						messages += item['message'] + '<br/>';
					}
				}
				if (messages != '')
					$('.global-messages').html(messages).stop().fadeIn();
			}
		},

		showError: function (model, response) {
			debug.log("ShowError called in base.js");
			debug.log(model);
			debug.log(response);
			//$('.global-alert').addClass('alert-error').html('Hold on. There were problems. See sad faces above.').stop().fadeIn();
			$('.global-messages').stop().fadeOut();
			$('.global-errors').stop().fadeOut();
			$('.field-error').stop().fadeOut();
			
			var resultJson = $.parseJSON(response.responseText);
			var exec_data = resultJson.exec_data;
			var desc = resultJson.desc;
			if (!exec_data['exec_error']) {
				$('.global-alert').addClass('alert-info').html(desc).stop().fadeIn();
			} else {
				$('.global-alert').addClass('alert-error').html('Hold on. There were problems. See sad faces above.').stop().fadeIn();
				//$('.global-alert').addClass('alert-error').html(desc).stop().fadeIn();
			}
			var errorsArr = exec_data['error_array'];
			if (errorsArr) {
				var errors = '';
				for (var i = 0; i < errorsArr.length; i++) {
					var item = errorsArr[i];
					if (item['field'] != '') {
						var field = item['field'];
						$('#' + field).parent().find('.field-error').html(item['error']).stop().fadeIn();
					} else {
						errors += item['error'] + '<br/>';
					}
				}
				if (errors != '')
					$('.global-errors').html(messages).stop().fadeIn();
			}

			var messagesArr = exec_data['message_array'];
			if (messagesArr) {
				var messages = '';
				for (var i = 0; i < messagesArr.length; i++) {
					var item = messagesArr[i];
					if (item['field'] != '') {
						var field = item['field'];
						$('#' + field).parent().find('.field-message').html(item['message']).stop().fadeIn();
					} else {
						messages += item['message'] + '<br/>';
					}
				}
				if (messages != '')
					$('.global-messages').html(messages).stop().fadeIn();
			}
		},

		// **Property:** `request` - assign fetch return value to this.request property,
		// fetch returns (jQuery) ajax promise object
		request: null,

		// **Method:** `fetch`
		// Wrap Backbone.Model.prototype.fetch with support for deferreds
		fetch: function (options) {
			console.log("fetch options here", options);
			options = options || {};
			if (!options.success) {
				options.success = this.fetchSuccess;
			}
			if (!options.error) {
				options.error = this.fetchError;
			}
			_.extend(options, ajaxOptions);
			console.log("start fetching now this", this);
			console.log("start fetching  options", options);
		//	console.log("start fetching  results", Backbone.Model.prototype.fetch.call(this, options));
			return this.request = Backbone.Model.prototype.fetch.call(this, options);
		},

		// Default success and error handlers used with this.fetch() ...

		// **Method:** `fetchSuccess` - resolve the deferred here in success
		fetchSuccess: function (model, response) {
			console.log("fetch success? ", model);

			if (model.deferred) {
				if (!model.request) {
					model.request = model.deferred.promise();
				}
				model.deferred.resolve();
				model.showSuccess(model, response);
			}
			debug.log(response);
		},

		// **Method:** `fetchError` - log response on error
		fetchError: function (model, response) {
			if (model.deferred) {
				model.deferred.reject();
			}
			//TODO, add by jeffrey
			console.log("Alert:fetchError");
			model.showError(model, response);
		},

		// **Method:** `save`
		// Wrap Backbone.Model.prototype.save with extend ajax options
		save: function (attrs, options) {
			options = options || {};
			if (!options.success) {
				options.success = this.saveSuccess;
			}
			if (!options.error) {
				options.error = this.saveError;
			}
			_.extend(options, ajaxOptions);
			return this.request = Backbone.Model.prototype.save.call(this, attrs, options);
		},

		// **Method:** `saveSuccess` - resolve the deferred here in success
		saveSuccess: function (model, response) {
			debug.log("Save success log = ", model);
			debug.log(model);
			model.showSuccess(model, response);
		},

		// **Method:** `fetchError` - log response on error
		saveError: function (model, response) {
			debug.log("Save error log = ", model);
			debug.log(model);
			debug.log(response);
			model.showError(model, response);
		},

		// Primarily a tool for unit tests... Don't rely on calling this.isReady!!
		isReady: function () {
			if (this.request) {
				return !!(this.request.state() === 'resolved');
			} else {
				return !!(this.deferred.state() === 'resolved');
			}
		},

		// **Method:** `setOptions` - set urlRoot
		setOptions: function () {
			if (this.options && this.options.urlRoot) {
				this.urlRoot = this.options.urlRoot;
			}
		},

		// check exec_data['exec_error']
		isError: function () {
			var exec_data = this.get('exec_data');
			return exec_data['exec_error'];
		},

		truncateString: lib.truncateString
	});

	return BaseModel;
});
