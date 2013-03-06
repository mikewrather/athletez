// header.js  
// -------  
// Requires `define`
// Return {HeaderView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/header.html',
        'chrome/models/header'
        ], 
function (
        vendor,
        views,
        headerTemplate,
        HeaderModel
        ) {

    var HeaderView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      HeaderView = BaseView.extend({

        tagName: 'header',

        className: 'container-fluid clearfix',

        initialize: function (options) {
            this.template = headerTemplate;
        },

        model: new HeaderModel(),

        render: function () {
            var self = this;
            this.model.fetchSuccess = this.model.fetchError = function(res) {
                    var markup = Mustache.to_html(self.template, res.toJSON());
                    self.$el.html(markup);
            };
                
            this.model.fetch();
            return this;
        }

      });

    return HeaderView;
});