function initialize() {
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    spaceBetween: 0,

    //pagination: '.swiper-pagination',
    //paginationClickable: true,

    //nextButton: '.swiper-button-next',
    //prevButton: '.swiper-button-prev',
    //scrollbar: '.swiper-scrollbar',
    //mousewheelControl: true,
    slidesPerView: 'auto'

  })

  $('#sortableList').sortable({
    handle: '.swiper-draggable',
    cancel: '',
    axis: "x",
    //animation: 200,
    placeholder: 'swiper-slide card-color',

  }).disableSelection();
}

$(document).ready(initialize);
$(document).on('turbolinks:load', initialize);
