// Schedule List
// --------------

define(['facade','views', 'utils', 'sportorg/views/schedule-item'], 
function(facade,  views,   utils,   ScheduleItemView) {

    var ScheduleListView, 
        ScheduleListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ScheduleListAbstract = CollectionView.extend(SectionView.prototype);

    ScheduleListView = ScheduleListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "schedule-list",
        name: "Schedule List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "schedule",

        // Store constructor for the child views
        _view: ScheduleItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ScheduleListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return ScheduleListView;
});
