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
        
        if(!$(".common-modal").length) {
        	/*$("body").append('<div class="modal common-modal hide fade model-popup-h in">'+
        	'<div class="modal-header"><button type="button" class="close" data-dismiss="modal"'+ 
        	'aria-hidden="true">&times;</button><h3 class="modal-header-h">Header</h3></div>'+
        	'<div class="modal-body page-content-h" id="modalBody"></div>'+
        	'</div>');*/
        }
    };
    return chromeBootstrap;
});