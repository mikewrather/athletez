$.extend({
    getUrlVars: function(){
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
           // vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});

var iEdit = {

   _settings : {
       viewportWidth: false,
       viewportHeight: false,
       startX: 0,
       startY: 0,
       startZoom: 100,
       title: false,
       original: false,
       edited: false
   },

   setup : function(data)
   {
       var self = this;

       //setup iedit settings
       self._settings = {
           viewportWidth: parseInt(data.vh),
           viewportHeight: parseInt(data.vw),
           startX: parseInt(data.sx),
           startY: parseInt(data.sy),
           startZoom: parseInt(data.sz),
           title: data.t,
           original: data.o,
           edited: data.edit,
	       imgID:data.imgID,
			libraryID:data.libraryID,
			imgTypeID:data.imgTypeID,
	       std_id:data.std_id,
	       st_id:data.st_id
       };

       //self.launch();
   },

   clean : function(title)
   {
       var self = this;

       $('.display-main').empty();
       $('.extra-tools').hide();
       $('#page-title').empty();
       $('#page-title').append(title);
       //$('.nav').find('a').removeClass('selected');
      // $(document).find('#'+linksel).addClass('selected');
   },

   launch : function(image)
   {
       var self = this;

       self.clean('Edit Image');

       if(image)
       {
           self._settings.original = image;
           self._settings.edited = image;
       }

       if(!self._settings.original)
       {
           alert('You must upload an image before you can edit.');
           self.nav.upload();
           return false;
       }

       //launch it
       $('#image-editor').iedit('start',self._settings);

       //show navigator
       $('.extra-tools').show();
   },

   nav :
   {
       selected : function(id)
       {
           $('.nav').find('a').removeClass('selected');
           $(document).find('#'+id).addClass('selected');
       },

       upload : function()
       {
           var self = this;
               self.selected('upload-link');

           iEdit.clean('Upload New Image');

           //load html
          $.get('upload.html',function(html){

              //insert html
              $('.display-main').html(html);

              // Initialize the jQuery File Upload widget:
              $('#fileupload').fileupload({
                  dataType: 'json',
                  autoUpload: 'true',
                  progressall: function (e, data) {

                      $('#upload-error').remove();
                      $('.fileupload-buttonbar').hide();
                      $('#dragtext').hide();
                      $('#progress').show();

                      var progress = parseInt(data.loaded / data.total * 100, 10);
                      $('#progress .bar').css(
                          'width',
                          progress + '%'
                      )}
              });

              /* Enable iframe cross-domain access via redirect option:
              $('#fileupload').fileupload(
                  'option',
                  'redirect',
                  window.location.href.replace(
                      /\/[^\/]*$/,
                      '/server/result.html?%s'
                  )
              );*/

              // Redirect to Edit Image tab after upload completes
              $('#fileupload').bind('fileuploadalways', function (e, data) {

                  var jresp = $.parseJSON(data.jqXHR.responseText.payload);
                  if (jresp == null) var jresp = data.result.payload;

                  // Confirm success of the upload
                  if (jresp != null) {
                      if (typeof jresp.error !== "undefined") {
                          $('#progress').hide();
                          var upload_error = '<div id="upload-error">There was an error during the upload. Please try again.</div>';
                          $('.panzone').append(upload_error);
                      } else {
                          iEdit.nav.edit(jresp.url);
                      }
                 }
              });

              /* Hover effects for drag and drop
              $(document).bind('dragover', function (e) {
                  var dropZone = $('.dropzone'),
                      timeout = window.dropZoneTimeout;
                  if (!timeout) {
                      dropZone.addClass('in');
                  } else {
                      clearTimeout(timeout);
                  }
                  if (e.target === dropZone[0]) {
                      dropZone.addClass('hover');
                  } else {
                      dropZone.removeClass('hover');
                  }
                  window.dropZoneTimeout = setTimeout(function () {
                      window.dropZoneTimeout = null;
                      dropZone.removeClass('in hover');
                  }, 100);
              });*/


           });

       },

       edit : function(image)
       {
          var self = this;
              self.selected('edit-link');

           iEdit.launch(image);
       },

       view : function(image)
       {
           var self = this;
           self.selected('view-link');

           iEdit.clean('View Image');

           if(image) iEdit._settings.edited = image;

           if(!iEdit._settings.edited)
           {
               alert('You must upload an image and edit it before you can view.');
               iEdit.nav.upload();
               return false;
           }
           // Create the edit table
           var html =  '<table cellspacing="0" cellpadding="0" class="image-display show">' +
               '<tr><td class="displayzone">' +
               '<div class="container">' +
               //'<div class="head"><h1>'+values.title+'</h1></div>' +
               '<img id="displayonly" src="'+iEdit._settings.edited+'">' +
               '<div class="nav"><a onclick="iEdit.nav.edit();">Edit Image</a></div>' +
               '</div>' +
               '</td></tr>' +
               '</table>';

           //console.log($(document).find('div.display-main'),html);
           $(document).find('div.display-main').html(html);
       }
   }
};

//Size of JavaScript Object
var size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};