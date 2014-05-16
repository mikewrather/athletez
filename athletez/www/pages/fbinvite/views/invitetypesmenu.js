// Schedule-item.js  
// -------  
// Requires `define`

define(['fbinvite/views/invitetypes','text!fbinvite/templates/invitetypesmenu.html'],
	function (InviteTypesMain,layoutTemplate) {

		return InviteTypesMain.extend({
			template:layoutTemplate,
			events:{
				"click #inviteMainMenu":"showMainMenu"
			},
			showMainMenu:function(e){
				this.controller.setupInviteTypesView();
			}
		});
	});