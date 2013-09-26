define([
	'require',
	'text!signup/templates/imageupload.html', 
    'backbone',
    'underscore',
    'views',
    'facade', 
    'utils',
    'jquery.jrac' 
	],function(require,  signupBasicTemplate,backbone,_) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
              
              initialize: function (options) {
                   
                    this.template =  _.template(signupBasicTemplate);
                    this.$el = $(options.destination);
                    this.render();
                                    
                },
                render: function(){

                    this.$el.html(this.template);
                    this.userinfo(this.options.attr);

                   // this.registrationElements();
                    //this.payload=this.finalRegistrationPayload(this.options.attr);
                    //this.fetchpayload(this.payload); 
                },     
                events:{
                 "change input":"preview", 
                 "click #crpimgup": "imageupload",
                 "click #skip":"skip"
                },
                skip:function(event){
                    event.preventDefault();
                     window.location.href = "#usersettings";
                },
                userinfo:function(attrs){
                    
                    // attrs get the registered user inf from successfull registration 
                },
                preview:function(event){
                    //var current = this;
                    this.removeCropView();
                    var URL = window.URL || window.webkitURL;
                    window.fileURL = URL.createObjectURL(event.target.files[0]);
                    this.srcimg = window.fileURL;
                    $("#image-select").attr({
                       src:window.fileURL
                    });
                    this.initCropView();
                },
                initCropView: function() {
                   
                     $('#image-select').jrac({
                                'crop_width': 200,
                                'crop_height': 240,
                                'crop_aspect_ratio': '1:1',
                                'crop_x': 0,
                                'crop_y': 0,
                                'crop_resize': false,
                                'viewport_resize': false,
                                'viewport_onload': function() {
                                    var $viewport = this;
                                    var inputs = $viewport.$container.parent('.pane').find('.coords input:hidden');
                                    var events = ['jrac_crop_x','jrac_crop_y','jrac_crop_width','jrac_crop_height','jrac_image_width','jrac_image_height'];
                                    for (var i = 0; i < events.length; i++) {
                                        var event_name = events[i];
                                        // Register an event with an element.
                                        $viewport.observator.register(event_name, inputs.eq(i));
                                        // Attach a handler to that event for the element.
                                        inputs.eq(i).bind(event_name, function(event, $viewport, value) {
                                                $(this).val(value);
                                            })
                                        // Attach a handler for the built-in jQuery change event, handler
                                        // which read user input and apply it to relevent viewport object.
                                        .change(event_name, function(event) {
                                            var event_name = event.data;
                                            $viewport.$image.scale_proportion_locked = $viewport.$container.parent('.pane').find('.coords input:checkbox').is(':checked');
                                            $viewport.observator.set_property(event_name,$(this).val());
                                        });
                                    }
                                    $viewport.$container.append('<div class="natual-size">Image natual size: ' +$viewport.$image.originalWidth+' x ' +$viewport.$image.originalHeight+'</div>')
                                }
                        })
                        // React on all viewport events.
                        .bind('jrac_events', function(event, $viewport) {
                          var inputs = $(this).parents('.pane').find('.coords input');
                          
                        inputs.css('background-color',($viewport.observator.crop_consistent())?'chartreuse':'salmon');
                        });
                },
                       
                imageupload: function(event){
                    event.preventDefault();
                    this.getImageInfo();
                },       
               
                removeCropView: function() {
                    $('#image-select').jrac('destroy');
                    $('#image-select').parent().find('.natual-size').remove();
                },
        
                getImageInfo: function() {
                   var payload=[];
                   var fields = this.$(".coords :input").serializeArray();
                   payload['image_url']=this.srcimg;
                   $.each(fields, function(i, field){
                        payload[field.name] = field.value;
                    });
                    
                    //this.model.set('payload', payload);
                    console.log(payload,"finalRegistrationPayload");

                    this.model.save(payload,
                       {
                            success: function(msg) {
                              
                              
                                /* update the view now */
                                 Channel('upload-user-image').publish(msg);
                            },
                            error: function() {
                                /* handle the error code here */
                            }
                        } );

                }


            });
            
            return SignupBasicView;

    }); 