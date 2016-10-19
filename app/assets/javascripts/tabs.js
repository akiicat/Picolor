function bootstrapFunction(){
  $('#left-bar a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}

$(document).ready(bootstrapFunction);
$(document).on('turbolinks:load', bootstrapFunction);
