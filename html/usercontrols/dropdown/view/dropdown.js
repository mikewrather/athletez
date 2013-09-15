/* // Main View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {Awards VIEW} constructor
 */
define(['require', 'text!usercontrol/dropdown/template/layout.html', 'facade', 'views', 'utils', 'vendor'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, DropDownView;
	//Models
	DropDownView = BaseView.extend({

		template : layoutTemplate,
		multiple : false,
		selectedOptions : [],

		/*Bind Events on controls present in current view template*/
		events : {
			"click .up-down-arrow-h" : "showDropdown",
			"click li a" : "selectOptions"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {

			//Sports
		},

		selectOptions : function(e) {
			var val = $(e.target).data("id");
			if (this.multiple)
				this.setMultipleOptions(val, e);
			else
				this.setSingleOption(val, e);
				
				
			console.log(this.selectedOptions);	
				
		},

		setMultipleOptions : function(val, e) {
			var index = this.checkifExists(val);
			if (index == -1) {
				$(e.target).parent().addClass('selected');
				this.selectedOptions.push(val);
			} else {
				$(e.target).parent().removeClass('selected');
				this.selectedOptions.splice(index, 1);
			}

		},

		setSingleOption : function(val, e) {
			var index = this.checkifExists(val);
			if (index == -1) {
				this.selectedOptions = [];
				console.log(this.$el.find(".common-dropdown li"));
				this.$el.find(".common-dropdown li").removeClass('selected');
				$(e.target).parent().addClass('selected');
				this.selectedOptions.push(val);
			} else {
				//$(e.target).parent().removeClass('selected');
				//this.selectedOptions.splice(index, 1);
			}

		},

		checkifExists : function(val) {
			var index = -1;
			for (var i in this.selectedOptions) {
				if (this.selectedOptions[i] == val) {
					index = i;
					break;
				}
			}
			return index;
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			console.log("init - ------------------------------->>>>>>");
			//SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);

			this.render();

		},

		selectDesign : function(e) {

		},

		showDropdown : function(e) {
			if ($(e.target).hasClass('icon-chevron-down')) {
				$(e.target).removeClass('icon-chevron-down').addClass('icon-chevron-up')
			} else {
				$(e.target).removeClass('icon-chevron-up').addClass('icon-chevron-down')
			}
			$(e.target).parents('.dropdown-container').find('.common-dropdown').slideToggle();
		},

		/*render displays the view in browser*/
		render : function() {
			var markup = Mustache.to_html(self.template, {});
			$(self.el).html(markup);
			return true;
			//SectionView.prototype.render.call(this);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
			console.error(this.destination);
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			//self.setUpMainView();
		},
		setUpMainView : function() {
			///var markup = Mustache.to_html(self.template, {});
			//$(self.el).html(markup);
			//console.error("st up main view");
			//$(this.destination).html($(self.el).html);
		}
	});
	return DropDownView;
});
