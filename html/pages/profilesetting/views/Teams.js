/* // Teams iew
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {teama_listing} constructor
 */
define(['require', 'text!profilesetting/templates/teamlist.html', 'facade', 'views', 'utils', 'vendor', 
  'profilesetting/collections/teams' ], function(require, template) {

	var self, View, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'),
	Mustache = vendor.Mustache, $ = facade.$,
	TeamsCollection = require('profilesetting/collections/teams'),
	View = SectionView.extend({

		template : template,
		
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
		},
		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Data not exist.',
			optionsMissing : 'HeaderView expects option with model property.'
		},
		
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			self = this;
			self.setOptions(options);
			self.render();
		},
		
		/*Set All the Options set at the time of creating instance*/
		setOptions :function(options){
			if(!options.user_id && !options.destination)
				throw new Error("Parameters missing for Seasons View");
			else
			{
				this.destination = options.destination;
				this.user_id = options.user_id;
				this.sports_club = options.sports_club;
				this.el = options.destination;
			}
		},

		/*function used to bind events on controls not present in current $el
		 Always use on so that dynamic creation of controls could be handled
		 * */
		bindEvents : function() {		},
		
		/*Returns the consolidated data to bind with template */
		GetData :function(){
			console.log("sports_club",self.sports_club);
			console.log("Teams View Self El",self.el)
			var teamsCollection = new TeamsCollection();
			teamsCollection.user_id = self.user_id;
			teamsCollection.fetch();
			
			 $.when(teamsCollection.request).done(function() {
			 	console.log("teams collection",teamsCollection);
			 	console.log("Teams View Self El",self.el)
				 if (teamsCollection.isError())
					 return;
 
				var models = teamsCollection.toJSON();
			console.log("Teams Collection Models Are",models);
				if(models.length){
					var d = [];
					for(var i = 0; i < models.length; i++){
						d.push(models[i].payload);
					}
					
					var markup = Mustache.to_html(self.template, {orgs : d});
            			$(self.el).html(markup);
            			console.log("Teams View Self El",self.el)
				}
				else {
					$(self.el).html(self.messages.dataNotExist);
					
				}
							
			});
					},
		/* Displays the data view*/
		render : function() {
			self.GetData();
		}
	});

	return View;
});
