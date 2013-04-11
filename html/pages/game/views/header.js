// Header View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!game/templates/header.html', 
        'facade', 
        'views'
        ], 
function(require, headerTemplate) {

    var HeaderView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView;
        

    HeaderView = SectionView.extend({

        id: 'main-header',

        template: headerTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
                
    });

    return HeaderView;
});