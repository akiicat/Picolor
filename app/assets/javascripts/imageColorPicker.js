function imageUploader(){
  var area        = $('#dropzone');
  var cardImage   = $('[data-id][data-url]');
  var canvasZone  = $('#dz-canvas');
  var canvas_list = new Object();

  var imgNoRept   = 0;

  // --------- start script ---------
  $('#rb-images').sortable({
    delay: 70,
    stop: imageCounter
  });

  cardImage.each(function(){
    var url = $(this).data('url');
    $(this).remove();
    appendImg(url);
  });

  canvasZone.mousemove(function(e) {
    var canvas = $('#dz-canvas > canvas').get(0);
    var bgColor = pixelColor(e, canvas);

    area.css('backgroundColor', bgColor);
  });

  $("#dropzone").dropzone({
    paramName: "image",
    clickable: "#tab-upload-btn",
    acceptedFiles: "image/jpeg,image/png,image/gif",
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
    thumbnail: function(file, data_url){
      canvas_list['LASTDATAURL'] = data_url;
    },
    addedfile: function(file){}
  });
  // --------- end script ---------


  function appendImg(url){
    var cardImg = $('#rb-image-template').children().clone();
    var id  = 'image-' + imgNoRept++;
    var dlt = $(cardImg.find('[data-delete-btn]').get(0));

    cardImg.attr('id', id);
    cardImg.attr('data-url', url);
    dlt.attr('id', 'dlt-' + id);

    createList(id, url, cardImg);

    $('#rb-images').append(cardImg);
    $('#'    +id).click(function(){ loadImage(id); });
    $('#dlt-'+id).click(dltImgCard);

    imageCounter();

    $('#rb-images').animate({ scrollTop: $('#rb-images').prop("scrollHeight") }, 240);

    return id;
  }

  // append to '_this' element default null
  function createList(id, url, _this = null){
    var image = new Image();
    image.onload = function(){
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = this.width;
      canvas.height = this.height;

      context.drawImage(this, 0, 0);

      canvas_list[id] = canvas.toDataURL();

      _this.append(canvas);
    };
    image.onerror = function(){
      // sth
    }
    image.crossOrigin = 'Anonymous';
    image.src = url;
  }

  function loadImage(id){
    $('#left-bar a[href="#l-image"]').tab('show');
    $('#dz-upload').hide();

    var src = canvas_list[id];
    var canvas  = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var image = new Image();
    image.onload = function(){
      canvas.width = this.width;
      canvas.height = this.height;

      context.drawImage(this, 0, 0);
    };
    image.src = src;

    canvasZone.html(canvas);
  }

  function pixelColor(e, canvas){
    var context = canvas.getContext('2d');

    var x = e.pageX;
    var y = e.pageY;

    var srcW = canvas.width;
    var srcH = canvas.height;
    var rszW = parseInt($(canvas).css('width'));
    var rszH = parseInt($(canvas).css('height'));
    var ratio = (srcW + srcH) / (rszW + rszH);

    var canvasOffset = $(canvas).offset();
    var canvasX = Math.floor((x - canvasOffset.left) * ratio);
    var canvasY = Math.floor((y - canvasOffset.top) * ratio);

    var imageData = context.getImageData(0, 0, srcW, srcH);
    var pixels = imageData.data;
    var index = ((canvasY - 1) * (imageData.width * 4)) + ((canvasX - 1) * 4);
    var pixelcolor = 'rgba(' + pixels[index] + ', ' + pixels[index + 1] + ', ' + pixels[index + 2] + ', ' + pixels[index + 3] + ')';

    return pixelcolor;
  }

  function dltImgCard() {
    var id = $(this).attr('id').match(/image-(\d)+/)[0];
    console.log(id, $(this));
    $('#'+id).remove();

    imageCounter();
  }

  function imageCounter() {
    var ids = $('#rb-images').sortable("toArray");
    $('#image-counter').html(ids.length);

    var images = new Array();

    for (var i in ids){
      if(ids[i]){
        var url = $('#'+ids[i]).data('url');
        images.push('"' + url + '"');
      }
    }

    $('#form-images input').val('[' + images + ']');

    if(ids.length > 5) {
      flashMsg('Max Images is 5');
    }
  }

  // --------- dropzone ---------
  function dragin(e) { //function for drag into element, just turns the bix X white
    $(dropzone).addClass('hover');
  }

  function dragout(e) { //function for dragging out of element
    $(dropzone).removeClass('hover');
  }

  function dragdrop(e) {
    $(dropzone).removeClass('hover');
  }

  function uploadProcess() {
    // tab change
    $('#left-bar a[href="#l-image"]').tab('show');

    $('#dz-upload').hide();
    $('#dz-canvas').empty();

    $('#dz-preview').show();
    $(dropzone).css('background-color', 'rgba(0, 0, 0, 0.1)');
  }

  function uploadSuccess(file, response) {
    console.log(response.status);
    console.log(response.data.link);

    $('#dz-preview').hide();

    if(response.success){
      var url = response.data.link;
      var id  = appendImg(url, true);

      loadImage('LASTDATAURL');

      $('#right-bar a[href="#r-image-card"]').tab('show');
      $('#r-tab-content').animate({ scrollTop: $('#r-image-card').prop("scrollHeight") }, 750);

      console.log(canvas_list);
    }
    else {
      $('#dz-upload').show();
    }
  }
}

//$(document).ready(imageUploader);
$(document).on('turbolinks:load', imageUploader);
