// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// order swiper.minjquery.min -> swiper.min
//= require swiper.jquery.min
//= require swiper.min
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require jquery.ui.sortable-animation
//= require dropzone
//= require ntc
//= require turbolinks
//= require w3color
//= require clipboard
//= require farbtastic
//= require_tree .
//= require bootstrap-sprockets


// javascript bug fixed
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
