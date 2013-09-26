/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/season-item.html', 'facade', 'views', 'utils', 'vendor', 
  'profilesetting/models/complevel' ], function(require, template) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'),
	Mustache = vendor.Mustache, $ = facade.$,

	HighSchoolView = SectionView.extend({

		template : template,
		
		/*Bind Events on controls present in current view template*/
		events : {
		},
		
		/*Holds */

		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
		//	mainSection : '#div-school-seasons',
			chkSeasons : '.chkSeasons',
		},
		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Couldn\'t find any matches',
			optionsMissing : 'HeaderView expects option with model property.'
		},
		
		/*Contains all the properties and variables used in current view */
		properties : {
			
			show_prev_year : 2, // Used to display number of previous years in view
			
		},
		
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			self = this;
			self.setOptions(options);
			self.render();
			
		},
		
		/*Set All the Options set at the time of creating instance*/
		setOptions :function(options){
			if(!options.orgs_id || !options.user_id || !options.sport_id || !options.complevel_id)
				throw new Error("Parameters missing for Seasons View");
			else
			{
				this.destination = options.destination,
				this.collection = options.collection,
				this.sport_id = options.sports_id,
				this.org_id = options.orgs_id,
				this.user_id = options.user_id,
				this.complevel_id = options.complevel_id,
				this.el = options.destination,
				
				//Properties section
				this.properties.show_prev_year = options.show_prev_year || this.properties.show_prev_year
			}
		},

		/*function used to bind events on controls not present in current $el
		 Always use on so that dynamic creation of controls could be handled
		 * */
		bindEvents : function() {		},
		
		/*Returns the consolidated data to bind with template */
		GetData :function(collection){
			var data = [];
			var y = (new Date).getFullYear();
			for(var i = self.properties.show_prev_year; i >= 0; i--  ){
				var temp = {
					year : y,
					seasons : collection
				};
				data.push(temp);
				y--;
			}
			return  {Data : data};
		},
		/* Displays the data view*/
		render : function() {
			
			var markup = Mustache.to_html(self.template, self.GetData(this.collection));
            $(self.destination).html(markup);
		}
	});

	return HighSchoolView;
});
