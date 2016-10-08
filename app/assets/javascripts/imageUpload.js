var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;     // Returns full URL
console.log(pathname);
console.log(url);

function windowResize(){
  var width = $('#left-bar').width() * 1.0;
  var height = $(window).height() * 1.0 - 52;
  //$('#left-bar').width(width);
  //$('#left-bar').height(height);
  console.log(width, height);

  // picolor canvas margin center
  var canvasMgTop = (height - width * 0.625) / 2;
  //$('#canvas-container').css('margin-top', canvasMgTop);
}

$(document).ready(function(){
  previewTemplate = $.trim($('#preview-template').html());
  $("#dropzone").dropzone({
    paramName: "image",
    previewTemplate: previewTemplate,
    thumbnailWidth: null,
    thumbnailHeight: null,
    method: "post",
    url: "https://api.imgur.com/3/upload",
    headers: {
      Authorization: "Client-ID 2ee14aa7e5c81e6",
      'Cache-Control': null,
      'X-Requested-With': null
    },
    dragenter : dragin,
    dragleave : dragout,
    drop: dragdrop,
    processing: uploadProcess,
    success: uploadSuccess,
    // addedfile: function(file) {
    // }
  });
  function dragin(e) { //function for drag into element, just turns the bix X white
    console.log(e);
    $(dropzone).addClass('hover');
  }

  function dragout(e) { //function for dragging out of element
    console.log(e);
    $(dropzone).removeClass('hover');
  }

  function dragdrop(e) {
    //console.log(e.toElement.src);
    $(dropzone).children('.dz-preview').remove();
    $(dropzone).removeClass('hover');
  }

  function uploadProcess() {
    $(dropzone).children('.dz-success').html('');
  }

  function uploadSuccess(file, response) {
    console.log(response);
    console.log(response.data.link);
    code = response.status;
    link = response.data.link;

    console.log(file);
    console.log(file.name);

    var img = '<div class="card-image">' +
              '<img src="' + link + '" alt="' + code + '"/></div>';

    $('.col-lg-4').append(img)
    $(dropzone).children('.dz-success').html(img);

    $('.col-lg-4 img').css('width', '100%');
    $('.col-lg-8 img').addClass('dz-image');
    console.log(img);
  }
});
