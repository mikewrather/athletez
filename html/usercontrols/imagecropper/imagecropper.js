/*
 ***** module as controller for 'photoplayer' control
 */

define([
	"require",
	'text!usercontrols/imagecropper/templates/layout.html',
	"facade",
	"controller",
	"models",
	"views",
	], function (require, cropperLayoutTemplate) {

	var ImageCropperController,
		facade = require("facade"),
		Controller = require("controller"),
		models = require("models"),
		views = require("views"),
		utils = require("utils"),
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,

		Channel = utils.lib.Channel, LayoutView = views.LayoutView,
		Backbone = facade.Backbone,
		BasicModel = require("user/models/basic_info"),
		//ImageCropperView = require("usercontrols/imagecropper/views/main"),

		ImageCropperController = Controller.extend({
			// define css files to load
			cssArr: ["/usercontrols/imagecropper/imagecropper.css"],
			events: {},

			// controller intialize function
			initialize: function (options) {
				console.log("init");
				var _self = this;

				// load css file
				Channel('load:css').publish(this.cssArr);

				_.bindAll(this);

				// model box html
				if (options.id) this.id = options.id;
				if (options.index) this.index = options.index;
				if (options.userId) this.userId = options.userId;
				if (options._collection) this._collection = options._collection;

				this.modelHTML =
					'<div id="modalPopup" class="modal imagecropper hide fade model-popup-h">' +
						'<div class="modal-header">Userpic Editor' +
							'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
						'</div>' +
						'<div class="modal-body page-content-h"></div>' +
					'</div>';

				// set up main layout view
				this.setupLayout().render();
				this.handleDeferreds();
			},

			handleDeferreds: function () {},

			// setup main layout
			setupLayout: function () {
				this.scheme = [];
				$(".model-popup-h").remove();
				$('body').append(this.modelHTML);
				var pageLayout = new LayoutView({
					scheme: this.scheme,
					destination: ".modal-body",
					template: cropperLayoutTemplate,
					displayWhen: "ready"
				});
				this.layout = pageLayout;
				$('#modalPopup').modal();
				return this.layout;
			},
		});
	return ImageCropperController;

});

