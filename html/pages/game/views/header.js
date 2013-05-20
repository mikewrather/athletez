// Header View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {GameHeaderView} constructor

define([
        'require', 
        'text!game/templates/header.html', 
        'facade', 
        'views'
        ], 
function(require, gameHeaderTemplate) {

    var GameHeaderView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView;
        

    GameHeaderView = SectionView.extend({

        id: 'main-header',

        template: gameHeaderTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        }
        
                
    });

    return GameHeaderView;
});