// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define(['require',
'text!imageup/templates/preview_template.html',
'text!usercontrols/tag/templates/layout.html', 
'text!imageup/templates/select_all.html',
'facade', 'views',
'utils', 'vendor',
'usercontrols/tag/views/main'
], function(require , previewBasicTemplate , tagTemplate , selectAllTemplate) {

	var PreviewBasicView,
	facade = require('facade'),
	views = require('views'),
	utils = require('utils'), 
	Channel = utils.lib.Channel,
	vendor = require('vendor'), 
	SectionView = views.SectionView,
	$ = facade.$, _ = facade._,
	TagView = require('usercontrols/tag/views/main'),
	debug = utils.debug;

	PreviewBasicView = SectionView.extend({

		id : 'imgpreview',

		template : previewBasicTemplate,
		events : {
			"click .rotate" : "imageRotate",
			"click .close" : "closePreview",
			"click .previewimgsrc" : "selectImage",
			"mouseover .previewimg" : "showFooter",
			"mouseout .previewimg" : "hideFooter"
		},
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			console.log("preview view",options);
			this.degree = 0;
			this.scheme = options.scheme;
			this.layout = options.layout;
		},
		imageRotate : function(event) {
			id = event.currentTarget.id;
			val = event.currentTarget.value;
			this.degree = $("#" + val + "rotang").val();
			this.degree = parseInt(this.degree) + 90;
			if (this.degree >= 360)
				this.degree = 0;
			$("#" + id).css({
				'-webkit-transform' : 'rotate(' + this.degree + 'deg)',
				'-moz-transform' : 'rotate(' + this.degree + 'deg)',
				'-ms-transform' : 'rotate(' + this.degree + 'deg)',
				'-o-transform' : 'rotate(' + this.degree + 'deg)',
				'transform' : 'rotate(' + this.degree + 'deg)',
				'zoom' : 1
			});
			$("#" + val + "rotang").val(this.degree);
		},
		closePreview : function(event) {
			var nda = [];
			_.each(this.model.get('data'),function(el,i,list){
				console.log(el.preview_id,event.currentTarget.value);
				if(el.preview_id!=event.currentTarget.value) nda.push(el);
			});
			this.model.set('data',nda);
			id = event.currentTarget.value + "group";
			var elem = document.getElementById(id);
			elem.parentNode.removeChild(elem);
		},
		selectImage : function(e) {
			var isTarget = $(e.target).hasClass("previewimg");
			var target = isTarget ? $(e.target) : $(e.target).parents(".previewimg");
			target.toggleClass("selected");

			var selectedItems = $(this.destination).find(".previewimg.selected");
			if(selectedItems.length < 1){
			this.setUpSelectAllView();
			}
			else
				this.setUpTagView();
		},
		
		
	setUpSelectAllView : function(){
      	$("#image-tagging").hide();
      	$("#select-allup").show();
      },
		setUpTagView : function() {
      		$("#select-allup").hide();
			$("#image-tagging").show();
		},
		showFooter : function(e){
			$(e.target).parents(".previewimg").find(".lnkFooter").show()
		},
		hideFooter : function(e){
			$(e.target).parents(".previewimg").find(".lnkFooter").hide()
		}
	});

	return PreviewBasicView;
}); 