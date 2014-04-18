/**
 * Created with JetBrains PhpStorm.
 * User: mike
 * Date: 2/4/14
 * Time: 11:24 AM
 * To change this template use File | Settings | File Templates.
 */
define([
	'require',
	'text!packages/common/templates/popup.html',
	'facade',
	'views',
	'vendor/plugins/iscroll/iscroll',
	'utils',
	'vendor'], function(require) {

	var facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		_ = facade._,
		$ = facade.$,

		BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		popupTemplate = require('text!packages/common/templates/popup.html');

	return BaseView.extend({

		options: {},
		forceFullScreen : false,

		initialize : function(options){

			this.processOptions(options);
		},

		processOptions: function(options){
			if(!options.id)
				this.options.id = "modal-popup-"+Math.floor(Math.random() * Math.random() * 50 * Math.random() * 50);
			else
				this.options.id = options.id;

			this.options.addClass = options.addClass || [];

			if(options.fullPage) this.options.addClass.push("full-page-modal");

			this.options.title = options.title || "";
			this.options.width = options.width || "50%";
			this.options.height = options.height || "50%";

			if(options.html && (options.html instanceof $)) this.options.popup_content = options.html.html();
			else if(options.html) this.options.popup_content = options.html;
			else this.options.popup_content = "<div></div>";

			this.forceFullScreen = document.documentElement.clientWidth < parseInt(this.options.width) ? true : false;

			// if we are forcing a full screen popup then we delete borders
			if(this.forceFullScreen) {
				this.options.addClass.push("noBorder");
				this.options.width = "100%";
				this.options.height = "100%";
			}

			this.render();

			var self = this, count=0;
			var timer = setTimeout(function(){
				count++;
				if($('#'+ self.options.id).length){

					clearInterval(timer);

					if(routing.popups === undefined) routing.popups = [];
					// add this to the array
					routing.popups.push($('#'+ self.options.id));
					
					if(!routing.mobile) self.processDimensions();
					self.processStyle();
					self.bindClose();

				} else if(count>=20){
					clearInterval(timer);
				}
			},200);

			Channel('popup-finished-launch-' + this.options.id).publish();
		},

		bindClose: function(){
			var self = this;
			routing.off('common-popup-close');
			routing.on('common-popup-close',function(e){
				if(routing.popups.length){
					var $thisPopup = routing.popups.shift();
					$thisPopup.modal("hide").remove();
				}
				$("body").removeClass("overflow-hidden");
				if(!$(".common-modal").length) $(".modal-backdrop").fadeOut().remove();
			});

			$('#'+this.options.id).find('.close').on('click',function(e){
				routing.trigger('common-popup-close');
			});

			$('.modal-backdrop').off('click');
			$('.modal-backdrop').on('click', function (e) {
				routing.trigger('common-popup-close');
			});
		},

		processDimensions: function(){
			var options = this.options;
			if(options.width){

				$("#"+options.id).css({
					"width": this.forceFullScreen ? "100%" : options.width
				});

				var added_width = parseInt($("#"+options.id).css('borderLeftWidth'),10) +
					parseInt($("#"+options.id).css('borderRightWidth'),10) +
					parseInt($("#"+options.id).css('padding-left'),10) +
					parseInt($("#"+options.id).css('padding-right'),10);

				var true_width;
				if(options.width.indexOf('%') > 0)
				{
					var percentage_number = parseInt(options.width,10);
					true_width = (window.innerWidth * (percentage_number/100)) + added_width;
				}
				else true_width = (parseInt(options.width,10) + added_width);

				if(options.width != "100%") {
					console.log($(window).width(),true_width);
					var l = ($(window).width()/2 - true_width/2)+"px";
				} else {
					var l = "0%";
				}
				$("#"+options.id).css({"left":l});
			}

			if(options.height) {
				$("#"+options.id).css({"height": this.forceFullScreen ? "100%" : options.height});

				var added_height = parseInt($("#"+options.id).css('borderTopWidth'),10) +
					parseInt($("#"+options.id).css('borderBottomWidth'),10) +
					parseInt($("#"+options.id).css('padding-top'),10) +
					parseInt($("#"+options.id).css('padding-bottom'),10);

				var true_height;
				if(options.height.indexOf('%') > 0) {
					var percentage_number = parseInt(options.height,10);
					true_height = (window.innerHeight * (percentage_number/100)) + added_height;
				}
				else true_height = (parseInt(options.height,10) + added_height);

				if(options.height != "100%") {
					var t = (($(window).height() - options.height.replace("px", ""))/2) - 30+"px";
				} else {
					var t = "0%";
				}
				var windowHeight = $(window).height();
				$("#"+options.id).css({
					"top":t,
					"margin-top":"0%"
				});
			}
		},

		render: function(){
			var html = _.template(popupTemplate,{popup:this.options});
			$("body").append(html);
			setTimeout(function() {
				if(routing.mobile) {
					var myScroll = new iScroll("#modalBody",{
						scrollbars:true
					});
				}
				$("body").addClass("overflow-hidden");
			}, 500);
		},

		processStyle : function() {
			var _self = this;
			if(this.options.addClass != undefined && this.options.addClass.length) {
				_.each(this.options.addClass,function(cssclass){
					$('#'+_self.options.id).addClass(cssclass);
				});
			}

			if(this.options.background_image) {
				console.log(this.options.background_image);
				$('#'+this.options.id).css({
					'background': 'url(' + this.options.background_image + ') no-repeat center center fixed #FFF',
					'-webkit-background-size': 'cover',
					'-moz-background-size': 'cover',
					'-o-background-size': 'cover',
					'background-size': 'cover'
				});
			}
			$('#'+this.options.id).css({"margin":"0px"});
			$('#'+this.options.id+ ' .close').attr("data-id",this.options.id);
			$("#"+this.options.id).find(".modal-header-h").html(this.options.title);
			$("#"+this.options.id).find(".modal-header").show();
			$("#"+this.options.id).modal('show');
		}
	});

});