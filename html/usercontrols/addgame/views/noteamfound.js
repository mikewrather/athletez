/**
 * Created with JetBrains PhpStorm.
 * User: mike
 * Date: 2/24/14
 * Time: 4:16 PM
 * To change this template use File | Settings | File Templates.
 */
define(['require',
	'facade',
	'views',
	'utils',
	'vendor',
	'usercontrol/addgame/collections/orgs',
	'usercontrol/addgame/views/neworg',
	'usercontrol/addgame/views/orgchoose',
	'usercontrol/addgame/models/opponent',
	'vendor/plugins/spin.min',
	'component/forms'],
	function(require) {

	var self,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		$ = facade.$,
		Spinner = require('vendor/plugins/spin.min'),
		OrgsCollection = require('usercontrol/addgame/collections/orgs'),
		NewOrgView = require('usercontrol/addgame/views/neworg'),
		OrgChooser = require('usercontrol/addgame/views/orgchoose'),
		OpponentModel = require('usercontrol/addgame/models/opponent'),
		FormComponent = require('component/forms');

	var BaseView = views.BaseView,
		Backbone = facade.Backbone,
		_self;
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : "",
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click #add_team_2-h":"addTeamToNewOrg"
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;

			_self.setOptions(options);

			var orgsCollection = new OrgsCollection();
			orgsCollection.org_name = _self.search_text;
			orgsCollection.states_id = _self.states_id;
			orgsCollection.sports_club = _self.sports_club;
			orgsCollection.single_sport_id = _self.teamOneModel.get("payload").org_sport_link_obj.org.single_sport_id;

			orgsCollection.fetch();
			$.when(orgsCollection.request).done(function(res){

				console.log(_self.teamOneModel);

				if(res.payload && res.payload.length){

					if(!_self.destination.find('div#dynamic_add_org').length){
						_self.destination.append('<div id="dynamic_add_org"></div>');
					}

					_self.destination.find('div#dynamic_add_team_2').remove();

					var orgChoose = new OrgChooser({
						el:$('div#dynamic_add_org'),
						user_text:_self.search_text,
						data: res.payload,
						seasoninfo: {
							complevel:_self.teamOneModel.get("payload").complevels_obj.complevel_name,
							complevels_id:_self.teamOneModel.get("payload").complevels_id,
							seasons_id:_self.teamOneModel.get("payload").seasons_id,
							season:_self.teamOneModel.get("payload").seasons_obj.season_name,
							year:_self.teamOneModel.get("payload").year,
							sports_id:_self.sports_id
						},
						parentView:_self
					});

				}
				else
				{
					_self.destination.find('div#dynamic_add_org').remove();

					if(!_self.destination.find('div#dynamic_add_team_2').length){
						_self.destination.append('<div id="dynamic_add_team_2"></div>')
					}

					var newOrgView = new NewOrgView({
						el:_self.destination.find('#dynamic_add_team_2'),
						search_text:_self.search_text,
						parentView:_self
					});
				}

			});

		},

		//render displays the view in browser
		render : function() {
		//	Backbone.View.prototype.render.call(this);
			var markup = _.template(this.template,{});
			this.$el.html(markup);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
			console.log(this.teamOneModel);
		},

		destroy_view: function() {

			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();

			this.$el.removeData().unbind();

			//Remove view from DOM
			this.remove();
			Backbone.View.prototype.remove.call(this);

		},

		setTeamTwoToNewTeam : function(teamModel){
			_self.destination.find('div#dynamic_add_team_2').remove();
			_self.destination.find('div#dynamic_add_org').remove();
			_self.destination.find('span.indicator-h').removeClass('invalid').addClass('valid');

			$('input[name="Select_Team_2"]').val(teamModel.get('payload').team_name);
			$('input[name="Select_Team_2"]').attr('data-id',teamModel.get('payload').id);
			this.formval_this.callback(teamModel.get('payload').id);
			this.formval_this.afterSetValue("show");
		},

		setupOrgLocationForm:function(el){

			var _self = this,
				newEl = $(el).parent().html('<div id="neworg-location-form"></div>');

			var formData = new FormComponent({
				'Location' : {
					tooltip: "Enter the location of the opponent organization.  You can enter an address, or, if you don't know it, just a city or state.",
					form_values: {
						serverKey : "locations_id",
						post_to_server	: true,
						serverDbField: 'locations_id'
					},
					type : 'Location',
					label: "Enter the location of \"" + this.search_text + "\"",
					validators : [{type : 'required',
						message : 'Please select location.'}]
				},'submit' : {
					type : 'Submit',
					fieldClass: "button-field",
					attr : {
						'value' : 'Add New Club'
					},
					showLable : false,
					onSubmit : function(e) {
						var errors = form.commit();
						if (errors) {
							// auto scroll to focus element which has error
							for (var i in errors) {
								var $ob = $("*[name=" + i + "]"), $pos = $ob.position();
								$ob.parents(".common-modal #modalBody").animate({
									scrollTop : $pos.top
								}, '500', function() {
									$ob.addClass('focus-error-animation');
									setTimeout(function() {
										$ob.removeClass('focus-error-animation');
									}, 2000);
								});
								break;
							}
						} else {
							var opts = {
								lines: 15, // The number of lines to draw
								length: 5, // The length of each line
								width: 2, // The line thickness
								radius: 3, // The radius of the inner circle
								corners: 1, // Corner roundness (0..1)
								rotate: 0, // The rotation offset
								direction: 1, // 1: clockwise, -1: counterclockwise
								color: '#000', // #rgb or #rrggbb or array of colors
								speed: 0.6, // Rounds per second
								trail: 60, // Afterglow percentage
								shadow: false, // Whether to render a shadow
								hwaccel: true, // Whether to use hardware acceleration
								className: 'spinner', // The CSS class to assign to the spinner
								zIndex: 2e9, // The z-index (defaults to 2000000000)
							};
							var spinner = new Spinner(opts).spin();
							$(e.currentTarget).append(spinner.el);

							if(confirm("This will add " + _self.search_text + " " +
								_self.teamOneModel.get("payload").complevels_obj.complevel_name + " " +
								_self.teamOneModel.get("payload").org_sport_link_obj.sport.sport_name + " " +
								_self.teamOneModel.get("payload").seasons_obj.season_name + " " +
								_self.teamOneModel.get("payload").year + ".  Continue?")){


								var formData = _self.formValues.getFormValues();

								var team1_id = _self.teamOneModel.get("payload").id;
								var opponentModel = new OpponentModel({
									id:team1_id,
									name:_self.search_text,
									locations_id:formData.locations_id
								});
								opponentModel.save();

								$.when(opponentModel.request).done(function(res){
									_self.setTeamTwoToNewTeam(opponentModel);
									return true;
								});
							} else {
								spinner.stop();
								$(e.currentTarget).removeClass('region-loader').on('click',addTeamToNewOrg);
								return false; }
						}
					}
				}
			},newEl.find('#neworg-location-form'));

			var form = formData.form;
			this.formValues = formData.formValues;
		},

		addTeamToNewOrg : function(e){

			var _self = this,
				el_cont = $(e.currentTarget).html();

			$(e.currentTarget).addClass('region-loader').off('click');

			console.error(e);

			this.setupOrgLocationForm(e.currentTarget);

		}

	});
});
