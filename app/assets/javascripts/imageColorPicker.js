var canvas_list = new Object();

$(document).ready(function(){
  var area       = $('#dropzone');
  var cardImage  = $('[data-url][data-id]');
  var canvasZone = $('#dz-canvas');

  cardImage.each(function(){
    var url = $(this).data('url');
    var id  = $(this).data('id');

    var _this = $(this);
    createList(id, url, _this);
  });

  cardImage.click(function(){
    var id = $(this).data('id');
    loadImage(id);
  });

  canvasZone.mousemove(function(e) {
    var canvas = $('#dz-canvas > canvas').get(0);
    var bgColor = pixelColor(e, canvas);

    area.css('backgroundColor', bgColor);
    console.log('set bg color: ' + bgColor);
  });

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
})
