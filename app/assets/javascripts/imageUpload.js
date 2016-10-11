var canvas_hash = new Object();
var canvas_test = new Object();

$(document).ready(function(){
  $('[data-url][data-id]').each(function(){
    var url = $(this).data('url');
    var id  = $(this).data('id');

    var _this = $(this);
    loadImage(id, url, _this);
  });

  function loadImage(id, url, _this = null){
    var img = new Image();
    img.onload = function(){
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = this.width;
      canvas.height = this.height;

      context.drawImage(this, 0, 0);

      canvas_hash[id] = canvas.toDataURL();
      canvas_test[id] = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

      _this.append(canvas);
    };
    img.crossOrigin = 'Anonymous';
    img.src = url;
  }

  $('[data-url][data-id]').click(function(){
    var id    = $(this).data('id');
    var src   = canvas_hash[id];
    var src2  = canvas_test[id];

    var canvas  = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = src;
    img.alt = 'hi';
    img.onload = function(){
      canvas.width = this.width;
      canvas.height = this.height;

      context.drawImage(this, 0, 0);
      console.log(this.width, this.height);
    };
    //console.log(img);

    $('#dz-canvas').html(canvas);

    //console.log(id, src, src2, canvas);
  });

  $("#dz-canvas").click(function(e) {
    var canvas = $("#dz-canvas").children('canvas').get(0);
    var ctx = canvas.getContext("2d");

    var canvasOffset = $(canvas).offset();
    var canvasX = Math.floor(e.pageX - canvasOffset.left);
    var canvasY = Math.floor(e.pageY - canvasOffset.top);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    var pixelRedIndex = ((canvasY - 1) * (imageData.width * 4)) + ((canvasX - 1) * 4);
    var pixelcolor = "rgba("+pixels[pixelRedIndex]+", "+pixels[pixelRedIndex+1]+", "+pixels[pixelRedIndex+2]+", "+pixels[pixelRedIndex+3]+")";

    $("body").css("backgroundColor", pixelcolor);
    console.log('set bg color: ' + pixelcolor);
  });
})
