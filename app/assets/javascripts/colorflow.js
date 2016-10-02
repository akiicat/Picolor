function initialize() {
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    //loop: true,
    //draggable: true,
    spaceBetween: 0,

    //centeredSlides: true,

    //pagination: '.swiper-pagination',
    //paginationClickable: true,

    //nextButton: '.swiper-button-next',
    //prevButton: '.swiper-button-prev',
    //scrollbar: '.swiper-scrollbar',
    //mousewheelControl: true,
    slidesPerView: 'auto'

  })

  $('#sortableList').sortable({
    //refreshPositions: true,
    handle: '.swiper-draggable',
    cancel: '',
    //distance: 5,
    axis: "x",
    //animation: 200,
    //opacity: 0.6,
    //scroll: true,
    //containment: 'parent',
    placeholder: 'swiper-slide card-color',
    //tolerance: 'pointer'

  }).disableSelection();
}

$(document).ready(initialize);
$(document).on('turbolinks:load', initialize);
