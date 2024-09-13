import { addModalImg } from "./modalImg.mjs";

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const slideCountButtons = document.querySelectorAll(".slide-count");

const slidesContainer = document.querySelector(".slides");

let currentIndex = 0;
let currentDisplaySlide = 1;

export function changeSlide(slider, data) {
  data.data.forEach((user) => {
    slidesContainer.insertAdjacentHTML(
      "beforeend",
      `<img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="slide">`
    );
  });
  const slides = document.querySelectorAll(".slide");
  function updateSliderPosition() {
    if (slides.length > 0) {
      const slideWidth = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(${
        -currentIndex * slideWidth
      }px)`;
      slider.style.width = `${currentDisplaySlide * slideWidth}px`;
    }
  }
  function changeSlide(step) {
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
  slideCountButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentDisplaySlide = parseInt(event.target.textContent);
      currentIndex = 0;
      updateSliderPosition();
    });
  });

  nextButton.addEventListener("click", () => changeSlide(1));
  prevButton.addEventListener("click", () => changeSlide(-1));
  addModalImg(slides, slider);
}
