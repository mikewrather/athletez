// Facebook Image Board View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {RegistrationFBImageBoardView} constructor

define([
        'require', 
        'text!registration/templates/fbimage-board.html', 
        'facade', 
        'views',
        'utils',
        'jquery.jrac'
        ], 
function(require, imageBoardTemplate) {

    var RegistrationFBImageBoardView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        BaseView = views.BaseView,
        _ = facade._,
        $ = facade.$,
        Channel = utils.lib.Channel;

    RegistrationFBImageBoardView = BaseView.extend({

        tagName: "div",
        
        className: "image-board",

        template: imageBoardTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ImageBoardView expected options.model.");
            }            
        },

        render: function () {
        	console.log("fb image board render");
        	console.log("fb image board collection");
        	console.log(this.collection);
            var self = this;
            
            BaseView.prototype.render.call(this);            
        },
        
        selectArea: function(img, selection) {
            $('#x1').val(selection.x1);
            $('#y1').val(selection.y1);
            $('#x2').val(selection.x2);
            $('#y2').val(selection.y2);
            $('#w').val(selection.width);
            $('#h').val(selection.height);
        },
        
        initCropView: function() {
            $('#image-select').jrac({
                'crop_width': 150,
                'crop_height': 150,
                'crop_aspect_ratio': '1:1',
                'crop_x': 100,
                'crop_y': 100,
                'image_width': 400,
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
        
        removeCropView: function() {
            $('#image-select').jrac('destroy');
            $('#image-select').parent().find('.natual-size').remove();
        },
        
        getImageInfo: function() {
            var fields = this.$(".coords :input").serializeArray();
            var payload = this.model.get('payload');
            $.each(fields, function(i, field){
                payload[field.name] = field.value;
            });
            this.model.set('payload', payload);
        }
        
    });

    return RegistrationFBImageBoardView;
});