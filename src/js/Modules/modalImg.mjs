import { changeSaveImage } from "./changeSaveImage.mjs";
let currentRotate = 0;

function closeModal(slider, modal) {
  slider.removeChild(modal);
  currentRotate = 0;
}

export function addModalImg(slider, event) {
  const img = event.target;
  if (img.tagName === "IMG") {
    const imageObj = {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
    };
    const existingModal = document.querySelector(".hystmodal");
    if (existingModal) {
      slider.removeChild(existingModal);
    }
    const modal = document.createElement("div");
    modal.classList.add("hystmodal");
    modal.innerHTML = `
              <div class="hystmodal__wrap">
                <div class="hystmodal__window" role="dialog" aria-modal="true" >
                  <button data-hystclose class="hystmodal__close">Close</button>  
                  <canvas id="imageCanvas" class="fullWidth"></canvas>
                  <button id="rotateButton">Перевернуть</button>
                  <button id="saveButton">Сохранить изображение</button>
                </div>
              </div>
            `;
    slider.appendChild(modal);
    changeSaveImage(imageObj, currentRotate, modal);

    const closeButton = modal.querySelector(".hystmodal__close");
    closeButton.addEventListener("click", () => closeModal(slider, modal));
  }
}
