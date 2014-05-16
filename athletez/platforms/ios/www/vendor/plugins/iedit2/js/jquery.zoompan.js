(function($) {

    var prevX, prevY, picX_start, picY_start, newX, newY, pan, pic, real_width, real_height;
    var navigator_width = 151;
    var current_zoom = 0;
    var current_color = 'ffffff';

    var resetValues = function () {
        prevX = 0;
        prevY = 0;
        picX_start = 0;
        picY_start = 0;
        newX = 0;
        newY = 0;

        return true;
    };

    var alignVertical = function(pan) {
        var min_height = parseInt(pan.parent().css('min-height'));
        var pan_height = pan.height();
        var mt = 0;

        if (pan_height < min_height) {
            mt = (min_height - pan_height) / 2;
        }

        pan.css('margin-top', mt + 'px');

        return true;
    };

    var opts;

    var methods;
    methods = {
        init : function (options) {

            opts = $.extend({
                'width' : null,
                'height' : null,
                'min_width' : null,
                'fit_percent' : null,
                'overzoom' : false,
                'freeze_x' : false,
                'freeze_y' : false,
                'callback' : function () {}
            }, options);

            var box_width, box_height, exists, mousedown;

            function initView(img, container) {
                opts.slider.slider('enable');
                // fit to width wider pictures
                if (container.width() > opts.min_width) {
                    opts.fit_percent = fitToWidth(container);
                   if(opts.fit_percent != 0) $('.fit-description').text('Image in ' + opts.fit_percent + '% of actual resolution to fit screen').removeClass('none');
                }
                else {
                    $('.fit-description').addClass('none')
					console.log(  fitToWidth(container)); 
                }

                var container_w = container.width();
                var container_h = container.height();

                real_width = img[0].naturalWidth;
                real_height = img[0].naturalHeight;

                if (real_width < container_w || real_height < container_h) {

                    pic.hide();
//                    $(window).trigger('color.zoompan');
                    pan.zoompan('color', 'ffffff');
//                    var x_pos = Math.round((container_w - real_width) / 2);
//                    var y_pos = Math.round((container_h - real_height) / 2);
//                    pic.css('top', y_pos + 'px');
//                    pic.css('left', x_pos + 'px');
//                    opts.slider.slider('disable');
//                    return 0;
                }

                pan.data('size_w', real_width);
                pan.data('size_h', real_height);

//                if (real_width < container_w || real_height < container_h) {
//                    var x_pos = Math.round((container_w - real_width) / 2);
//                    var y_pos = Math.round((container_h - real_height) / 2);
//                    pic.css('top', y_pos + 'px');
//                    pic.css('left', x_pos + 'px');
//                    opts.slider.slider('disable');
//                    return 0;
//                }
								
                var base_percent_w = (container_w / real_width) * 100;
                var base_percent_h = (container_h / real_height) * 100;

                var img_width, img_height, base_dimension;

                if (real_width <= real_height) { // block width is main
                    base_dimension = Math.round(100 - base_percent_w);
                    img_width = container_w;
                    img_height = Math.round(real_height * img_width / real_width);
                }
                else if (real_width > real_height) { // block height is main
                    base_dimension = Math.round(100 - base_percent_h);
                    img_height = container_h;
                    img_width = Math.round(img_height * real_width / real_height);
                }

                alignVertical(pan);
				
                pic.width(img_width);
                pic.height(img_height);
                pic.css('left', '0px');
                pic.css('top', '0px');

                pan.data('size_w', img_width);
                pan.data('size_h', img_height);
				

                return base_dimension;
            }

            function fitToWidth(container) {
                var width = container.width();
                var base_percent = Math.round(opts.min_width / width * 100);

                var height = Math.round(opts.height * opts.min_width / opts.width);
				
                container.width(opts.min_width);
                container.height(height);
				
				setOtherWidths( opts.min_width );
				
                return base_percent;
            }

            function onpan(e) {

                var bg_size_w = parseInt(pan.data('size_w'));
                var bg_size_h = parseInt(pan.data('size_h'));

                var diffX = e.clientX - picX_start;
                var diffY = e.clientY - picY_start;

                if (mousedown) {

                    var in_areaX = true;
                    var in_areaY = true;

                    if (prevX + diffX >= 0) {
                        in_areaX = false;
                    }

                    if (-(prevX + diffX) > bg_size_w - box_width) {
                        in_areaX = false;
                        newX = (bg_size_w - box_width) * -1;
                    }

                    if (in_areaX) {
                        newX = prevX + diffX;
                    }

                    if (prevY + diffY >= 0) {
                        in_areaY = false;
                    }

                    if (-(prevY + diffY) > bg_size_h - box_height) {
                        in_areaY = false;
                        newY = (bg_size_h - box_height) * -1;
                    }

                    if (in_areaY) {
                        newY = prevY + diffY;
                    }

                    if (in_areaX || in_areaY) {
                        var obj = {};
                        if (!opts.freeze_x) {
                            pic.css('left', newX + 'px');
                            obj.left = newX;
                        }

                        if (!opts.freeze_y) {
                            pic.css('top', newY + 'px');
                            obj.top = newY;
                        }
						
                        methods.navigator('move', obj);
                    }
                }
            }
			
			function setOtherWidths( theWidth )
			{
				theWidth = parseInt(theWidth); 
				var leftOffset = theWidth + 55,
						setLeft = (leftOffset > 700) ? leftOffset : 725, 
						setWidth = ( theWidth  >= 700 ) ? theWidth  : 700; 
				$('div.imageEditor div.header').width(theWidth );
				$('div.imageEditor div.image').width(setWidth);
				$('div.imageEditor div.action').width(setWidth);
				$('div.imageEditor div.navigator').css('left',setLeft);		
				
			}
			

            function initialize() {
                resetValues();
                pic.show();

                pan.css('width', box_width + "px").css('height', box_height + "px");
				
				setOtherWidths( box_width );
				
                if (exists) {
                    return;
                }

                var base_dimension = initView(pic, pan);

                box_width = pan.width();
                box_height = pan.height();

                methods.navigator('init', {'img' : pic[0], 'viewport' : pan[0]});

//                if (0 !== base_dimension) {
//                    methods.navigator('init', {'img' : pic[0], 'viewport' : pan[0]});
//                }
//                else {
//                    methods.navigator('hide', {});
//                }

                if (opts.callback) {
                    opts.callback(base_dimension, opts, methods.navigator);
                }

                pan.mousedown(function(e) {
                    e.preventDefault();
                    mousedown = true;

                    picX_start = e.clientX;
                    picY_start = e.clientY;
                });

                $(document).bind('mousemove.zoompan', onpan);

                $(document).bind('mouseup.zoompan', function (e) {
                    onpan(e);
                    mousedown = false;

                    prevX = newX;
                    prevY = newY;
                });
				
				
            }

            return this.each(function () {

                mousedown = false;

                if ($(this).is("img")) {
                    pic = $(this);					
                }
                else if ($(this).is("div.pan")) {
                    pic = $(this).prev("img");
                }
                else {
                    throw "Not an image! panFullSize can only be used with images.";
                }

                pan = pic.find("div.pan");
                exists = pan.is("*");
                var x, y;

                if (exists) {
                    x = opts.width || pan.width();
                    y = opts.height || pan.height();
                }
                else {
                    x = opts.width || pic.width();
                    y = opts.height || pic.height();
                }

                box_width = x;
                box_height = y;

                if (!exists) {
                    pic.wrap('<div id="pan' + pic.attr("id") + '" class="pan"></div>');
                    pan = pic.parent("div.pan");
                    pic.get(0).complete ? initialize() : pic.load(initialize);
                }
                else {
                    initialize();
                }
            });
        },
        rotate : function(angle, img_url, cbk) {
            var preloader = $('<img id="preloader" src="/he_beta/www3/inc/preloader.gif">');
            preloader.load(function() {
                var x_pos = Math.round((pan.width() - preloader.width()) / 2);
                var y_pos = Math.round((pan.height() - preloader.height()) / 2);
                preloader.css('top', y_pos + 'px');
                preloader.css('left', x_pos + 'px');
                pan.append(preloader);
                pic.hide();
            });

            $.ajax({
                url : 'rotateimage.php',
                async : true,
                dataType : 'json',
                data : {'img' : img_url, 'angle' : angle, 'width' : opts.width, 'height' : opts.height, 'color' : current_color},
                success : function(response) {
                    var new_url = response.url;
                    pic.attr('src', new_url);
                    $('#preview').attr('src', response.preview);
                    real_width = response.width;
                    real_height = response.height;

                    $('#image_name').val(new_url);
                    pic.load(function() {
                        pic.show();
                        $('#preloader').remove();
                        pic.zoompan('zoom', current_zoom);
                        cbk();
                    });
                }}
            );
        },
        destroy : function () {
            $(window).trigger('reset.zoompan');
            pan.unbind();
            $(document).unbind('.zoompan');
            pic.unwrap();
        },
        zoom : function (value) {
           var old_value = 0;
            current_zoom = value;

//            if (0 == value) {
//                return false;
//            }
			

            this.each(function () {

                var img = this;

                var container_w = pan.width();
                var container_h = pan.height();

                var real_width = img.naturalWidth;
                var real_height = img.naturalHeight;
				
				// pixels in one percent
                var percent_w = real_width / 100;  
				
                var percent_h = real_height / 100;
				
				 // base zoom value (in percent)
                var base_percent_w = (container_w / real_width) * 100;
				
                var base_percent_h = (container_h / real_height) * 100;

                var new_percent_w = base_percent_w + value; // new percent value
                var new_percent_h = base_percent_h + value;

                var new_value_w = new_percent_w * percent_w; // new width
                var new_value_h = Math.round(new_percent_h * percent_h);

                var img_width, img_height;

                if (real_width < real_height) { // block width is main
                    img_width = new_value_w;
                    new_value_h = Math.round(real_height * img_width / real_width);
                }
                else if (real_width >= real_height) { // block height is main
                    img_height = new_value_h;
                    new_value_w = Math.round(img_height * real_width / real_height);
                }

                var pic_offset_w = pic.css('left');
                var pic_offset_h = pic.css('top');

                var old_value_w = pan.data('size_w');
                if (!old_value_w) {
                    old_value_w = container_w;
                }

                var old_value_h = pan.data('size_h');
                if (!old_value_h) {
                    old_value_h = container_h;
                }

                var offset_w, offset_h;

                if (value > old_value) {
                    offset_w = Math.round((new_value_w - old_value_w) / 2);
                    offset_h = Math.round((new_value_h - old_value_h) / 2);
                }
                else {
                    offset_w = Math.round((old_value_w - new_value_w) / 2);
                    offset_h = Math.round((old_value_h - new_value_h) / 2);
                }

                if (pic_offset_w && pic_offset_h) {
                    offset_w -= parseInt(pic_offset_w);
                    offset_h -= parseInt(pic_offset_h);
                }

                prevX = offset_w * -1;
                prevY = offset_h * -1;

                if (new_value_w <= offset_w + container_w) {
                    offset_w = new_value_w - container_w;
                }

                if (new_value_h <= offset_h + container_h) {
                    offset_h = new_value_h - container_h;
                }

                if (offset_w == 0) {
                    offset_w = 1;
                }

                new_percent_w = Math.round(new_percent_w);

                pic.width(Math.round(new_value_w));
                pic.height(Math.round(new_value_h));
                pic.css('left', '-' + offset_w + 'px');
                pic.css('top', '-' + offset_h + 'px');

                pan.data('size_w', new_value_w);
                pan.data('size_h', new_value_h);

                alignVertical(pan);

                methods.navigator('zoom', {'width' : new_value_w, 'height' : new_value_h, 'top' : -offset_h, 'left' : -offset_w, 'zoom' : value});

                $('#zoom-level').text(new_percent_w+'%');

                old_value = value;
            });
        },
        dimensions : function () {
            var img_offset_top = parseInt(pic.css('top'));
            var img_offset_left = parseInt(pic.css('left'));
            var img_width = pic.width();
            var img_height = pic.height();

            if (opts.fit_percent) {
                var inc_percent = (100 - opts.fit_percent) * 0.01;
                img_offset_left += img_offset_left * inc_percent;
                img_offset_top += img_offset_top * inc_percent;
                img_width += img_width * inc_percent;
                img_height += img_height * inc_percent;
            }

            return {
                'size':[img_width, img_height],
                'coords':[img_offset_left, img_offset_top],
                'box':[opts.width, opts.height],
				'zoom' : current_zoom
            };
        },
        navigator : function (event_name, event_data) {

            var nav_container = $('.navigator');

            function findPos(obj) {
                var curtop = 0;
                var curleft = 0;

                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop  += obj.offsetTop;
                    }
                    while (obj = obj.offsetParent);
                }

                return [curleft, curtop];
            }

            function navigatorHandler() {
                var target = opts.navigator.parent('div');

                function onViewportMove(x, y) {

                    if ($('div.viewport').width() == $('#preview').width() || $('div.viewport').height() == $('#preview').height()) {
                        return false;
                    }

                    var ratio_w = pic.width() / opts.navigator.width();
                    var ratio_h = pic.height() / opts.navigator.height();

                    var left = Math.round(x * ratio_w);
                    var top = Math.round(y * ratio_h);

                    if (pic.width() - left < pan.width()) {
                        left = pic.width() - pan.width();
                    }

                    if (pic.height() - top < pan.height()) {
                        top = pic.height() - pan.height();
                    }

                    left = left * -1;
                    top = top * -1;

                    if (!opts.freeze_x) {
                        pic.css('left', left + 'px');
                    }

                    if (!opts.freeze_y) {
                        pic.css('top', top + 'px');
                    }

                    prevX = newX = left;
                    prevY = newY = top;

                    return true; 
                }

                opts.viewport_node.draggable({
                    drag : function(event, ui) {
                        return onViewportMove(ui.position.left, ui.position.top);
                    },
                    containment : target
                });

                navigator_node.bind('click', function(e) {
                    var pic_container = $(this).parent();
                    var block_position = findPos(pic_container[0]);

                    var x_pos = (e.pageX - this.offsetLeft) - block_position[0];
                    var y_pos = (e.pageY - this.offsetTop) - block_position[1];
                    var viewport_w = opts.viewport_node.width();
                    var viewport_h = opts.viewport_node.height();
                    var half_point_x = Math.round(viewport_w / 2);
                    var half_point_y = Math.round(viewport_h / 2);

                    var viewport_new_x = x_pos - half_point_x;
                    if (viewport_new_x + viewport_w > pic_container.width()) {
                        viewport_new_x = pic_container.width() - viewport_w;
                    }
                    else if (viewport_new_x < 0) {
                        viewport_new_x = 0;
                    }

                    var viewport_new_y = y_pos - half_point_y;
                    if (viewport_new_y + viewport_h > pic_container.height()) {
                        viewport_new_y = pic_container.height() - viewport_h;
                    }
                    else if (viewport_new_y < 0) {
                        viewport_new_y = 0;
                    }

                    viewport_new_x = (viewport_new_x == 0) ? viewport_new_x : viewport_new_x - 4;
                    viewport_new_y = (viewport_new_y == 0) ? viewport_new_y : viewport_new_y - 4;

                    opts.viewport_node.css('left', viewport_new_x);
                    opts.viewport_node.css('top', viewport_new_y);

                    onViewportMove(viewport_new_x, viewport_new_y);
                });
            }

            switch (event_name) {
                case 'init':
                    nav_container.show();
                    var navigator_node = $('#preview'), 
					navigator_container = $('#theNavigator');
                    opts.navigator = navigator_node;
                    opts.viewport_node = $('div.viewport');

                    // init view
                    var img = event_data.img;
                    var navigator_height = Math.round(img.naturalHeight * navigator_width / img.naturalWidth);

                    if (!navigator_node.attr('src')) {
                        navigator_node.attr('src', 'upload/thumbs/' + opts.thumb_name);
                    }
                    navigator_node.width(navigator_width);
                    navigator_node.height(navigator_height);
                    navigator_container.removeClass('none');

                    var viewport = event_data.viewport;
                    opts.original_viewport = viewport;
                    opts.viewport_width = navigator_width;
                    opts.viewport_height = null;
                    opts.navigator_ratio_w = viewport.clientWidth / opts.viewport_width;

                    if (pic.width() < pic.height()) {
                        opts.viewport_height = Math.round(viewport.clientHeight * opts.viewport_width / viewport.clientWidth);
                    }
                    else {
                        opts.viewport_height = navigator_height;
                        opts.viewport_width = Math.round(opts.viewport_height * viewport.clientWidth / viewport.clientHeight);
                    }

                    opts.navigator_ratio_h = viewport.clientHeight / opts.viewport_height;

                    opts.viewport_node.width(opts.viewport_width);
                    opts.viewport_node.height(opts.viewport_height);
                    opts.viewport_node.css('top', 0);
                    opts.viewport_node.css('left', 0);

                    navigatorHandler();
                    break;
                case 'hide':
                    nav_container.hide();
                    break;
                case 'move':
                    var nav_width = opts.viewport_node.width();
                    var nav_ratio = opts.original_viewport.clientWidth / nav_width;
                    var new_top = Math.round(event_data.top / nav_ratio) * -1;
                    var new_left = Math.round(event_data.left / nav_ratio) * -1;

                    if (!opts.freeze_y) {
                        opts.viewport_node.css('top', new_top-3 + 'px');
                    }

                    if (!opts.freeze_x) {
                        opts.viewport_node.css('left', new_left+3 + 'px');
                    }
                    break;
				
				case 'refresh' :
						  opts.viewport_node.css('top',0);
						  opts.viewport_node.css('left', 0);
						  $('#mypic').css( { top : 0, left : 0 } ); 
						  console.log('refreshed'); 
					break;
										
                case 'zoom':
                    var ratio_w = pic.width() / pan.width();
                    var ratio_h = pic.height() / pan.height();
                    var w_level = Math.round(opts.navigator.width() / ratio_w);
                    var h_level = Math.round(opts.navigator.height() / ratio_h);

                    opts.viewport_node.width(w_level);
                    opts.viewport_node.height(h_level);
                    this.navigator('move', event_data);
                    break;
                case 'destroy':
                    break;
            }
        },
        color : function(color) {
            current_color = color;
            $.ajax({
                url : 'resizetoframe.php',
                async : false,
                dataType : 'json',
                data : {'img' : $('#img_original').val(), 'width' : opts.width, 'height' : opts.height, 'color' : color},
                success : function(response) {
                    var new_url = response.url;
                    pic.attr('src', new_url);
                    $('#preview').attr('src', response.preview);
//                                pic.zoompan('destroy');
//                                pic.zoompan('init', opts);

                    real_width = opts.width;
                    real_height = pan.height();
                    $('#preview').removeAttr('style');
                    pic.load(function() {
                        window.setTimeout(function () {
                            pic.zoompan('zoom', current_zoom);
                            pic.zoompan('zoom', current_zoom);
                        }, 650);

                        pan.css('background-color', '#' + color);
                    });

                    $('#image_name').val(new_url);
                    pic.show();
                }
            });
        }
    };

    $.fn.zoompan = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.zoompan');
        }
    };

})(jQuery);


