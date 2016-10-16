$(document).ready(function(){
  $('#left-bar a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
})
