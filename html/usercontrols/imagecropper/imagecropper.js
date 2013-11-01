/*
 ***** module as controller for 'photoplayer' control
 */

define([
	"require",
	'text!usercontrols/imagecropper/templates/layout.html',
	"facade",
	"controller",
	"views"
	], function (require, cropperLayoutTemplate) {

	var ImageCropperController,
		facade = require("facade"),
		Controller = require("controller"),
		views = require("views"),
		utils = require("utils"),
		$ = facade.$,
		_ = facade._,

		Channel = utils.lib.Channel, LayoutView = views.LayoutView;

		ImageCropperController = Controller.extend({
			// define css files to load
			cssArr: ["/usercontrols/imagecropper/imagecropper.css"],
			events: {
					"click button.close":"alertsomething"
			},

			// controller intialize function
			initialize: function (options) {
				console.log("init");
				var _self = this;

				// load css file
				Channel('load:css').publish(this.cssArr);

				_.bindAll(this);

				// model box html
				console.log(options);
				this.image_o = (options.image_o) ? options.image_o : "";
				this.image_e = (options.image_e) ? options.image_e : "";

				this.modelHTML =
					'<div id="modalPopup" class="modal imagecropper hide fade model-popup-h">' +
						'<div class="modal-header"><span>Athletez Profile Pic Editor</span>' +
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
				var self = this;
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
				$('#modalPopup button.close').bind('click',function(){
					self.notifyUpdate();
				});

				var url='/vendor/plugins/iedit2/index.html?vh=500&vw=500&sx=0&sy=0&sz=100&t=Profile%20Picture&edit=';
				if(this.image_e != "") url += '&edit='+this.image_e;
				if(this.image_o != "") url += '&o='+this.image_o;
				$('#modalPopup iframe#cropper_iframe').attr('src',url);

				$('#modalPopup').modal();
				return this.layout;
			},

			notifyUpdate:function(){
				Channel('userpic-changed').publish();
			}
		});
	return ImageCropperController;

});

