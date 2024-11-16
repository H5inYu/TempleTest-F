
//for act-index
$('#filter_area').colorfulTab();


//for index-act
//======gallery slider======
$('.gallery_slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  dots: false,
  arrows: false,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
});

//for act-reg
//=======SELECT2======
$(document).ready(function () {
  $('.select_2').select2();
});
