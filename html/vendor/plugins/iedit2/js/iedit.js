/** Image - Editor Plugin 2012 **/

(function($) {
    // Image editor container and image 
    var $container, $image, slideValue, $zoom, zminNum = 100, zmaxNum, $menu, $loader; 
	
	// added by Micheal Jackson ...
	var $navigator_thumb_img, $marker, org_image_width, org_image_height;
	
    // defaults
    var defaults = {
        allowZoom: true,
        allowPan: true,
        viewportWidth: 400,
        viewportHeight: 300,
        maxWidth: 2000,
        maxZoom: 200,
        topX: -1,
        topY: -1,
        bottomX: -1,
        bottomY: -1,
        startZoom: 100, 
        callback: function(topX, topY, bottomX, bottomY) {}
    };
	
    var methods = {
        start : function(options) {
            var self = this; 
            // Get Dom Element in array
            return this.each( function() {		
                setEditDefaults( this, options ); // Set defaults				 
            });
        }, // end initi
                  
        destroy : function () {
            $image.unbind(); 
            $zoom.unbind();                     
            $menu.empty(); 
            $container.unbind();
        } // end destory
    }; // end methods
    
    function setupDisplay(values) {
  	    // Create the edit table
		var html =  '<table cellspacing="0" cellpadding="0" class="image-display">' + 
					    '<tr><td class="displayzone">' +
						    '<div class="container">' +
								//'<div class="head"><h1>'+values.title+'</h1></div>' +
								'<img id="displayonly" src="'+values.edited+'">' + 
								'<div class="nav"><a id="goEdit">Edit Image</a></div>' +
							'</div>' +
						'</td></tr>' +
					'</table>'; 
	   
		$container.find('div.display-main').append(html);             
		$container.find('#goEdit').bind('click', function() {
			showEdit();
		});
    }
    
    function setEditDefaults( that, options ) {
        // Set the container and image dom
        $container = $(that); 
                
        //Create the edit table
		var html = '<table cellspacing="0" cellpadding="0" class="image-edit show"><tr><td class="panzone">'                                          
								+'</td></tr>'
								+'<tr><td class="tools">'
										+'<div class="menu">'                                     
										+'</div>'
								+'</td></tr>'
								+'</table>'; 
		 //Add html element into document
		 $container.find('div.display-main').append(html);                  
					  
		//Setup Relations
		$image = $('<img>', {'id': 'main_image', 'class': 'image', src: options.original});
		$menu = $container.find('.menu');

		//Hide image
		$image.css({
			display:"none"
		});
		  
		//Get default dimensions		
		var dim=$.extend({},defaults,options);		
		$image.data("dim",dim);
		  
		//Create and set default viewport				  
		var $viewport=setupViewport(true).append($image);                
	   
		 //Insert Viewport with image
		$container.find('td.panzone').append( $viewport );
		 
		// Setup the Image in the editor after it loads
        // Due to IE quirks, first check if cached image is available, else load the image
        $image.each(function() {
            if ($image.height() > 0) setupEdit(options);
            else {
                $image.load(function() { setupEdit(options);  });
            }
        });
    }
    
    //Setup the Image Editor
    function setupEdit(options)
    {
         //Get Dimensions
            var dim=$image.data("dim");
            //Set Actual Dimensions
            dim.actualWidth=$image.width();
            dim.actualHeight=$image.height();
            //Set Base current width and height
            dim.width=dim.actualWidth;
            dim.height=dim.actualHeight;	

			//Set viewport locations		
            if(dim.topX<0)
            {
                dim.topX=0,dim.topY=0;					
                //Set the images bigger length to the default min length
                if( (dim.actualWidth / dim.viewportWidth ) > ( dim.actualHeight / dim.viewportHeight) )
                {
                    dim.bottomY=dim.actualHeight;
                    dim.bottomX=dim.viewportWidth*(dim.actualHeight/dim.viewportHeight);
                }
                else{
                    dim.bottomX=dim.actualWidth;
                    dim.bottomY=dim.viewportHeight*(dim.actualWidth/dim.viewportWidth);
                }
					
            }
               
              //Setup Zoom 
            setupZoom(); 		
            resize(); // resize the image
            
            //Move Image?
            setupPosition( dim.startX, dim.startY ); 
            
            store();// store values
            $image.css({
                position:"relative",
                cursor:"move",
                display:"block"
            }); // show image
			
            menu.setup(); 
            menu.addSave();
            addTool.zoomSlider();   
			
            // add events to main image ...
            $image.mousedown(handleMouseDown);
            $image.mouseup(disableAndStore);
            $image.mouseout(disableAndStore);
			
			// Setup Navigator
            setupNavigator(options);
            
            // Setup Standard Image View
            setupDisplay(dim); 
    }
    
    function setupViewport(edit)
    {
		if(!edit) vpClass= 'viewport';
        else vpClass ='viewport edit';
           
            var dim = $image.data('dim');             
            
            //Refer Loader
             $loader =  $('<div class="loader"></div>');
            
           //Create and set default viewport				  
             return   $('<div class="'+vpClass+'">').css({
                    backgroundColor: "#fff",
                    position: "relative",
                    overflow: "hidden",
                    width: dim.viewportWidth+"px",
                    height: dim.viewportHeight+"px"
                }).append($loader);            
    }
    
	// set up image navigator box (revised by Micheal Jackson ...)
    function setupNavigator(options)
    {
		var image_width = $image.width(); var image_height = $image.height(); 
		org_image_width = image_width; org_image_height = image_height;

	    console.log($image);

		var image_scale = image_width / image_height;

		var dim = $image.data('dim');
		var viewport_width = dim.viewportWidth; var viewport_height = dim.viewportHeight;

	    console.log(dim);
	
		var navigator_thumb_width, navigator_thumb_height;
		var thumb_image_width, thumb_image_height;
		var navigator_thumb_max_width = 182; var navigator_thumb_max_height = 104;
		var navigator_scale = navigator_thumb_max_width / navigator_thumb_max_height;
		if ( navigator_scale > image_scale ) {
			thumb_image_width = Math.floor(navigator_thumb_max_width);
			thumb_image_height = Math.floor(thumb_image_width / image_scale);
		} else if ( navigator_scale == image_scale ) {
			thumb_image_height = Math.floor(navigator_thumb_max_height);
			thumb_image_width = Math.floor(navigator_thumb_max_height);
		} else { 
			thumb_image_width = Math.floor(navigator_thumb_max_width);
			thumb_image_height = Math.floor(thumb_image_width * (image_height / image_width));
		}
		
		var navigator_thumb_width = thumb_image_width + 9; var navigator_thumb_height = thumb_image_height;
		
		var marker_width, marker_height; 
		marker_width = Math.floor(viewport_width / image_width * thumb_image_width) - 4; 
        
		marker_height = Math.floor(viewport_height / image_height * thumb_image_height) - 4;
		var html = 
			'<div class="navigator">' + 
				'<h1>Navigator</h1>' + 
				'<div class="thumb" style="width:'+navigator_thumb_width+'px; height:'+navigator_thumb_height+'px">' +
					'<img id="navigator_thumb_img" src="'+options.original+'" width="'+thumb_image_width+'" height="'+thumb_image_height+'">' + 
					'<div id="marker" style="width:'+marker_width+'px; height:'+marker_height+'px"></div>' + 
				'</div>' + 
				'<p id="navigator_zoom" class="zooming">100%</p>' + 
			'</div>'; 
			
        $container.find('div.extra-tools').html(html);
		
		// Added by Micheal Jackson ...
		// add events to navigator thumb image ...
		document.onmousedown = captureMouseDown;
		document.onmousemove = captureMouseMove;
		document.onmouseup = captureMouseUp;
		
		$('#marker').mousedown(captureOffset);
    }   
    
    var menu = { 
        setup: function()
        {
            var html =  '<div class="nav"></div><div class="submit-contain"></div>'; 
            $menu.html(html); 
        }, 
        addTool: function(tool, html,callback)
        {            
            //Setup Link
           var $nav =  $menu.find('.nav'), 
                     $a = $('<a>',{ id : tool}).text(tool).bind('click',function(){
                            $nav.find('a').removeClass('selected'); 
                            $(this).addClass('selected'); 
                            
                            $menu.find('div.section.show').removeClass('show'); 
                            $menu.find('div#'+tool+'.section').addClass('show'); 
                     }); 
               $nav.append($a);      
           //Setup Section
          var $section = $('<div>', { 'class': 'section', id: tool}).html(html); 
          $menu.append($section); 
          callback(); 
        },     
        addEdit: function()
        {
           
        }, 
        addSave: function()
        {
            var html = '<div id="save" class="button">Save</div>';//<div id="cancel" class="button">Cancel</div>';
                      $menu.find('.submit-contain').append(html);
               //Bind Save
            $menu.find('#save.button').bind('click', function(){
                save(); 
            }); 
            /*$menu.find('#cancel.button').bind('click', function(){
				$loader.removeClass('show');
                showDisplay();
            }); */
        }
    }; //end menu
    
    function showDisplay()
    {
	   $container.find('.extra-tools').hide();
       $container.find('table.image-edit').removeClass('show'); 
       $container.find('table.image-display').addClass('show'); 
    }
    
    function showEdit()
    {
		$container.find('.extra-tools').show();
		$container.find('table.image-display').removeClass('show');
		$container.find('table.image-edit').addClass('show'); 
    }
    
    //Add Image Tools
    var addTool = {
        zoomSlider : function()
        {
            //Add it to menu nav
           var html = '<p class="cent min"></p><div id="zoom-slider"></div><p class="cent max"></p>'; 
           var callback = function()
           {
                var dim=$image.data("dim");
                 //Add Slider if element is there 
                $zoom = $container.find('#zoom-slider'); 
                if($zoom.length>0)
                {
                    var startZoom = (dim.startZoom>100 && dim.startZoom<=200)?dim.startZoom : 100;
                    zmaxNum = dim.maxZoom;
                    $zoom.slider({
                        range: "min",				
                        min: zminNum,				
                        max:  zmaxNum,	
                        value: startZoom,
                        change : slideChange,
                        slide :  slideChange           
                    });
                }

                    //Add min and max percentage to view
                    $('p.cent.min').text( zminNum.toString()  +'%'); 
                    $('p.cent.max').text( zmaxNum.toString()  +'%' ); 

                    zoomPercent( startZoom );
          
           }//end call back
           menu.addTool('Zoom',html,callback); 
        } //end zoomSlider
      
    };//end tools
		
    function scale(scaleX,scaleY)
    {
	    console.log()
        var dim=$image.data("dim");			
        dim.width=dim.actualWidth*scaleX;
        dim.height=dim.actualHeight*scaleY;	
        dim.oldWidth=dim.width;
        dim.oldHeight=dim.height;	
        dim.x=-(dim.topX*scaleX);
        dim.y=-(dim.topY*scaleY);

	    console.log("Dim, called in scale function",dim);
    }
	
    function resize()
    {      
        var dim=$image.data("dim"), wasResized=true;
		
        if(dim.width<dim.viewportWidth){
            dim.height=parseInt(dim.actualHeight*(dim.viewportWidth/dim.actualWidth));
            dim.width=dim.viewportWidth;
            wasResized=false;
        }
		
        if(dim.height<dim.viewportHeight){
            dim.width=parseInt(dim.actualWidth*(dim.viewportHeight/dim.actualHeight));
            dim.height=dim.viewportHeight;
            wasResized=false;
        }
		
        if(dim.width>dim.maxWidth){
            dim.height=parseInt(dim.height*(dim.maxWidth/dim.width));
            dim.width=dim.maxWidth;
            wasResized=false;
        }
		
        //Update image height and widths
        $image.css({
            width:dim.width+"px",
            height:dim.height+"px"
        });
			
        var cx=dim.width/(-dim.x+(dim.viewportWidth/2));
        var cy=dim.height/(-dim.y+(dim.viewportHeight/2));		
        dim.x=dim.x-((dim.width-dim.oldWidth)/cx);
        dim.y=dim.y-((dim.height-dim.oldHeight)/cy);
				
        move();//Do move
		
		return wasResized;
    }
    
    function setupPosition(x, y)
    {
        var dim = $image.data("dim");
        dim.x = x;
        dim.y = y;
        return  move();
    }
	
    function move() {
		var dim = $image.data("dim");
        var minX = -dim.width+dim.viewportWidth;
        var minY = -dim.height+dim.viewportHeight;
		
        if ( dim.x > 0 ) dim.x = 0;        
        else if ( dim.x < minX ) dim.x = minX;     
		
        if ( dim.y > 0 ) dim.y = 0;       
        else if ( dim.y < minY ) dim.y = minY;
     
        $image.css({
            left: dim.x + "px",
            top: dim.y + "px"
        });
		
		// adjust position(left, top) of marker ...
		var marker_left, marker_top;
		
		var thumb_image_width = $('#navigator_thumb_img').width(); var thumb_image_height = $('#navigator_thumb_img').height(); 
		marker_width = Math.floor(dim.viewportWidth / $image.width() * thumb_image_width) - 4;
		marker_height = Math.floor(dim.viewportHeight / $image.height() * thumb_image_height) - 4;
		
		marker_left = Math.floor(Math.abs(dim.x) * thumb_image_width / $image.width()) + 9;
		marker_top = Math.floor(Math.abs(dim.y) * thumb_image_height / $image.height()) + 1;
		
		$('#marker').css({
			left: marker_left+"px",
            top: marker_top+"px"
		});
        		
        return $image;
    }
	
    function store()
    { 
        var  dim=$image.data("dim"),
        scale=dim.width/dim.actualWidth;
				
        dim.topX=(-dim.x)/scale;
        dim.topY=(-dim.y)/scale;
        dim.bottomX=dim.topX+(dim.viewportWidth/scale);
        dim.bottomY=dim.topY+(dim.viewportHeight/scale);
		
        if(typeof dim.callback=='function'){
            //dim.callback(parseInt(dim.topX),parseInt(dim.topY),parseInt(dim.bottomX),parseInt(dim.bottomY));
            dim.callback(scale, dim); 
        }
        return $image;
    }
	
    function handleMouseDown(mousedownEvent)
    {  
        mousedownEvent.preventDefault();		
		   
        var dim=$image.data("dim");
        dim.origoX=mousedownEvent.clientX;
        dim.origoY=mousedownEvent.clientY;
		  
        var clickX=(mousedownEvent.pageX-$image.offset({
            scroll:false
        }).left);
		  
        var clickY=(mousedownEvent.pageY-$image.offset({
            scroll:false
        }).top);
		  
        /*if(dim.allowZoom&&(mousedownEvent.shiftKey||mousedownEvent.ctrlKey)){
            $image.mousemove(zoom);
        }*/
        if(dim.allowPan){
            $image.mousemove(pan);
        }
        return false;
    }
	
    function disableAndStore()
    {
        $image.unbind("mousemove");
        store();
    }
	
    function pan(e) {
        e.preventDefault();
		 
        var dim = $image.data("dim"), deltaX = dim.origoX-e.clientX, deltaY = dim.origoY-e.clientY;
		  
        dim.origoX = e.clientX;
        dim.origoY = e.clientY;
		  
        var targetX = dim.x - deltaX,
        targetY = dim.y - deltaY,
        minX = -dim.width + dim.viewportWidth,
        minY = -dim.height + dim.viewportHeight;
				  
        dim.x = targetX;
        dim.y = targetY;
		  
        move();
    }
    
    function setupZoom(initial) {
		var dim = $image.data('dim'); 
		// Set the Scale
		var scaleX = dim.viewportWidth / (dim.bottomX-dim.topX),
		scaleY = dim.viewportHeight / (dim.bottomY-dim.topY);
		
		// default zoom set to the images width
		dim.zoom = { 
			minX : scaleX,
			minY: scaleY,
			maxX: (dim.maxZoom/100)*scaleX, 
			maxY: (dim.maxZoom/100)*scaleY,
			currentX: scaleX, 
			currentY: scaleY, 
			current: 100
		}; 
		
		// Update image
		if ( dim.startZoom > 100 && dim.startZoom <= 200 )  zoom(dim.startZoom);  // if greater
		else scale(scaleX, scaleY); // standard 100% zoom
    }
	
    function zoom( value ){
        // e.preventDefault();	
        var dim = $image.data("dim");
		
        var z = dim.zoom; 
				
        var decVal = value/100, 
        ratioX = z.maxX - z.minX,  scaleX = decVal * ratioX,
        ratioY = z.maxY - z.minY,  scaleY = decVal * ratioY; 
							
        scale(scaleX, scaleY); 
		
        z.current=value; 
        z.currentX = scaleX; 
        z.currentY = scaleY; 
		
        if ($zoom)  
			resize();			          
    }
	
	// when the zoom level of main image by zoom slider ...
    function slideChange(e, ui) {					
        if ( ui.value != slideValue ) {
            slideValue = ui.value; 						    
            zoom(slideValue);			
            zoomPercent(slideValue); 	

			adjustMarkerPositionSize(slideValue);
        }
    }
	
	// added by Micheal Jackson(2012/06/30, Sat) ...
	function adjustMarkerPositionSize(slideValue) { 
		$('#navigator_zoom').html(+slideValue+'%');
		
		var scale = slideValue / 100.0;
		
		var marker_width, marker_height, marker_left, marker_top;
		var thumb_image_width = $('#navigator_thumb_img').width(); var thumb_image_height = $('#navigator_thumb_img').height(); 
		
		var dim = $image.data('dim');
		var viewport_width = dim.viewportWidth; var viewport_height = dim.viewportHeight; 
		
		var image_width = $image.width(); var image_height = $image.height();   
		var image_left = Math.abs(parseInt($('#main_image').css('left'))); var image_top = Math.abs(parseInt($('#main_image').css('top')));
		
		// We need to take it into consideration that marker has border of 1px ...
		// So I subtracted 4 ...
		marker_width = Math.floor(viewport_width / image_width * thumb_image_width) - 4;
		marker_height = Math.floor(viewport_height / image_height * thumb_image_height) - 4;
		
		marker_left = Math.floor(image_left * thumb_image_width / image_width) + 9;
		marker_top = Math.floor(image_top * thumb_image_height / image_height) + 1;
		
		$('#marker').css({
                    width: marker_width+"px",
                    height: marker_height+"px",
					left: marker_left+"px",
					top: marker_top+"px"
                });
	}
	
    function zoomPercent(cent) {			
        $('a.ui-slider-handle').html('<p>'+ cent  +'%</p>'); 		
    }
	
    function save() {
		// Variables to be sent to image mod script
        var dim = $image.data('dim');
	    console.log(dim);
        var coords  = {
            'image-width' : dim.width,
            'image-height' : dim.height,
            'crop-width' : dim.viewportWidth,
            'crop-height' : dim.viewportHeight,
            'crop-x' : Math.abs(dim.x),
            'crop-y' : Math.abs(dim.y),
            zoom:  dim.zoom.current,
	        original : $image.attr('src'),
            _ :  Math.random()
        };

        $loader.addClass('show');
		// Modify the image and save server side
        $.ajax({
	        type:'post',
	        url:'/api/user/savecrop',
	        data:{model:JSON.stringify(coords)},
	        error:function(xhr,status,error)
	        {
		        console.log("There was an error.",xhr,status,error);
	        },
	        success:function(data)
	        {
		        console.log(data);
		        $loader.removeClass('show');
		        if (data.exec_data.exec_error == false) {
			        displayImage(data.payload.image_path);
		        } else {
			        var save_error = '<div id="upload-error">There was an error during the process. Please try again.</div>';
			        $('.panzone').append(save_error);
		        }
	        }
        });
    }
    
    function displayImage(image)
    {
        $container.find('img#displayonly').attr('src',image);
        showDisplay();                 
    }
	
    $.fn.iedit = function (method) {
        if (methods[method]) {			
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.iedit');
        }
    };
		
	// Added by Micheal Jackson ...
	// for navigator thumb image ...
	var mDown = false;
	var offsetX=0;
	var offsetY=0;
	
	function captureOffset(e) {
		x = parseInt($('#marker').css('left'));
		y = parseInt($('#marker').css('top'));
		if ( document.all ) {
			offsetX = window.event.clientX - x;
			offsetY = window.event.clientY - y;
		} else {
			offsetX = e.pageX - x;
			offsetY = e.pageY - y;
		}
	}
	
	function captureMouseDown() {
		mDown = true;
	}

	function captureMouseUp() {
		mDown = false;
	}

	function captureMouseMove(e) {
		if (!mDown) return;
		
		//var target = getTarget(e);
		
		e = e || window.event;
		var target = e.target || e.srcElement;
		var targetName = target.id;
		
		if ( (targetName != 'navigator_thumb_img') && (targetName != 'marker') )
			return;
		
		x = document.all ? window.event.clientX - offsetX:e.pageX - offsetX;
		y = document.all ? window.event.clientY - offsetY:e.pageY - offsetY;
		
		var image_width = $image.width(); var image_height = $image.height();
		var thumb_image_width = $('#navigator_thumb_img').width(); var thumb_image_height = $('#navigator_thumb_img').height(); 
		
		var marker_width, marker_height, marker_left, marker_top;
		marker_left = parseInt($('#marker').css('left')); marker_top = parseInt($('#marker').css('top'));
		marker_width = parseInt($('#marker').css('width')); marker_height = parseInt($('#marker').css('height'));
		
		var margin_width = thumb_image_width - marker_width - 4;
		var margin_height = thumb_image_height - marker_height - 4;
		
		if ( x < 0 ) x = 9;
		if ( y < 0 ) y = 1;
		if ( x+marker_width > thumb_image_width )
			x = thumb_image_width - marker_width + 5;
		if ( y+marker_height > thumb_image_height )
			y = thumb_image_height - marker_height - 3;
		
		if ( x < 9 ) x = 9; 
		if ( y < 1 ) y = 1;
		$('#marker').css({
			left: x + 'px', 
			top: y + 'px'
		});

		var scale = image_width / thumb_image_width;
		
		var left = Math.floor(-1 * (x-9) * scale); 
		var top = Math.floor(-1 * (y-1) * scale);
		
		setupPosition(left, top);
		/*$image.css({
			left: left + "px", 
			top: top + "px"
		});*/
	}
	
	function getTarget(evt){
		// get srcElement if target is falsy (IE)
		var targetElement = null;
		
		if ( typeof evt.target != 'undefined' ) {
			targetElement = evt.target;
		} else {
			targetElement = evt.srcElement;
		}
		
		// return id of <li> element when hovering over <li> or <a>
		if ( targetElement.nodeName.toLowerCase() == 'li' ){
			return targetElement;
		} else if ( targetElement.parentNode.nodeName.toLowerCase() == 'li' ){
					return targetElement.parentNode;
		} else {
			return targetElement;
		}
	} // end getTarget

	function printObject(o) {
		var out = '';
		for (var p in o) {
			out += p + ': ' + o[p] + '\n';
		}
		//console.log(out);
	}
	
})(jQuery); 