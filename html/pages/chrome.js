// chrome package  
// --------------  
// Requires define
// Return {Function} chromeBootstrap

define( ['chrome/views/header', 'chrome/views/main', 'chrome/views/footer'], 
function (HeaderView, MainView, FooterView) {

    var chromeBootstrap;

    chromeBootstrap = function () {
		$('#main').unbind().empty().addClass("region-loader");
        
        // CHECK IF HEADER EXISTS
        if(App.header) {
        	App.header.render();
        } else {
        	App.header = new HeaderView();
        	App.header.render().$el.prependTo('body');
        }
        
        // CHECK IF MAIN EXISTS
        if(!$("#main").length) {
        	var main = new MainView();
        	main.render().$el.appendTo('body');
        }
        
        // CHECK IF FOOTER EXISTS
        if(!$("footer.container-fluid").length) {
        	var footer = new FooterView();
        	footer.render().$el.appendTo('body');
        }
    };

    return chromeBootstrap;
});

