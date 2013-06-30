//Image List View


define([
        'require',
        'facade',
        'views'
        ],
function(require){
	
	var ImageListView,
		facade = require('facade'),
		views = require('views'),
		CollectionView = views.CollectionView;
	
	ImageListView = CollectionView.extend({
		
		intialize: function(options) {
			CollectionView.prototype.intialize.call(this, options);
		}
	});
	
	return ImageListView;
});