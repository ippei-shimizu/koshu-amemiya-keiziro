document.addEventListener('DOMContentLoaded', (event) => {
  const swiper = new Swiper('.swiper-container', {
      initialSlide: 1,
      loop: false, 
      mousewheel: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
});
