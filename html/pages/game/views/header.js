// Game Header View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {GameHeaderView} constructor

define([
        'require', 
        'text!game/templates/header.html', 
        'game/models/basics',
        'facade', 
        'views'
        ], 
function(require, headerTemplate) {

    var GameHeaderView,
        facade = require('facade'),
        views = require('views'),
        GameBasicsModel = require('game/models/basics'),
        SectionView = views.SectionView;
        

    GameHeaderView = SectionView.extend({

        id: 'main-header',

        template: headerTemplate
        
                
    });

    return GameHeaderView;
});