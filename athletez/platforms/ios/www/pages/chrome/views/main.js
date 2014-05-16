// main.js  
// -------  
// Requires `define`
// Return {MainView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/main.html',
        'chrome/models/main'
        ], 
function (
        vendor,
        views,
        MainTemplate,
        MainModel
        ) {

    var MainView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      MainView = BaseView.extend({

        id: 'main',

        className: 'clear clearfix',
        
        initialize: function (options) {
            this.template = MainTemplate;
        },

        model: new MainModel(),

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }

      });

    return MainView;
});