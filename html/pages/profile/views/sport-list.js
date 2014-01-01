// Sport List
// --------------

define(['facade','views', 'utils', 'profile/views/sport-item'], 
function(facade,  views,   utils,   ProfileSportItemView) {

    var ProfileSportListView, 
        ProfileSportListAbstract,
        _ = facade._,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileSportListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileSportListView = ProfileSportListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "sport-list",
        name: "Sport List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "sport",

        // Store constructor for the child views
        _view: ProfileSportItemView,

		showList: function(e) {
			var $span = $(e.target).next("span");
			console.error($span.css("display"));
			if($span.css("display") === "none") {
				$(e.target).prev(".team-list-icon").removeClass("icon-circle-arrow-right").addClass("icon-circle-arrow-down");
				$span.slideDown();
			} else {
				$(e.target).prev(".team-list-icon").removeClass("icon-circle-arrow-down").addClass("icon-circle-arrow-right");
				$span.slideUp();
			}
			
        },

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);

            if (!this.collection) {
                throw new Error("SportListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            var _self = this;
            
            $(document).off("click", ".teamlist-header, .team-list-icon");
        	$(document).on("click", ".teamlist-header, .team-list-icon", function(e) {
            	_self.showList(e);
            });
        }
    });

    return ProfileSportListView;
});
