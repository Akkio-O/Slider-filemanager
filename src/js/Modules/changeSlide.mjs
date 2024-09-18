const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const slideCountButtons = document.querySelectorAll(".slide-count");

let currentIndex = 0;
let currentDisplaySlide = 1;

export function changeSlide(slider, slides, slidesContainer) {
  function updateSliderPosition() {
    if (slides.length > 0) {
      const slideWidth = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(${
        -currentIndex * slideWidth
      }px)`;
      slider.style.width = `${currentDisplaySlide * slideWidth}px`;
    }
  }

  function changeSlides(step) {
    const maxIndex = slides.length - currentDisplaySlide;
    currentIndex = (currentIndex + step) % slides.length;
    if (currentIndex === -1) {
      currentIndex = slides.length - currentDisplaySlide;
    }
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    updateSliderPosition();
  }

  function handleSlideRemoval() {
    const updatedSlides = document.querySelectorAll(".slide");
    slides = Array.from(updatedSlides);

    if (currentIndex >= slides.length) {
      currentIndex = slides.length - currentDisplaySlide;
    }

    updateSliderPosition();
  }

  slideCountButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentDisplaySlide = parseInt(event.target.textContent);
      currentIndex = 0;
      updateSliderPosition();
    });
  });

  nextButton.addEventListener("click", () => changeSlides(1));
  prevButton.addEventListener("click", () => changeSlides(-1));
  document.addEventListener("slideRemoved", handleSlideRemoval);
}
