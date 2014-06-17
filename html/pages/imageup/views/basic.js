// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define(['require', 'text!imageup/templates/uploader.html', 'text!imageup/templates/select_all.html', 'text!usercontrol/tag/templates/layout.html', 'facade', 'views', 'utils', 'vendor', "imageup/models/basic", "imageup/views/errors", 'usercontrol/tag/views/main'], function(require, imageBasicTemplate, selectAllTemplate, tagTemplate) {

	var ImageBasicView, facade = require('facade'), views = require('views'), utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), SectionView = views.SectionView, ImageBasicModel = require("imageup/models/basic"), ErrorDispView = require("imageup/views/errors"), $ = facade.$, _ = facade._, debug = utils.debug, TagView = require('usercontrol/tag/views/main');

	debug.log("SectionView: ", SectionView);

	ImageBasicView = SectionView.extend({

		id : 'imageuploadForm',

		events : {
			"click #imageup" : "imageUploadClick",
			"change #image_file" : "imagePreview",
			"dragover #imageholder" : "drag",
			"drop #imageholder" : "drop",
			"click #btn_select_all_h" : "selectAllImages"
		},

		template : imageBasicTemplate,
		data : imageBasicTemplate,
		tagCollection : [],
		tagData : {
			1 : [],
			5 : [],
			8 : []
		},
		
		'const' : {
			User : 1,
			Team : 5,
			Game : 8
		},
		
		files_byUploader : [],
		files_drag : [],

		initialize : function(options, attr) {
			$("#errormsg, #preview").html("");
			SectionView.prototype.initialize.call(this, options);
			this.files_byUploader = [];
			this.attr = attr;
			this.files_drag = [];
			this.scheme = options.scheme;
			this.layout = options.layout;

			this.dropedImage = options.dropedImage;
			if (this.attr)
				this.sports_id = this.attr.sports_id || null;
			else
				this.sports_id = null;

			Channel('tag-team-image-success').empty();
			Channel('tag-team-image-success').subscribe(this.tagFunction);

			$('#imgUploadModal').modal('show');
			$('#imgUploadModal').on('hidden', function() {
				routing.trigger('refresh-onImageUpload');
			});
			$('#imgUploadModal').on('hide', function() {
				routing.trigger('refresh-onImageUpload');
			});
		},

		drag : function(event) {
			event.stopPropagation();
			event.preventDefault();
			event.originalEvent.dataTransfer.dropEffect = 'copy';
		},
		drop : function(event) {
			var _self = this;
			event.stopPropagation();
			event.preventDefault();
			$("#errormsg").hide();
			this.files_drag = this.files_drag || [];

			var files = event.originalEvent.dataTransfer.files;
			if (files.length > 0)
				_self.showLoader(_self);
			var output = [];
			_self.dataum = _self.dataum || [];
			var k = _self.dataum.length;
			for (var i = 0, f; f = files[i]; i++) {
				if (!f.type.match('image.*')) {
					continue;
				}
				this.files_drag.push(f);
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					return function(e) {
						var preview_id = "preview_" + k;
						k++;
						_self.dataum.push({
							"preview_id" : preview_id,
							"width" : "250px",
							"height" : "250px",
							"filesrc" : e.target.result,
							"title" : escape(theFile.name)
						});
						data = {
							"data" : _self.dataum
						};
						$('#image_file').attr('disabled', 'disabled');
						routing.trigger("imageup-preview", data);
						_self.hideLoader();
					};
				})(f);
				_self.setUpBottomView();
				reader.readAsDataURL(f);
			}
		},
		imagePreview : function(event) {
			var _self = this;
			$("#preview").hide();
			$("#errormsg").hide();
			this.files_byUploader = this.files_byUploader || [];
			var files = $('#image_file')[0].files;
			if (files.length > 0)
				_self.showLoader(_self);
			_self.dataum = [];
			var f, k = _self.dataum.length;
			var i = 0;

			for (; f = files[i]; i++) {
				if (!f.type.match('image.*')) {
					continue;
				}
				_self.files_byUploader.push(f);
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					return function(e) {
						var preview_id = "preview_" + k;
						k++;
						_self.dataum.push({
							"preview_id" : preview_id,
							"width" : "250px",
							"height" : "250px",
							"filesrc" : e.target.result,
							"title" : escape(theFile.name)
						});
						
						if(k == files.length) {
							data = {"data" : _self.dataum, "ImageIndex": _self.files_byUploader.length - 1, "filesUploader": _self.files_byUploader};
							routing.trigger("imageup-preview", data);
							_self.hideLoader();
						}
					};
				})(f);
				reader.readAsDataURL(f);
			}
			_self.setUpBottomView();
		},
		imageUploadClick : function(event) {
			event.preventDefault();
			var thiss = this;
			$("#errormsg").hide();
			$("#imageup").attr("disabled", "disabled");
			$(".closepreview").attr("disabled", "disabled");
			$(".rotate").attr("disabled", "disabled");

			if ($(".previewimg").length == 0) {
				var msg = {
					"msg" : "Image Field Empty",
					"color" : "alert-error"
				};
				routing.trigger("imageup-msg", msg);
				$("#imageup").removeAttr("disabled");
			} else if (this.dropedImage) {
				var len = this.files_drag.length;
				jQuery.each(this.dropedImage.data[0].drag_info, function(i, file) {
					var data = new FormData();
					if ($('#preview_' + i + "group").length > 0) {
						data.append('image_file', file);
						if ($('#preview_' + i + 'rotang').val() > 0)
							data.append('rotate', $('#preview_' + i + 'rotang').val());
						else
							data.append('rotate', "false");
						for (var attrname in thiss.attr) {
							console.error(attrname, thiss.attr[attrname]);
							data.append(attrname, thiss.attr[attrname]);
						}
						var dataum = {
							"dataum" : data,
							"id" : i,
							"len" : len
						};
						console.log(dataum);
						routing.trigger("imageup-add-image", dataum);
					}
				});
				this.files_drag = [];
				$("#imageup").removeAttr("disabled");
			} else if (this.files_drag.length >= 1) {
				var len = this.files_drag.length;
				jQuery.each(this.files_drag, function(i, file) {
					var data = new FormData();
					if ($('#preview_' + i + "group").length > 0) {
						data.append('image_file', file);
						if ($('#preview_' + i + 'rotang').val() > 0)
							data.append('rotate', $('#preview_' + i + 'rotang').val());
						else
							data.append('rotate', "false");
						for (var attrname in thiss.attr) {
							console.error(attrname, thiss.attr[attrname]);
							data.append(attrname, thiss.attr[attrname]);
						}

						// Assign Tag Data In Data
						var t = thiss.getTagData($('#preview_' + i + "group"));
						data.append('tag', JSON.stringify(t));
						// var tagIndex = $('#preview_'+i+"group").attr('tagIndex')
						// if(tagIndex != null && tagIndex > -1){
						// tagData = thiss.tagCollection[tagIndex] || {};
						// data.append('tag',JSON.stringify(tagData));
						// }

						var dataum = {
							"dataum" : data,
							"id" : i,
							"len" : len
						};
						console.log(dataum);
						routing.trigger("imageup-add-image", dataum);
					}
				});
				this.files_drag = [];
				$("#imageup").removeAttr("disabled");
			} else {
				//	console.log($('#image_file')[0].files.length + "=file prasobh");
				console.log("file_byUploader");
				console.log(this.files_byUploader);
				jQuery.each(thiss.files_byUploader, function(i, file) {
					var data = new FormData();
					if ($('#preview_' + i + "group").length > 0) {
						data.append('image_file', file);
						if ($('#preview_' + i + 'rotang').val() > 0)
							data.append('rotate', $('#preview_' + i + 'rotang').val());
						else
							data.append('rotate', "false");
						for (var attrname in thiss.attr) {
							data.append(attrname, thiss.attr[attrname]);
						}
						// Assign Tag Data In Data
						var t = thiss.getTagData($('#preview_' + i + "group"));
						data.append('tag', JSON.stringify(t));

						var dataum = {
							"dataum" : data,
							"id" : i,
							"len" : thiss.files_byUploader.length
						};
						if(routing.isNative){
							console.log("sending to image upload",file);
							routing.trigger("imageup-add-image", dataum);
						} else {
							routing.trigger("imageup-add-image", dataum);
						}

					}
				});
				thiss.files_byUploader = [];
				$("#imageup").removeAttr("disabled");
			}
			this.dataum = [];
		},

		getTagData : function(control) {
			//	console.log("tagData",this.tagData);
			var gameIndex = $(control).attr('gameIndex');
			var teamIndex = $(control).attr('teamIndex');
			var userIndex = $(control).attr('userIndex');
			// User : 1,
			// Team : 5,
			// Game : 8
			var tag = {
				1 : [],
				5 : [],
				8 : []
			};
			if (gameIndex > -1) {
				var d = this.tagData[this['const'].Game][gameIndex];
				if (d)
					tag[this['const'].Game] = d;
			}
			if (teamIndex > -1) {
				var d = this.tagData[this['const'].Team][teamIndex];
				if (d)
					tag[this['const'].Team] = d;
			}
			if (userIndex > -1) {
				var d = this.tagData[this['const'].User][userIndex];
				if (d)
					tag[this['const'].User] = d;
			}
			return tag;
		},
		/*******************/

		setUpBottomView : function() {
			$("#main-content-tag-section").fadeIn();
			this.setUpSelectAllView();
			this.setUpTagView();
		},

		setUpSelectAllView : function() {
			var self = this;
			$("#select-allup").html(selectAllTemplate);
			self.showSelectAllImages();
		},

		setUpTagView : function() {
			//TagView
			var self = this;
			this.tagView = new TagView({
				model : this.model,
				template : tagTemplate,
				name : "tag-image " + new Date().toString(),
				destination : "#image-tagging",
				user_id : self.user_id || null,
				sports_id : self.sports_id,
				channel : 'tag-team-image-success'
			});
			this.scheme.push(this.tagView);
			this.layout.render();
		},

		tagFunction : function(data) {
			var self = this;
			this.tagCollection.push(data);
			var index = 0;
			var selectedImages = $(".previewimg.selected");
			console.log("selected", selectedImages);
			for (var key in data) {
				self.tagData[key] = self.tagData[key] || [];
				self.tagData[key].push(data[key]);
				index = self.tagData[key].length - 1;
				if (key == self['const'].Game) {
					selectedImages.attr('gameIndex', index);
				} else if (key == self['const'].Team) {
					selectedImages.attr('teamIndex', index);
				} else if (key == self['const'].User) {
					selectedImages.attr('userIndex', index);
				}
			}
		},

		selectAllImages : function(e) {
			$(".previewimg").addClass("selected");
			$("#select-allup").hide();
			$("#image-tagging").show();

		},

		showSelectAllImages : function() {
			$("#select-allup").show();
			$("#image-tagging").hide();
		}
	});

	return ImageBasicView;
}); 