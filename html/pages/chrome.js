// chrome package  
// --------------  
// Requires define
// Return {Function} chromeBootstrap

define( ['chrome/views/header', 'chrome/views/main', 'chrome/views/footer'], 
function (HeaderView, MainView, FooterView) {

    var chromeBootstrap;

    chromeBootstrap = function () {
    	
		$('#main').unbind().empty();
        
        if(App.header) {
        	App.header.render();
        } else {
        	App.header = new HeaderView();
        	App.header.render().$el.prependTo('body');
        }
        
        //header.render().$el.prependTo('body');
        var main = new MainView();
        main.render().$el.appendTo('body');
        var footer = new FooterView();
        footer.render().$el.appendTo('body');
    };

    return chromeBootstrap;
});

