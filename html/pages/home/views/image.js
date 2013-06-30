//Image View


define([
        'require',
        'text!pages/home/templates/image.html',
        'facade',
        'views'
        ],
function(require, imageTemplate){
	
	var ImageView,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView;
	
	ImageView = SectionView.extend({
		
		template: imageTemplate,
		
		intialize: function(options) {
			SectionView.prototype.intialize.call(this, options);
		}
	});
	
	return ImageView;
});