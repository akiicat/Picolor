function flashMsg(message) {
  $('#msg').html(message);
  $('#msg').show().delay(3000).fadeOut();
}

function autoSave(){
  var saveCounter = 0;
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
    $.ajax({
      url : '.',
      type : 'PATCH',
      data : $('#edit_form').serialize(),
      dataType: "script",
      success: function(data){
        if(user_save){
          flashMsg('Saved');
        }
        if(saveCounter++ % 10 == 0){
          flashMsg('Auto Saved');
        }
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

$(document).ready(autoSave);
$(document).on('turbolinks:load', autoSave);
