$(document).ready(function(){
  try {
    farbtastic();
  }
  catch(e) {
    console.log(e);
    return;
  }
});

function farbtastic() {
  // canvas variable
  var area = $('#colorContainer');
  var centerX = area.width() / 2;
  var centerY = area.height() / 2;
  var innerRadius = area.width() / 2.75;
  var outerRadius = area.width() / 2;

  var clickWheel = false;
  var colorWheel = $('#colorWheel');
  var sliderWheel = $('#sliderWheel');
  var controlWheel = $('#controlWheel');

  var clickRect = false;
  var colorRect = $('#colorRect');
  var sliderRect = $('#sliderRect');
  var controlRect = $('#controlRect');

  var sliderMask = $('#sliderMask');

  var colorHue = 0;
  var colorWhite = 1;
  var colorBlack = 0;

  var cardToggle = $('[data-color]');
  var cardCursor = null;
  var cardNoRept = 0;
  var cardCounter = 0;

  // start script
  colorInit();

  $(window).resize(function(){
    colorInit();
    printColorWheel();
    printColorRect('#FF0000');
  })

  sliderWheel.mousedown(function (e) {
    clickWheel = true;
    $(document).disableSelection();
    wheelController(e);
  });

  sliderRect.mousedown(function (e) {
    clickRect = true;
    $(document).disableSelection();
    rectController(e);
  })

  $(window).mouseup(function (e) {
    clickWheel = false;
    clickRect = false;
    $(document).enableSelection();
  })

  $(window).mousemove(function (e) {
    if (clickWheel) { wheelController(e); }
    if (clickRect) { rectController(e); }
  });

  $('#rb-images').sortable({ delay: 70 });
  $('#rb-colors').sortable({
    delay: 70,
    handle: ".handle"
  });

  cardToggle.each(function(e){
    var color = $(this).data('color');
    var anime = false
    $(this).remove();
    appendCard(color, anime);
  });

  $('#rb-append-color').click(function(){
    if(cardCursor != null) {
      cardCursor.removeClass('selected');
      cardCursor = null;
    }
    // random color
    // var color = 'rgb(' + Math.floor(Math.random() * 256) + ','
    //                    + Math.floor(Math.random() * 256) + ','
    //                    + Math.floor(Math.random() * 256) + ')';

    // now color
    var hwb   = 'hwb('+colorHue+','+colorWhite+','+colorBlack+')';
    var color = w3color(hwb).toRgbString();
    appendCard(color);
  });
  // end script

  // append color card to #rb-colors
  function appendCard(color, anime = true) {
    var color = w3color(color);
    var id    = 'card-' + (++cardNoRept);
    var card  = $('#rb-color-template').children().clone();
    var dlt   = $(card.find('[data-delete-btn]').get(0));
    var hex   = $(card.find('[data-hex]').get(0));

    card.attr('id', id);
    card.css('background-color', color.toRgbString());
    dlt.attr('id', 'dlt-' + id);
    hex.attr('id', 'hex-' + id);
    hex.html(color.toHexString());

    $('#rb-colors').append(card);
    $('#rb-colors').sortable("refresh");
    $('#'    +id).click(setColorCursor);
    $('#dlt-'+id).click(dltColorCard);

    cardCounter = $('#rb-colors').sortable("toArray").length;
    $('#color-counter').html(cardCounter);

    if(anime){
      $('#right-bar').animate({ scrollTop: $('#right-bar').prop("scrollHeight") }, 240);
    }
  }

  // link to color card
  function setColorCursor() {
    if(cardCursor != null) {
      cardCursor.removeClass('selected');
    }
    if (cardCursor != null && cardCursor.attr('id') === $(this).attr('id')) {
      cardCursor = null;
    }
    else {
      cardCursor = $(this);
      $(this).addClass('selected');
      var bg     = w3color(cardCursor.css('background-color'));
      var hex    = bg.toHexString();

      colorHue   = bg.hue;
      colorWhite = bg.whiteness;
      colorBlack = bg.blackness;

      setWheelDeg(colorHue);
      printColorRect('hsl(' + colorHue + ', 100%, 50%)')
      setRectPos(colorWhite, colorBlack);
      colorChange();
    }
    console.log('csr', cardCursor);
  }

  function setHexValue(id, hex) {
    var hexID = 'hex-' + id;
    $('#'+hexID).html(hex)
  }

  //
  function dltColorCard() {
    var id = $(this).attr('id');
    console.log(id);
    $(this).parent().remove();

    var colorList = $('#rb-colors').sortable("toArray");
    $('#color-counter').html(colorList.length);

    console.log('hi');
    console.log(this);
  }

  // variable initialize
  function colorInit(){
    sliderWheel.width(2 * outerRadius)
    sliderWheel.height(2 * outerRadius)
    sliderWheel.css('border-radius', outerRadius)

    sliderMask.width(2 * innerRadius)
    sliderMask.height(2 * innerRadius)
    sliderMask.css('border-radius', innerRadius)

    sliderRect.width(outerRadius)
    sliderRect.height(outerRadius)

    printColorWheel();
    printColorRect('#FF0000');
    setWheelDeg(colorHue);
    setRectPos(colorWhite, colorBlack);
    colorChange();
  }

  // do somthing in this function
  function colorChange(){
    var hwb   = 'hwb(' + colorHue + ',' + colorWhite + ',' + colorBlack + ')';
    var color = w3color(hwb);
    var rgb   = color.toRgbString();
    var hex   = color.toHexString();

    if(cardCursor != null){
      var id     = cardCursor.attr('id');

      setHexValue(id, hex);
      cardCursor.css('background-color', rgb);
    }

    // ------------------------------------------------
    // do somthing here
    $('#status').html(rgb)
    $('#box').css('background-color', rgb)
    // ------------------------------------------------
  }

  // html canvas wheel
  function printColorWheel() {
    var canvas  = document.getElementById(colorWheel.attr('id'));
    var context = canvas.getContext('2d');

    canvas.width  = 2 * outerRadius;
    canvas.height = 2 * outerRadius;

    for (var angle = 0; angle <= 360; angle += 1) {
      var startAngle = (angle - 90 - 2) * Math.PI / 180;
      var endAngle = (angle - 90) * Math.PI / 180;
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
      context.closePath();
      context.fillStyle = 'hsl(' + angle + ', 100%, 50%)';
      context.fill();
      context.closePath();
    }

    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

  // html canvas rect
  function printColorRect(rgba) {
    var canvas = document.getElementById(colorRect.attr('id'));
    var context = canvas.getContext('2d');

    var sideRect = outerRadius;
    var rectX = centerX - sideRect / 2;
    var rectY = centerY - sideRect / 2;

    canvas.width  = sideRect;
    canvas.height = sideRect;
    canvas.style.left = rectX + 'px';
    canvas.style.top  = rectY + 'px';

    var gradient = context.createLinearGradient(0, 0, 0 + sideRect, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, rgba);
    context.fillStyle = gradient;
    context.fillRect(0, 0, sideRect, sideRect);

    var gradient = context.createLinearGradient(0, 0, 0, 0 + sideRect);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, sideRect, sideRect);
  }

  // wheel controller
  function wheelController(e){
    colorHue = getWheelHue(e);
    var hsl = 'hsl(' + colorHue + ',' + 1 + ',' + .5 + ')';
    var rgb = w3color(hsl).toHexString();
    printColorRect(rgb);
    colorChange();
  }

  // get hue value from wheel
  function getWheelHue(e) {
    var deg = 0;

    var posO = area.offset();
    var posM = {
      x: e.clientX - posO.left + window.pageXOffset,
      y: e.clientY - posO.top  + window.pageYOffset};
    var atan = Math.atan2(posM.x - outerRadius, posM.y - outerRadius);
    deg = -atan / (Math.PI / 180) + 180;

    setWheelDeg(deg);

    return Math.round(deg);
  }

  function setWheelDeg(deg){
    var widthBorder = outerRadius - innerRadius;
    var widthSlider = controlWheel.width() + 2 * parseInt(controlWheel.css('borderWidth'));
    var radius = outerRadius - widthBorder / 2;
    var shift  = (widthBorder - widthSlider) / 2;

    var X = Math.round(radius *  Math.sin(deg * Math.PI / 180));
    var Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));

    var left = X + radius + shift;
    var top  = Y + radius + shift;
    controlWheel.css('left', left);
    controlWheel.css('top' , top );
    // AND FINALLY apply exact degrees to ball rotation
    //controlWheel.css('WebkitTransform', 'rotate(' + deg + 'deg)');
    //controlWheel.css('-moz-transform', 'rotate(' + deg + 'deg)');
  }

  // rect position handler
  function rectController(e) {
    var shift = - outerRadius / 2;

    var posO = area.offset();
    var posM = {
      x: e.clientX - posO.left + window.pageXOffset,
      y: e.clientY - posO.top  + window.pageYOffset };

    var R = outerRadius;
    var X = posM.x + shift;
    var Y = posM.y + shift;
    X = (X < 0) ? 0 : X;
    Y = (Y < 0) ? 0 : Y;
    X = (X > R) ? R : X;
    Y = (Y > R) ? R : Y;

    colorBlack = Y / R;
    colorWhite = (1 - X / R) * (1 - Y / R);

    setRectPos(colorWhite, colorBlack);
    colorChange();
  }

  function setRectPos(W, B){
    var widthSlider = controlRect.width() + 2 * parseInt(controlRect.css('borderWidth'));

    var R = outerRadius;
    var Y = B * R;
    var X = R - (W * R) / (1 - B);

    var left = X - widthSlider / 2;
    var top  = Y - widthSlider / 2;
    controlRect.css('left', left);
    controlRect.css('top' , top );
  }

  function hslToRgb(hue, sat, light) {
    var t1, t2, r, g, b;
    hue = hue / 60;
    if ( light <= 0.5 ) {
      t2 = light * (sat + 1);
    } else {
      t2 = light + sat - (light * sat);
    }
    t1 = light * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return {r : r, g : g, b : b};
  }

  function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if(hue < 3) return t2;
    else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
  }

  function hwbToRgb(hue, white, black) {
    var i, rgb, rgbArr = [];
    rgb = hslToRgb(hue, 1, 0.50);
    rgbArr[0] = rgb.r / 255;
    rgbArr[1] = rgb.g / 255;
    rgbArr[2] = rgb.b / 255;
    for (i = 0; i < 3; i++) {
      rgbArr[i] *= (1 - (white) - (black));
      rgbArr[i] += (white);
      rgbArr[i] = Number(rgbArr[i] * 255);
    }
    return {r : rgbArr[0], g : rgbArr[1], b : rgbArr[2] };
  }

  // convert rgb object to string
  function rgbString(rgb) {
    return "rgb(" + Math.round(rgb.r) + ", "
                  + Math.round(rgb.g) + ", "
                  + Math.round(rgb.b) + ")";
  }
}
