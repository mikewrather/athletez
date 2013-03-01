// container.js  
// -------  
// products container view object
// Requires `define`
// Return {ProductContainerView} object as constructor

define([ 
        'vendor', 
        'views',
        'text!packages/products/templates/container.html'
        ], 
function (
        vendor,
        views,
        productContainerTemplate
        ) {

    var ProductContainerView
      , BaseView = views.BaseView
      , $ = vendor.$;

      ProductContainerView = BaseView.extend({

          className: 'content',

          initialize: function (options) {
              this.render().$el.appendTo('#main');
          },

          render: function () {
              this.$el.html(productContainerTemplate);
              return this;
          }

      });

    return ProductContainerView;
});