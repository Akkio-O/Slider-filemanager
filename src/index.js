import { loadFiles } from "./js/Modules/loadFiles.mjs";
import { changeSlide } from "./js/Modules/changeSlide.mjs";
import { addModalImg } from "./js/Modules/modalImg.mjs";

// slider
const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");

const requestSettings = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

fetch("https://reqres.in/api/users", requestSettings)
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((user) => {
      const slideElement = document.createElement("div");
      slideElement.className = "slide-container";
      slideElement.innerHTML = `
        <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="slide">
        <button class="delete-slide">Удалить</button>
      `;
      slidesContainer.appendChild(slideElement);
    });

    const slides = document.querySelectorAll(".slide-container");
    changeSlide(slider, slides, slidesContainer);

    slides.forEach((slideContainer) => {
      const slide = slideContainer.querySelector(".slide");
      const deleteButton = slideContainer.querySelector(".delete-slide");

      slide.addEventListener("click", (event) => addModalImg(slider, event));
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeSlide(slideContainer);
      });
    });
  })
  .catch((error) => console.error("Ошибка загрузки пользователей:", error));

// Function to remove a slide
function removeSlide(slideContainer) {
  const slide = slideContainer.querySelector(".slide");
  if (!slide) return;

  slideContainer.remove();
  const event = new Event('slideRemoved');
  document.dispatchEvent(event);
}

document.querySelectorAll(".delete-slide").forEach(button => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    removeSlide(event.target.closest(".slide-container"));
  });
});

//download files from server
const buttonLoader = document.querySelector("[data-downloadfiles]");
buttonLoader.addEventListener("click", loadFiles);
