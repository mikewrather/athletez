// footer.js  
// -------  
// Requires `define`
// Return {FooterView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/footer.html',
        'chrome/models/footer'
        ], 
function (
        vendor,
        views,
        FooterTemplate,
        FooterModel
        ) {

    var FooterView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      FooterView = BaseView.extend({

        tagName: 'footer',

        className: 'container-fluid clearfix mobile-hide',
        
        initialize: function (options) {
            this.template = FooterTemplate;
        },

        model: new FooterModel(),

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }

      });

    return FooterView;
});