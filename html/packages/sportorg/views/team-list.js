// Team List
// --------------

define(['vendor', 'facade','views', 'utils', 'sportorg/views/team-item', 'text!sportorg/templates/team-list.html'], 
function(vendor, facade,  views,   utils,   TeamItemView, TeamListViewTemplate) {

    var TeamListView, 
        TeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        Mustache = vendor.Mustache;
        SectionView = views.SectionView;

    TeamListAbstract = CollectionView.extend(SectionView.prototype);

    TeamListView = TeamListAbstract.extend({

        __super__: CollectionView.prototype,

        //id: "team-list",
        name: "Team List",
        //tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "team",
		template: TeamListViewTemplate,
        // Store constructor for the child views
        _view: TeamItemView,
		listView : ".team-list-h",
        initialize: function(options) {
	        this.renderTemplate();
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamListView expected options.collection.");
            }
            
            _.bindAll(this);
            this.addSubscribers();
        },
        
        renderTemplate: function () {
        	var data = {};
        	data.data = this.collection.toJSON();
	        console.log("Schedule Data",data.data);
            var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
            return this;
        }  

    });

    return TeamListView;
});
