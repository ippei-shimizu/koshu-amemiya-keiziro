document.addEventListener("DOMContentLoaded", event => {
  gsap.registerPlugin(ScrollTrigger);

  const swiper = new Swiper(".swiper-container", {
    initialSlide: 1,
    direction: "horizontal",
    loop: false,
    mousewheel: true,
    speed: 500,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
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
