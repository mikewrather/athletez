/* // SENT View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {SENTRESUMEVIEW} constructor
 */
define(['require', 'text!userresume/templates/sentresume.html',
 'facade', 'views', 'utils', 'vendor',
  'userresume/collections/sentresumes'
        ], function(require, sentResumeTemplate) {

	var self,
	 facade = require('facade'),
	  views = require('views'), 
	  SectionView = views.SectionView,
	   utils = require('utils'),
	    Channel = utils.lib.Channel,
	     vendor = require('vendor'),
	      Mustache = vendor.Mustache, 
	      $ = facade.$,
	       SentResumeCollection = require('userresume/collections/sentresumes'),
	       SentResumeView = SectionView.extend({

		template : sentResumeTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Not Exists For Resumes."
		},
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);
			this.init();
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
			this.el = options.destination;
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
		},

		/*render displays the view in browser*/
		render : function() {
			var self = this;

			SectionView.prototype.render.call(this);
		},

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
		var self = this;
			var payload = {
				user_id : self.user_id
			};
			var sentResumeCollection = new SentResumeCollection(payload);
			sentResumeCollection.user_id = self.user_id;
			sentResumeCollection.fetch();

			$.when(sentResumeCollection.request).done(function() {
				if (sentResumeCollection.isError())
					return;

				var models = sentResumeCollection.toJSON();
				 if (models.length) {
					var d = [];
					
					$.each(models,function(index,load){
						
						d.push(load.payload);
					});
					self.Resumes = models;
					var markup = Mustache.to_html(self.template, {
					resumes : d
					});
					$(self.el).html(markup);
					//		console.log("Teams View Self El",self.el)
				} else {
					$(self.el).html(self.messages.dataNotExist);

				}

			});
		// this.scheme.push(this.basicView);
		}
	});

	return SentResumeView;
});
