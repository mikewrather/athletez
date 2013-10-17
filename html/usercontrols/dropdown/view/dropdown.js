/* // DropDown View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrol/dropdown/template/layout.html', 'facade', 'views', 'utils', 'vendor'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, DropDownView, _self;
	//Models

	DropDownView = Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		multiple : false,
		// stack to store all selected options
		selectedOptions : [],
		
		// dropdown outer class
		className: 'dropdown-wrapper',

		/*Bind Events on controls present in current view template*/
		events : {
			"click .up-down-arrow-h" : "showDropdown",
			"click li a" : "selectOptions"
		},

		// set selected options  from dropdown
		selectOptions : function(e) {
			var val = $(e.target).data("id");
			if (this.multiple)
				this.setMultipleOptions(val, e);
			else
				this.setSingleOption(val, e);

			this.showSelectedValue();
			if (this.callback)
				this.callback(this.selectedOptions);
		},
		
		
		showSelectedValue: function() {
			// show vaue selected
			var html = this.$el.find('.common-dropdown li.selected').text() || this.title;
			this.$el.find('.dropdown-header-box').html(html);
		},

		// set multipe dropdown options
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

		// to set single select dropdown
		setSingleOption : function(val, e) {
			var index = this.checkifExists(val);
			if (index == -1) {
				this.selectedOptions = [];
				console.log(this.$el.find(".common-dropdown li"));
				this.$el.find(".common-dropdown li").removeClass('selected');
				$(e.target).parent().addClass('selected');
				this.selectedOptions.push(val);
				this.$el.find(".hidden-input-dropdown-h").val(val);
				this.hideDropdown();
			}
		},

		// return index if record found in selected index
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
			_self = this;
			self = this;
			this.selectedOptions = [];
			self.setOptions(options);
			this.render();
			this.$el.find(".hidden-input-dropdown-h").attr("id", this.elementId);
		},

		// hide dropdown
		hideDropdown : function(e) {
			if (!e || !this.$el.find($(e.target)).parents(".dropdown-container").length) {
				this.$el.find(".dropdown-container").removeClass('increase-dropown-zindex');
				this.$el.find(".up-down-arrow-h span").removeClass('icon-chevron-up').addClass('icon-chevron-down');
				this.$el.find(".common-dropdown").slideUp();
			}
		},

		// toggle dropdown
		showDropdown : function(e) {
			e.preventDefault();
			var self = this;
			if ($(e.currentTarget).find("span").hasClass('icon-chevron-down')) {
				$(e.currentTarget).find("span").removeClass('icon-chevron-down').addClass('icon-chevron-up');
				$(".dropdown-container").removeClass('increase-dropown-zindex');
				self.$el.find(".dropdown-container").addClass('increase-dropown-zindex');
				$("html").bind('click', function(e) {
					self.hideDropdown(e);
				});
			} else {
				self.$el.find(".dropdown-container").removeClass('increase-dropown-zindex');
				$(e.currentTarget).find("span").removeClass('icon-chevron-up').addClass('icon-chevron-down');
			}
			$(e.currentTarget).parents('.dropdown-container').find('.common-dropdown').slideToggle();
		},

		// get the record by recordId set form view object
		getRecordId : function() {
			return this.payload[_self.data.recordId];
		},

		// set default values selected
		defaultSelected : function(val) {
			if (_self.multiple) {
				if (_.isArray(_self.selectedValue)) {
					for (var i in _self.selectedValue) {
						if (_self.selectedValue[i] == this.payload[_self.data.recordId]) {
							return "selected";
						}
					}
				}
			} else {
				if (_self.selectedValue && _self.selectedValue == this.payload[_self.data.recordId])
					return "selected";
			}
		},

		// get record value by recordValue
		getRecordValue : function() {
			return this.payload[_self.data.recordValue];
		},

		//render displays the view in browser
		render : function() {
			this.data.dropView = this;
			if (!this.selectedValue) {
				if (this.data.records.length)
					var val = this.data.records[0].payload[this.data.recordId];

				// for multiple push into array
				if (this.multiple) {
					this.selectedValue = [];
					this.selectedValue.push(val);
				} else
					this.selectedValue = val;
			}

			var self = this, markup = Mustache.to_html(self.template, this.data);
//			debugger;
			$(self.el).html(markup);
			this.targetView.$el.find(this.destination).html(this.el);
			this.$el.find(".hidden-input-dropdown-h").val(this.selectedValue);
			this.selectedOptions.push(this.selectedValue);
			this.showSelectedValue();
			if ($("#" + this.elementId).length) {
				if (self.callback)
					self.callback(this.selectedOptions);
			} else {
				setTimeout(function() {
					if(!self.$el.find('li.selected').length) {
						var $li = self.$el.find('.common-dropdown li:first-child');
						$li.addClass('selected');
						self.$el.find("#" + self.elementId).val($li.find('a').data("id"));						
						self.showSelectedValue();
					}
					if (self.callback) self.callback(self.selectedOptions);
				}, 200);
			}
			return true;
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		}
	});
	return DropDownView;
});
