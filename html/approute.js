define([
	'underscore',
    'backbone',
	'jquery'
	], function(_,Backbone,$){
		return Backbone.Router.extend({
			initialize: function(){
			alert('initiated');
			},
			routes: {
				'user/:query' : 'showLogin'
			},
			showLogin: function(){
			alert("victory");
			}
		});
	}
);	