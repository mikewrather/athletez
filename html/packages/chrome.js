// chrome package  
// --------------  
// Requires define
// Return {Function} chromeBootstrap

define( ['chrome/views/header', 'chrome/views/main', 'chrome/views/footer'], 
function (HeaderView, MainView, FooterView) {

    var chromeBootstrap;

    chromeBootstrap = function () {
        var header = new HeaderView();
        header.render().$el.prependTo('body');
        var main = new MainView();
        main.render().$el.appendTo('body');
        var footer = new FooterView();
        footer.render().$el.appendTo('body');
    };

    return chromeBootstrap;
});

