// sport-item.js  
// -------  
// Requires `define`
// Return {SportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/sport-item.html',
        'profile/collections/teams',
        'sportorg/views/team-list'
        ], 
function (
        vendor,
        views,
        utils,
        sportItemTemplate
        ) {

    var SportItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      TeamListView = require('sportorg/views/team-list'),
      TeamList = require('profile/collections/teams');

      SportItemView = BaseView.extend({

        tagName: "li",

        className: "sport",
        
        rendered: false,
        
        initialize: function (options) {
            this.template = sportItemTemplate;
            var self = this;
            this.id = options.model.collection.id;            
            var sport_id = this.model.get('payload')['sport_id'];
            function callback() {
                self.initTeamList();
                Channel('refresh-profilepage').publish(sport_id);
            }
            Channel('sports:select' + sport_id).subscribe(callback);
        },
        
        initTeamList: function() {
            var self = this;
            this.teams = new TeamList();
            this.teams.id = this.id;
            this.teams.sport_id = this.model.get('payload')['sport_id'];
            this.teams.fetch();
            $.when(this.teams.request).done(function() {
                self.setupTeamListView();
                Channel('teams:fetch').publish();
            });
        },
        
        setupTeamListView: function() {
            var self = this,
                teamListView = new TeamListView({
                    collection: this.teams
                });
            
            function callback () {
                teamListView.render();
                self.$el.find('.teams-info').html(teamListView.el);
            }
            Channel('teams:fetch').subscribe(callback);
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return SportItemView;
});