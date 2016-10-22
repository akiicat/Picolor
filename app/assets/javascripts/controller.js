function flashMsg(message) {
  $('#msg').html(message);
  $('#msg').show().delay(3000).fadeOut();
  $('#top-title').hide().delay(3000).fadeIn();
}

function autoSave(){
  var saveCounter = 1;
  var user_save   = false

  if($('#edit_form').length > 0) {
    $('#edit_form').click(function () {
      user_save = true;
    });

    $('#edit_form').submit(ajax);

    window.onload = function(){
      setInterval(ajax, 30000);
    }
  }

  function ajax(){
    if($('#edit_form').length == 0) { return 'no content'; }

    var url = $('#edit_form').attr('action')

    $.ajax({
      url : url,
      type : 'PATCH',
      data : $('#edit_form').serialize(),
      dataType: "script",
      success: function(data){
        if(user_save){ flashMsg('Saved'); }
        if(saveCounter++ % 10 == 0){ flashMsg('Auto Saved'); }
        user_save = false;
      },
      error: function(data){
        if(user_save){
          flashMsg('Error');
        }
        user_save = false;
      }
    });
    return false;
  }
}

function resizeWindow(){

  $(document).ready(tabContent);
  $(window).resize(tabContent);

  function tabContent() {
    var topH = $(window).height() - 110
    $('.tab-content').height(topH)
  }

  $(document).ready(swiperHeight);
  $(window).resize(swiperHeight);

  function swiperHeight() {
    var topH = $(window).height() - 50
    $('.swiper-container').height(topH)
  }
}

function inputTitle() {
  var title = $('#form_title > input').val()

  syncTitle(title)

  $('#top-title').click(function(){
    $('#top-title-input').show()
  })

  $('body *').not('#top-title, #top-title-input').click(function(){
    hideTitle(event)
  })
  $('#top-title-input').keypress(function( event ) {
    if ( event.which == 13 ) {
      hideTitle(event)
    }
  })

  function hideTitle(event){
    $('#top-title-input').hide()
    title = $('#top-title-input').val()
    syncTitle(title)
  }

  function syncTitle(text){
    $('#top-title').html(title)
    $('#top-title-input').val(title)
    $('#form_title > input').val(title)
  }
}

//$(document).ready(autoSave);
$(document).on('turbolinks:load', inputTitle);
$(document).on('turbolinks:load', resizeWindow);
$(document).on('turbolinks:load', autoSave);
