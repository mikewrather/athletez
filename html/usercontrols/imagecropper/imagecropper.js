/*
 ***** module as controller for 'photoplayer' control
 */

define([
	"require",
	'text!usercontrol/imagecropper/templates/layout.html',
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
			cssArr: [base_url + "usercontrols/imagecropper/imagecropper.css"],
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
				
				if(routing.mobile) {
					var vw = parseInt($(document).width()) - 30;
				} else {
					var vw = 500;
				}
				
				var url='/vendor/plugins/iedit2/index.html?vh='+vw+'&vw=500&sx=0&sy=0&sz=100&t=Profile%20Picture&edit=';
				if(this.image_e != "") url += '&edit='+this.image_e;
				if(this.image_o != "") url += '&o='+this.image_o;

				var options = {};
				options.width = "100%";
				options.height = "100%";
				options.title = "Change your Athletez Photo";
				options.html = '<iframe src="'+url+'" id="cropper_iframe" style="width:100%;height:100%;margin:0;"></iframe>';
				options.id = "change-userpic-modal";
				options.addClass = ['noBorder'];
				routing.trigger('common-popup-open', options);

				$('#' + options.id + ' .close').bind('click',function(){
					self.notifyUpdate();
				});

				return this.layout;
			},

			notifyUpdate:function(){
				Channel('userpic-changed').publish();
			}
		});
	return ImageCropperController;

});

