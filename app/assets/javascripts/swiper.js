$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    //loop: true,
    spaceBetween: 0,

    //centeredSlides: true,

    pagination: '.swiper-pagination',
    paginationClickable: true,

    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    slidesPerView: 'auto'//,

    //scrollbar: '.swiper-scrollbar'
  })
});
