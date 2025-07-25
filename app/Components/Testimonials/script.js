var swiper = new Swiper('.c-testimonials', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.c-testimonials__pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.c-testimonials__arrow-next',
      prevEl: '.c-testimonials__arrow-prev',
    }
  });
  