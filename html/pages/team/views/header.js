// Header View
// ---------
// Package Team
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!team/templates/header.html', 
        'text!team/templates/sport-select.html',
        'team/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'team/collections/sports',
        'team/views/sport-list',
        'usercontrol/dropdown/view/dropdown',
		'sportorg/models/org',
        'team/collections/seasonteams',
		"component/form",
        'team/collections/complevels'
        ],
function(require, headerTemplate, selectSportTemplate) {

    var TeamHeaderView,
        facade = require('facade'),
        views = require('views'),
        TeamBasicsModel = require('team/models/basics'),
	    OrgBasicsModel = require('sportorg/models/org'),
        SectionView = views.SectionView,
        TeamSportListView = require('team/views/sport-list'),
        TeamSportList = require('team/collections/sports'),
        DropDownList = require('usercontrol/dropdown/view/dropdown'), 
		SeasonTeams = require('team/collections/seasonteams'),
        CompLevels = require('team/collections/complevels'),
	    FormComponent = require('component/forms'),
        
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
        _ = facade._;
        

    TeamHeaderView = SectionView.extend({

        template: headerTemplate,
        
        selectSportTemplate: selectSportTemplate,
        
        events: {
        	"click #editTeamLink" : "openEditPopup"
        },

        initialize: function (options) {
            this.controllerObject = options.controllerObject;
            SectionView.prototype.initialize.call(this, options);
            _.bindAll(this);
        },
        
         selectSport: function(event) {
        	self.select_sport = self.$('#select-sport');
            var sport_id = this.select_sport.val();
            //this.$('.sport-info').stop().slideUp();
            //this.$('.sport-info-' + sport_id).stop().slideDown();
            //Channel('teamsports:select' + sport_id).publish();            
        },
        
        // update header data
        updateHeaderData: function(id) {
        	var _self = this;
        	if(_self.model.id != id) {
	        	_self.model.id = id;
	        	_self.model.fetch();
	        	$.when(_self.model.request).done(function() {
	        		_self.render();
	        		var payload = _self.model.get("payload"), id = payload.id,
		 			name = payload.org_sport_link_obj.org.name;
	        		_self.controllerObject.setupRosterView(id, name);
	        		// show votes button
	        		_self.controllerObject.showVote();
	        		
	        	});
        	}
        },
        
        
        showAllTeamData: function() {
        	routing.trigger('refresh-teampage', $("#sports-h").val(), $("#team-h").val(), this.season.id);
        },
        
        insertOption: function($target, data) {
        	var html = '', len = data.length;
        	for(var i = 0; i < len; i++) {
        		html += '<option value="'+data[i].payload.sport_id+'">'+data[i].payload.sport_name+'</option>';
        	}
        	$target.html(html);
        },
        
        setupSportListView: function() {
            var self = this,
                sportListView = new TeamSportListView({
                    collection: this.sports
                }),
                renderSportListView = this.addChildView(sportListView);
			    // console.log("SPORTS LIST",this.sports);

            this.childViews.sportListView = sportListView;
            this.callbacks.add(function () {
                renderSportListView();
            });
            
            function callback () {
                sportListView.render();
                self.$el.find('#sports-info').html(sportListView.el);
                var data = {"payload": []};
                var collection = sportListView.collection;
                if (collection.length) {
                    for (i = 0; i < collection.length; i++) {
                        data["payload"][i] = collection.at(i).get('payload');
                    }
                    var markup = Mustache.to_html(self.selectSportTemplate, data);                                
                    self.$el.find('#sports-info').prepend(markup);
                } else {
                    self.$el.find('#sports-info').html('');
                }
            }
            Channel('teamsports:fetch').subscribe(callback);      
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }           
        },
        
        // get user name by id
        getName: function() {
        	var title = this.model.get("payload").org_name;
        	
        	if(this.model.get("payload").complevels_obj.complevel_name)
	        	title += " | "+ this.model.get("payload").complevels_obj.complevel_name;
	        	
	        if(this.model.get("payload").org_sport_link_obj.sport.sport_name)
	        	title += " | "+ this.model.get("payload").org_sport_link_obj.sport.sport_name;	
	        	
	        if(this.model.get("payload").seasons_obj.season_name)
	        	title += " | "+ this.model.get("payload").seasons_obj.season_name;
	        	
	       if(this.model.get("payload").year)
	        	title += " | "+ this.model.get("payload").year;	
	        	
	       return title; 	
        },

	    openEditPopup: function() {
		    if(!this.checkForUser()) {
			    routing.trigger('showSignup');
			    return;
		    }
		    var options = {
			    height : "500px",
			    width : "500px",
			    html : '<div id="editTeamForm"></div>',
			    title : "Edit Organization Info"
		    };
		    routing.trigger('common-popup-open', options);
		    this.drawEditTeamForm();

	    },

	    drawEditTeamForm: function(){

		    var _self = this,
			    orgObj = _self.model.get("payload").org_sport_link_obj.org,
			    orgLocation = orgObj.locations;

		    var formData = new FormComponent({

			    'orgname' : {
				    form_values: {
					    defaultValue : orgObj.name,
					    post_to_server	: true,
					    serverDbField: 'name',
					    serverKey: "name"
				    },

				    type : 'Text',
				    fieldClass: "",
				    attr : {
					    'placeholder' : 'Event Name',
					    'class' : "txt-org-name"
				    },

				    showLable : true,
				    label: "Organization Name"

			    },
			    'Location' : {
				    form_values: {
					    defaultValue : orgLocation.full_address,
					    serverKey : "locations_id",
					    post_to_server	: true,
					    serverDbField: 'locations_id'
				    },
				    longitude: orgLocation.lon,
				    latitude : orgLocation.lat,
				    locationId : orgLocation.id,
				    type : 'Location',
				    label: "Location",
				    validators : [{type : 'required',
					    message : 'Please select location and click the "Verify Address" button'}]
			    },
			    'users_id'	: {
				    form_values: {
					    serverKey: _self.users_id,
					    post_to_server	: true,
					    value: _self.user_id
				    },
				    type: "Hidden"
			    },
			    'submit' : {
				    type : 'Submit',
				    fieldClass: "button-field",
				    attr : {
					    'value' : 'Save Changes'
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
						    if(_self.formValues) {
							    var formData = _self.formValues.getFormValues();
						    } else {
							    var formData = form.getValue();
						    }

						    var formData = _self.formValues.getFormValues(), self = _self;

						    var orgBasic = new OrgBasicsModel({id:orgObj.id});
						    console.log(orgBasic);

						    orgBasic.set({
							    locations_id : formData['locations_id'],
							    name : formData.name
						    });
						    orgBasic.save({});

						    //window.formValues1.showServersErrors([{ key: "gameDay", message: "error_message" }]);
						    $.when(orgBasic.request).done(function(res){
							    _self.updateHeaderData(self.model.id);
							    routing.trigger('common-popup-close');
						    });

						    $.when(orgBasic.request).fail(function(res) {
							    var response = JSON.parse(res.responseText);
							    var errorArray = response.exec_data.error_array;
							    _self.formValues.showServersErrors(errorArray);
						    });

					    }
				    }
			    },
			    'button' : {
				    type : 'Button',
				    fieldClass: "button-field",
				    attr : {
					    'value' : 'Cancel',
					    'class' : 'cancel-btn'
				    },
				    onClick : function() {
					    routing.trigger('common-popup-close');
				    },
				    showLable : false
			    }
		    }, $('#editTeamForm'));

		    var form = formData.form;
		    this.formValues = formData.formValues;

	    },

	    updateHeaderData: function(id) {
		    var _self = this;
		    _self.model.id = id;
		    _self.model.fetch();
		    $.when(_self.model.request).done(function() {
			    _self.render();
		    });
	    },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
        	document.title = this.getName();
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        }
        
       
        
                
    });

    return TeamHeaderView;
});