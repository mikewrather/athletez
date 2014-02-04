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

		initialize : function(options){

			this.processOptions(options);
		},

		processOptions: function(options){
			if(!options.id)
				this.options.id = "modal-popup-"+Math.floor(Math.random() * Math.random() * 50 * Math.random() * 50);
			else
				this.options.id = options.id;

			if(options.fullPage) options.addClass.push("full-page-modal");

			this.options.title = options.title || "";
			this.options.width = options.width || "50%";
			this.options.height = options.height || "50%";
			this.options.popup_content = options.html || "<div></div>";

			this.render();
			this.processDimensions();


	/*		if(_.isUndefined(options.slimScroll) || !options.slimScroll) {
				$("#"+id).find('#modalBody').slimScroll({
					height:(options.height)?options.height:'400px',
					railVisible:true,
					allowPageScroll:true,
					disableFadeOut:true
				});
			}
			*/

			this.processStyle();
			Channel('popup-finished-launch-' + this.options.id).publish();
		},

		processDimensions: function(){
			var options = this.options;
			if(options.width){
				$("#"+options.id).css({"width": options.width});

				var added_width = parseInt($("#"+options.id).css('border-left'),10) +
					parseInt($("#"+options.id).css('border-right'),10) +
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
					var l = ($(window).width()/2 - true_width/2)+"px";
				} else {
					var l = "0%";
				}
				$("#"+options.id).css({"left":l});
			}

			if(options.height) {
				$("#"+options.id).css({"height": options.height});

				var added_height = parseInt($("#"+options.id).css('border-top'),10) +
					parseInt($("#"+options.id).css('border-bottom'),10) +
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
					"margin-top":"0%"//true_height<$(window).height() ? -true_height/2 : -$(window).height()/2
				});
			}
		},

		render: function(){
			var html = _.template(popupTemplate,{popup:this.options});
			$("body").append(html);

		},

		processStyle : function(){
			var _self = this;
			if(this.options.addClass != undefined && this.options.addClass.length){
				_.each(this.options.addClass,function(cssclass){
					console.log(cssclass);
					$('#'+_self.options.id).addClass(cssclass);
				});
			}

			if(this.options.background_image){
				console.log(this.options.background_image);
				$('#'+this.options.id).css({
					'background': 'url(' + this.options.background_image + ') no-repeat center center fixed #FFF',
					'-webkit-background-size': 'cover',
					'-moz-background-size': 'cover',
					'-o-background-size': 'cover',
					'background-size': 'cover'
				});
			}

			$('#'+this.options.id+ ' .close').attr("data-id",this.options.id);
			$("#"+this.options.id).find(".modal-header-h").html(this.options.title);
			$("#"+this.options.id).find(".modal-header").show();

			$("#"+this.options.id).modal('show');
		}
	});

});