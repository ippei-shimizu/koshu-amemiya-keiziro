document.addEventListener("DOMContentLoaded", event => {
  event.preventDefault();
  gsap.registerPlugin(ScrollTrigger);

  const swiper = new Swiper(".swiper-container", {
    initialSlide: 1,
    // direction: "horizontal",
    // loop: false,
    // mousewheel: false,
    speed: 500,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      slideChange: function () {
        checkSlideAndSetAllowance(this);
      }
    }
  });
  // 関数を定義: スライドが'swiper-slide-01'の場合はallowSlideNextをfalseにする
  function checkSlideAndSetAllowance(swiperInstance) {
    if (swiperInstance.slides[swiperInstance.activeIndex].classList.contains("swiper-slide-01")) {
      swiperInstance.allowSlideNext = false;
      swiperInstance.allowTouchMove = false;
    } else {
      swiperInstance.allowSlideNext = true; 
      swiperInstance.allowTouchMove = true;
    }
  }

  // 初期化直後にも上記のロジックを実行
  checkSlideAndSetAllowance(swiper);

  let viewedSlides = {
    "swiper-slide-02": false,
  };

  swiper.on("slideChangeTransitionStart", function () {
    let currentSlideClass = this.slides[this.activeIndex].classList[1];
    if (["swiper-slide-02"].includes(currentSlideClass)) {
      if (viewedSlides[currentSlideClass] === false) {
        this.allowSlideNext = false;
        this.allowTouchMove = false;
        viewedSlides[currentSlideClass] = true; // Mark as viewed
      } else {
        this.allowSlideNext = true;
        this.allowTouchMove = true;
      }
    } else {
      this.allowSlideNext = true;
      this.allowTouchMove = true;
    }
  });

  document.querySelectorAll(".swiper-button-next").forEach(nextButton => {
    nextButton.addEventListener("click", function () {
      swiper.allowSlideNext = true;
    });
  });

  const videoElements = document.querySelectorAll(".video");

  const sliceTextFadeUpElements = document.querySelectorAll(".sliceTextFadeUp");

  sliceTextFadeUpElements.forEach(element => {
    const innerHTML = element.innerHTML;
    const characters = Array.from(innerHTML);

    let wrappedHtml = "";
    let isInsideTag = false;

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];

      if (char === "<") {
        isInsideTag = true;
      }

      if (isInsideTag) {
        wrappedHtml += char;
      } else {
        wrappedHtml += `<span>${char}</span>`;
      }

      if (char === ">") {
        isInsideTag = false;
      }
    }

    element.innerHTML = wrappedHtml;

    const spans = element.querySelectorAll("span:not(:empty)");
    spans.forEach((span, idx) => {
      const delay = 40 * idx + "ms";
      span.style.setProperty("--delay", delay);
    });
  });

  swiper.on("slideChange", function () {
    videoElements.forEach((video, index) => {
      if (this.activeIndex === index + 2) {
        video.play();
      } else {
        video.pause();
      }
    });

    if (this.activeIndex === this.slides.findIndex(slide => slide.classList.contains("swiper-slide-04")) || this.activeIndex === this.slides.findIndex(slide => slide.classList.contains("swiper-slide-05"))) {
      // Unified animation code for both slides
      const activeSlideClass = this.slides[this.activeIndex].classList.contains("swiper-slide-04") ? ".item__04" : ".item__05";
      const itemTextElements = Array.from(document.querySelectorAll(`${activeSlideClass} .item__text`));

      const animateText = index => {
        if (index >= itemTextElements.length) return;

        const element = itemTextElements[index];
        element.classList.add("openPageTitle");

        const spans = element.querySelectorAll("span:not(:empty)");
        const durationPerSpan = 0.5;
        const totalAnimationDuration = spans.length * durationPerSpan;
        gsap.from(spans, {
          opacity: 0,
          y: "1rem",
          stagger: 0.02,
          delay: 0.07 * index,
          onComplete: () => {
            setTimeout(() => {
              animateText(index + 1);
            }, totalAnimationDuration * 45);
          }
        });
      };

      animateText(0);
    }
  });
});
